import React, { useEffect, useState } from 'react';
import useAxiosApi from '../../hooks/useAxiosApi';
import Swal from 'sweetalert2';
import { t, setLang, getLang, onLangChange } from '../../translation';
import QRCode from 'qrcode';
import environmentConfig from '../../config/config';

export default function Header() {
  const [lang, setLangState] = useState(getLang());
  useEffect(() => {
    const off = onLangChange(() => setLangState(getLang()));
    return off;
  }, []);
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('accessToken')
  );
  const [nickName, setNickName] = useState(
    localStorage.getItem('nickName') || ''
  );

  const { execute: authExecute } = useAxiosApi('/auth', 'POST');
  const { execute: registerExecute } = useAxiosApi('/auth/register', 'POST');
  const { execute: userExecute } = useAxiosApi('/user', 'GET');
  const { execute: qrCreateExecute } = useAxiosApi('/auth/qr/sessions', 'POST');
  const { execute: qrStatusExecute } = useAxiosApi('/auth/qr/sessions', 'GET');

  const navText = {
    goods: t('page.header.nav.goods'),
    assets: t('page.header.nav.assets'),
    market: t('page.header.nav.market'),
    mypage: t('page.header.nav.mypage'),
    logout: t('page.header.nav.logout'),
    dashboard: t('page.header.nav.dashboard'),
    kpopWorld: t('page.header.nav.kpopWorld'),
    etriWallet: t('page.header.nav.etriWallet'),
    login: t('page.header.nav.login'),
  };

  const handleQrLogin = async () => {
    let pollTimer = null;
    let remainTimer = null;

    const stopPolling = () => {
      if (pollTimer) {
        clearInterval(pollTimer);
        pollTimer = null;
      }
    };
    const stopRemainTimer = () => {
      if (remainTimer) {
        clearInterval(remainTimer);
        remainTimer = null;
      }
    };

    try {
      Swal.fire({
        title: 'QR 로그인 준비 중...',
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      const created = await qrCreateExecute({});
      const session = created?.data || created;
      const sessionId = session?.sessionId;
      const expiresAt = session?.expiresAt;

      if (!sessionId) throw new Error('No sessionId received');

      // 앱에서 최소 sessionId만 추출해도 되도록 JSON으로 인코딩
      const qrValue = JSON.stringify({
        type: 'dataspace-qr-login',
        v: 1,
        sessionId,
        apiUrl: environmentConfig.apiUrl,
      });

      const qrDataUrl = await QRCode.toDataURL(qrValue, { margin: 1, width: 260 });

      const formatRemain = (ms) => {
        if (!ms || ms <= 0) return '0:00';
        const s = Math.floor(ms / 1000);
        const m = Math.floor(s / 60);
        const r = (s % 60).toString().padStart(2, '0');
        return `${m}:${r}`;
      };

      const qrResult = await Swal.fire({
        title: '',
        html: `
          <div class="w-full max-w-md mx-auto">
            <div class="mb-3 flex items-center justify-center">
              <img src="/image/dataspace.jpg" alt="dataspace" class="h-14" />
            </div>
            <h2 class="text-2xl font-semibold text-gray-900 text-center">QR 로그인</h2>
            <p class="text-sm text-gray-500 text-center mt-1">앱에서 QR을 스캔하면 자동으로 로그인됩니다.</p>
            <div class="mt-5 flex justify-center">
              <img src="${qrDataUrl}" alt="qr" class="rounded-lg border border-gray-200" />
            </div>
            <div class="mt-3 text-xs text-gray-500 text-center">
              만료까지 <span id="qrRemain" class="font-semibold text-gray-700">${formatRemain((expiresAt || 0) - Date.now())}</span>
            </div>
          </div>
        `,
        width: 520,
        padding: '2rem',
        background: '#ffffff',
        showConfirmButton: false,
        showCloseButton: true,
        showCancelButton: true,
        cancelButtonText: t('page.auth.common.cancel'),
        buttonsStyling: false,
        customClass: {
          popup: 'rounded-2xl shadow-xl',
          title: 'hidden',
          cancelButton:
            'mt-6 inline-flex w-full justify-center rounded-md bg-gray-500 px-4 py-2 text-white hover:bg-gray-600',
        },
        didOpen: () => {
          const remainEl = Swal.getPopup()?.querySelector('#qrRemain');

          const updateRemain = () => {
            const remain = (expiresAt || 0) - Date.now();
            if (remainEl) remainEl.textContent = formatRemain(remain);
          };
          updateRemain();
          remainTimer = setInterval(updateRemain, 500);

          pollTimer = setInterval(async () => {
            try {
              const statusRes = await qrStatusExecute({}, false, `/auth/qr/sessions/${sessionId}`);
              const statusData = statusRes?.data || statusRes;

              if (statusData?.status === 'approved' && statusData?.accessToken) {
                stopPolling();
                stopRemainTimer();

                localStorage.setItem('accessToken', statusData.accessToken);
                setIsAuthenticated(true);

                // nickName은 status에 있으면 우선 반영, 없으면 /user에서 가져옴
                if (statusData.nickName) {
                  localStorage.setItem('nickName', statusData.nickName);
                  setNickName(statusData.nickName);
                }

                try {
                  const userResponse = await userExecute();
                  const userData = userResponse.data || userResponse;
                  if (userData?.nickName) {
                    localStorage.setItem('nickName', userData.nickName);
                    setNickName(userData.nickName);
                    const { setNickNameCookie } = await import('../../context/langCookie');
                    setNickNameCookie(userData.nickName);
                  }
                  if (userData?.account) localStorage.setItem('walletAddress', userData.account);
                } catch (e) {
                  // ignore - token 저장만으로도 로그인 상태는 유지됨
                }

                Swal.fire('로그인 성공', 'QR 로그인이 완료되었습니다.', 'success');
              } else if (statusData?.status === 'expired') {
                stopPolling();
                stopRemainTimer();
                Swal.fire('만료됨', 'QR 로그인 세션이 만료되었습니다. 다시 시도해주세요.', 'warning');
              }
            } catch (e) {
              // 일시적 네트워크 오류는 무시하고 계속 폴링
            }
          }, 2000);
        },
        willClose: () => {
          stopPolling();
          stopRemainTimer();
        },
      });

      // QR 로그인 취소/닫기 시: 다시 로그인(이메일) 창으로 복귀
      if (
        qrResult.dismiss === Swal.DismissReason.cancel ||
        qrResult.dismiss === Swal.DismissReason.close ||
        qrResult.dismiss === Swal.DismissReason.esc
      ) {
        await handleLogin();
      }
    } catch (err) {
      stopPolling();
      stopRemainTimer();
      Swal.fire('오류', 'QR 로그인 준비 중 문제가 발생했습니다.', 'error');
    }
  };

  const handleLogin = async () => {
    const savedEmail = localStorage.getItem('rememberedEmail') || '';
    Swal.fire({
      title: '',
      html: `
        <div class="w-full max-w-md mx-auto">
          <div class="mb-3 flex items-center justify-center">
            <img src="/image/dataspace.jpg" alt="avataroad" class="h-16" />
          </div>
          <h2 class="text-2xl font-semibold text-gray-900 text-center">${t('page.auth.login.title')}</h2>
          <p class="text-sm text-gray-500 text-center mt-1">${t('page.auth.login.desc')}</p>
           <label for="email" class="block text-sm font-medium text-gray-700 mb-1">${t('page.auth.common.emailLabel')}</label>
          <div class="mt-6 text-left flex justify-center">          
            <input type="email" id="email" class="swal2-input !mt-0 !mb-0" style="max-width:360px;width:100%;display:block;margin:0 auto;" placeholder="${t('page.auth.common.emailPlaceholder')}" value="${savedEmail}" />
          </div>
          <div class="mt-1 text-left flex justify-center">
            <label class="flex items-center" style="max-width:360px;width:100%;display:block;margin:0 auto;">
              <input type="checkbox" id="rememberEmail" class="h-4 w-4 text-blue-600 border-gray-300 rounded" ${savedEmail ? 'checked' : ''} />
              <span class="ml-2 text-xs text-gray-600">${t('page.auth.login.rememberId')}</span>
            </label>
          </div>
          <div class="mt-4 flex justify-center" style="display:none">
            <button type="button" id="qrLoginBtn" class="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50" style="max-width:360px;">
              QR 로그인
            </button>
          </div>
        </div>
      `,
      width: 520,
      padding: '2rem',
      background: '#ffffff',
      showCloseButton: true,
      confirmButtonText: "로그인",
      showDenyButton: true,
      denyButtonText: t('page.auth.login.signup'),
      showCancelButton: true,
      cancelButtonText: t('page.auth.common.cancel'),
      buttonsStyling: false,
      customClass: {
        popup: 'rounded-2xl shadow-xl',
        title: 'hidden',
        confirmButton:
          'mt-6 inline-flex w-full justify-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none',
        denyButton:
          'mt-2 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50',
        cancelButton:
          'mt-2 inline-flex w-full justify-center rounded-md bg-gray-500 px-4 py-2 text-white hover:bg-gray-600',
      },
      preConfirm: () => {
        const email = Swal.getPopup().querySelector('#email').value;
        const remember = Swal.getPopup().querySelector('#rememberEmail').checked;
        if (!email) {
          Swal.showValidationMessage(t('page.auth.login.validation.emailRequired'));
        }
        return { email, remember };
      },
      didOpen: () => {
        const popup = Swal.getPopup();
        const input = popup.querySelector('#email');
        const qrBtn = popup.querySelector('#qrLoginBtn');
        const htmlContainer = Swal.getHtmlContainer();
        if (htmlContainer) {
          htmlContainer.style.overflowY = 'visible';
          htmlContainer.style.overflowX = 'hidden';
          htmlContainer.style.maxHeight = 'none';
          htmlContainer.style.paddingRight = '0px';
          htmlContainer.style.paddingLeft = '0px';
        }
        if (input) input.focus();
        if (qrBtn) {
          qrBtn.addEventListener('click', async () => {
            Swal.close();
            await handleQrLogin();
          });
        }
      },
    }).then(async result => {
      if (result.isConfirmed) {
        Swal.fire({
          title: t('page.auth.common.bioProgress'),
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        try {
          const { email, remember } = result.value;
          const response = await authExecute({ email });
          
          // API returns the result directly if useAxiosApi returns response.data
          // Checking structure based on likely response
          const responseData = response.data || response;
          const accessToken = responseData.accessToken || responseData.token;

          if (accessToken) {
            localStorage.setItem('accessToken', accessToken);
            setIsAuthenticated(true);
            
            // Try to fetch user info if token is available
            try {
              const userResponse = await userExecute();
              const userData = userResponse.data || userResponse;
              
              if (userData) {
                if (userData.account) localStorage.setItem('walletAddress', userData.account);
                if (userData.nickName) {
                  localStorage.setItem('nickName', userData.nickName);
                  setNickName(userData.nickName);
                  const { setNickNameCookie } = await import('../../context/langCookie');
                  setNickNameCookie(userData.nickName);
                }
                const userEmailFromApi = userData.email || userData.userEmail;
                const emailToRemember = userEmailFromApi || email;
                
                if (remember) {
                  localStorage.setItem('rememberedEmail', emailToRemember || '');
                } else {
                  localStorage.removeItem('rememberedEmail');
                }
              }
            } catch (userError) {
              console.warn('Failed to fetch user info:', userError);
              // Fallback if user info fetch fails but login succeeded
              if (remember) {
                localStorage.setItem('rememberedEmail', email || '');
              }
            }

            Swal.fire(t('page.auth.login.successTitle'), t('page.auth.login.successText'), 'success');
          } else {
            throw new Error('No access token received');
          }
        } catch (error) {
          if (error.response && error.response.status === 404) {
            Swal.fire({
              title: t('page.auth.login.promptSignupTitle'),
              text: t('page.auth.login.promptSignupText'),
              icon: 'info',
              showCancelButton: true,
              confirmButtonText: t('page.auth.register.confirm'),
              cancelButtonText: t('page.auth.common.cancel'),
            }).then(async registerResult => {
              if (registerResult.isConfirmed) {
                await handleRegister(result.value.email);
              }
            });
          } else {
            Swal.fire(t('page.auth.login.failTitle'), t('page.auth.login.failText'), 'error');
          }
        }
      } else if (result.isDenied) {
        await handleRegister();
      }
    });
  };

  const handleRegister = async (prefillEmail = '') => {
    Swal.fire({
      title: '',
      html: `
        <div class="w-full max-w-md mx-auto">
          <div class="mb-3 flex items-center justify-center">
            <img src="/image/dataspace.jpg" alt="avataroad" class="h-16" />
          </div>
          <h2 class="text-2xl font-semibold text-gray-900 text-center">${t('page.auth.register.title')}</h2>
          <p class="text-sm text-gray-500 text-center mt-1">${t('page.auth.register.desc')}</p>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">${t('page.auth.common.emailLabel')}</label>
          <div class="mt-2 text-left flex justify-center">
            <input type="email" id="email" class="swal2-input !mt-0 !mb-0" style="max-width:360px;width:100%;display:block;margin:0 auto;" placeholder="${t('page.auth.common.emailPlaceholder')}" value="${prefillEmail}" />
          </div>
          <label for="nickname" class="block text-sm font-medium text-gray-700 mb-1 mt-4">${t('page.auth.common.nicknameLabel')}</label>
          <div class="mt-2 text-left flex justify-center">
            <input type="text" id="nickname" class="swal2-input !mt-0 !mb-0" style="max-width:360px;width:100%;display:block;margin:0 auto;" placeholder="${t('page.auth.common.nicknamePlaceholder')}" />
          </div>
        </div>
      `,
      width: 520,
      padding: '2rem',
      background: '#ffffff',
      showCloseButton: true,
      buttonsStyling: false,
      confirmButtonText: t('page.auth.register.confirm'),
      showCancelButton: true,
      cancelButtonText: t('page.auth.common.cancel'),
      customClass: {
        popup: 'rounded-2xl shadow-xl',
        title: 'hidden',
        confirmButton:
          'mt-6 inline-flex w-full justify-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none',
        cancelButton:
          'mt-2 inline-flex w-full justify-center rounded-md bg-gray-500 px-4 py-2 text-white hover:bg-gray-600',
      },
      didOpen: () => {
        const popup = Swal.getPopup();
        const htmlContainer = Swal.getHtmlContainer();
        if (htmlContainer) {
          htmlContainer.style.overflowY = 'visible';
          htmlContainer.style.overflowX = 'hidden';
          htmlContainer.style.maxHeight = 'none';
          htmlContainer.style.paddingRight = '0px';
          htmlContainer.style.paddingLeft = '0px';
        }
        const emailInput = popup.querySelector('#email');
        const nicknameInput = popup.querySelector('#nickname');
        if (nicknameInput) {
          nicknameInput.setAttribute('pattern', '[a-zA-Z0-9]*');
          nicknameInput.addEventListener('input', (e) => {
            const value = e.target.value;
            const filteredValue = value.replace(/[^a-zA-Z0-9]/g, '');
            if (value !== filteredValue) {
              e.target.value = filteredValue;
            }
          });
          nicknameInput.addEventListener('paste', (e) => {
            e.preventDefault();
            const paste = (e.clipboardData || window.clipboardData).getData('text');
            const filteredPaste = paste.replace(/[^a-zA-Z0-9]/g, '');
            e.target.value = filteredPaste;
          });
        }
        
        if (prefillEmail && nicknameInput) {
          nicknameInput.focus();
        } else if (emailInput) {
          emailInput.focus();
        }
      },
      preConfirm: () => {
        const email = Swal.getPopup().querySelector('#email').value;
        const nickName = Swal.getPopup().querySelector('#nickname').value;
        if (!email || !nickName) {
          Swal.showValidationMessage(t('page.auth.register.validation.bothRequired'));
        }
        return { email, nickName };
      },
    }).then(async result => {
      if (result.isConfirmed) {
        Swal.fire({
          title: '회원가입 진행 중...',
          html: `
            <div class="text-center">
              <div class="mb-4">
                <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
              <p class="text-gray-700 font-medium mb-2">DID 발급 중입니다</p>
              <p class="text-gray-500 text-sm mb-2">디지털 신원증명서를 발급하고 있습니다</p>
              <p class="text-gray-500 text-sm">잠시만 기다려주세요...(25초 소요)</p>
            </div>
          `,
          allowOutsideClick: false,
          showConfirmButton: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        try {
          const { email, nickName } = result.value;
          
          // DID 발급 중 메시지 업데이트
          setTimeout(() => {
            Swal.update({
              html: `
                <div class="text-center">
                  <div class="mb-4">
                    <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                  </div>
                  <p class="text-gray-700 font-medium mb-2">SMC 지갑 생성 중입니다</p>
                  <p class="text-gray-500 text-sm mb-2">블록체인 지갑을 생성하고 있습니다</p>
                  <p class="text-gray-500 text-sm">거의 완료되었습니다...</p>
                </div>
              `
            });
          }, 10000); // 15초 후 메시지 변경
          
          const response = await registerExecute({ email, nickName });
          
          const responseData = response.data || response;
          const accessToken = responseData.accessToken || responseData.token;

          if (accessToken) {
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('nickName', nickName);
            setIsAuthenticated(true);
            setNickName(nickName);
            Swal.fire(
              t('page.auth.register.successTitle'),
              t('page.auth.register.successText'),
              'success'
            );
          } else {
             throw new Error('No access token received');
          }
        } catch (error) {
          Swal.fire(
            t('page.auth.register.failTitle'),
            (error && error.response && error.response.data && error.response.data.resultMessage) || '',
            'error'
          );
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        await handleLogin();
      }
    });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setNickName('');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('nickName');
    localStorage.removeItem('walletAddress');
    
    const isAvataroad = /\.avataroad\.com$/.test(window.location.hostname);
    const cookieParts = [
      'ar_nickname=',
      'Path=/',
      'Max-Age=0',
      'SameSite=Lax',
    ];
    if (isAvataroad) {
      cookieParts.push('Domain=.avataroad.com');
    }
    if (window.location.protocol === 'https:') {
      cookieParts.push('Secure');
    }
    document.cookie = cookieParts.join('; ');
    
    window.location.href = '/';
  };

  return (
    <div className="w-full bg-white border-b border-gray-300">
      <div className="top_header flex items-center justify-between mx-auto w-[1280px] h-24">
        <div className="flex items-center gap-4">
          <a href="/">
            <img
              src="/image/dataspace.jpg"
              title="avataroad"
              alt="avataroad logo"
              className="ml-6 h-20 w-128"
            />
          </a>
          {isAuthenticated && nickName && (
            <span className="text-neutral-800 text-base font-nanum-square-neo font-semibold">
              {nickName} {t('page.header.welcome')}
            </span>
          )}
        </div>

        <div className="top_header_link flex items-center">
          <a
            href="/market"
            className="ml-4 text-neutral-800 text-base font-nanum-square-neo"
          >
            {navText.market}
          </a>
          <a
            href="/mypage/market/purchase"
            className="ml-4 text-neutral-800 text-base font-nanum-square-neo"
          >
            {navText.mypage}
          </a>
          {isAuthenticated ? (
            <button
              type="button"
              className="ml-4 text-neutral-800 text-base font-nanum-square-neo"
              onClick={handleLogout}
            >
              {navText.logout}
            </button>
          ) : (
            <button
              type="button"
              className="bg-white w-30 h-12 px-5 rounded-full justify-center items-center flex"
              onClick={handleLogin}
            >
              <div className="text-black text-base font-nanum-square-neo">
                지갑 로그인
              </div>
            </button>
          )}
       
        </div>
      </div>
    </div>
  );
}
 


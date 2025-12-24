import React, { useEffect, useState } from 'react';
import LeftMenu from '../common/LeftMenu';
import useAxiosApi from '../../hooks/useAxiosApi';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { t, getLang, onLangChange } from '../../translation';
const MyPageInfoContainer = () => {
  const [nickName, setNickName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  const { execute: getUserInfo } = useAxiosApi('/user', 'GET');
  const { execute: updateUserInfo } = useAxiosApi('/user', 'PUT');
  const { execute: deleteUserInfo } = useAxiosApi('/user', 'DELETE');

  const navigate = useNavigate();
  const [lang, setLangState] = useState(getLang());
  useEffect(() => {
    const off = onLangChange(() => setLangState(getLang()));
    return off;
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await getUserInfo();
        setData(response);
        if (response) {
          setNickName(response.data.nickName);
        }
      } catch (error) {
        console.error('사용자 정보를 가져오는 중 오류가 발생했습니다:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleUpdateNickname = async () => {
    if (!nickName) {
      Swal.fire(t('page.mypageInfo.toast.needNicknameTitle'), t('page.mypageInfo.toast.needNicknameText'), 'warning');
      return;
    }

    if (isUpdating) return;

    try {
      setIsUpdating(true);
      await updateUserInfo({ nickName: nickName });
      Swal.fire(t('page.mypageInfo.toast.editDoneTitle'), t('page.mypageInfo.toast.editDoneText'), 'success');
      setIsEditing(false);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        Swal.fire(t('page.mypageInfo.toast.duplicateTitle'), t('page.mypageInfo.toast.duplicateText'), 'error');
      } else {
        Swal.fire(t('page.mypageInfo.toast.editFailTitle'), t('page.mypageInfo.toast.editFailText'), 'error');
      }
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCopyPrivateKey = async () => {
    const key = data?.data?.privateKey;
    if (!key) return;
    try {
      await navigator.clipboard.writeText(key);
      Swal.fire(t('page.mypageInfo.toast.copyDoneTitle'), t('page.mypageInfo.toast.copyDoneText'), 'success');
    } catch (err) {
      try {
        const textarea = document.createElement('textarea');
        textarea.value = key;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        Swal.fire(t('page.mypageInfo.toast.copyDoneTitle'), t('page.mypageInfo.toast.copyDoneText'), 'success');
      } catch (e) {
        Swal.fire(t('page.mypageInfo.toast.copyFailTitle'), t('page.mypageInfo.toast.copyFailText'), 'error');
      }
    }
  };

  const handleWithdraw = async () => {
    try {
      await deleteUserInfo();
      Swal.fire(t('page.mypageInfo.toast.withdrawDoneTitle'), t('page.mypageInfo.toast.withdrawDoneText'), 'success').then(() => {
        localStorage.removeItem('accessToken');
        navigate('/');
        window.location.reload();
      });
    } catch (error) {
      Swal.fire(t('page.mypageInfo.toast.withdrawFailTitle'), t('page.mypageInfo.toast.withdrawFailText'), 'error');
    }
  };

  const handleConnectSMCWallet = () => {
    window.open('http://20.39.197.109:3000/sc/accounts', '_blank', 'noopener,noreferrer');
  };

  const handleConnectDIDUser = () => {
    const orgId = data?.data?.orgId;
    const url = orgId 
      ? `http://20.39.197.109:3000/did/organization/detail/${orgId}`
      : 'http://20.39.197.109:3000/did/organization/detail';
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (isLoading) {
    return <p>{t('page.mypage.common.loading')}</p>;
  }

  return (
    <>
      <main>
        <section className="flex justify-center mt-16 mb-72">
          <LeftMenu pageName="mypage" />

          <section className="flex-1 ml-4 max-w-screen-lg">
            <h2 className="text-2xl mb-5">{t('page.mypageInfo.title')}</h2>
            <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
              <table className="w-full border-collapse">
                <tbody>
                <tr>
                    <th className="border p-2 text-left">{t('page.mypageInfo.labels.did')}</th>
                    <td className="border p-2">
                      <div className="p-2">
                        {data?.data?.didWalletInfo ? (
                          <a
                            href={data?.data?.didWalletUrl || '#'}
                            onClick={(e) => {
                              if (!data?.data?.didWalletUrl) {
                                e.preventDefault();
                                handleConnectDIDUser();
                              }
                            }}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 underline break-all cursor-pointer"
                            title="DID 지갑으로 이동"
                          >
                            {data?.data?.didWalletInfo}
                          </a>
                        ) : (
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              handleConnectDIDUser();
                            }}
                            className="text-blue-500 underline break-all cursor-pointer"
                          >
                            오스레저 DID 사용자 연결
                          </a>
                        )}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th className="border p-2 text-left">{t('page.mypageInfo.labels.wallet')}</th>
                    <td className="border p-2">
                      <div className="p-2">
                        {data?.data?.account ? (
                          <a
                            href={`http://20.39.197.109:3000/sc/accounts/${data?.data?.account}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 underline break-all cursor-pointer"
                          >
                            {data?.data.account}
                          </a>
                        ) : (
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              handleConnectSMCWallet();
                            }}
                            className="text-blue-500 underline break-all cursor-pointer"
                          >
                            오스레저 SMC 지갑 연결
                          </a>
                        )}
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <th className="border p-2 text-left">{t('page.mypageInfo.labels.email')}</th>
                    <td className="border p-2">
                      <div className="p-2 break-all">
                        {data?.data?.email || (
                          <span className="text-gray-500">{t('page.mypageInfo.none')}</span>
                        )}
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <th className="border p-2 text-left">{t('page.mypageInfo.labels.nickname')}</th>
                    <td className="border p-2">
                      {isEditing ? (
                        <input
                          type="text"
                          defaultValue={nickName}
                          onChange={e => setNickName(e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded"
                        />
                      ) : (
                        <div className="p-2">{nickName}</div>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="flex justify-end space-x-4 mt-4">
                {isEditing ? (
                  <>
                    <button
                      className="bg-blue-500 text-white py-2 px-4 rounded"
                      onClick={handleUpdateNickname}
                    >
                      {t('page.mypageInfo.actions.save')}
                    </button>
                    <button
                      className="bg-gray-500 text-white py-2 px-4 rounded"
                      onClick={() => setIsEditing(false)}
                    >
                      {t('page.mypageInfo.actions.cancel')}
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="bg-blue-500 text-white py-2 px-4 rounded"
                      onClick={() => setIsEditing(true)}
                    >
                      {t('page.mypageInfo.actions.edit')}
                    </button>
                    <button
                      className="bg-red-500 text-white py-2 px-4 rounded"
                      onClick={handleWithdraw}
                    >
                      {t('page.mypageInfo.actions.withdraw')}
                    </button>
                  </>
                )}
              </div>
            </div>
          </section>
        </section>
      </main>
    </>
  );
};

export default MyPageInfoContainer;



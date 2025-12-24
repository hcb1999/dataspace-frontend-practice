// Minimal translation utility without any library
// Provides: t(key, vars), setLang(lang), getLang(), onLangChange(cb)
import { getLangCookie, setLangCookie } from './context/langCookie';

const ko = {
  page: {
    main: {
      hero: {
        head: '데이터 스페이스(AvataroAD)는',
        lead: 'K-POP 엔터사와 크리에이터를 연결해주는',
        tail: '메타버스 에셋 오픈 마켓플레이스입니다!',
      },
      cta: {
        goods: '굿즈보기',
        assets: '에셋보기',
        market: '데이터 마켓',
      },
      mzStats: '메타버스 이용자들은 대부분 MZ세대로 제페토 가입자 수는 3억명, 로블록스는 1.5억명입니다.',
      section1Title1: '데이터 스페이스는 메타버스 가입자들을 대상으로',
      section1Title2: 'K-POP 에셋을 제작/판매할 수 있는 시장을 제공하는',
      section1Title3: 'K-POP 엔터사와 크리에이터를 위한 서비스입니다!',
      section1LeftTitle: '메타버스 시장 규모 전망치',
      section1LeftSource: '자료:PwC',
      section1RightTitle: '주요 메타버스 플랫폼 이용자',
      section1RightUnit: '단위:명',
      section2Lead1: '로블록스, 제페토 등에서 전세계 유명 그룹들이 월드 구축 및 공연을 하고 있습니다.',
      section2Lead2: '또한 전세계 엔터사들은 이미 메타버스를 통해 에셋을 판매하고 있습니다.',
      section2Title1: 'K-POP 엔터사는 데이터 스페이스를 통해',
      section2Title2: '멋진 에셋을 구매하여 메타버스를 이용해 전세계',
      section2Title3: '팬들에게 판매할 수 있습니다.',
      section3Line1: '로블록스 크리에이터는 27만명, 누적게임 수는 5천만개,',
      section3Line2: '제페토 크리에이터는 70만명, 스튜디오 내에 등록된 아이템은 200만개,',
      section3Line3: '누적 판매 개수는 2500만개에 달하고 있습니다.',
      section3Title1: '크리에이터는 데이터 스페이스를 통해',
      section3Title2: 'K-POP 에셋을 판매하여 많은 수익을 얻을 수 있습니다.',
      section4Title1: 'K-POP 엔터사는 데이터 스페이스 사이트를 통해',
      section4Title2: 'K-POP 굿즈를 업로드하고, 크리에이터들이 제작한',
      section4Title3: 'K-POP 에셋을 제공받을 수 있습니다.',
      section5Title1: 'K-POP 팬들은 데이터 스페이스 사이트를 통해 제작된',
      section5Title2: 'K-POP 에셋을 데이터 마켓에서 믿고 구매할 수 있습니다.',
      section5Title3: '또한 재판매를 지원하므로 팬들 간의 거래도 가능합니다.',
      enterpriseSteps: {
        step1: {
          title: 'K-POP 엔터사 가입 및 로그인',
          line1: '크리에이터들에게 K-POP 에셋 제작을 의뢰하기',
          line2: '위해서는 데이터 스페이스에 가입해야 합니다.',
        },
        step2: {
          title: 'K-POP 굿즈 등록',
          line1: '크리에이터 들에게 K-POP 에셋 제작을 의뢰할 K-POP 굿즈를',
          line2: '등록합니다. K-POP 에셋 제작에 필요한 내용을 알려주세요.',
          line3: '(제품 이미지, K-POP 에셋 제작방향, 대상 메타버스,',
          line4: '대상 아바타 부위 등)',
        },
        step3: {
          title: '크리에이터 들이 제작한 K-POP 에셋 비교',
          line1: '크리에이터 들이 제작해서 업로드한 다양한',
          line2: 'K-POP 에셋을 비교할 수 있습니다.',
        },
        step4: {
          title: '크리에이터가 제작한 K-POP 에셋 선택 및 결제',
          line1: '맘에 드는 K-POP 에셋을 찾으셨나요? 이더리움으로',
          line2: '결제하실 수 있습니다.',
        },
      },
      creatorSteps: {
        step1: {
          title: '크리에이터 가입 및 로그인',
          line1: 'K-POP 엔터사가 의뢰한 K-POP 굿즈를 조회하고',
          line2: '제작한 K-POP 에셋을 업로드하기 위해서는 데이터 스페이스에',
          line3: '가입을 해야 합니다.',
        },
        step2: {
          title: 'K-POP 엔터사들이 업로드한 K-POP 굿즈 조회',
          line1: 'K-POP 엔터사들이 의뢰한 다양한 K-POP 굿즈를 볼 수',
          line2: '있습니다. 크리에이터님에게 잘 맞는 K-POP 굿즈를 선택해서',
          line3: 'K-POP 에셋을 제작할 수 있겠죠?',
        },
        step3: {
          title: '크리에이티브 넘치는 K-POP 에셋 제작, 업로드, 제공',
          line1: '이제는 크리에이터님의 세상입니다. K-POP 엔터사가',
          line2: '상상하는 것 이상의 K-POP 에셋을 제작해 보세요. 제작이',
          line3: '완료된 K-POP 에셋을 업로드하면 K-POP 엔터사에게',
          line4: '제공됩니다.',
        },
        step4: {
          title: 'K-POP 에셋 제공 현황',
          line1: 'K-POP 엔터사들에게 제공한 현황을 볼 수 있습니다.',
          line2: '결제한 금액은 데이터 스페이스 수수료를 제하고 크리에이터님',
          line3: '지갑으로 입금됩니다.',
        },
      },
      fanSteps: {
        step1: {
          title: '데이터 마켓 가입 및 로그인',
          line1: '데이터 마켓을 통해 K-POP 엔터사가 판매하는',
          line2: '에셋을 구매하기 위해서는 데이터 스페이스에 가입해야합니다.',
        },
        step2: {
          title: 'K-POP 에셋 판매',
          line1: '데이터 마켓을 통해 에셋을 판매하기 위해 에셋을 등록합니다.',
          line2: '판매시 다양한 판매조건(에디션 개수, 판매가, 판매기간 등)을',
          line3: '설정할 수 있고 에디션이 누구한테 판매되었는지 확인이 가능합니다.',
        },
        step3: {
          title: 'K-POP 에셋 구매',
          line1: '에셋을 구매하기 전에 아바타가 착용하고 있는 모양이 궁금하지',
          line2: '않으신가요? 데이터 마켓은 최신 아바타 시스템 을 적용해 에셋을',
          line3: '미리 착용해 보고 구매할 수 있습니다.',
        },
        step4: {
          title: 'K-POP 에셋 재판매',
          line1: '데이터 마켓을 통해 구매한 에셋은 재판매를 지원하므로',
          line2: '팬들 간에도 믿고 거래할 수 있습니다. 재판매 시에도 새로운',
          line3: '판매조건을 설정할 수 있습니다.',
        },
      },
    },
    market: {
      title: '데이터 마켓',
      hero: {
        head: '데이터 마켓에 등록된',
        lead: 'K-POP 엔터사들의 굿즈를 이용하여 나만의 에셋',
        tail: '을 거래해보세요.',
      },
      search: {
        placeholder: '검색어 입력',
        startDate: '시작 날짜',
        endDate: '종료 날짜',
        searchBtn: '검색',
        resetBtn: '초기화',
      },
      list: {
        card: {
          creator: '크리에이터',
          metaverse: '메타버스',
          stock: '재고수량 / 전체수량: {{stock}} / {{total}} 개',
          price: '판매가: {{price}} ETH',
        },
      },
    },
    header: {
      nav: {
        goods: '굿즈보기',
        assets: '에셋보기',
        market: '데이터 마켓',
        mypage: '마이페이지',
        logout: '로그아웃',
        dashboard: '대시보드',
        kpopWorld: 'K-POP 월드',
        etriWallet: 'ETRI 지갑',
        login: '로그인',
      },
      welcome: '님 환영합니다',
    },
    auth: {
      common: {
        emailLabel: '이메일',
        emailPlaceholder: 'name@example.com',
        nicknameLabel: '닉네임',
        nicknamePlaceholder: '닉네임을 입력하세요',
        bioProgress: ' 인증 중...',
        cancel: '취소'
      },
      login: {
        title: '로그인',
        desc: '이메일 입력 후 로그인을 진행해 주세요.',
        rememberId: '아이디 저장',
        confirmBio: '지갑 인증',
        signup: '회원가입',
        successTitle: '로그인 성공',
        successText: '성공적으로 로그인되었습니다.',
        failTitle: '로그인 실패',
        failText: '로그인 중 오류가 발생했습니다.',
        promptSignupTitle: '회원가입이 필요합니다',
        promptSignupText: '회원가입을 진행하시겠습니까?',
        validation: {
          emailRequired: '이메일을 입력해야 합니다.'
        }
      },
      register: {
        title: '회원가입',
        desc: '이메일과 닉네임 입력 후 회원가입을 진행해 주세요.',
        confirm: '회원가입',
        successTitle: '회원가입 완료',
        successText: '성공적으로 회원가입되었습니다.',
        failTitle: '회원가입 실패',
        validation: {
          bothRequired: '이메일과 닉네임을 모두 입력해야 합니다.'
        }
      }
    },
    assets: {
      title: '에셋보기',
      hero: {
        head: '데이터 스페이스에 등록된',
        lead: 'K-POP 엔터사들의 굿즈를 이용하여',
        leadBottom: '나만의 에셋',
        tail: '을 만들어 보세요.',
      },
      search: {
        creatorPlaceholder: '크리에이터명',
        metaverseLabel: '메타버스',
        metaverse: {
          roblox: '로블록스',
          zepeto: '제페토',
          kpopworld: 'K-POP 월드',
          incheonworld: '인천월드'
        },
        startDate: '시작 날짜',
        endDate: '종료 날짜',
        keywordPlaceholder: '검색어 입력',
        searchBtn: '검색',
        resetBtn: '초기화'
      },
      ai: {
        title: 'AI 검색',
        placeholder: '예: 상의 찾아줘, 바지 찾아줘',
        searching: 'AI가 창작 에셋을 검색중입니다...',
        notFound: '관련 에셋을 찾을 수 없습니다. 다른 검색어로 시도해보세요.',
        searchBtn: '검색',
        alt: 'AI 로고'
      },
      list: {
        card: {
          creator: '크리에이터',
          metaverse: '메타버스',
          price: '제공가',
          contractDone: '계약완료',
          imageAlt: '에셋 이미지'
        }
      }
    },
    goods: {
      title: '굿즈보기',
      hero: {
        head: '데이터 스페이스의 크리에이터를 통해',
        lead: 'K-POP 굿즈에 대한 다양한 에셋을 제작',
        leadBottom: '',
        tail: '해보세요.',
      },
      cta: {
        register: '굿즈 등록',
      },
      search: {
        advertiserPlaceholder: '엔터사명',
        metaverseLabel: '메타버스',
        metaverse: { roblox: '로블록스', zepeto: '제페토', kpopworld: 'K-POP 월드', incheonworld: '인천월드' },
        startDate: '시작 날짜',
        endDate: '종료 날짜',
        keywordPlaceholder: '검색어 입력',
        searchBtn: '검색',
        resetBtn: '초기화',
      },
      card: {
        advertiser: '엔터사명',
        metaverse: '메타버스',
        period: '게시기간',
        imageAlt: '굿즈 이미지',
      },
    },
    goodsdetail: {
      period: '굿즈 게시기간',
      metaverse: '메타버스',
      noInfo: '정보 없음',
      assetOf: '{{target}} 에셋: {{type}}',
      buttons: {
        registerAsset: '에셋 등록',
        back: '뒤로 가기',
      },
      noticeTitle: '[유의사항]',
      noticeLine: '굿즈 게시기간 안에 에셋을 등록하셔야 됩니다.',
      descTitle: '굿즈 설명',
      imageAlt: '굿즈 이미지',
    },
      goodsregister: {
        title: '굿즈 등록',
        entertainment: {
          title: '엔터사 정보',
          nameLabel: '엔터사명',
          walletLabel: '지갑주소'
        },
        metaverse: {
          title: '적용할 메타버스',
          help1: '* 원하시는 메타버스 플랫폼을 선택하세요',
          help2: '* 해당 플랫폼에 맞게 크리에이터들이 에셋 창작을 진행합니다',
          label: '메타버스'
        },
        goodsInfo: {
          title: '굿즈 정보',
          help: '* 원하시는 굿즈에 맞는 설명을 기입해주세요',
          nameLabel: '굿즈명',
          namePlaceholder: '굿즈명을 기입해주세요',
          categoryLabel: '분류',
          robloxCategory: '로블록스 분류',
          zepetoCategory: '제페토 분류',
          kpopworldCategory: 'K-POP월드 분류',
          incheonworldCategory: '인천월드 분류',
          periodLabel: '굿즈 게시기간',
          startPlaceholder: '시작 날짜',
          endPlaceholder: '종료 날짜',
          descLabel: '굿즈 설명',
          descPlaceholder: '에셋에 대한 설명을 입력하세요'
        },
        additional: {
          title: '추가 정보',
          help1: '* 광고 심의에 위배되지 않는 근거가 있는 정보만 사용가능하며, 저작권 침해에',
          help2: '해당되는 이미지는 절대 사용할 수 없습니다.',
          imageLabel: '굿즈 이미지',
          previewAlt: '미리보기',
          noteTypes: '※ jpg, jpeg, gif, png 파일 첨부 가능',
          noteSize: '※ 7MB를 초과하면 안됩니다.'
        },
        buttons: {
          submit: '등록',
          cancel: '취소'
        },
        validation: {
          needInputTitle: '입력 확인 필요',
          needGoodsName: '굿즈명을 입력하세요.',
          needGoodsDesc: '굿즈 설명을 입력하세요.',
          needStartDate: '게시 시작 날짜를 선택하세요.',
          needEndDate: '게시 종료 날짜를 선택하세요.',
          invalidPeriod: '게시 기간이 올바르지 않습니다. 시작일이 종료일보다 앞서야 합니다.',
          needMetaverseSelect: '적용할 메타버스를 최소 1개 이상 선택하세요.',
          needImage: '굿즈 이미지를 첨부하세요.',
          fileTooLargeTitle: '파일 용량 초과',
          fileTooLargeText: '이미지 파일은 7MB 이하여야 합니다.',
          needRobloxCategory: '로블록스 분류를 선택하세요.',
          needZepetoCategory: '제페토 분류를 선택하세요.',
          needKpopworldCategory: 'K-POP월드 분류를 선택하세요.',
          needIncheonworldCategory: '인천월드 분류를 선택하세요.'
        },
        result: {
          successTitle: '등록 성공',
          successText: '굿즈가 성공적으로 등록되었습니다.',
          ok: '확인',
          failTitle: '등록 실패',
          failText: '굿즈 등록 중 오류가 발생했습니다.'
        }
      },
    assetsdetail: {
      profileAlt: '프로필 이미지',
      creator: '크리에이터',
      seller: '판매자',
      salePeriod: '판매일시',
      metaverse: '메타버스',
      none: '없음',
      price: '가격',
      descTitle: '에셋 설명',
      descEmpty: '에셋 설명을 제공하지 않습니다.',
      viewGoods: '굿즈 보기',
      certificate: '데이터 등록증',
      assetName: '에셋명',
      more: '더보기',
      close: '닫기',
      assetImageAlt: '에셋 이미지',
      contract: {
        action: '계약하기',
        processing: '계약 진행 중...'
      }
    },
    marketdetail: {
      profileAlt: '프로필 이미지',
      seller: '판매자',
      salePeriod: '판매일시',
      metaverse: '메타버스',
      none: '없음',
      price: '가격',
      stock: '보유 현황',
      descTitle: '에셋 설명',
      viewGoods: '굿즈 보기',
      purchase: {
        confirmTitle: '결제 하시겠습니까?',
        currentStock: '현재 재고: {{stock}}개',
        qtyLabel: '구매 개수',
        qtyPlaceholder: '수량을 입력하세요',
        ok: '확인',
        validateQty: '유효한 수량을 입력하세요 (1 ~ {{max}})',
        processing: '상품을 구매 중입니다... 잠시만 기다려주세요',
        failTitle: '구매 실패',
        failText: '구매 중 오류가 발생했습니다.',
        button: '결제하기',
        buttonProcessing: '결제 진행 중...'
      }
    },
    marketSellRegister: {
      title: '마켓 판매 등록',
      assetInfo: {
        title: '마켓 판매 에셋 정보',
        priceUnit: '* 가격 단위: ETH (예: 0.0001)'
      },
      labels: {
        marketAssetName: '마켓 에셋명',
        marketAssetDesc: '마켓 에셋 설명'
      },
      validation: {
        priceDigitsOnly: '숫자와 소수점만 입력 가능합니다.',
        priceDotOnce: '소수점은 한 번만 입력 가능합니다.',
        digitsOnly: '숫자만 입력 가능합니다.'
      },
      buttons: { back: '뒤로가기', submit: '등록' },
      toast: {
        posting: '마켓에 상품을 등록 중입니다... 잠시만 기다려주세요',
        failTitle: '등록 실패',
        failText: '마켓 등록 중 오류가 발생했습니다.',
        ok: '확인'
      }
    },
    marketResellRegister: {
      title: '에셋 재판매 등록',
      stockSummary: '보유 현황: {{stock}} 개',
      assetInfo: {
        title: '재판매 에셋 정보',
        priceUnit: '* 가격 단위: ETH (예: 0.0001)'
      },
      labels: {
        marketAssetName: '마켓 에셋명',
        marketAssetDesc: '마켓 에셋 설명'
      },
      validation: {
        priceDigitsOnly: '숫자와 소수점만 입력 가능합니다.',
        priceDotOnce: '소수점은 한 번만 입력 가능합니다.',
        digitsOnly: '숫자만 입력 가능합니다.'
      },
      buttons: { back: '뒤로가기', submit: '등록' },
      toast: {
        posting: '재판매 등록 중입니다... 잠시만 기다려주세요',
        failTitle: '등록 실패',
        failText: '재판매 등록 중 오류가 발생했습니다.',
        ok: '확인'
      }
    },
    leftmenu: {
      headingList: '데이터 스페이스',
      headingMypage: '마이페이지',
      goodsList: '굿즈보기',
      goodsManage: '굿즈 관리',
      assetsList: '에셋보기',
      assetsManage: '에셋 관리',
      assetsCreateManage: '창작 에셋 관리',
      assetsHoldManage: '보유 에셋 관리',
      marketList: '데이터 마켓',
      marketRegister: '마켓 등록',
      marketManage: '데이터 마켓 관리',
      marketSellManage: '판매 데이터 관리',
      marketPurchaseManage: '구매 데이터 관리',
      myInfo: '내 정보 보기',
      winningStatus: '이벤트 당첨현황'
    },
    footer: {
      terms: '서비스이용약관',
      privacy: '개인정보취급방침',
      email: 'dataspace@authrium.com',
      copyright: 'Copyright by. ㈜오스리움. All Rights Reserved.'
    },
    mypage: {
      common: {
        loading: '로딩 중...'
        , noData: '데이터가 없습니다.',
        no: 'No',
        image: '이미지',
        name: '명',
        metaverse: '메타버스',
        status: '상태',
        detail: '상세보기',
        detailEdit: '상세/수정',
        totalLabel: '총건수',
        countSuffix: '건',
        search: '검색',
        reset: '초기화',
        keywordPlaceholder: '검색어 입력',
        stateLabel: '상태',
        metaverseLabel: '메타버스',
        actions: {
          delete: '삭제',
          edit: '수정',
          ok: '확인'
        }
      },
      goods: {
        title: '굿즈 관리',
        register: '굿즈 등록',
        table: {
          image: '굿즈이미지',
          name: '굿즈명'
        }
        , stateOptions: {
          S1: '게시전',
          S2: '게시중',
          S3: '게시중지',
          S4: '게시종료'
        }
      },
      assetsHold: {
        title: '보유 에셋 관리'
        , stateOptions: {
          P2: '결제중(결제요청)',
          P3: '보유중',
          P4: '결제실패'
        }
      },
      assetsCreate: {
        title: '창작 에셋 관리'
        , stateOptions: {
          S1: '제공전',
          S2: '제공중',
          S3: '제공중지',
          S4: '제공종료',
          S5: '제공완료'
        }
      },
      marketSell: {
        title: '판매 데이터 관리'
        , stateOptions: {
          S1: '판매전',
          S2: '판매중',
          S3: '판매중지',
          S4: '판매종료',
          S5: '판매완료'
        }
      },
      marketPurchase: {
        title: '구매 데이터 관리'
      }
    },
    mypageInfo: {
      title: '내 정보 관리',
      labels: {
        wallet: '지갑주소',
        did: 'DID 정보',
        email: '이메일',
        privateKey: '개인 키',
        nickname: '닉네임'
      },
      none: '정보 없음',
      actions: {
        copy: '복사',
        edit: '수정',
        cancel: '취소',
        save: '수정 완료',
        withdraw: '회원탈퇴'
      },
      toast: {
        needNicknameTitle: '닉네임 입력 필요',
        needNicknameText: '닉네임을 입력해주세요.',
        editDoneTitle: '닉네임 수정 완료',
        editDoneText: '닉네임이 성공적으로 수정되었습니다.',
        duplicateTitle: '중복된 닉네임',
        duplicateText: '이미 사용 중인 닉네임입니다.',
        editFailTitle: '수정 실패',
        editFailText: '닉네임 수정 중 오류가 발생했습니다.',
        copyDoneTitle: '복사 완료',
        copyDoneText: '개인 키가 복사되었습니다.',
        copyFailTitle: '복사 실패',
        copyFailText: '복사 중 오류가 발생했습니다.',
        withdrawDoneTitle: '회원탈퇴 완료',
        withdrawDoneText: '정상적으로 회원탈퇴가 처리되었습니다.',
        withdrawFailTitle: '회원탈퇴 실패',
        withdrawFailText: '회원탈퇴 처리 중 오류가 발생했습니다.'
      }
    },
    mypageDetail: {
      titles: {
        createdAsset: '창작 에셋 정보',
        purchasedAsset: '구매 에셋 정보',
        heldAsset: '보유 에셋 정보',
        sellingAsset: '판매 에셋 정보'
      },
      goodsDetail: {
        title: '굿즈 상세 보기',
        labels: {
          status: '상태',
          advertiser: '엔터사명',
          attach: '굿즈 첨부',
          name: '굿즈명',
          desc: '굿즈 설명',
          period: '굿즈 게시기간',
          assetItems: '에셋 항목',
          robloxAssets: '로블록스용 에셋:',
          zepetoAssets: '제페토용 에셋:',
          kpopAssets: 'K-POP월드용 에셋:'
        },
        notes: {
          imageTypes: '※ jpg, jpeg, gif, png 파일 첨부 가능',
          imageSize: '※ 6MB가 초과되면 안됩니다.'
        },
        usedAssets: '굿즈를 사용한 에셋',
        preview: '미리보기',
        metaversePreview: '메타버스 미리보기',
        certificate: '데이터 등록증',
        viewCertificate: '데이터 등록증 보기',
        fileDownload: '파일 다운로드',
        actions: {
          posting: '굿즈 게시',
          editPosting: '굿즈 게시수정',
          processing: '처리 중...'
        }
      },
      assetCommon: {
        title: '에셋 정보',
        labels: {
          status: '상태',
          name: '에셋명',
          metaverse: '메타버스',
          kind: '에셋 종류',
          price: '제공가',
          salePrice: '판매 가격',
          issueCnt: '발행 수량',
          stock: '보유 현황',
          purchaseDate: '구매 날짜',
          period: '게시기간',
          salePeriod: '판매기간',
          desc: '에셋 설명',
          url: '에셋 URL',
          attach: '에셋 첨부',
          preview: '미리보기',
          metaPreview: '메타버스 미리보기',
          certificate: '데이터 등록증',
          viewCertificate: '데이터 등록증 보기'
        },
        actions: {
          providePost: '제공게시',
          provideEdit: '제공게시수정',
          salePost: '판매 게시',
          saleEdit: '판매 게시수정',
          processing: '처리 중...'
        },
        notes: {
          imgTypes: '※ jpg, jpeg, gif, png 파일 첨부 가능',
          imgSize6: '※ 6MB가 초과되면 안됩니다.',
          issueCntHelp: '* 1 이상의 정수만 입력 가능, 최대 {{max}}개'
        },
        validation: {
          issueCntExceed: '발행 수량은 현재 재고({{max}})를 초과할 수 없습니다.'
        },
        none: '정보 없음'
      },
      purchased: {
        buttons: {
          resellRegister: '재판매 등록',
          download: '다운로드'
        }
      },
      held: {
        buttons: {
          marketRegister: '데이터 마켓 등록',
          download: '다운로드'
        }
      }
    },
    sections: {
      transaction: {
        title: '트랜잭션 정보',
        idLabel: '트랜잭션 ID',
        none: '정보 없음'
      },
      contract: {
        title: '컨트랙트 정보',
        addressLabel: '컨트랙트 주소',
        na: 'N/A'
      },
      provider: {
        sellerTitle: '판매자 정보',
        providerTitle: '제공자 정보',
        walletLabel: '지갑 주소'
      },
      recipient: {
        buyerTitle: '구매자 정보',
        recipientTitle: '수령자 정보',
        walletLabel: '지갑 주소'
      },
      owner: {
        title: '소유주 정보',
        tokenId: '토큰 ID',
        ownerAddress: '소유주 주소',
        empty: '소유주 정보가 없습니다.'
      }
    },
    certificate: {
      subtitle: 'CERTIFICATE OF DATA REGISTRATION',
      issuer: '발급자',
      issuanceDate: '발급일',
      expirationDate: '만료일',
      assetId: '에셋 ID',
      registrantNickName: '등록자',
      registrantEmail: '등록자 이메일',
      registrantWalletAddress: '등록자 지갑주소',
      assetType: '에셋타입',
      imageURL: '에셋 이미지 URL',
      registrationDate: '등록일',
      detailsTitle: '데이터 상세 정보',
      parseError: '데이터를 파싱할 수 없습니다.',
      dataName: '데이터명',
      provider: '제공기관',
      description: '데이터 설명',
      productType: '상품유형',
      language: '언어',
      topic: '주제',
    },
      assetregister: {
        title: '에셋 등록',
        goodsInfo: {
          title: '굿즈 정보',
          help: '* 에셋을 만들 때 사용된 굿즈에 대한 정보입니다',
          nameLabel: '굿즈명',
          advertiserLabel: '엔터사명',
          imageLabel: '굿즈 사진',
          imageAlt: '굿즈 이미지'
        },
        creator: {
          title: '크리에이터',
          nameLabel: '크리에이터명',
          walletLabel: '지갑주소'
        },
        typeSelector: {
          fbx: 'FBX용 3D 에셋',
          metaverse: '메타버스용 에셋'
        },
        fbxInfo: {
          title: 'FBX 3D 에셋 정보',
          help: '* 원하시는 에셋에 맞는 설명을 기입해주세요',
          assetNameLabel: '에셋명',
          assetNamePlaceholder: '에셋명을 입력하세요',
          min2chars: '* 최소 2자 이상 입력해주세요',
          priceLabel: '제공가격',
          pricePlaceholder: '예: 0.0001 (ETH)',
          priceHelp1: '* 0 이상의 숫자만 입력 가능합니다',
          priceHelp2: '* 가격 단위: ETH (예: 0.0001)',
          periodLabel: '제공기간',
          descLabel: '에셋 설명',
          descPlaceholder: '에셋에 대한 설명을 입력하세요',
          imageAttachLabel: '3D에셋 이미지 첨부',
          imageNoteTypes: '※ jpg, jpeg, gif, png 파일 첨부 가능',
          imageNoteSize: '※ 6MB가 초과되면 안됩니다.',
          fbxAttachLabel: 'FBX 파일 첨부',
          fbxNote: '※ FBX 파일 첨부 가능',
          fbxNoteSize: '※ 30MB가 초과되면 안됩니다.'
        },
        metaInfo: {
          title: '메타버스용 에셋 정보',
          help: '* 원하시는 에셋에 맞는 설명을 기입해주세요',
          assetNameLabel: '에셋명',
          assetNamePlaceholder: '에셋명을 입력하세요',
          min2chars: '* 최소 2자 이상 입력해주세요',
          metaverseLabel: '메타버스',
          metaverse: { roblox: '로블록스', zepeto: '제페토', kpopworld: 'K-POP 월드', incheonworld: '인천월드' },
          robloxAssetLabel: '로블록스 에셋',
          zepetoAssetLabel: '제페토 에셋',
          kpopworldAssetLabel: 'K-POP 월드 에셋',
          incheonworldAssetLabel: '인천월드 에셋',
          priceLabel: '제공가격',
          pricePlaceholder: '예: 0.0001 (ETH)',
          priceHelp1: '* 0 이상의 숫자만 입력 가능합니다',
          priceHelp2: '* 가격 단위: ETH (예: 0.0001)',
          periodLabel: '제공기간',
          descLabel: '에셋 설명',
          descPlaceholder: '에셋에 대한 설명을 입력하세요',
          imageAttachLabel: '에셋 이미지 첨부',
          imageNoteTypes: '※ jpg, jpeg, gif, png 파일 첨부 가능',
          imageNoteSize: '※ 6MB가 초과되면 안됩니다.',
          urlLabel: '에셋 URL',
          urlPlaceholder: 'Ready Player Me GLB 등 URL을 입력하세요',
          urlHelp: '* 예: https://models.readyplayer.me/....glb',
          fbxAttachLabel: '에셋 FBX 파일 첨부',
          fbxNote: '※ fbx 파일 첨부 가능',
          fbxNoteSize: '※ 30MB가 초과되면 안됩니다.',
          metaFileAttachLabel: '메타버스 파일 첨부',
          metaFileNote: '※ 메타버스(.zepeto) 관련 파일 첨부 가능',
          metaFileNoteSize: '※ 30MB가 초과되면 안됩니다.'
        },
        buttons: { submit: '등록', cancel: '취소' },
        validation: {
          needInputTitle: '입력 확인 필요',
          warnTitle: '경고',
          needGoodsName: '굿즈명을 입력하세요.',
          needAssetName: '에셋명을 입력해주세요.',
          needPrice: '제공가격을 입력해주세요.',
          priceDecimal: '제공가격은 소수점으로 입력해주세요. 예: 0.1',
          needStart: '제공 시작 날짜를 선택해주세요.',
          needEnd: '제공 종료 날짜를 선택해주세요.',
          invalidPeriod: '제공기간이 올바르지 않습니다. 시작일이 종료일보다 앞서야 합니다.',
          needDesc: '에셋 설명을 입력해주세요.',
          need3DImage: '3D 에셋 이미지를 첨부해주세요.',
          needFbx: 'FBX 파일을 첨부해주세요.',
          needMetaverse: '메타버스를 선택해주세요.',
          needAssetType: '에셋 타입을 선택해주세요.',
          needImage: '에셋 이미지를 첨부해주세요.',
          needUrl: '에셋 URL을 입력해주세요.',
          needMetaFile: '메타버스 파일을 첨부해주세요.'
        },
        result: {
          processing: '에셋 증명 등록 중입니다... 잠시만 기다려주세요',
          failTitle: '등록 실패',
          failText: '에셋 등록 중 오류가 발생했습니다.'
        }
      },
    pagination: {
      prev: '이전',
      next: '다음'
    },
  },
};

const en = {
  page: {
    main: {
      hero: {
        head: 'AvataroAD is',
        lead: 'an open marketplace connecting K-POP agencies and creators',
        tail: 'for metaverse assets!',
      },
      cta: {
        goods: 'View Goods',
        assets: 'View Assets',
        market: 'Aromarket',
      },
      mzStats: 'Most metaverse users are Gen MZ; ZEPETO has 300M users and Roblox 150M.',
      section1Title1: 'AvataroAD targets metaverse users',
      section1Title2: 'providing a market to create and sell K-POP assets',
      section1Title3: 'for K-POP agencies and creators!',
      section1LeftTitle: 'Metaverse market size forecast',
      section1LeftSource: 'Source: PwC',
      section1RightTitle: 'Major metaverse platform users',
      section1RightUnit: 'Unit: people',
      section2Lead1: 'Global groups build worlds and perform on Roblox and ZEPETO.',
      section2Lead2: 'Agencies already sell assets through metaverse platforms.',
      section2Title1: 'With AvataroAD, K-POP agencies can',
      section2Title2: 'purchase great assets and leverage the metaverse to reach',
      section2Title3: 'fans worldwide.',
      section3Line1: 'Roblox creators: 270K; games published: 50M,',
      section3Line2: 'ZEPETO creators: 700K; items in studio: 2M,',
      section3Line3: 'cumulative sales: 25M.',
      section3Title1: 'Creators can use AvataroAD',
      section3Title2: 'to sell K-POP assets and earn significant revenue.',
      section4Title1: 'K-POP agencies can use the AvataroAD site',
      section4Title2: 'to upload goods and receive assets created by creators',
      section4Title3: 'as K-POP assets.',
      section5Title1: 'K-POP fans can trust and purchase assets created',
      section5Title2: 'via Aromarket on the AvataroAD site.',
      section5Title3: 'Resales are supported, enabling fan-to-fan trades.',
      enterpriseSteps: {
        step1: {
          title: 'K-POP Agency Signup & Login',
          line1: 'To request K-POP asset production from creators,',
          line2: 'you need to sign up for AvataroAD.',
        },
        step2: {
          title: 'Register K-POP Goods',
          line1: 'Register K-POP goods for which you will request asset production.',
          line2: 'Provide details required for asset creation.',
          line3: '(Product images, creation direction, target metaverse,',
          line4: 'target avatar parts, etc.)',
        },
        step3: {
          title: 'Compare Created K-POP Assets',
          line1: 'Compare various K-POP assets',
          line2: 'uploaded by creators.',
        },
        step4: {
          title: 'Select & Pay for K-POP Assets',
          line1: 'Found an asset you like? You can pay',
          line2: 'with Ethereum.',
        },
      },
      creatorSteps: {
        step1: {
          title: 'Creator Signup & Login',
          line1: 'Browse K-POP goods requested by agencies and',
          line2: 'to upload your K-POP assets, you need to sign up',
          line3: 'for AvataroAD.',
        },
        step2: {
          title: 'Browse Uploaded K-POP Goods',
          line1: 'View various K-POP goods requested by agencies.',
          line2: 'Pick what fits you and',
          line3: 'create K-POP assets.',
        },
        step3: {
          title: 'Create, Upload, and Provide Creative K-POP Assets',
          line1: 'It’s your stage now. Go beyond expectations of agencies.',
          line2: 'After creation, upload your K-POP asset to be',
          line3: 'provided to the agency.',
          line4: '',
        },
        step4: {
          title: 'Provision Status of K-POP Assets',
          line1: 'Check the status of assets provided to agencies.',
          line2: 'Payments (minus fees) are deposited into your',
          line3: 'wallet.',
        },
      },
      fanSteps: {
        step1: {
          title: 'Aromarket Signup & Login',
          line1: 'To purchase assets sold by agencies through',
          line2: 'Aromarket, you need to sign up for AvataroAD.',
        },
        step2: {
          title: 'Sell K-POP Assets',
          line1: 'Register assets to sell on Aromarket.',
          line2: 'Set sale conditions (edition count, price, period, etc.) and',
          line3: 'track who purchased each edition.',
        },
        step3: {
          title: 'Buy K-POP Assets',
          line1: 'Wonder how assets look on your avatar before buying?',
          line2: 'Aromarket supports a modern avatar system to preview',
          line3: 'assets before purchase.',
        },
        step4: {
          title: 'Resell K-POP Assets',
          line1: 'Assets bought on Aromarket can be resold.',
          line2: 'Fan-to-fan trades are supported with new',
          line3: 'sale conditions.',
        },
      },
    },
    market: {
      title: 'Aromarket',
      hero: {
        head: 'Listed on Aromarket',
        lead: 'Create your own assets using goods from K-POP agencies',
        tail: 'and trade them.',
      },
      search: {
        placeholder: 'Enter keywords',
        startDate: 'Start date',
        endDate: 'End date',
        searchBtn: 'Search',
        resetBtn: 'Reset',
      },
      list: {
        card: {
          creator: 'Creator',
          metaverse: 'Metaverse',
          stock: 'Stock / Total: {{stock}} / {{total}}',
          price: 'Price: {{price}} ETH',
        },
      },
    },
    header: {
      nav: {
        goods: 'Goods',
        assets: 'Assets',
        market: 'Aromarket',
        mypage: 'My Page',
        logout: 'Logout',
        dashboard: 'Dashboard',
        kpopWorld: 'K-POP World',
        etriWallet: 'ETRI Wallet',
        login: 'Login',
      },
      welcome: 'Welcome',
    },
    auth: {
      common: {
        emailLabel: 'Email',
        emailPlaceholder: 'name@example.com',
        nicknameLabel: 'Nickname',
        nicknamePlaceholder: 'Enter your nickname',
        bioProgress: 'Authenticating...',
        cancel: 'Cancel'
      },
      login: {
        title: 'Login',
        desc: 'Enter your email to proceed with bio authentication.',
        rememberId: 'Remember email',
        confirmBio: 'Bio Authentication',
        signup: 'Sign Up',
        successTitle: 'Login Successful',
        successText: 'You have logged in successfully.',
        failTitle: 'Login Failed',
        failText: 'An error occurred during login.',
        promptSignupTitle: 'Registration Required',
        promptSignupText: 'Would you like to sign up now?',
        validation: {
          emailRequired: 'Email is required.'
        }
      },
      register: {
        title: 'Sign Up',
        desc: 'Enter your email and nickname, then proceed with bio authentication.',
        confirm: 'Sign Up',
        successTitle: 'Registration Complete',
        successText: 'You have registered successfully.',
        failTitle: 'Registration Failed',
        validation: {
          bothRequired: 'Email and nickname are required.'
        }
      }
    },
    assets: {
      title: 'View Assets',
      hero: {
        head: 'Listed on AvataroAD',
        lead: 'Create your own assets using goods from K-POP agencies',
        leadBottom: 'your own assets',
        tail: 'and make them yours.',
      },
      search: {
        creatorPlaceholder: 'Creator name',
        metaverseLabel: 'Metaverse',
        metaverse: {
          roblox: 'Roblox',
          zepeto: 'ZEPETO',
          kpopworld: 'K-POP World',
          incheonworld: 'Incheon World'
        },
        startDate: 'Start date',
        endDate: 'End date',
        keywordPlaceholder: 'Enter keywords',
        searchBtn: 'Search',
        resetBtn: 'Reset'
      },
      ai: {
        title: 'AI Search',
        placeholder: 'e.g., find tops, find pants',
        searching: 'AI is searching for creative assets...',
        notFound: 'No related assets found. Please try another keyword.',
        searchBtn: 'Search',
        alt: 'AI logo'
      },
      list: {
        card: {
          creator: 'Creator',
          metaverse: 'Metaverse',
          price: 'Price',
          contractDone: 'Contracted',
          imageAlt: 'Asset image'
        }
      }
    },
    goods: {
      title: 'View Goods',
      hero: {
        head: 'Through AvataroAD creators',
        lead: 'Create various assets for K-POP goods',
        leadBottom: '',
        tail: 'and try it out.',
      },
      cta: {
        register: 'Register Goods',
      },
      search: {
        advertiserPlaceholder: 'Agency name',
        metaverseLabel: 'Metaverse',
        metaverse: { roblox: 'Roblox', zepeto: 'ZEPETO', kpopworld: 'K-POP World', incheonworld: 'Incheon World' },
        startDate: 'Start date',
        endDate: 'End date',
        keywordPlaceholder: 'Enter keywords',
        searchBtn: 'Search',
        resetBtn: 'Reset',
      },
      card: {
        advertiser: 'Agency',
        metaverse: 'Metaverse',
        period: 'Period',
        imageAlt: 'Goods image',
      },
    },
    goodsdetail: {
      period: 'Goods period',
      metaverse: 'Metaverse',
      noInfo: 'No info',
      assetOf: '{{target}} assets: {{type}}',
      buttons: {
        registerAsset: 'Register Asset',
        back: 'Back',
      },
      noticeTitle: '[Notice]',
      noticeLine: 'You must register assets within the goods period.',
      descTitle: 'Goods Description',
      imageAlt: 'Goods image',
    },
    leftmenu: {
      headingList: 'AvataroAD',
      headingMypage: 'My Page',
      goodsList: 'Goods',
      goodsManage: 'Manage Goods',
      assetsList: 'Assets',
      assetsManage: 'Manage Assets',
      assetsCreateManage: 'Created Assets',
      assetsHoldManage: 'Held Assets',
      marketList: 'Aromarket',
      marketRegister: 'Register Market',
      marketManage: 'Manage Market',
      marketSellManage: 'Selling Assets',
      marketPurchaseManage: 'Purchased Assets',
      myInfo: 'View My Info',
      winningStatus: 'Event Winning Status'
    },
    footer: {
      terms: 'Terms of Service',
      privacy: 'Privacy Policy',
      email: 'dataspace@authrium.com',
      copyright: 'Copyright by. Authrium Inc. All Rights Reserved.'
    },
    mypage: {
      common: {
        loading: 'Loading...',
        noData: 'No data.',
        no: 'No',
        image: 'Image',
        name: 'Name',
        metaverse: 'Metaverse',
        status: 'Status',
        detail: 'Detail',
        detailEdit: 'Detail/Edit',
        totalLabel: 'Total',
        countSuffix: '',
        search: 'Search',
        reset: 'Reset',
        keywordPlaceholder: 'Enter keyword',
        stateLabel: 'State',
        metaverseLabel: 'Metaverse',
        actions: {
          delete: 'Delete',
          edit: 'Edit',
          ok: 'OK'
        }
      },
      goods: {
        title: 'Manage Goods',
        register: 'Register Goods',
        table: {
          image: 'Goods Image',
          name: 'Goods Name'
        }
        , stateOptions: {
          S1: 'Before Posting',
          S2: 'Posting',
          S3: 'Paused',
          S4: 'Ended'
        }
      },
      assetsHold: {
        title: 'Manage Held Assets'
        , stateOptions: {
          P2: 'Pending Payment',
          P3: 'Holding',
          P4: 'Payment Failed'
        }
      },
      assetsCreate: {
        title: 'Manage Created Assets'
        , stateOptions: {
          S1: 'Before Providing',
          S2: 'Providing',
          S3: 'Paused',
          S4: 'Ended',
          S5: 'Completed'
        }
      },
      marketSell: {
        title: 'Manage Selling Assets'
        , stateOptions: {
          S1: 'Before Sale',
          S2: 'On Sale',
          S3: 'Paused',
          S4: 'Ended',
          S5: 'Completed'
        }
      },
      marketPurchase: {
        title: 'Manage Purchased Assets'
      }
    },
    mypageInfo: {
      title: 'My Info',
      labels: {
        wallet: 'Wallet Address',
        did: 'DID Info',
        email: 'Email',
        privateKey: 'Private Key',
        nickname: 'Nickname'
      },
      none: 'No info',
      actions: {
        copy: 'Copy',
        edit: 'Edit',
        cancel: 'Cancel',
        save: 'Save',
        withdraw: 'Withdraw'
      },
      toast: {
        needNicknameTitle: 'Nickname required',
        needNicknameText: 'Please enter a nickname.',
        editDoneTitle: 'Nickname updated',
        editDoneText: 'Nickname has been updated successfully.',
        duplicateTitle: 'Duplicate nickname',
        duplicateText: 'This nickname is already in use.',
        editFailTitle: 'Update failed',
        editFailText: 'An error occurred while updating the nickname.',
        copyDoneTitle: 'Copied',
        copyDoneText: 'Private key copied to clipboard.',
        copyFailTitle: 'Copy failed',
        copyFailText: 'An error occurred while copying.',
        withdrawDoneTitle: 'Withdrawal complete',
        withdrawDoneText: 'Your account has been withdrawn successfully.',
        withdrawFailTitle: 'Withdrawal failed',
        withdrawFailText: 'An error occurred during withdrawal.'
      }
    },
    mypageDetail: {
      titles: {
        createdAsset: 'Created Asset Info',
        purchasedAsset: 'Purchased Asset Info',
        heldAsset: 'Held Asset Info',
        sellingAsset: 'Selling Asset Info'
      },
      goodsDetail: {
        title: 'Goods Detail',
        labels: {
          status: 'Status',
          advertiser: 'Agency',
          attach: 'Attach Goods',
          name: 'Goods Name',
          desc: 'Goods Description',
          period: 'Goods Period',
          assetItems: 'Asset Items',
          robloxAssets: 'Roblox Assets:',
          zepetoAssets: 'ZEPETO Assets:',
          kpopAssets: 'K-POP World Assets:'
        },
        notes: {
          imageTypes: '※ jpg, jpeg, gif, png allowed',
          imageSize: '※ Must not exceed 6MB.'
        },
        usedAssets: 'Assets using goods',
        preview: 'Preview',
        metaversePreview: 'Metaverse Preview',
        certificate: 'Asset Certificate',
        viewCertificate: 'View Certificate',
        fileDownload: 'Download File',
        actions: {
          posting: 'Post Goods',
          editPosting: 'Edit Posting',
          processing: 'Processing...'
        }
      },
      assetCommon: {
        title: 'Asset Info',
        labels: {
          status: 'Status',
          name: 'Asset Name',
          metaverse: 'Metaverse',
          kind: 'Asset Type',
          price: 'Price',
          salePrice: 'Sale Price',
          issueCnt: 'Issue Count',
          stock: 'Stock',
          purchaseDate: 'Purchase Date',
          period: 'Period',
          salePeriod: 'Sale Period',
          desc: 'Description',
          url: 'Asset URL',
          attach: 'Attach Asset',
          preview: 'Preview',
          metaPreview: 'Metaverse Preview',
          certificate: 'Asset Certificate',
          viewCertificate: 'View Certificate'
        },
        actions: {
          providePost: 'Provide Post',
          provideEdit: 'Edit Provide',
          salePost: 'Start Selling',
          saleEdit: 'Edit Selling',
          processing: 'Processing...'
        },
        notes: {
          imgTypes: '※ jpg, jpeg, gif, png allowed',
          imgSize6: '※ Must not exceed 6MB.',
          issueCntHelp: '* Integers ≥ 1 only, up to {{max}}'
        },
        validation: {
          issueCntExceed: 'Issue count cannot exceed current stock ({{max}}).'
        },
        none: 'No info'
      },
      purchased: {
        buttons: {
          resellRegister: 'Register Resale',
          download: 'Download'
        }
      },
      held: {
        buttons: {
          marketRegister: 'Register on Aromarket',
          download: 'Download'
        }
      }
    },
    sections: {
      transaction: {
        title: 'Transaction Info',
        idLabel: 'Transaction ID',
        none: 'No info'
      },
      contract: {
        title: 'Contract Info',
        addressLabel: 'Contract Address',
        na: 'N/A'
      },
      provider: {
        sellerTitle: 'Seller Info',
        providerTitle: 'Provider Info',
        walletLabel: 'Wallet Address'
      },
      recipient: {
        buyerTitle: 'Buyer Info',
        recipientTitle: 'Recipient Info',
        walletLabel: 'Wallet Address'
      },
      owner: {
        title: 'Owner Info',
        tokenId: 'Token ID',
        ownerAddress: 'Owner Address',
        empty: 'No owner information available'
      }
    },
    certificate: {
      subtitle: 'CERTIFICATE OF DATA REGISTRATION',
      issuer: 'Issuer',
      issuanceDate: 'Issuance Date',
      expirationDate: 'Expiration Date',
      assetId: 'Asset ID',
      registrantNickName: 'Registrant',
      registrantEmail: 'Registrant Email',
      registrantWalletAddress: 'Registrant Wallet Address',
      assetType: 'Asset Type',
      imageURL: 'Asset Image URL',
      registrationDate: 'Registration Date',
      detailsTitle: 'Asset Details',
      parseError: 'Failed to parse data.',
      dataName: 'Data Name',
      provider: 'Provider',
      description: 'Description',
      productType: 'Product Type',
      language: 'Language',
      topic: 'Topic',
    },
      goodsregister: {
        title: 'Register Goods',
        entertainment: {
          title: 'Agency Info',
          nameLabel: 'Agency name',
          walletLabel: 'Wallet address'
        },
        metaverse: {
          title: 'Target Metaverse',
          help1: '* Select desired metaverse platforms',
          help2: '* Creators will create assets for the selected platforms',
          label: 'Metaverse'
        },
        goodsInfo: {
          title: 'Goods Info',
          help: '* Please provide a description suitable for your goods',
          nameLabel: 'Goods name',
          namePlaceholder: 'Enter goods name',
          categoryLabel: 'Category',
          robloxCategory: 'Roblox category',
          zepetoCategory: 'ZEPETO category',
          kpopworldCategory: 'K-POP World category',
          incheonworldCategory: 'Incheon World category',
          periodLabel: 'Goods period',
          startPlaceholder: 'Start date',
          endPlaceholder: 'End date',
          descLabel: 'Goods description',
          descPlaceholder: 'Enter description'
        },
        additional: {
          title: 'Additional Info',
          help1: '* Only verifiable information that does not violate ad review is allowed,',
          help2: 'and images that infringe copyright are strictly prohibited.',
          imageLabel: 'Goods image',
          previewAlt: 'Preview',
          noteTypes: '※ jpg, jpeg, gif, png are allowed',
          noteSize: '※ Must not exceed 7MB.'
        },
        buttons: {
          submit: 'Register',
          cancel: 'Cancel'
        },
        validation: {
          needInputTitle: 'Input required',
          needGoodsName: 'Please enter the goods name.',
          needGoodsDesc: 'Please enter the goods description.',
          needStartDate: 'Please select a start date.',
          needEndDate: 'Please select an end date.',
          invalidPeriod: 'Invalid period. Start date must be before end date.',
          needMetaverseSelect: 'Select at least one metaverse.',
          needImage: 'Please attach a goods image.',
          fileTooLargeTitle: 'File size exceeded',
          fileTooLargeText: 'The image must be 7MB or less.',
          needRobloxCategory: 'Please select a Roblox category.',
          needZepetoCategory: 'Please select a ZEPETO category.',
          needKpopworldCategory: 'Please select a K-POP World category.',
          needIncheonworldCategory: 'Please select an Incheon World category.'
        },
        result: {
          successTitle: 'Registered',
          successText: 'Goods have been registered successfully.',
          ok: 'OK',
          failTitle: 'Registration failed',
          failText: 'An error occurred during registration.'
        }
      },
      assetregister: {
        title: 'Register Asset',
        goodsInfo: {
          title: 'Goods Info',
          help: '* Information about the goods used to create this asset',
          nameLabel: 'Goods name',
          advertiserLabel: 'Agency',
          imageLabel: 'Goods image',
          imageAlt: 'Goods image'
        },
        creator: {
          title: 'Creator',
          nameLabel: 'Creator name',
          walletLabel: 'Wallet address'
        },
        typeSelector: {
          fbx: 'FBX 3D Asset',
          metaverse: 'Metaverse Asset'
        },
        fbxInfo: {
          title: 'FBX 3D Asset Info',
          help: '* Please provide a description suitable for your asset',
          assetNameLabel: 'Asset name',
          assetNamePlaceholder: 'Enter asset name',
          min2chars: '* Please enter at least 2 characters',
          priceLabel: 'Price',
          pricePlaceholder: 'e.g., 0.0001 (ETH)',
          priceHelp1: '* Only numbers ≥ 0 are allowed',
          priceHelp2: '* Unit: ETH (e.g., 0.0001)',
          periodLabel: 'Period',
          descLabel: 'Description',
          descPlaceholder: 'Enter a description for the asset',
          imageAttachLabel: 'Attach 3D asset image',
          imageNoteTypes: '※ jpg, jpeg, gif, png allowed',
          imageNoteSize: '※ Must not exceed 6MB.',
          fbxAttachLabel: 'Attach FBX file',
          fbxNote: '※ FBX file allowed',
          fbxNoteSize: '※ Must not exceed 30MB.'
        },
        metaInfo: {
          title: 'Metaverse Asset Info',
          help: '* Please provide a description suitable for your asset',
          assetNameLabel: 'Asset name',
          assetNamePlaceholder: 'Enter asset name',
          min2chars: '* Please enter at least 2 characters',
          metaverseLabel: 'Metaverse',
          metaverse: { roblox: 'Roblox', zepeto: 'ZEPETO', kpopworld: 'K-POP World', incheonworld: 'Incheon World' },
          robloxAssetLabel: 'Roblox assets',
          zepetoAssetLabel: 'ZEPETO assets',
          kpopworldAssetLabel: 'K-POP World assets',
          incheonworldAssetLabel: 'Incheon World assets',
          priceLabel: 'Price',
          pricePlaceholder: 'e.g., 0.0001 (ETH)',
          priceHelp1: '* Only numbers ≥ 0 are allowed',
          priceHelp2: '* Unit: ETH (e.g., 0.0001)',
          periodLabel: 'Period',
          descLabel: 'Description',
          descPlaceholder: 'Enter a description for the asset',
          imageAttachLabel: 'Attach asset image',
          imageNoteTypes: '※ jpg, jpeg, gif, png allowed',
          imageNoteSize: '※ Must not exceed 6MB.',
          urlLabel: 'Asset URL',
          urlPlaceholder: 'Enter URL such as Ready Player Me GLB',
          urlHelp: '* e.g., https://models.readyplayer.me/....glb',
          fbxAttachLabel: 'Attach asset FBX file',
          fbxNote: '※ fbx file allowed',
          fbxNoteSize: '※ Must not exceed 30MB.',
          metaFileAttachLabel: 'Attach metaverse file',
          metaFileNote: '※ Metaverse (.zepeto) file allowed',
          metaFileNoteSize: '※ Must not exceed 30MB.'
        },
        buttons: { submit: 'Register', cancel: 'Cancel' },
        validation: {
          needInputTitle: 'Input required',
          warnTitle: 'Warning',
          needGoodsName: 'Please enter the goods name.',
          needAssetName: 'Please enter the asset name.',
          needPrice: 'Please enter the price.',
          priceDecimal: 'Please enter a decimal price (e.g., 0.1).',
          needStart: 'Please select a start date.',
          needEnd: 'Please select an end date.',
          invalidPeriod: 'Invalid period. Start date must be before end date.',
          needDesc: 'Please enter a description.',
          need3DImage: 'Please attach a 3D asset image.',
          needFbx: 'Please attach an FBX file.',
          needMetaverse: 'Please select a metaverse.',
          needAssetType: 'Please select an asset type.',
          needImage: 'Please attach an asset image.',
          needUrl: 'Please enter the asset URL.',
          needMetaFile: 'Please attach a metaverse file.'
        },
        result: {
          processing: 'Registering asset proof... Please wait',
          failTitle: 'Registration failed',
          failText: 'An error occurred while registering the asset.'
        }
      },
    assetsdetail: {
      profileAlt: 'Profile image',
      creator: 'Creator',
      seller: 'Seller',
      salePeriod: 'Sale period',
      metaverse: 'Metaverse',
      none: 'None',
      price: 'Price',
      descTitle: 'Description',
      descEmpty: 'No description provided.',
      viewGoods: 'View Goods',
      certificate: 'Asset Certificate',
      assetName: 'Asset name',
      more: 'More',
      close: 'Close',
      assetImageAlt: 'Asset image',
      contract: {
        action: 'Contract',
        processing: 'Processing contract...'
      }
    },
    marketdetail: {
      profileAlt: 'Profile image',
      seller: 'Seller',
      salePeriod: 'Sale period',
      metaverse: 'Metaverse',
      none: 'None',
      price: 'Price',
      stock: 'Stock',
      descTitle: 'Description',
      viewGoods: 'View Goods',
      purchase: {
        confirmTitle: 'Proceed to purchase?',
        currentStock: 'In stock: {{stock}}',
        qtyLabel: 'Quantity',
        qtyPlaceholder: 'Enter quantity',
        ok: 'OK',
        validateQty: 'Enter a valid quantity (1 ~ {{max}})',
        processing: 'Processing purchase... Please wait',
        failTitle: 'Purchase failed',
        failText: 'An error occurred during purchase.',
        button: 'Purchase',
        buttonProcessing: 'Processing...'
      }
    },
    marketSellRegister: {
      title: 'Register Market Sale',
      assetInfo: {
        title: 'Market Sale Asset Info',
        priceUnit: '* Unit: ETH (e.g., 0.0001)'
      },
      labels: {
        marketAssetName: 'Market Asset Name',
        marketAssetDesc: 'Market Asset Description'
      },
      validation: {
        priceDigitsOnly: 'Only digits and a decimal point are allowed.',
        priceDotOnce: 'Only one decimal point is allowed.',
        digitsOnly: 'Digits only.'
      },
      buttons: { back: 'Back', submit: 'Submit' },
      toast: {
        posting: 'Registering the item on the market... Please wait',
        failTitle: 'Registration failed',
        failText: 'An error occurred during market registration.',
        ok: 'OK'
      }
    },
    marketResellRegister: {
      title: 'Register Resale',
      stockSummary: 'In stock: {{stock}}',
      assetInfo: {
        title: 'Resale Asset Info',
        priceUnit: '* Unit: ETH (e.g., 0.0001)'
      },
      labels: {
        marketAssetName: 'Market Asset Name',
        marketAssetDesc: 'Market Asset Description'
      },
      validation: {
        priceDigitsOnly: 'Only digits and a decimal point are allowed.',
        priceDotOnce: 'Only one decimal point is allowed.',
        digitsOnly: 'Digits only.'
      },
      buttons: { back: 'Back', submit: 'Submit' },
      toast: {
        posting: 'Registering for resale... Please wait',
        failTitle: 'Registration failed',
        failText: 'An error occurred during resale registration.',
        ok: 'OK'
      }
    },
    pagination: {
      prev: 'Previous',
      next: 'Next'
    },
  },
};

const dictionaries = { ko, en };

function readInitialLang() {
  const fromCookie = (() => {
    try { return getLangCookie && getLangCookie(); } catch { return null; }
  })();
  if (fromCookie === 'ko' || fromCookie === 'en') return fromCookie;
  try {
    const fromLs = typeof localStorage !== 'undefined' && localStorage.getItem('lang');
    if (fromLs === 'ko' || fromLs === 'en') return fromLs;
  } catch {}
  return 'ko';
}

let currentLang = readInitialLang();
if (!dictionaries[currentLang]) {
  currentLang = 'ko';
  try { if (typeof localStorage !== 'undefined') localStorage.setItem('lang', currentLang); } catch {}
  try { setLangCookie && setLangCookie(currentLang); } catch {}
}

export function setLang(lang) {
  currentLang = dictionaries[lang] ? lang : 'ko';
  try {
    localStorage.setItem('lang', currentLang);
  } catch {}
  try { setLangCookie && setLangCookie(currentLang); } catch {}
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('langchange'));
  }
}

export function getLang() {
  return currentLang;
}

export function onLangChange(callback) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('langchange', callback);
  return () => window.removeEventListener('langchange', callback);
}

export function t(key, vars = {}) {
  const dict = dictionaries[currentLang] || {};
  const value = key
    .split('.')
    .reduce((acc, k) => (acc && acc[k] !== undefined ? acc[k] : undefined), dict);
  const str = value !== undefined ? String(value) : String(key);
  return Object.entries(vars).reduce((s, [k, v]) => s.replaceAll(`{{${k}}}`, String(v)), str);
}

export const translations = { ko, en };

// Sync language with shared cookie when tab regains focus/visibility
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  const syncFromCookie = () => {
    try {
      const cookieLang = getLangCookie && getLangCookie();
      if ((cookieLang === 'ko' || cookieLang === 'en') && cookieLang !== currentLang) {
        currentLang = cookieLang;
        try { localStorage.setItem('lang', currentLang); } catch {}
        window.dispatchEvent(new Event('langchange'));
      }
    } catch {}
  };
  window.addEventListener('focus', syncFromCookie);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') syncFromCookie();
  });
}



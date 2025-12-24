import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { t, getLang, onLangChange } from '../../translation';

export default function LeftMenu(props) {
  const pageName = props.pageName;
  const location = useLocation();
  const [isAssetSubMenuOpen, setAssetSubMenuOpen] = useState(false);
  const [isMarketSubMenuOpen, setMarketSubMenuOpen] = useState(false);
  const [lang, setLangState] = useState(getLang());

  useEffect(() => {
    const off = onLangChange(() => setLangState(getLang()));
    return off;
  }, []);

  const toggleAssetSubMenu = () => {
    setAssetSubMenuOpen(!isAssetSubMenuOpen);
  };
  const toggleMarketSubMenu = () => {
    setMarketSubMenuOpen(!isMarketSubMenuOpen);
  };
  return (
    <section className="w-48">
      <h2 className="text-2xl font-medium mb-6">
        {pageName === 'list' ? t('page.leftmenu.headingList') : t('page.leftmenu.headingMypage')}
      </h2>
      <nav>
        <ul className="flex flex-col space-y-4">
          

          {pageName === 'list' ? (
            <>
              <li>
                <NavLink
                  to="/market"
                  className={`text-gray-700 hover:text-blue-600 ${
                    location.pathname === '/market'
                      ? 'text-red-600 font-medium'
                      : ''
                  }`}
                >
                  {t('page.leftmenu.marketList')}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/market/register"
                  className={`text-gray-700 hover:text-blue-600 ${
                    location.pathname === '/market/register'
                      ? 'text-red-600 font-medium'
                      : ''
                  }`}
                >
                  {t('page.leftmenu.marketRegister')}
                </NavLink>
              </li>
            </>
          ) : null}
          {pageName === 'list' ? null : (
            <li>
              <button
                onClick={toggleMarketSubMenu}
                className="text-gray-700 hover:text-blue-600 focus:outline-none"
              >
                {t('page.leftmenu.marketManage')}
              </button>

              {isMarketSubMenuOpen && (
                <ul className="ml-4 mt-2 space-y-2">
                  <li>
                    <NavLink
                      to="/mypage/market/sell"
                      className={`text-gray-500 text-sm hover:text-blue-600 ${
                        location.pathname === '/mypage/market/sell'
                          ? 'text-red-600 font-medium'
                          : ''
                      }`}
                    >
                      {t('page.leftmenu.marketSellManage')}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/mypage/market/purchase"
                      className={`text-gray-500 text-sm hover:text-blue-600 ${
                        location.pathname === '/mypage/market/purchase'
                          ? 'text-red-600 font-medium'
                          : ''
                      }`}
                    >
                      {t('page.leftmenu.marketPurchaseManage')}
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>
          )}
          <li>
            <NavLink
              to={pageName === 'list' ? '/assets' : '/mypage/info'}
              className={`text-gray-700 hover:text-blue-600 ${
                location.pathname === '/mypage/info'
                  ? 'text-red-600 font-medium'
                  : ''
              }`}
            >
              {pageName === 'list' ? '' : t('page.leftmenu.myInfo')}
            </NavLink>
          </li>
        </ul>
      </nav>
    </section>
  );
}



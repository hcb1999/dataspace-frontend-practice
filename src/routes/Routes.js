import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from '../components/common/Header.jsx';
import Footer from '../components/common/Footer.jsx';
import Spinner from '../components/common/Spinner.jsx';

const MarketPage = lazy(() => import('../pages/MarketPage.js'));
const MarketDetailPage = lazy(() => import('../pages/MarketDetailPage.js'));

const MyMarketpurchase = lazy(() => import('../pages/MyMarketpurchase.js'));
const MarketSellAssetsPage = lazy(() => import('../pages/MarketSellAssetsPage.js'));
const MarketRegisterPage = lazy(() => import('../pages/MarketRegisterPage.js'));
const MyInfoPage = lazy(() => import('../pages/MyInfoPage.js'));
const MarketSellDetailPage = lazy(() => import('../pages/MarketSellDetailPage.js'));
const MarketPurchaseDetailPage = lazy(() => import('../pages/MarketPurchaseDetailPage.js'));

const AppRoutes = () => {
  return (
    <Router>
      <Header />
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/" element={<MarketPage />} />
          <Route path="/market" element={<MarketPage />} />
          <Route path="/market/register" element={<MarketRegisterPage />} />
          <Route path="/market/detail/:marketNo" element={<MarketDetailPage />} />
          <Route path="/mypage/market/purchase" element={<MyMarketpurchase />} />
          <Route path="/mypage/market/sell" element={<MarketSellAssetsPage />} />
          <Route path="/mypage/market/selldetail/:marketNo" element={<MarketSellDetailPage />} />
          <Route path="/mypage/market/purchasedetail/:purchaseNo" element={<MarketPurchaseDetailPage />} />
          <Route path="/mypage/info" element={<MyInfoPage />} />
        </Routes>
      </Suspense>
      <Footer />
    </Router>
  );
};

export default AppRoutes;



import React from 'react';
import OwnerAddressSection from '../marketdetail/OwnerAddressSection';
import TransactionSection from './TransactionSection';
import ContractSection from './ContractSection';

/**
 * 공용 체인 관련 섹션 묶음 컴포넌트
 * 모든 상세 화면(마켓 상세, 마이페이지 구매/판매 상세)에서 재사용합니다.
 *
 * props:
 * - tokenInfo: 소유주 정보 배열 또는 undefined
 * - transactionId: 트랜잭션 ID 문자열 또는 undefined
 * - transactionLink: 트랜잭션 조회 링크 또는 undefined
 * - contractAddress: 컨트랙트 주소 또는 undefined
 * - contractLink: 컨트랙트 조회 링크 또는 undefined
 */
const AssetChainSections = ({
  tokenInfo,
  transactionId,
  transactionLink,
  contractAddress,
  contractLink,
}) => {
  return (
    <div className="mt-10 space-y-6">
      <OwnerAddressSection tokenInfo={tokenInfo} />
      <TransactionSection transactionId={transactionId} transactionLink={transactionLink} />
      <ContractSection contractAddress={contractAddress} contractLink={contractLink} />
    </div>
  );
};

export default AssetChainSections;



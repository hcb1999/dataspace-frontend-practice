/**
 * 블록체인 탐색기 URL 생성 유틸리티
 * 
 * 프론트엔드에서 ledger explorer URL을 관리합니다.
 * config.js의 ledgerExplorerUrl 설정값을 사용합니다.
 */

import environmentConfig from '../config/config';

// 기본 URL (config가 없을 경우 폴백)
const DEFAULT_LEDGER_EXPLORER_URL = 'http://20.39.197.109:6100';
const DEFAULT_DID_MANAGEMENT_URL = 'http://20.39.197.109:6100';

/**
 * Ledger Explorer 기본 URL 반환
 */
export const getLedgerExplorerBaseUrl = () => {
  return environmentConfig?.ledgerExplorerUrl || DEFAULT_LEDGER_EXPLORER_URL;
};

/**
 * DID 관리 기본 URL 반환
 */
export const getDidManagementBaseUrl = () => {
  return environmentConfig?.didManagementUrl || DEFAULT_DID_MANAGEMENT_URL;
};

/**
 * 계정(Account) 탐색기 URL 생성
 * @param {string} address - 지갑 주소
 * @returns {string|undefined} - 탐색기 URL
 */
export const getAccountUrl = (address) => {
  if (!address) return undefined;
  const baseUrl = getLedgerExplorerBaseUrl();
  return `${baseUrl}/accounts/${address}`;
};

/**
 * 트랜잭션 탐색기 URL 생성
 * @param {string} txId - 트랜잭션 ID
 * @returns {string|undefined} - 탐색기 URL
 */
export const getTransactionUrl = (txId) => {
  if (!txId) return undefined;
  const baseUrl = getLedgerExplorerBaseUrl();
  return `${baseUrl}/transactions/${txId}`;
};

/**
 * 컨트랙트 탐색기 URL 생성
 * @param {string} contractAddress - 컨트랙트 주소
 * @returns {string|undefined} - 탐색기 URL
 */
export const getContractUrl = (contractAddress) => {
  if (!contractAddress) return undefined;
  const baseUrl = getLedgerExplorerBaseUrl();
  return `${baseUrl}/accounts/${contractAddress}`;
};

/**
 * SMC 지갑 연결 페이지 URL
 * @returns {string} - SMC 지갑 페이지 URL
 */
export const getSMCWalletUrl = () => {
  const baseUrl = getLedgerExplorerBaseUrl();
  return `${baseUrl}/accounts`;
};

/**
 * DID 조직 상세 페이지 URL 생성
 * @param {string} orgId - 조직 ID (optional)
 * @returns {string} - DID 조직 상세 페이지 URL
 */
export const getDIDOrganizationUrl = (orgId) => {
  const baseUrl = getDidManagementBaseUrl();
  if (orgId) {
    return `${baseUrl}/organization/detail/${orgId}`;
  }
  return `${baseUrl}/organization/detail`;
};

/**
 * DID 지갑 URL 생성
 * @param {string} didWalletInfo - DID 지갑 정보
 * @returns {string|undefined} - DID 지갑 URL
 */
export const getDIDWalletUrl = (didWalletInfo) => {
  if (!didWalletInfo) return undefined;
  const baseUrl = getDidManagementBaseUrl();
  return `${baseUrl}/wallet/${didWalletInfo}`;
};

export default {
  getLedgerExplorerBaseUrl,
  getDidManagementBaseUrl,
  getAccountUrl,
  getTransactionUrl,
  getContractUrl,
  getSMCWalletUrl,
  getDIDOrganizationUrl,
  getDIDWalletUrl,
};

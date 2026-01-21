const config = {
  development: {
    apiUrl:
      process.env.REACT_APP_DEV_API_URL || "https://dataspace.authrium.com/api",
    frontUrl: process.env.REACT_APP_DEV_FRONT_URL,
    // 블록체인 탐색기 URL (SMC Explorer)
    ledgerExplorerUrl: process.env.REACT_APP_LEDGER_EXPLORER_URL || 'http://20.39.197.109:6100',
    // DID 관리 URL
    didManagementUrl: process.env.REACT_APP_DID_MANAGEMENT_URL || 'http://20.39.197.109:6100',
  },
  test: {
    apiUrl:
      process.env.REACT_APP_TEST_API_URL ||
      "https://dataspace.authrium.com/api",
    ledgerExplorerUrl: process.env.REACT_APP_LEDGER_EXPLORER_URL || 'http://20.39.197.109:6100',
    didManagementUrl: process.env.REACT_APP_DID_MANAGEMENT_URL || 'http://20.39.197.109:6100',
  },
};

const currentEnv = process.env.REACT_APP_ENV;
const environmentConfig = config[currentEnv];

console.log("Current Environment Config:", currentEnv, environmentConfig);
export default environmentConfig;

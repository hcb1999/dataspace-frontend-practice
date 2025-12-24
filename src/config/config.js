const config = {
  development: {
    apiUrl: process.env.REACT_APP_DEV_API_URL || 'https://dataspace.authrium.com/api',
    frontUrl: process.env.REACT_APP_DEV_FRONT_URL,
  },
  test: {
    apiUrl: process.env.REACT_APP_TEST_API_URL || 'https://dataspace.authrium.com/api',
  },
};

const currentEnv = process.env.REACT_APP_ENV;
const environmentConfig = config[currentEnv];

console.log('Current Environment Config:', currentEnv, environmentConfig);
export default environmentConfig;



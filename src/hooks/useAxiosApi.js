import axios from 'axios';
import Swal from 'sweetalert2';
import environmentConfig from '../config/config';

const axiosInstance = axios.create({
  baseURL: environmentConfig.apiUrl,
  timeout: 90000, // 90 seconds - increased for registration process that takes ~30 seconds
  headers: { 'Content-Type': 'application/json' },
});

const useAxiosApi = (endpoint, method = 'GET', options = {}) => {
  const execute = async (params = {}, isMultipart = false) => {
    try {
      const token = localStorage.getItem('accessToken');
      const requestConfig = {
        url: endpoint,
        method,
        headers: {
          'Content-Type': isMultipart ? 'multipart/form-data' : 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        ...options,
      };

      // GET 요청은 params로, POST/PUT 등은 data로 전달
      if (method.toUpperCase() === 'GET') {
        requestConfig.params = params;
      } else {
        requestConfig.data = params;
      }

      const response = await axiosInstance(requestConfig);
      return response.data;
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 401:
            Swal.fire({
              icon: 'warning',
              title: '인증 오류',
              text: '로그인이 필요합니다.',
            });
            break;
          case 403:
            Swal.fire({
              icon: 'error',
              title: '권한 오류',
              text: '이 작업을 수행할 권한이 없습니다.',
            });
            break;
          case 500:
            Swal.fire({
              icon: 'error',
              title: '서버 오류',
              text: '서버에서 문제가 발생했습니다. 나중에 다시 시도하세요.',
            });
            break;
          default:
            Swal.fire({
              icon: 'error',
              title: '오류 발생',
              text: '알 수 없는 오류가 발생했습니다.',
            });
        }
      } else if (error.request) {
        Swal.fire({
          icon: 'error',
          title: '네트워크 오류',
          text: '네트워크 오류가 발생했습니다. 인터넷 연결을 확인하세요.',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: '요청 오류',
          text: '요청을 설정하는 중 오류가 발생했습니다.',
        });
      }
      throw error;
    }
  };
  return { execute };
};

export default useAxiosApi;



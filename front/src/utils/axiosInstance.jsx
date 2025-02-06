import axios from "axios";

const axiosJsonInstance = axios.create({
  baseURL: "http://i12a703.p.ssafy.io:8081/api/v1/docshund/", // API 기본 URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Multipart form data axios instance
const axiosMultipartInstance = axios.create({
  baseURL: "http://i12a703.p.ssafy.io:8081/api/v1/docshund/", // API 기본 URL
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// 모든 요청 전에 실행되는 인터셉터
axiosJsonInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // 로컬스토리지에서 토큰 읽기
    if (token) {
      // 토큰이 있으면 Authorization 헤더에 추가
      config.headers.Authorization = `Bearer ${token}`;
    }
    // 토큰이 없으면 헤더에 추가하지 않고 그대로 요청 진행 (비회원도 요청 가능)
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 모든 요청 전에 실행되는 인터셉터 (multipart)
axiosMultipartInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // 로컬스토리지에서 토큰 읽기
    if (token) {
      // 토큰이 있으면 Authorization 헤더에 추가
      config.headers.Authorization = `Bearer ${token}`;
    }
    // 토큰이 없으면 헤더에 추가하지 않고 그대로 요청 진행 (비회원도 요청 가능)
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { axiosJsonInstance, axiosMultipartInstance };

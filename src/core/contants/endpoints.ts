export const baseURL: string = "http://localhost:8080/api";

export const endpoints = {
  auth: {
    admin: {
      signup: `${baseURL}/admin/admin-user`,
      signin: `${baseURL}/auth/admin/signin`,
    },
    user: {
      signup: `${baseURL}/auth/users/signup`,
      signin: `${baseURL}/auth/users/signin`,
    },
    doctor: {
      signup: `${baseURL}/auth/users/doc/signup`,
      signin: `${baseURL}/auth/users/signin`,
    },
  },
};

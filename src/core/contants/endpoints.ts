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
    },
  },
  user: {
    applications: {
      createUserApplication: `${baseURL}/user/user-application/application`,
      updateUserApplication: `${baseURL}/user/user-application/update/application`,
      getUserApplications: `${baseURL}/user/user-application/applications`,
    },
    reports: {
      getAllReports: `${baseURL}/user/user-records/records`,
      getReportById: `${baseURL}/user/user-records/record/:id`,
    },
    generalapi: {
      getAllUsers: `${baseURL}/user/general/get-all`,
      getAllOnlineUsers: `${baseURL}/user/general/get-online`,
      getAllOfflineUsers: `${baseURL}/user/general/get-offline`,
    },
  },
  doctor: {
    applications: {
      createDoctorApplication: `${baseURL}/admin/admin-application/application`,
      updateDoctorApplication: `${baseURL}/doc/application-controller/update/application`,
      deleteDoctorApplication: `${baseURL}/doc/application-controller/application/:id`,
    },
    reports: {
      getAllRecords: `${baseURL}/doc/report-controller/records`,
      createRecord: `${baseURL}/doc/report-controller/record`,
      updateRecord: `${baseURL}/doc/report-controller/update-record`,
      deleteRecord: `${baseURL}/doc/report-controller/record/:id`,
    },
    generalapi: {
      // getAllDoctors: `${baseURL}/doc/general/get-all`,
      // getAllOnlineDoctors: `${baseURL}/doc/general/get-online`,
      // getAllOfflineDoctors: `${baseURL}/doc/general/get-offline`,
    },
  },
  admin: {
    applications: {
      getAllApplications: `${baseURL}/doc/application-controller/applications?status=CREATED`,
    },
  },
  messages: {},
};

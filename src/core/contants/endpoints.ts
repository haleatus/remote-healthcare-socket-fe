export const baseURL: string =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export const endpoints = {
  auth: {
    admin: {
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
    chat: {
      getChatMessages: `${baseURL}/user/user-application/applications/message/:appointmentId`,
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
    getMeUser: `${baseURL}/auth/users/me`,
    medication: {
      getMyMedication: `${baseURL}/user/medication/get-self-medication/:userId`,
    },
  },
  doctor: {
    applications: {
      createDoctorApplication: `${baseURL}/doc/application-controller/application`,
      getPatientApplications: `${baseURL}/doc/application-controller/applications?status=CREATED`,
      updateApplication: `${baseURL}/doc/application-controller/update/application`,
      deleteApplication: `${baseURL}/doc/application-controller/application/:id`,
      getApplicationsByDoctor: `${baseURL}/doc/application-controller/applications/doc`,
      finishAppointment: `${baseURL}/doc/application-controller/finish-appoinement/:appointmentId`,
      ownApprovedApplications: `${baseURL}/doc/application-controller/own-approved`,
    },
    chat: {
      getChatMessages: `${baseURL}/doc/application-controller/applications/message/:appointmentId`,
    },
    reports: {
      getAllRecords: `${baseURL}/doc/report-controller/records`,
      createRecord: `${baseURL}/doc/report-controller/record`,
      updateRecord: `${baseURL}/doc/report-controller/update-record`,
      deleteRecord: `${baseURL}/doc/report-controller/record/:id`,
    },
    generalapi: {
      getAllDoctors: `${baseURL}/doc/general/get-all`,
      // getAllOnlineDoctors: `${baseURL}/doc/general/get-online`,
      // getAllOfflineDoctors: `${baseURL}/doc/general/get-offline`,
    },
    medication: {
      addMedication: `${baseURL}/doc/medicaiton`,
      updateMedication: `${baseURL}/doc/medicaiton`,
      getMedicationAssignedByMe: `${baseURL}/doc/medicaiton/get-doc-medication`,
      getAllMedicationCreated: `${baseURL}/doc/medicaiton/get-all-medication`,
      getMedicationAssignedToPatient: `${baseURL}/doc/medicaiton/get-user-medication/:userId`,
    },
  },
  admin: {
    applications: {
      getAllApplications: `${baseURL}/doc/application-controller/applications?status=CREATED`,
    },
    createAdmin: `${baseURL}/admin/admin-user`,
    getMeAdmin: `${baseURL}/auth/admin/me`,
    getAllDoctors: `${baseURL}/admin/admin-user/all-doctors`,
  },
  messages: {},
};

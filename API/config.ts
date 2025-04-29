export const apiEndpoints = {
  home: `${process.env.EXPO_PUBLIC_SERVER_IP}`,
  register: `${process.env.EXPO_PUBLIC_SERVER_IP}/auth/register`,
  login: `${process.env.EXPO_PUBLIC_SERVER_IP}/auth/login`,
  training: `${process.env.EXPO_PUBLIC_SERVER_IP}/trainings`,
  createTrainingType: `${process.env.EXPO_PUBLIC_SERVER_IP}/trainings/create-type`,
};

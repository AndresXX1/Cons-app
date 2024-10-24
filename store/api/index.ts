export const baseUrl = 'https://back5.maylandlabs.com';

// export const baseUrl = 'http://localhost:8001';
//export const baseUrl = "http://10.0.2.2:8001";

export const apiUrls = {
  // user Auth
  logIn: () => `${baseUrl}/api/auth/log-in`,
  signUp: () => `${baseUrl}/api/auth/sign-up`,
  verifyCode: () => `${baseUrl}/api/auth/verify-email`,
  googleSignIn: () => `${baseUrl}/api/auth/log-in-with-google`,
  resendVerifyCode: () => `${baseUrl}/api/auth/resend-code`,
  refreshToken: () => `${baseUrl}/api/auth/refresh-token`,
  logOut: () => `${baseUrl}/api/auth/log-out`,
  forgetPassword: () => `${baseUrl}/api/auth/forget-password`,
  verifyEmail: () => `${baseUrl}/api/auth/verify-email`,
  getUser: () => `/api/user`,
  updateFirstData: () => `${baseUrl}/api/user/first-data`,
  updateSecondData: () => `${baseUrl}/api/user/second-data`,
  //services
  avatar: (url: string) => `${baseUrl}/avatar/${url}`,
  imgNotice: (url: string) => `${baseUrl}/notice/${url}`,
  //notices
  getNotices: () => `${baseUrl}/api/notice`,
  getProducts: () => `${baseUrl}/api/product`,
  //cupons
  createCupon: () => `${baseUrl}/api/cupon/create`,
  getCupons: () => `${baseUrl}/api/cupon`,
  //banners
  getBannersHome: () => `${baseUrl}/api/banner/home`,
  getBannersCuponizate: () => `${baseUrl}/api/banner/cuponizate`,
  getBannersArgencompras: () => `${baseUrl}/api/banner/argencompras`,
  imgBanner: (url: string) => `${baseUrl}/api/banner/${url}`,
  //timer
  registerViewTime: () => `${baseUrl}/api/timer`,
  //sucursales
};

export const tokenAccess = {
  tokenName: '1dsaaaassfsssrf2faaaaaa',
  refreshTokenName: '1s5s5d4sss1dsd4ssds',
  onboardingName: 'onboardingName3ssss',
};

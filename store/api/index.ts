export const baseUrl = 'https://back5.maylandlabs.com';

// export const baseUrl = 'http://localhost:8001';
// export const baseUrl = "http://10.0.2.2:8001";

export const apiUrls = {
  // user Auth
  logIn: () => `${baseUrl}/api/auth/log-in`,
  signUp: () => `${baseUrl}/api/auth/sign-up`,
  verifyCode: () => `${baseUrl}/api/auth/verify-email`,
  googleSignIn: () => `${baseUrl}/api/auth/log-in-with-google`,
  resendVerifyCode: () => `${baseUrl}/api/auth/resend-code`,
  uploadImgAvatar: () => `${baseUrl}/api/user/avatar`,
  refreshToken: () => `${baseUrl}/api/auth/refresh-token`,
  logOut: () => `${baseUrl}/api/auth/log-out`,
  forgetPassword: () => `${baseUrl}/api/auth/forget-password`,
  forgetPasswordCode: () => `${baseUrl}/api/auth/forget-password-code`,
  applyForLoan: (branchName: string) => `${baseUrl}/api/user/getOffer/12/${branchName}`,
  verifyEmail: () => `${baseUrl}/api/auth/verify-email`,
  setPassword: () => `${baseUrl}/api/auth/forget-password-new-password`,
  getUser: () => `/api/user`,
  updateFirstData: () => `${baseUrl}/api/user/first-data`,
  updateSecondData: () => `${baseUrl}/api/user/second-data`,
  updateDataId: (id: string)=> `${baseUrl}/api/user/${id}`,
  //services
  avatar: (url: string) => `${baseUrl}/avatar/${url}`,
  imgNotice: (url: string) => `${baseUrl}/notice/${url}`,
  //notices
  getNotices: () => `${baseUrl}/api/notice`,
  // products
  getProducts: () => `${baseUrl}/api/product`,
  // categories
  getCategories: () => `${baseUrl}/api/category`,
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

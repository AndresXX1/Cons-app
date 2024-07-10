export const baseUrl = "https://backend.padelink.com.ar";

// export const baseUrl = "http://localhost:6001";

export const apiUrls = {
  // user Auth
  logIn: () => `${baseUrl}/api/auth/log-in`,
  refreshToken: () => `${baseUrl}/api/auth/refresh-token`,
  logOut: () => `${baseUrl}/api/auth/log-out`,
  getUser: () => `/api/user`,
  //services
  avatar: (url: string) => `${baseUrl}/avatar/${url}`,
};

export const tokenAccess = {
  tokenName: "1dsaaaassfsssrf2faaaaaa",
  refreshTokenName: "1s5s5d4sss1dsd4ssds",
  onboardingName: "onboardingName3sss",
};

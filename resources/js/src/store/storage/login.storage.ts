export const loginStorage = {
  getAccessToken: () =>
    localStorage.getItem('access_token'),

  getRefreshToken: () =>
    localStorage.getItem('refresh_token'),

  setTokens: (
    accessToken: string,
    refreshToken: string
  ) => {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
  },

  clear: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  },
};
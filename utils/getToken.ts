export const getAuthToken = () => {
  const authData = localStorage.getItem('magnet_brains_auth_token');

  if (authData) {
    return JSON.parse(authData).token;
  }
  return null;
};

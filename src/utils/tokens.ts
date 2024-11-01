export const Token = (access_token: string) => {
   localStorage.setItem("AccessToken", access_token);
};
export const getAccessToken = () => {
   return localStorage.getItem("access_token");
};
export const removeAccessToken = () => {
   localStorage.removeItem("access_token");
   localStorage.removeItem("userId");
};
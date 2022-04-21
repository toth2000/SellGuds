import axios from "axios";

import {
  apiProductionUrl as apiUrl,
  refreshTokenUrl,
} from "../../constants/serverApiUrl";

export const API = axios.create({ baseURL: apiUrl });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("user")) {
    req.headers.token = `Bearer ${
      JSON.parse(localStorage.getItem("user")).accessToken
    }`;
  }

  return req;
});

API.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (
      err?.response?.data?.message === "Refresh Token Expired" ||
      err?.response?.data?.message === "Login Required"
    ) {
      localStorage.clear();
      window.location.href = "/auth?login=true";
      return;
    } else if (err?.response?.data?.info) {
      alert(err?.response?.data?.message);

      return;
    } else if (err?.response?.data?.message === "Access Token Expired");
    {
      if (localStorage.getItem("user")) {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = user.refreshToken;

        try {
          const { data } = await API.post(refreshTokenUrl, {
            refreshToken: token,
          });

          localStorage.setItem(
            "user",
            JSON.stringify({ ...user, accessToken: data.accessToken })
          );

          return API.request(err.config);
        } catch (error) {
          console.log("Error Refreshing Token\n", error, error.response);
        }
      }
    }
  }
);

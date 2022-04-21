import axios from "axios";

export const getCurrentLocation = (lat, lon) => {
  return axios.get(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
  );
};

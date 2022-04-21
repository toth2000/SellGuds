import * as label from "../../constants/authActionType";

export const loginUser = (user) => {
  return { type: label.LOGIN, payload: user };
};

export const logoutUser = () => {
  return { type: label.LOGOUT };
};

import * as label from "../../constants/authActionType";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
  ? { isLoggedIn: true, user: user }
  : { isLoggedIn: false, user: null };

const reducer = (auth = initialState, action) => {
  switch (action.type) {
    case label.LOGIN:
      localStorage.setItem("user", JSON.stringify({ ...action.payload }));
      return { ...auth, isLoggedIn: true, user: action.payload };
    case label.LOGOUT:
      localStorage.clear();
      return { ...auth, isLoggedIn: false, user: null };
    default:
      return auth;
  }
};

export default reducer;

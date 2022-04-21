import { combineReducers } from "redux";

import auth from "./auth";
import progress from "./progress";

export default combineReducers({
  auth: auth,
  progress: progress,
});

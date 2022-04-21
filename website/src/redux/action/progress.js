import * as label from "../../constants/progressType";

export const setProgress = (value) => {
  if (value === true) return { type: label.ACTIVATE_PROGRESS };
  else if (value === false) return { type: label.DEACTIVATE_PROGRESS };
};

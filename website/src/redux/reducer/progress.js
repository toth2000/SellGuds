import * as label from "../../constants/progressType";

const reducer = (
  progress = {
    isLoading: false,
  },
  action
) => {
  switch (action.type) {
    case label.ACTIVATE_PROGRESS:
      return { ...progress, isLoading: true };
    case label.DEACTIVATE_PROGRESS:
      return { ...progress, isLoading: false };
    default:
      return progress;
  }
};

export default reducer;

export const UserSignupReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_SIGNUP_SUCCESS":
      return { ...state, userInfo: action.payload };
    default:
      return state;
  }
};

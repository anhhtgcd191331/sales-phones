import axios from "axios";

export const login = (user) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      "http://localhost:5000/api/users/login",
      user
    );
    dispatch({ type: "USER_LOGIN_SUCCESS", payload: data });
    document.location.href = "/";
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({ type: "USER_LOGIN_FAIL", payload: error.response.data.message });
  }
};

export const SignupUser = (user) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      "http://localhost:5000/api/users/add-user",
      user
    );
    localStorage.setItem("userInfo", JSON.stringify(data));
    dispatch({ type: "USER_SIGNUP_SUCCESS", payload: data });
    document.location.href = "/";
  } catch (error) {}
};

export const SignoutUser = (user) => async (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: "USER_SIGNOUT_SUCCESS", payload: {} });
  document.location.href = "/";
};

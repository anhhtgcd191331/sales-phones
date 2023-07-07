import axios from "axios";

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

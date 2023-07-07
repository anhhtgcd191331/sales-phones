import React from "react";
import "./login.css";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  //   const user = useSelector((state) => state.userSignin);
  //   const { userInfo, error } = user;

  const onSubmit = (data) => {
    // dispatch(login(data));
  };
  return (
    <div className="login-page">
      <h2> ĐĂNG NHẬP </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="form-login">
        <input {...register("email")} placeholder="Email" required></input>
        <input
          {...register("password")}
          placeholder="Password"
          type="password"
          required
        ></input>

        <input type="submit" value="Đăng Nhập"></input>
        {/* {error ? <h2>{error}</h2> : <></>} */}
        <Link to="/register">Tạo tài khoản?</Link>
      </form>
    </div>
  );
}

export default Login;

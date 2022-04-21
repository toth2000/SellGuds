import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import CloseIcon from "@mui/icons-material/Close";

import { signIn, signUp } from "../../api/serverAPI/auth";
import { loginUser } from "../../redux/action/auth";
import { setProgress } from "../../redux/action/progress";

import {
  CancelContainer,
  CompanyTitle,
  Container,
  InputField,
  InputFieldContainer,
  LoginButton,
  LoginText,
  AuthText,
  Wrapper,
} from "./style";

const Auth = ({ visibility, setVisibility }) => {
  const [isRegisterNow, setIsRegisterNow] = useState(false);

  const [data, setData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInput = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleCancelClick = () => {
    setVisibility(false);
  };

  const handleTextClick = () => {
    setIsRegisterNow((prevState) => !prevState);
  };

  const handleLogin = async (event) => {
    try {
      event.preventDefault();
      if (!data.email || !data.password) {
        alert("Uername/email or password can't be empty");
        return;
      }

      dispatch(setProgress(true));

      const response = await signIn({
        email: data.email,
        password: data.password,
      });

      dispatch(loginUser(response.data));
      setVisibility(false);
      navigate("/");
    } catch (error) {
      console.log(error);
      console.log("handleLogin, Auth/Login.js", error?.response);
    } finally {
      dispatch(setProgress(false));
    }
  };

  const handleRegister = async (event) => {
    try {
      event.preventDefault();

      console.log(data);

      if (
        !data.fullName ||
        !data.email ||
        !data.password ||
        !data.confirmPassword
      ) {
        alert("Above fields can not be empty");
        return;
      }

      if (data.password !== data.confirmPassword) {
        alert("Password mismatch");
        return;
      }

      dispatch(setProgress(true));

      const response = await signUp({
        fullName: `${data.fullName}`,
        username: data.username,
        email: data.email,
        password: data.password,
      });

      dispatch(loginUser(response.data));
      setVisibility(false);
      navigate("/");
    } catch (error) {
      console.log("handleLogin, Auth/Login.js", error);
      console.log("handleLogin, Auth/Login.js", error?.response);
      if (error?.response?.data?.message) alert(error?.response?.data?.message);
    } finally {
      dispatch(setProgress(false));
    }
  };

  return visibility ? (
    <Container>
      <Wrapper>
        <CancelContainer>
          <CloseIcon
            onClick={handleCancelClick}
            sx={{
              cursor: "pointer",
              padding: "5px",
              height: "34px",
              width: "34px",
            }}
          />
        </CancelContainer>

        <CompanyTitle>SellGuds</CompanyTitle>
        <LoginText>
          {isRegisterNow
            ? "Create a new account"
            : "Enter your email and password to login"}
        </LoginText>

        <InputFieldContainer>
          {isRegisterNow ? (
            <InputField
              name="fullName"
              type="text"
              placeholder="Full Name"
              value={data.fullName}
              onChange={(e) => handleInput(e)}
            />
          ) : null}

          <InputField
            name="email"
            type="email"
            placeholder="Email"
            value={data.email}
            onChange={(e) => handleInput(e)}
          />
          <InputField
            name="password"
            type="password "
            placeholder="Password"
            value={data.password}
            onChange={(e) => handleInput(e)}
          />

          {isRegisterNow ? (
            <InputField
              name="confirmPassword"
              type="password "
              placeholder="Confirm Password"
              value={data.confirmPassword}
              onChange={(e) => handleInput(e)}
            />
          ) : null}

          {isRegisterNow ? (
            <LoginButton onClick={handleRegister}>Register</LoginButton>
          ) : (
            <LoginButton onClick={handleLogin}>Login</LoginButton>
          )}
          <AuthText onClick={handleTextClick}>
            {isRegisterNow
              ? "Already have an account? Login Now"
              : "Don't have an account? Register Now"}
          </AuthText>
        </InputFieldContainer>
      </Wrapper>
    </Container>
  ) : null;
};

export default Auth;

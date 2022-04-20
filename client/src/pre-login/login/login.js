import React, { useState } from "react";
import InputField from "../../shared/input/input-component";
import Button from "../../shared/button/button-component";
import "./login-styles.scss";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
  });
  const { username, password } = formValues;
  const handleChange = (name) => (event) => {
    setFormValues({ ...formValues, [name]: event.target.value });
  };
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem("user", JSON.stringify(formValues));
    navigate('/home');
  };

  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="loginForm-container">
          <div>
        <InputField
          onChange={handleChange("username")}
          type={"text"}
          name={"username"}
          value={username}
          label={"username"}
        ></InputField>
        </div>
        <div>
        <InputField
          onChange={handleChange("password")}
          type={"password"}
          name={"password"}
          value={password}
          label={"Password"}
        ></InputField>
        </div>
        <Button type={"submit"} label={"Sign in"}></Button>
      </div>
    </form>
  );
  return (
    <div>
      <div className="login-wrapper">
        <h1>Sign in</h1>
        {loginForm()}
      </div>
    </div>
  );
};
export default Login;

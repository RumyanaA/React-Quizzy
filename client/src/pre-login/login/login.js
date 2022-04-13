import React, { useState } from "react";
import InputField from "../../shared/input/input-component";
import Button from "../../shared/button/button-component";
import "./login-styles.scss";
const Login = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formValues;
  const handleChange = (name) => (event) => {
    setFormValues({ ...formValues, [name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formValues)
  };

  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="loginForm-container">
          <div>
        <InputField
          onChange={handleChange("email")}
          type={"email"}
          name={"email"}
          value={email}
          label={"Email"}
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
      <div className="wrapper">
        <h1>Sign in</h1>
        {loginForm()}
      </div>
    </div>
  );
};
export default Login;

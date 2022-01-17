import React, { useState } from "react";
import {
  Row,
  Col,
  Form,
  InputGroup,
  FormControl,
  FormGroup,
  Button,
} from "react-bootstrap";
import Notifications,{ notify} from 'react-notify-toast';
/* import 'react-notifications/lib/notifications.css';
import{NotificationContainer,NotificationManager} from 'react-notifications' */
import { Google, Facebook, Search } from "react-bootstrap-icons";
import { NavLink } from "react-router-dom";
import { AddUser, LoginSocial } from "../../config/myservice";
import SocialButtons from "./SocialButtons";
let pass;
const regForName = RegExp(/^[A-Za-z ]{5,}$/);
const regForEmail = RegExp(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/);
const regForPass = RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/
);
const regFoMob = RegExp(/^[0-9]{10}$/);

export default function Register(props) {
  const [state, setState] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    cpassword: "",
    phone: "",
  });
  const [error, setError] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    cpassword: "",
    phone: "",
  });

  const handler = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });

    switch (name) {
      case "fname":
        let f_error = regForName.test(value)
          ? ""
          : "Only Aplhabates are allowed (minimum length of 5)";
        setError({ ...error, fname: f_error });
        break;
      case "lname":
        let l_error = regForName.test(value)
          ? ""
          : "Only Aplhabates are allowed (minimum length of 5)";
        setError({ ...error, lname: l_error });
        break;

      case "email":
        let e_error = regForEmail.test(value) ? "" : "Not a Valid Email Format";
        setError({ ...error, email: e_error });
        break;
      case "password":
        pass = value;
        let p_error = regForPass.test(value)
          ? ""
          : "Only Alphabets and Numbers are Allowed(minimum length 8)";
        setError({ ...error, password: p_error });
        break;
      case "cpassword":
        let cp_error = pass === value ? "" : "Does not matches with Password";
        setError({ ...error, cpassword: cp_error });
        break;
      case "phone":
        let ph_error = regFoMob.test(value)
          ? ""
          : "Must be of exact 10 digit number";
        setError({ ...error, phone: ph_error });
        break;
      default:
        break;
    }
  };

  const unerror = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });

    switch (name) {
      case "fname":
        setError({ ...error, fname: "" });
        break;
      case "lname":
        setError({ ...error, lname: "" });
        break;

      case "email":
        setError({ ...error, email: "" });
        break;
      case "password":
        setError({ ...error, password: "" });
        break;
      case "cpassword":
        setError({ ...error, cpassword: "" });
        break;
      case "phone":
        setError({ ...error, phone: "" });
        break;

      default:
        break;
    }
  };

  const submit = (event) => {
    event.preventDefault();
    let formDetails = {
      fname: state.fname,
      lname: state.lname,
      email: state.email,
      password: state.password,
      phone: state.phone,
    };
    console.log(formDetails);
    if (
      error.fname == "" &&
      error.lname == "" &&
      error.email == "" &&
      error.password == "" &&
      error.phone == ""
    ) {
      AddUser(formDetails)
        .then((res) => {
          if (res.data.err == 0) {
            console.log(res.data.msg);
            props.history.push("/login");
          } else if (res.data.err == 1) {
            console.log(res.data);
          }
        })
        .catch(props.history.push("/disconnect"));
    } else {
     /*  alert("Enter valid data"); */
      notify.show("Enter valid data",'warning',3000);  
    }
  };

  const handleSocialLogin = (user) => {
    console.log(user._profile);
    let formDetails = {
      fname: user._profile.firstName,
      lname: user._profile.lastName,
      email: user._profile.email,
    };
    LoginSocial(formDetails)
      .then((res) => {
        console.log(res);
        if (res.data.err == 0) {
          console.log(res.data);
          localStorage.setItem("_token", res.data.token);
          props.history.push("/");
        } else {
          console.log(res.data.msg);
          /* alert(res.data.msg); */
          notify.show(res.data.msg,'warning',3000);  
        }
      })
      .catch((err) => {
        if (err) {
          props.history.push("/disconnect");
        }
      });
  };

  const handleSocialLoginFailure = (err) => {
    console.error(err);
  };
  return (
    <div className="container container-fluid">
      <Notifications />
      <Row className="mt-5">
        <Col lg={2}></Col>

        <Col lg={8}>
          <div className="App">
            <SocialButtons
              provider="facebook"
              appId="289320273074704"
              onLoginSuccess={handleSocialLogin}
              onLoginFailure={handleSocialLoginFailure}
              className="fb text-light mr-3 pl-5 pr-5"
            >
              <Facebook /> Login with Facebook
            </SocialButtons>
            <SocialButtons
              provider="google"
              appId="588223671378-i7eadqetaog8c0sm8qbo8gbe5sdml3ti.apps.googleusercontent.com"
              onLoginSuccess={handleSocialLogin}
              onLoginFailure={handleSocialLoginFailure}
              className="google text-light mr-3  pl-5 pr-5"
            >
              <Google /> Login with Google+
            </SocialButtons>
          </div>
          <div className="bg-light border-bottom mb-3 p-5">
            <h3 className="">Register to neoSTORE </h3>
            <FormGroup>
              <FormControl
                type="text"
                className="mt-4"
                placeholder="First Name"
                name="fname"
                onBlur={handler}
                onFocus={unerror}
              />
              <div>
                {error.fname.length > 0 && (
                  <span style={{ color: "red" }}> {error.fname} </span>
                )}
              </div>
              <FormControl
                type="text"
                className="mt-4"
                placeholder="Last Name"
                name="lname"
                onBlur={handler}
                onFocus={unerror}
              />
              <div>
                {error.lname.length > 0 && (
                  <span style={{ color: "red" }}> {error.lname} </span>
                )}
              </div>
              <FormControl
                type="text"
                className="mt-4"
                placeholder="Email Id"
                name="email"
                onBlur={handler}
                onFocus={unerror}
              />
              <div>
                {error.email.length > 0 && (
                  <span style={{ color: "red" }}> {error.email} </span>
                )}
              </div>
              <FormControl
                type="password"
                className="mt-4"
                placeholder="Password"
                name="password"
                onBlur={handler}
                onFocus={unerror}
              />
              <div>
                {error.password.length > 0 && (
                  <span style={{ color: "red" }}> {error.password} </span>
                )}
              </div>
              <FormControl
                type="password"
                className="mt-4"
                placeholder="Confirm  Password"
                name="cpassword"
                onBlur={handler}
                onFocus={unerror}
              />
              <div>
                {error.cpassword.length > 0 && (
                  <span style={{ color: "red" }}> {error.cpassword} </span>
                )}
              </div>
              <FormControl
                type="number"
                className="mt-4"
                placeholder="Mobile No."
                name="phone"
                onBlur={handler}
                onFocus={unerror}
              />
              <div>
                {error.phone.length > 0 && (
                  <span style={{ color: "red" }}> {error.phone} </span>
                )}
              </div>
              <div className="App">
                <Button
                  className="mt-4"
                  variant="primary"
                  size="lg"
                  onClick={submit}
                >
                  Register
                </Button>
              </div>
              <div className="App bg-dark mt-2 pt-3 pb-3">
                <NavLink to="/login">Existing User? </NavLink>
              </div>
            </FormGroup>
          </div>
        </Col>
        <Col lg={2}></Col>
      </Row>
    </div>
  );
}

import React, { useState } from "react";
import {
  Row,
  Col,
  Form,
  FormControl,
  FormGroup,
  Button,
} from "react-bootstrap";
import Notifications,{ notify} from 'react-notify-toast';
/* import 'react-notifications/lib/notifications.css';
import{NotificationContainer,NotificationManager} from 'react-notifications' */
import { Google, Facebook } from "react-bootstrap-icons";
import { NavLink, useHistory } from "react-router-dom";
import { LoginSocial, UserLogin } from "../../config/myservice";
import SocialButtons from "./SocialButtons";
import { useDispatch, useSelector } from "react-redux";

const regForEmail = RegExp(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/);
const regForPass = RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/
);

export default function Login(props) {
  const [state, setState] = useState({ email: "", password: "" });
  const [error, setError] = useState({ email: "", password: "" });
  const [social, setSocial] = useState();
  const history = useHistory();
  const dispatch = useDispatch();

  const handler = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });

    switch (name) {
      case "email":
        let e_error = regForEmail.test(value) ? "" : "Not a Valid Email Format";
        setError({ ...error, email: e_error });
        break;
      case "password":
        let p_error = regForPass.test(value)
          ? ""
          : "Alphabets and Numbers are Allowed(minimum length 8)";
        setError({ ...error, password: p_error });
        break;
      default:
        break;
    }
  };

  const unerror = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });

    switch (name) {
      case "email":
        setError({ ...error, email: "" });
        break;
      case "password":
        setError({ ...error, password: "" });
        break;
      default:
        break;
    }
  };

  const postLogin = (event) => {
    event.preventDefault();

    UserLogin(state)
      .then((res) => {
        if (res.data.err == 0) {
          localStorage.setItem("_token", res.data.token);
          dispatch({ type: "LOGIN_SUCCESS", payload: res.data.token });
          history.push("/");
        } else {
          console.log(res.data.msg);
         /*  alert(res.data.msg); */
          notify.show(res.data.msg,'error',3000);  
        }
      })
      .catch((err) => {
        if (err) {
          history.push("/disconnect");
        }
      });
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
          dispatch({ type: "LOGIN_SUCCESS", payload: res.data.token });
          history.push("/");
        } else {
          console.log(res.data.msg);
          /* alert(res.data.msg); */
          notify.show(res.data.msg,'error',3000);  
        }
      })
      .catch((err) => {
        if (err) {
          history.push("/disconnect");
        }
      });
  };

  const handleSocialLoginFailure = (err) => {
    console.error(err);
    setSocial(err);
  };
  return (
    <div className="container mt-5 mb-5">
            <Notifications  />
      <Row>
        <Col lg={6} sm={6} md={6} className="p-2">
          <Row className="m-3">
            <Row>
              <SocialButtons
                provider="facebook"
                appId="289320273074704"
                onLoginSuccess={handleSocialLogin}
                onLoginFailure={handleSocialLoginFailure}
                className="fb text-light"
              >
                <Facebook /> Login with Facebook
              </SocialButtons>
            </Row>
            <Row>
              <Button variant="info" size="lg" className="mb-4 p-3">
                <i className="fa fa-twitter "></i> Login with Twitter
              </Button>
            </Row>
            <Row>
              <SocialButtons
                provider="google"
                appId="588223671378-i7eadqetaog8c0sm8qbo8gbe5sdml3ti.apps.googleusercontent.com"
                onLoginSuccess={handleSocialLogin}
                onLoginFailure={handleSocialLoginFailure}
                className="google text-light"
              >
                <Google /> Login with Google+
              </SocialButtons>
            </Row>
          </Row>
        </Col>

        <Col lg={6} sm={6} md={6} className="vl">
          <div className="bg-light border-bottom mb-3 p-3 ">
            <h3 className="">Login to neoSTORE </h3>
            <FormGroup>
              <FormControl
                type="email"
                className="mt-4"
                placeholder="Email Id"
                name="email"
                onFocus={unerror}
                onBlur={handler}
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
                onFocus={unerror}
                onBlur={handler}
              />
              <div>
                {error.password.length > 0 && (
                  <span style={{ color: "red" }}> {error.password} </span>
                )}
              </div>
              <Button
                className="ml-4 mt-4"
                variant="primary"
                onClick={postLogin}
              >
                Login
              </Button>{" "}
            </FormGroup>
          </div>
        </Col>
        <Col lg={12} sm={12} md={12}>
          <Row>
            <Col lg={6} sm={6} md={6} xs={6} className="text-end mt-3">
              <NavLink to="/register">New User? </NavLink>
            </Col>
            <Col lg={6} sm={6} md={6} xs={6} className="vl mt-3">
              <NavLink to="/forgot">Forgotten? </NavLink>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

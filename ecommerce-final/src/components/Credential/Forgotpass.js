import React, { useRef, useState } from "react";
import { Col, Row, FormControl, FormGroup, Button } from "react-bootstrap";
import Notifications,{ notify} from 'react-notify-toast';
 import 'react-notifications/lib/notifications.css';
import{NotificationContainer,NotificationManager} from 'react-notifications' 
import OtpInput from "react-otp-input";
import { sendOtp, changePASS } from "../../config/myservice";
let pass;
const regForPass = RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/
);
export default function Forgotpass(props) {
  const [flag, setFlag] = useState(false);
  const otpref = useRef("");
  const [genOTP, setgenOTP] = useState("");
  const [state, setState] = useState({
    email: "",
    password: "",
    cpassword: "",
  });
  const [error, setError] = useState({
    email: "",
    password: "",
    cpassword: "",
  });

  const handler = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });

    switch (name) {
      case "password":
        pass = value;
        let p_error = regForPass.test(value)
          ? ""
          : "Alphabets and Numbers are Allowed(minimum length 8)";
        setError({ ...error, password: p_error });
        break;
      case "cpassword":
        let c_error = pass === value ? "" : "Does not Match with Password";
        setError({ ...error, cpassword: c_error });
        break;
      default:
        break;
    }
  };

  const unerror = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });

    switch (name) {
      case "password":
        setError({ ...error, password: "" });
        break;
      case "cpassword":
        setError({ ...error, cpassword: "" });
        break;
      default:
        break;
    }
  };

  const generateOTP = () => {
    const data = {
      email: state.email,
    };
    console.log(data);
    sendOtp(data).then((res) => {
      if (res.data.err == 1) {
        notify.show("You Don't Have Any Account With This Email....Please Register First",'warning',3000); 
      } else {
        setFlag(true);
         console.log(res.data.otp1); 
        setgenOTP(res.data.otp1);
      }
    });
  };

  const validateOTP = () => {
    console.log(genOTP);
    if (otpref.current.value == genOTP) {
      let formData = {
        email: state.email,
        password: state.password,
      };
      changePASS(formData).then((res) => {
        if (res.data.err == 0) {
          NotificationManager.success('Password Changed', 'Success',1500);
          setTimeout(() => {
            props.history.push("/login");
          }, 1800);
            
        }
      });
    } else {
      notify.show("Sorry!!! Your OTP does not match .... Please try again using correct OTP ",'warning',3000);  
      props.history.push("/forgot");
    }
  };

  return (
    <div className="container-fluid">
      <NotificationContainer />
      <Notifications />
      <Row>
        <Col lg={4} sm={2} md={2}></Col>
        <Col lg={4} sm={8} md={8}>
          <h3>Recover Password</h3>
          <FormGroup className="bg-light p-2">
            <FormControl
              type="text"
              className="mt-4"
              placeholder="Email"
              name="email"
              onFocus={unerror}
              onBlur={handler}
            />
            {flag ? (
              <div className="App pl-5 pr-5 ml-5 mr-5 ">
                <FormControl
                  type="number"
                  className="mt-4"
                  placeholder="OTP"
                  name="otp"
                  ref={otpref}
                />
              </div>
            ) : (
              <div className="App mt-2">
                {" "}
                <Button onClick={generateOTP}>geneate otp</Button>
              </div>
            )}
            <div>
              {error.email.length > 0 && (
                <span style={{ color: "red" }}> {error.email} </span>
              )}
            </div>
            <FormControl
              type="password"
              className="mt-4"
              placeholder="New Password"
              name="password"
              onFocus={unerror}
              onBlur={handler}
            />
            <div>
              {error.password.length > 0 && (
                <span style={{ color: "red" }}> {error.password} </span>
              )}
            </div>
            <FormControl
              type="password"
              className="mt-4"
              placeholder="Confirm Password"
              name="cpassword"
              onFocus={unerror}
              onBlur={handler}
            />
            <div>
              {error.cpassword.length > 0 && (
                <span style={{ color: "red" }}> {error.cpassword} </span>
              )}
            </div>
            <Button
              className="ml-4 mt-4"
              size="lg"
              variant="success"
              onClick={validateOTP}
            >
              Submit
            </Button>{" "}
          </FormGroup>
        </Col>
        <Col lg={4} sm={2} md={2} ></Col>
      </Row>
    </div>
  );
}

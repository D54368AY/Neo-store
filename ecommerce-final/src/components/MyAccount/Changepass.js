import React, { useEffect, useRef, useState } from "react";
import { Button, Container, Image } from "react-bootstrap";
import { FormControl } from "react-bootstrap";
import jwt_decode from "jwt-decode";
import { updatePassword } from "../../config/myservice";
import { useHistory } from "react-router-dom";
import Notifications,{ notify} from 'react-notify-toast';
 import 'react-notifications/lib/notifications.css';
import{NotificationContainer,NotificationManager} from 'react-notifications' 
export default function Changepass() {
  const history = useHistory();
  const [userDetails, setUserDetails] = useState();
  const [social, setSocial] = useState();
  const oldpassref = useRef("");
  const newpassref = useRef("");
  const cnfrmpassref = useRef("");
  useEffect(() => {
    if (localStorage.getItem("_token") != undefined) {
      let token = localStorage.getItem("_token");
      console.log(token);
      let decode = jwt_decode(token);
      console.log(decode);
      let detail = decode.uid[0];
      setSocial(detail.is_social);
      console.log(detail);
      setUserDetails(detail);
    }
  }, [localStorage.getItem("_token")]);

  const changePassword = () => {
    if (newpassref.current.value !== cnfrmpassref.current.value) {
      notify.show("please enter confirm password same as password",'warning',3000);
    } else {
      let Data = {
        email: userDetails.email,
        oldpassword: oldpassref.current.value,
        newpassword: newpassref.current.value,
      };
      console.log(Data);
      updatePassword(Data).then((res) => {
        if (res.data.err == 1) {
          notify.show(res.data.msg,'warning',3000);
          alert(res.data.msg);
        } else if (res.data.err === 2) {
          console.log(res.data.msg);
          notify.show(res.data.msg + "....going back to login stage",'warning',3000);
        setTimeout(() => {
          history.push("/login");
        }, 3000);
        } else {
          localStorage.setItem("_token", res.data.token);
          console.log(res.data.msg);
          NotificationManager.success(res.data.msg, 'Success',2000);
          history.push("/myaccount");
        }
      });
    }
  };
  return (
    <Container>
      <Notifications />
      <NotificationContainer />
      {" "}
      {social ? (
        <Container>
          <div className="text-center">
            <Image
              thumbnail
              src="images/smiley.gif"
              style={{ height: 400, width: 400 }}
            />
          </div>
          <div className="alert alert-success mt-5 p-2 text-center icontext fw-bold">
            You have logged in Using Your Social Account , So to Change Your
            Password you Need to Go to Your Social Account <br />
            Thank You !!!.....
          </div>
        </Container>
      ) : (
        <Container className="p-5 m-5 bg-light">
          <FormControl
            type="password"
            className="mt-4"
            placeholder="Old Password"
            name="opassword"
            ref={oldpassref}
          />
          <FormControl
            type="password"
            className="mt-4"
            placeholder="New Password"
            name="npassword"
            ref={newpassref}
          />
          <FormControl
            type="password"
            className="mt-4"
            placeholder="Confirm Password"
            name="cpassword"
            ref={cnfrmpassref}
          />
          <Button variant="primary" className="mt-4" onClick={changePassword}>
            Change Password
          </Button>
        </Container>
      )}
    </Container>
  );
}

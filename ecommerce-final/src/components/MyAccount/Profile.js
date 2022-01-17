import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Container, Button, FormControl } from "react-bootstrap";
import { FileEarmarkDiff, Upload } from "react-bootstrap-icons";
import jwt_decode from "jwt-decode";
import { UpdateProfile } from "../../config/myservice";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Notifications,{ notify} from 'react-notify-toast';
 import 'react-notifications/lib/notifications.css';
import{NotificationContainer,NotificationManager} from 'react-notifications' 
export default function Profile() {
  const tokendata = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const history = useHistory();
  const [flag, setFlag] = useState(false);
  const [userDetails, setUserDetails] = useState();
  const [UpdateUser, setUpdateUser] = useState();
  useEffect(() => {
    let token = tokendata;
    console.log(token);
    let decode = jwt_decode(token);
    console.log(decode);
    let detail = decode.uid[0];
    console.log(detail);
    setUserDetails(detail);
    setUpdateUser(detail);
  }, [tokendata]);

  const onEdit = () => {
    setFlag(!flag);
  };
  const SubmitDetails = () => {
    let Data = {
      fname: UpdateUser.firstname,
      lname: UpdateUser.lastname,
      email: UpdateUser.email,
      phone: UpdateUser.phone_no,
    };
    console.log(Data);
    UpdateProfile(Data).then((res) => {
      console.log(res);
      if (res.data.err === 0) {
        console.log("updated");
        NotificationManager.success('Data Updated', 'Alert',2000);
        console.log(res.data.token);
        localStorage.setItem("_token", res.data.token);
        dispatch({ type: "EDIT_PROFILE", payload: res.data.token });
      } else if (res.data.err === 2) {
        console.log(res.data.msg);
        notify.show(res.data.msg + "....going back to login stage",'warning',3000);
        /* alert(res.data.msg + "....going back to login stage"); */
        setTimeout(() => {
          history.push("/login");
        }, 3000);
        
      }
    });
    setFlag(!flag);
  };

  return (
    <Container className="p-5 bg-light">
      <Notifications />
      <NotificationContainer />
      <h3>Profile</h3>
      <hr />
      <Container>
        <Row className="m-4">
          <Col lg={4}>
            <b>First Name</b>
          </Col>
          <Col lg={8}>
            {flag ? (
              <FormControl
                type="text"
                placeholder="First Name"
                name="fname"
                /* ref={fnameref} */
                value={UpdateUser.firstname}
                onChange={(e) =>
                  setUpdateUser({ ...UpdateUser, firstname: e.target.value })
                }
              />
            ) : (
              <div> {userDetails && userDetails.firstname} </div>
            )}
          </Col>
        </Row>
        <Row className="m-4">
          <Col lg={4}>
            <b>Last Name</b>
          </Col>
          <Col lg={8}>
            {flag ? (
              <FormControl
                type="text"
                placeholder="Last Name"
                name="lname"
                /* ref={lnameref} */
                value={UpdateUser.lastname}
                onChange={(e) =>
                  setUpdateUser({ ...UpdateUser, lastname: e.target.value })
                }
              />
            ) : (
              <div>{userDetails && userDetails.lastname}</div>
            )}
          </Col>
        </Row>
        <Row className="m-4">
          <Col lg={4}>
            <b>Email id</b>
          </Col>
          <Col lg={8}>
            {flag ? (
              <FormControl
                type="email"
                placeholder="Email Id"
                name="email"
                plaintext
                readOnly
                /* ref={emailref} */
                value={UpdateUser.email}
                onChange={(e) =>
                  setUpdateUser({ ...UpdateUser, email: e.target.value })
                }
              />
            ) : (
              <div> {userDetails && userDetails.email}</div>
            )}
          </Col>
        </Row>
        <Row className="m-4">
          <Col lg={4}>
            <b>Phone Number</b>
          </Col>
          <Col lg={8}>
            {flag ? (
              <FormControl
                type="number"
                placeholder="Phone Numer"
                name="phone"
                /*  ref={phoneref} */
                value={UpdateUser.phone_no}
                onChange={(e) =>
                  setUpdateUser({ ...UpdateUser, phone_no: e.target.value })
                }
              />
            ) : (
              <div> {userDetails && userDetails.phone_no}</div>
            )}
          </Col>
        </Row>
      </Container>
      <hr />
      {flag ? (
        <>
          <Button
            variant="success"
            className="pl-5 pr-5"
            onClick={SubmitDetails}
          >
            <Upload />
            Submit
          </Button>{" "}
          <Button variant="secondary" className="pl-5 pr-5" onClick={onEdit}>
            Cancel
          </Button>{" "}
        </>
      ) : (
        <Button
          size="lg"
          variant="outline-info"
          className="pl-5 pr-5 float-right"
          onClick={onEdit}
        >
          <FileEarmarkDiff />
          Edit
        </Button>
      )}
    </Container>
  );
}

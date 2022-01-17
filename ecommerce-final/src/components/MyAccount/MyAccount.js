import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Button,
  ListGroup,
  ListGroupItem,
  Form,
  Modal,
} from "react-bootstrap";
import {
  FilePerson,
  FileArrowDownFill,
  Map,
  FileWord,
} from "react-bootstrap-icons";
import Notifications,{ notify} from 'react-notify-toast';
 import 'react-notifications/lib/notifications.css';
import{NotificationContainer,NotificationManager} from 'react-notifications' 
import Image from "react-bootstrap/Image";
import jwt_decode from "jwt-decode";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch,
  Link,
  useHistory,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Address from "./Address";
import Changepass from "./Changepass";
import Orders from "../Products/Orders";
import Profile from "./Profile";
import { AddProfilePicture } from "../../config/myservice";
import OrderHistory from "./OrderHistory";
import Pdf from "../Pdf";

export default function MyAccount() {
  const tokendata = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const history = useHistory();
  const [userDetails, setUserDetails] = useState();
  const [picture, setPicture] = useState();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(
    () => {
      let token = tokendata;
      console.log(token);
      let decode = jwt_decode(token);
      console.log(decode);
      let detail = decode.uid[0];
      console.log(detail);
      setUserDetails(detail);

      if (detail.profile_pic) {
        console.log(detail.profile_pic);
        setPicture(detail.profile_pic);
      }
    },
    [localStorage.getItem("_token")],
    tokendata,
    picture
  );

  const UploadPicture = () => {
    console.log(userDetails);
    let data = new FormData();
    data.append("file", document.getElementById("profile").files[0]);
    data.append("email", userDetails.email);
    console.log(userDetails.email);
    AddProfilePicture(data).then((res) => {
      if (res.data.err !== 1) {
        localStorage.setItem("_token", res.data.token);
        dispatch({ type: "EDIT_PROFILE", payload: res.data.token });
        NotificationManager.success("Profile Pic Changed", 'Success',3000);
        handleClose();
        /* setPicture(userDetails.profile_pic);
        console.log(userDetails.profile_pic); */
      }
    });
  };
  return (
    <div className="container container-fluid mt-3">
      <NotificationContainer />
      <h3>My Account</h3>
      <hr />
      <Router>
        <Row>
          <Col lg={4} sm={3} md={3}>
            <Card border="light" className="App">
              <div className="container">
                {picture ? (
                  <Image
                    roundedCircle
                    thumbnail
                    src={`/images/profile_pic/${picture}`}
                    style={{ height: 200, width: 200 }}
                  />
                ) : (
                  <Image
                    roundedCircle
                    thumbnail
                    src="images/profile.png"
                    style={{ height: 200, width: 200 }}
                  />
                )}

                <Button
                  variant="link"
                  style={{ textDecoration: "none", color: "red" }}
                  onClick={handleShow}
                >
                  Change Profile Picture
                </Button>
              </div>
              <Card.Body>
                <Card.Title>
                  {userDetails && userDetails.firstname}{" "}
                  {userDetails && userDetails.lastname}
                </Card.Title>
                <Card.Text className="App">
                  <ListGroup className="list-group-flush">
                    <ListGroupItem>
                      <Link
                        to="/myaccount"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        <FilePerson /> Profile
                      </Link>
                    </ListGroupItem>
                    <ListGroupItem>
                      {" "}
                      <Link
                        to="/orderhistory"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        <FileArrowDownFill />
                        Orders
                      </Link>
                    </ListGroupItem>
                    <ListGroupItem>
                      <Link
                        to="/address"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        <Map />
                        Address
                      </Link>
                    </ListGroupItem>
                    <ListGroupItem>
                      <Link
                        to="/changepass"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        <FileWord /> Change Password
                      </Link>
                    </ListGroupItem>
                  </ListGroup>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={8} sm={9} md={9}>
            <Switch>
              <Route path="/myaccount" exact component={Profile} />
              <Route path="/orderhistory" exact component={OrderHistory} />
              <Route path="/address" exact component={Address} />
              <Route path="/changepass" exact component={Changepass} />
              <Route path="/pdfbill/:id" exact component={Pdf} />
            </Switch>
          </Col>
        </Row>
      </Router>

      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
        className="img"
      >
        <div className="bg-secondary">
          <Modal.Header closeButton>
            <Modal.Title>Change Profile Pciture</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Card>
              <Form>
                <input
                  type="file"
                  name="myfile"
                  id="profile"
                  className="mb-1"
                />
              </Form>
            </Card>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={UploadPicture}>
              Upload
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </div>
  );
}

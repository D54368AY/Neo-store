import React, { useState, useRef, useEffect } from "react";
import {
  Card,
  Container,
  Button,
  Row,
  Col,
  CloseButton,
  Form,
  Modal,
} from "react-bootstrap";
import Notifications,{ notify} from 'react-notify-toast';
 import 'react-notifications/lib/notifications.css';
import{NotificationContainer,NotificationManager} from 'react-notifications' 
import { Save2Fill } from "react-bootstrap-icons";
import jwt_decode from "jwt-decode";
import { addAddress, deleteAddress } from "../../config/myservice";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
export default function Address() {
  const history = useHistory();
  const [flag, setFlag] = useState(false);
  const addressref = useRef("");
  const editaddressref = useRef("");
  const [editAdd, seteditAdd] = useState();
  const [userDetails, setUserDetails] = useState();
  const [userAddress, setUserAdd] = useState();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleEdit = (id, add) => {
    setShow(true);
    console.log(add);
    seteditAdd(add);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("_token") != undefined) {
      let token = localStorage.getItem("_token");
      console.log(token);
      let decode = jwt_decode(token);
      console.log(decode);
      let detail = decode.uid[0];
      console.log(detail);
      setUserDetails(detail);
      if (detail.address) {
        setUserAdd(detail.address);
        console.log(detail.address);
      }
    }
  }, [localStorage.getItem("_token")]);

  const onEdit = () => {
    setFlag(!flag);
  };
  const addnewAddress = () => {
    if (addressref.current.value.length <= 20) {
      notify.show('Please Enter a Address of Atlease 20 Charaters !','success',2000);
    } else {
      let Data = {
        email: userDetails.email,
        address: addressref.current.value,
      };
      console.log(Data);
      addAddress(Data).then((res) => {
        if (res.data.err == 1) {
          alert(res.data.msg);
          NotificationManager.warning(res.data.msg, 'Alert',2000);
        } else {
          localStorage.setItem("_token", res.data.token);
          dispatch({ type: "ADD_ADDRESS", payload: res.data.token });
          console.log(res.data.msg);
          NotificationManager.success(res.data.msg, 'Added',2000);
          setFlag(!flag);
        }
      });
    }
  };

  const deleteAdd = (key) => {
    const data = {
      id: key,
      email: userDetails.email,
    };
    console.log(data);
    deleteAddress(data).then((res) => {
      if (res.data.err == 1) {
        alert(res.data.msg);
        NotificationManager.warning(res.data.msg, 'Alert',2000);
      } else {
        localStorage.setItem("_token", res.data.token);
        dispatch({ type: "ADD_ADDRESS", payload: res.data.token });
        console.log(res.data.msg);
        NotificationManager.success(res.data.msg, 'Deleted',2000);
      }
    });
  };

  return (
    <Container className="bg-light p-3">
      <Notifications />
      <NotificationContainer />
      <h3>Addresses</h3>
  
      <hr />
      {userAddress ? (
        userAddress.map((ele, key) => (
          <Card>
            <Card.Header as="h5">Address #{key + 1}</Card.Header>
            <Card.Body>
              <Card.Text>
                <div className="float-right bg-dark">
                  <CloseButton
                    onClick={() => deleteAdd(ele._id, ele.addr)}
                    variant="white"
                  />
                </div>
                <Row>
                  <Col lg={6} sm={6}>
                    {ele.addr}
                  </Col>
                </Row>
              </Card.Text>
              <Button
                variant="primary"
                onClick={() => handleEdit(ele._id, ele.addr)}
              >
                Edit
              </Button>
            </Card.Body>
          </Card>
        ))
      ) : (
        <div>Add Address</div>
      )}

      <hr />
      {flag ? (
        <Container className="">
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Add New Address</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Flat No,Building, Area , Landmark , City - Pincode"
              ref={addressref}
              rows={3}
            />
          </Form.Group>
          <Button variant="outline-dark" onClick={addnewAddress}>
            <Save2Fill />
            Save
          </Button>{" "}
          <Button variant="outline-dark" onClick={onEdit}>
            Cancel
          </Button>
        </Container>
      ) : (
        <Container className="">
          <Button variant="outline-dark" onClick={onEdit}>
            Add New
          </Button>
        </Container>
      )}

      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
        className="img"
      >
        <div /* className="bg-secondary" */>
          <Modal.Header closeButton>
            <Modal.Title>Edit Address</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Card>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Control as="textarea" value={editAdd} rows={3} />
                </Form.Group>
              </Form>
            </Card>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" /* onClick={UploadPicture} */>
              Submit
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </Container>
  );
}

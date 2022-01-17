import React, { useState, useEffect } from "react";
import {
  Button,
  Col,
  Container,
  Row,
  Card,
  CloseButton,
  Form,
  Modal,
  Image,
} from "react-bootstrap";
import {
  PlusCircleFill,
  CreditCard,
  JournalBookmark,
} from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import Notifications,{ notify} from 'react-notify-toast';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch,
  Link,
  useHistory,
} from "react-router-dom";
import { CLEARCART, GETALLCART, PLACEORDER } from "../../config/myservice";
const regForName = RegExp(/^[A-Za-z ]{5,}$/);
const regForCvv = RegExp(/^[0-9]{3}$/);
const regForNumber = RegExp(/^[0-9]{16,}$/);
export default function Checkout() {
  const history = useHistory();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const cartProduct = useSelector((state) => state.cart);
  const [maxTotal, setmaxTotal] = useState();

  const [user, setuser] = useState();
  const [userAdd, setuserAdd] = useState();
  const [selectedAdd, setselectedAdd] = useState();
  const [Allcart, setAllcart] = useState();

  const [data, setData] = useState({
    cvc: "",
    name: "",
    expiry: "",
    number: "",
  });
  const [error, setError] = useState({
    cvc: "",
    name: "",
    expiry: "",
    number: "",
  });

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    history.push("/dashboard");
  };
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (localStorage.getItem("_token") != undefined) {
      let token = localStorage.getItem("_token");
      console.log(token);
      let decode = jwt_decode(token);
      console.log(decode);
      let detail = decode.uid[0];
      console.log(detail);
      setuser(detail);
      setuserAdd(detail.address);

      let data = { userid: detail._id };
      GETALLCART(data).then((res) => {
        if (res.data.err === 0) {
          dispatch({ type: "ADD_TO_CART", payload: res.data.cartdata });
          setAllcart(res.data.cartdata[0].products);
          console.log(res.data.cartdata[0].products);
        }

        console.log(res.data.cartdata[0].products);
        let MaxTotal = 0;
        {
          res.data.cartdata[0].products.map(
            (pro) =>
              (MaxTotal +=
                parseInt(pro.product_id.product_cost) *
                parseInt(pro.product_count))
          );
        }

        setmaxTotal(MaxTotal + MaxTotal * (5 / 100));
      });
    }
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });

    switch (name) {
      case "cvc":
        let f_error = regForCvv.test(value)
          ? ""
          : "Only 3 digit number is allowed";
        setError({ ...error, cvc: f_error });
        console.log(f_error);
        break;
      case "name":
        let l_error = regForName.test(value)
          ? ""
          : "Only Aplhabates are allowed (minimum length of 5)";
        setError({ ...error, name: l_error });
        console.log(l_error);
        break;
      case "number":
        let u_error = regForNumber.test(value)
          ? ""
          : "Only 16 digit number allowed";
        setError({ ...error, number: u_error });
        console.log(u_error);
        break;
      default:
        break;
    }
    console.log(error);
    console.log(data);
  };

  const handleradio = (event) => {
    console.log(event.target.value);
    setselectedAdd(userAdd[event.target.value].addr);
  };

  const checkoutPage = () => {
    if (!selectedAdd) {
      notify.show("Hey....! please select Address to Checkout",'success',3000); 
    } else {
      console.log("checking out");
      const data = {
        userid: user._id,
        address: selectedAdd,
        product_data: Allcart,
        total: maxTotal,
        email:user.email
      };
      console.log(user.email);
      PLACEORDER(data).then((res) => {
        if (res.data.err === 1) {
          alert(res.data.msg);
        } else {
          const data = { userid: user._id };
          CLEARCART(data).then((res) => {
            if (res.data.err === 1) {
              alert(res.data.msg);
            } else {
              console.log(res.data.msg);
              dispatch({ type: "CART_COUNT", payload: 0 });
            }
          });
          localStorage.removeItem("cartItem");
          setShow(true);
        }
      });
    }
  };

  const redirectOrder = () => {
    history.push("/orders");
  };

  return (
    <Container className="bg-light">
      <Notifications  />
      <h2 className="alert alert-primary m-2 p-2 text-center icontext">
        Grand Total : Rs. {maxTotal}{" "}
      </h2>
      <Row>
        <Col lg={6}>
          <Form >
            <div className="text-center">
            <h4>Select Address To CheckOut</h4>
            </div>
            {userAdd ? (
              userAdd.map((ele, key) => (
                <Card className="m-3 p-3 bg-light" onChange={handleradio}>
                  <Form.Check type="radio" id={key}>
                    <Form.Check.Input
                      type="radio"
                      value={key}
                      name="add"
                      isValid
                    />
                    <Form.Check.Label>Address #{key}</Form.Check.Label>
                    <Form.Control.Feedback className="fw-bold " type="true">
                      {" "}
                      {ele.addr}{" "}
                    </Form.Control.Feedback>
                  </Form.Check>
                </Card>
              ))
            ) : (
              <div>Add Address</div>
            )}
          </Form>
          <Button
            variant="info"
            className="m-2 p-2"
            onClick={() => {
              history.push("/myaccount");
            }}
          >
            <PlusCircleFill /> Add New Address
          </Button>
        </Col>
        <Col lg={6}>
          <div id="PaymentForm">
            <Cards
              cvc={data.cvc}
              expiry={data.expiry}
              focus={data.focus}
              name={data.name}
              number={data.number}
            />
            <form action="" className="form-class">
              <input
                type="number"
                name="cvc"
                className="input-class"
                placeholder="CVC"
                onChange={handleInputChange}
              />
              <input
                type="date"
                name="expiry"
                className="input-class"
                placeholder="Expire Date"
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="name"
                className="input-class"
                placeholder="Your Name"
                onChange={handleInputChange}
              />
              <input
                type="number"
                name="number"
                className="input-class"
                placeholder="Card Number"
                onChange={handleInputChange}
              />
            </form>
          </div>
          <div className="d-grid">
            <Button variant="primary" size="lg" onClick={checkoutPage}>
              <CreditCard /> Pay & CheckOut
            </Button>
          </div>
        </Col>
      </Row>
      <div className="alert alert-success mt-3 text-center fw-bold">
        <p className="icontext">
          <i className="icon text-success fa fa-truck"></i> Free Delivery within
          1-2 weeks <i className="icon text-success fa fa-truck"></i>{" "}
        </p>
      </div>

      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
        className="img"
      >
        <div className="bg-secondary">
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <div className="App">
              <Image
                thumbnail
                src="images/order_placed.gif"
                style={{ height: 500, width: 650 }}
              />

              <Button size="lg" variant="dark" onClick={redirectOrder}>
                <JournalBookmark />
                Show Order Details
              </Button>
            </div>
          </Modal.Body>
        </div>
      </Modal>
    </Container>
  );
}

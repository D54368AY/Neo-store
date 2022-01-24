import React, { useState, useEffect } from "react";
import { Card, Container, Button, Row, Col } from "react-bootstrap";
import { Trash, Trash2, Trash2Fill } from "react-bootstrap-icons";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Notifications,{ notify} from 'react-notify-toast';
 import 'react-notifications/lib/notifications.css';
import{NotificationContainer,NotificationManager} from 'react-notifications' 
import { DEC, GETALLCART, INC, REMOVECART } from "../../config/myservice";
export default function Cart() {
  const history = useHistory();
  const dispatch = useDispatch();
  const cartProduct = useSelector((state) => state.cart);
  const [Userdetail, setUserdetail] = useState();
  const [subTotal, setsubTotal] = useState();
  const [Allcart, setAllcart] = useState();
  const [quantity,setquantity]=useState();
  const [flag, setflag] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("_token")) {
      let token = localStorage.getItem("_token");
      console.log(token);
      let decode = jwt_decode(token);
      console.log(decode);
      var detail = decode.uid[0];
      setUserdetail(detail);
      let data = { userid: detail._id };
      GETALLCART(data).then((res) => {
        if (res.data.err === 0) {
          dispatch({ type: "ADD_TO_CART", payload: res.data.cartdata });
          setAllcart(res.data.cartdata[0].products);
          console.log(res.data.cartdata[0].products);
          if (res.data.cartdata[0].products != undefined) {
            const count = res.data.cartdata[0].products;
            console.log(count.length);
            dispatch({ type: "CART_COUNT", payload: count.length });
          }
          console.log("got the cart product");
        }
        let MaxTotal = 0;
        {
          res.data.cartdata[0].products.map(
            (pro) =>
              (MaxTotal +=
                parseInt(pro.product_id.product_cost) *
                parseInt(pro.product_count))
          );
        }
        setsubTotal(MaxTotal);
      });
    } else {

      NotificationManager.error("please login first", 'Error',1500);
      setTimeout(() => {
        history.push("/login");
      }, 2000);
      
    }
  }, [flag]);

  const removeCart = (key) => {
    let data = { userid: Userdetail._id, productid: key };
    console.log(data);
    REMOVECART(data).then((res) => {
      if (res.data.err === 1) {
        alert(res.data.msg);
      } else {
        NotificationManager.success("removed product from cart", 'Success',2000);
        setflag(!flag);
      }
    });
  };

  const increasecount = (key) => {
    let data = { userid: Userdetail._id, productid: key };
    console.log(data);
     INC(data).then((res) => {
      if (res.data.err === 1) {
        alert(res.data.msg);
        NotificationManager.warning(res.data.msg, 'Warning',2000);
      } else {
        NotificationManager.success("Increased Count", 'Added',1000);
        let data = { userid: Userdetail._id };
        GETALLCART(data).then((res) => {
          if (res.data.err === 0) {
            dispatch({ type: "ADD_TO_CART", payload: res.data.cartdata });
            const count = res.data.cartdata[0].products;
            console.log(count.length);
            dispatch({ type: "CART_COUNT", payload: count.length });
            console.log("got the cart product");
          }
        });
        setflag(!flag);
      }
    }); 
  };

  const decreasecount = (key) => {
    let data = { userid: Userdetail._id, productid: key };
    console.log(data);
     DEC(data).then((res) => {
      if (res.data.err === 1) {
        alert(res.data.msg);
      } else {
        NotificationManager.success("Decreased Count", 'Removed',1000);
        let data = { userid: Userdetail._id };
        GETALLCART(data).then((res) => {
          if (res.data.err === 0) {
            dispatch({ type: "ADD_TO_CART", payload: res.data.cartdata });
            const count = res.data.cartdata[0].products;
            console.log(count.length);
            dispatch({ type: "CART_COUNT", payload: count.length });
            console.log("got the cart product");
          }
        });
        setflag(!flag);
      }
    }); 
  };


  return (
    <Container>
      <NotificationContainer />
      <div className="App bg-light  m-4">
        <section className="section-content padding-y">
          <div className="container">
            <div className="row">
              <main class="col-md-12 col-sm-12 col-lg-8">
                <div className="card">
                  <table className="table table-borderless table-shopping-cart">
                    <thead className="text-muted">
                      <Row className="small text-uppercase">
                        <Col lg={4} sm={12} md={4} className="fw-bold">Product</Col>
                        <Col lg={3} sm={12} md={4} className="fw-bold">Quantity</Col>
                        <Col lg={2} sm={12} md={2} className="fw-bold">Price</Col>
                        <Col lg={3} sm={12} md={2}  className="text-right">
                          {" "}
                        </Col>
                      </Row>
                    </thead>
                    <tbody>
                      {Allcart
                        ? Allcart.map((product) => (
                            <Row>
                              <Col lg={4} sm={12} md={4} className="griding">
                                <figure className="itemside">
                                  <div className="aside">
                                    <img
                                      src={`images/products/${product.product_id.product_image[0]}`}
                                      height="100%"
                                      width="70%"
                                      className="img-sm"
                                    />
                                  </div>
                                  <figcaption className="info">
                                    <a href="#" className="title text-dark">
                                     <b>{product.product_id.product_name} </b> 
                                    </a>
                                    <p className="text-muted small">
                                      Size:
                                      {product.product_id.product_dimension}{" "}
                                      {/* Color: NavyBlue, <br /> Brand: Gucci */}
                                    </p>
                                  </figcaption>
                                </figure>
                              </Col>
                              <Col lg={3} sm={12} md={4} className="griding">
                              <Button className="rounded-circle" onClick={()=>decreasecount(product.product_id)}><strong>-</strong></Button>{" "} 
                             <b> {product.product_count} </b>
                              {" "} <Button className="rounded-circle" onClick={()=>increasecount(product.product_id)}><strong>+</strong></Button>
                                </Col>
                              <Col lg={2} sm={12} md={2} className="griding">
                                <div className="price-wrap">
                                  <var className="price">
                                   <b> Rs.
                                    {product.product_id.product_cost *
                                      product.product_count} </b>
                                  </var>{" "}
                                  <br />
                                  <small className="text-muted">
                                    Rs. {product.product_id.product_cost} each{" "}
                                  </small>
                                </div>
                              </Col>

                              <Col lg={3} sm={12} md={2} className="griding">
                                <Button variant="success" >
                                  {" "}
                                  <Trash
                                    size={30}
                                    className="rounded-circle"
                                    onClick={() =>
                                      removeCart(product.product_id)
                                    }
                                  />{" "}
                                </Button>
                              </Col>
                            </Row>
                          ))
                        : ""}
                    </tbody>
                  </table>

                  <div className="card-body border-top">
                    <Link to="/products" className="btn btn-light">
                      {" "}
                      <i className="fa fa-chevron-left"></i> Continue shopping{" "}
                    </Link>
                  </div>
                </div>
              </main>
              <aside className="col-md-12 col-sm-12 col-lg-4">
                <div className="card">
                  <div className="card-body">
                    <dl className="dlist-align">
                      <dt className="text-start">Sub Total price:</dt>
                      <dd className="text-right">Rs {subTotal}</dd>
                    </dl>
                    <dl className="dlist-align">
                      <dt className="text-start">GST(5%):</dt>
                      <dd className="text-right">Rs {(5 / 100) * subTotal}</dd>
                    </dl>
                    <dl className="dlist-align">
                      <dt className="text-start">Grand Total:</dt>
                      <dd className="text-right  h5">
                        <strong>{subTotal + (5 / 100) * subTotal}</strong>
                      </dd>
                    </dl>
                    <hr />
                    <p className="text-center mb-3">
                      <img src="images/payment.jpg" height="15%" width="90%" />
                    </p>
                  </div>
                </div>
                <div className="alert alert-success mt-3">
                  <p className="icontext">
                    <i className="icon text-success fa fa-truck"></i> Free
                    Delivery within 1-2 weeks
                  </p>
                </div>
                <div className="card-body border-top">
                  <Link to="/checkout" className="btn btn-primary btn-lg">
                    {" "}
                    Proceed To Buy<i className="fa fa-chevron-right"></i>{" "}
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </div>
    </Container>
  );
}

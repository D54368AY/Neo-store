import React, { useState, useEffect } from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import jwt_decode from "jwt-decode";
import { GETORDERS } from "../../config/myservice";
import { Link } from "react-router-dom";
export default function Orders() {
  const [orderData, setorderData] = useState();
  const [productdata, setproductdata] = useState();
  useEffect(() => {
    if (localStorage.getItem("_token") != undefined) {
      let token = localStorage.getItem("_token");
      console.log(token);
      let decode = jwt_decode(token);
      console.log(decode);
      let detail = decode.uid[0];
      console.log(detail);
      const data = { userid: detail._id };
      GETORDERS(data).then((res) => {
        if (res.data.err === 0) {
          setorderData(res.data.orderData);
          console.log(res.data.orderData[0].products);
          var arr = [];
          res.data.orderData.forEach((element) => {
            if (element.products) {
              element.products.forEach((element) => {
                arr.push(element);
              });
            }
          });
          console.log(arr);
          setproductdata(arr);
        } else {
          alert(res.data.msg);
        }
      });
    }
  }, []);

  return (
    <Container className="border">
      <Row className="border mt-3 mb-3 text-center"> 

     
      <h3>Order Details</h3>


       </Row> 

      {orderData ? (
        orderData.map((element, key) => (
          <>
           <strong> Order Id:-</strong> {element._id}
           <Row className="m-2 p-2">
          
            <Col lg={6} sm={8} md={6}>
              <Row>
                {orderData[key].products ? (
                  orderData[key].products.map((product) => (
                    <>
                      <Image
                      className="m-2"
                        alt="image"
                        src={`/images/products/${product.product_id.product_image[0]}`}
                        style={{ height: 100, width: 120 }}
                      />
                      {""}
                    </>
                  ))
                ) : (
                  <div>Not  found </div>
                )}
              </Row>
            </Col>
            <Col lg={2} sm={2} md={2} className="fw-bold" > Rs.{element.order_total} </Col>
            <Col lg={2} sm={2} md={2}>{element.order_date} </Col>
            <Col lg={2}>
              <Link to={`/pdf/${element._id}`}>
                {" "}
                <Button> Download Invoice pdf </Button>{" "}
              </Link>
            </Col>
          </Row>
          <hr />
          </>
        ))
      ) : (
        <h1> There's No Product In Your Order History</h1>
      )}
    </Container>
  );
}

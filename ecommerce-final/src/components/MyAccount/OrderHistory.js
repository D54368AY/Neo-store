import React, { useState, useEffect } from "react";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import jwt_decode from "jwt-decode";
import { GETORDERS } from "../../config/myservice";
import { Link } from "react-router-dom";
export default function OrderHistory() {
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
        } else {
          alert(res.data.msg);
        }
      });
    }
  }, []);

  return (
    <Container  className="border light" >
      {orderData ? (
        orderData.map((element, key) => (
          <Card className="mt-2 mb-2 ">
            <Card.Header>
              <strong>TRANSIT NO :- </strong> {element._id} <br />
              <p>
                <strong>placed order on -</strong> {element.order_date}{" "}
              </p>
            </Card.Header>
            <Card.Body>
              <Card.Title> Order Price : <i className="fa fa-inr"></i>{element.order_total} </Card.Title>
              <Row className="mt-2 mb-2">
                {orderData[key].products
                  ? orderData[key].products.map((product) => (
                      <>
                        <Image
                          alt="image"
                          src={`/images/products/${product.product_id.product_image[0]}`}
                          style={{ height: 100, width: 120 }}
                        />
                        {""}
                      </>
                    ))
                  : ""}
              </Row>
              <Link to={`/pdfbill/${element._id}`} >
              {" "} <Button variant="primary"  size='lg'> Download Invoice as PDF</Button>{" "}
              </Link>
            </Card.Body>
          </Card>
        ))
      ) : (
        <h3> No Order History Found </h3>
      )}
    </Container>
  );
}

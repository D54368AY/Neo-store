import React, { useEffect, useState } from "react";
import { Carousel, Card, Button, Row, Col } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import jwt_decode from "jwt-decode";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ADDTOCART, GETALLCART, GETAllProducts } from "../config/myservice";
export default function Dashboard() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const [highRating, setHighRating] = useState();
  const [UserDetail, setUserDetail] = useState();
  const ratingChanged = (newRating) => {
    console.log(newRating);
  };

  useEffect(() => {
    if (localStorage.getItem("_token") != undefined) {
      let token = localStorage.getItem("_token");
      console.log(token);
      let decode = jwt_decode(token);
      var detail = decode.uid[0];
      setUserDetail(detail);
      if (localStorage.getItem("cartItem")) {
        let arr = JSON.parse(localStorage.getItem("cartItem"));
        dispatch({ type: "CART_COUNT", payload: arr.length });
        arr.map((element) => {
          let Data = {
            productid: element,
            userid: detail._id,
          };
          console.log(Data);
          ADDTOCART(Data).then((res) => {
            if (res.data.err === 1) {
              alert(res.data.msg);
            } else {
               console.log(res);
              let data = { userid: detail._id };
              GETALLCART(data).then((res) => {
                if (res.data.err === 0) {
                  dispatch({ type: "ADD_TO_CART", payload: res.data.cartdata });
                  console.log(res.data.cartdata[0].products);
                  if (res.data.cartdata[0].products != undefined) {
                    const count = res.data.cartdata[0].products;
                    console.log(count.length);
                    dispatch({ type: "CART_COUNT", payload: count.length }); 
                  }
                }
              });
            }
          });
          return console.log('ok');
        });
        console.log("got the cart product");
        localStorage.removeItem("cartItem");

      }

      let data = { userid: detail._id };
      GETALLCART(data).then((res) => {
        if (res.data.err === 0) {
          dispatch({ type: "ADD_TO_CART", payload: res.data.cartdata });
          console.log(res.data.cartdata[0].products);
          if (res.data.cartdata[0].products != undefined) {
            const count = res.data.cartdata[0].products;
            console.log(count.length);
            dispatch({ type: "CART_COUNT", payload: count.length }); 
          }
        }
      });


    }
    



    GETAllProducts().then((res) => {
      if (res.data.err === 0) {

        
        dispatch({ type: "ALL_PRODUCTS", payload: res.data.allproducts });
        let Sorteddata = res.data.allproducts.sort((a, b) => {
          return b.product_rating - a.product_rating;
        });
        const slicedArray = Sorteddata.slice(0, 6);
        setHighRating(slicedArray);
      }
    });
  }, []);

  return (
    <div className=" container-fluid mt-2 mb-2">
      <Carousel fade>
        <Carousel.Item>
          <img
            className="d-block w-100 "
            src="images/carousels/carousel5.jpg"
            alt="First slide"
            style={{ maxHeight: "500px" }}
          />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 "
            src="images/carousels/carousel4.jpg"
            alt="Second slide"
            style={{ maxHeight: "500px" }}
          />

          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 "
            src="images/carousels/carousel2.jpg"
            alt="First slide"
            style={{ maxHeight: "500px" }}
          />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 "
            src="images/carousels/carousel1.jpg"
            alt="First slide"
            style={{ maxHeight: "500px" }}
          />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="images/carousels/carousel3.jpg"
            alt="Third slide"
            style={{ maxHeight: "500px" }}
          />

          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <div className="App mt-3">
        <h3>Popular Products</h3>
        <h6 className="mt-2">
          <NavLink to="/products" style={{ color: "black" }}>
            View All
          </NavLink>
        </h6>
        <div className="container">
          <Row className="App mb-5">
            {highRating
              ? highRating.map((product) => (
                  <Col lg={4} key={product._id} className="mb-1 mt-1">
                    <Card style={{ minHeight: 440 }}>
                      <Card.Img
                        variant="top"
                        src={`images/products/${product.product_image[0]}`}
                        height="250px"
                      />
                      <Card.Body>
                        <Card.Title>
                          <Link to={`/productdetails/${product._id}`}>
                            {" "}
                            {product.product_name}{" "}
                          </Link>
                        </Card.Title>
                        <Card.Text>
                        <div className="d-flex justify-content-center">
                          <ReactStars
                            count={5}
                            value={product.product_rating}
                            onChange={ratingChanged}
                            edit={false}
                            size={40}
                            isHalf={true}
                            emptyIcon={<i className="far fa-star"></i>}
                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                            fullIcon={<i className="fa fa-star"></i>}
                            activeColor="#ffd700"
                          />
                          </div>
                        </Card.Text>
                        <Button variant="primary">Add to Cart</Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              : " "}
          </Row>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect, useCallback } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Badge,
  Card
} from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import jwt_decode from "jwt-decode";
import Notifications,{ notify} from 'react-notify-toast';
/* import 'react-notifications/lib/notifications.css';
import{NotificationContainer,NotificationManager} from 'react-notifications' */
import {
  StarFill,
  ArrowUp,
  ArrowDown,
  CaretDownFill,
  CaretRightFill,
  ArrowBarRight,
  Cart3,
} from "react-bootstrap-icons";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch,
  Link,
  useHistory,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Paginations from "./Pagination";
import {
  ADDTOCART,
  GETALLCART,
  GETAllProducts,
  GETSORTDOWN,
  GETSORTUP,
} from "../../config/myservice";

export default function Products() {
  const history = useHistory();
  const dispatch = useDispatch();
  const searchValue = useSelector((state) => state.keyname);
  const cartProduct = useSelector((state) => state.cart);

  const [useDetail, setUserDetail] = useState();
  const [AllProducts, setAllProducts] = useState();
  const [AllColors, setAllColors] = useState();
  const [AllCategory, setAllCategory] = useState();
  const [displayProducts, setDisplayProducts] = useState();
  const [showcat, setshowcat] = useState(false);
  const [showcolor, setshowcolor] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filter, setFilter] = useState({ category: "", color: "" });


  const [Color, setColor] = useState();
  const [Category, setCategory] = useState();

  const handlecat = () => setshowcat(!showcat);
  const handlecolor = () => setshowcolor(!showcolor);

  const showAll = () => {
    setDisplayProducts(AllProducts);
    setFilter({ category: "", color: "" });
  };

  const filterCategories = (key) => {
    setSelectedCategory(key);
    setFilter({ ...filter, category: key });
  };

  const filterColors = (key) => {
    setSelectedColor(key);
    setFilter({ ...filter, color: key });
  };

  const ratingChanged = (newRating) => {
    console.log(newRating);
  };

  useEffect(() => {
    GETAllProducts().then((res) => {
      if (res.data.err === 0) {
        dispatch({ type: "ALL_PRODUCTS", payload: res.data.allproducts });
        console.log(res.data.allproducts);
        setAllProducts(res.data.allproducts);
        setAllColors(res.data.colors);
        setAllCategory(res.data.categories);
        const col = res.data.colors.map((value) => value.color_name);
        console.log(col);
        setColor(col);
        const cat = res.data.categories.map((value) => value.category_name);
        console.log(cat);
        setCategory(cat);

        if (selectedCategory === "" && selectedColor === "") {
          setDisplayProducts(res.data.allproducts);
        } else if (selectedCategory !== "" && selectedColor === "") {
          const filterProduct = AllProducts.filter(
            (product) => product.category_id.category_name === selectedCategory
          );
          console.log(filterProduct);
          setDisplayProducts(filterProduct);
        } else if (selectedCategory === "" && selectedColor !== "") {
          const filterProduct = AllProducts.filter(
            (product) => product.color_id.color_name === selectedColor
          );
          console.log(filterProduct);
          setDisplayProducts(filterProduct);
        } else if (selectedCategory !== "" && selectedColor !== "") {
          const filterProduct = AllProducts.filter(
            (product) =>
              product.color_id.color_name === selectedColor &&
              product.category_id.category_name === selectedCategory
          );
          console.log(filterProduct);
          setDisplayProducts(filterProduct);
        }

        if (searchValue) {
          console.log(searchValue);
          const searchfilter = res.data.allproducts.filter((product) => {
            if (searchValue === "") {
            } else if (
              product.product_name
                .toLowerCase()
                .includes(searchValue.toLowerCase())
            ) {
              return product;
            }
          });
          setDisplayProducts(searchfilter);
        }
      }
      if (localStorage.getItem("_token") != undefined) {
        let token = localStorage.getItem("_token");
        console.log(token);
        let decode = jwt_decode(token);
        console.log(decode);
        var detail = decode.uid[0];
        setUserDetail(detail);
        let data = { userid: detail._id };
        GETALLCART(data).then((res) => {
          if (res.data.err === 0) {
            dispatch({ type: "ADD_TO_CART", payload: res.data.cartdata });
            console.log(res.data.cartdata);
            console.log("got the cart product");
          }
        });
      }
    });
  }, [selectedColor, selectedCategory, searchValue]);

  const [currentPage, setCurrentPage] = useState(1);
  let NUM_OF_RECORDS = 100;
  let LIMIT = 9;

  const onPageChanged = useCallback(
    (event, page) => {
      event.preventDefault();
      setCurrentPage(page);
    },
    [setCurrentPage]
  );
  const currentData =
    displayProducts &&
    displayProducts.slice(
      (currentPage - 1) * LIMIT,
      (currentPage - 1) * LIMIT + LIMIT
    );

  const sortPriceUp = () => {
    console.log("working on price sort");
    let Sorteddata = displayProducts.sort((a, b) => {
      return a.product_cost - b.product_cost;
    });
    setDisplayProducts([...Sorteddata]);
  };
  const sortPriceDown = () => {
    console.log("working on price sort");
    let Sorteddata = displayProducts.sort((a, b) => {
      return b.product_cost - a.product_cost;
    });
    setDisplayProducts([...Sorteddata]);
  };
  const ratingSort = () => {
    console.log("working on rating sort");
    let Sorteddata = displayProducts.sort((a, b) => {
      return b.product_rating - a.product_rating;
    });
    setDisplayProducts([...Sorteddata]);
  };

  const addtoCart = (key) => {
    if (localStorage.getItem("_token") == undefined) {
 
       if (localStorage.getItem("cartItem") == undefined) {
        let arr = [];
        arr.push(key);
        localStorage.setItem("cartItem", JSON.stringify(arr));
        dispatch({ type: "CART_COUNT", payload: arr.length });
        notify.show('Hey !!!!.....product added to cart!!!','success',3000);
      } else {
        let arr = JSON.parse(localStorage.getItem("cartItem"));
        arr.push(key);
        localStorage.setItem("cartItem", JSON.stringify(arr));
        dispatch({ type: "CART_COUNT", payload: arr.length });

        notify.show('Hey !!!!.....product added to cart!!!','success',3000);
      } 
    } else {
      let Data = {
        productid: key,
        userid: useDetail._id,
      };
      console.log(Data);
      ADDTOCART(Data).then((res) => {
        if (res.data.err === 1) {
          alert(res.data.msg);
        } else {
          /* alert(res.data.msg); */
            notify.show('Hey !!!!.....'+res.data.msg,'success',3000);  
       /*   NotificationManager.info('product added to cart!!!'); */
          let data = { userid: useDetail._id };
          GETALLCART(data).then((res) => {
            if (res.data.err === 0) {
              dispatch({ type: "ADD_TO_CART", payload: res.data.cartdata });
              const count = res.data.cartdata[0].products;
              console.log(count.length);
              dispatch({ type: "CART_COUNT", payload: count.length });
              console.log("got the cart product");
            }
          });
        }
      });
    }
  };

  return (
    <Container fluid>
     
     <Notifications  />

      <Row className="mt-3 pl-4 pr-4">
        <Col lg={8}>
          <tr>
            <h3>
              {" "}
              {filter && (
                <>
                  {/* <b>Filter :-</b> */}
                  {filter.category && (
                    <>
                      {" "}
                      <Badge pill bg="primary">
                        {filter.category}
                        <ArrowBarRight />
                      </Badge>{" "}
                    </>
                  )}
                  {filter.color && (
                    <>
                      <Badge pill bg="primary">
                        {filter.color}
                        <ArrowBarRight />
                      </Badge>{" "}
                    </>
                  )}
                </>
              )}
            </h3>
          </tr>
        </Col>

        <Col lg={4}>
          <Row>

            <Col  className="text-end">
              <Button
                variant="primary"
                className="rounded-circle"
                onClick={ratingSort}
              >
                {" "}
                <StarFill size={14} />{" "}
              </Button>{" "}
              <Button
                variant="primary"
                className="rounded-circle"
                onClick={sortPriceUp}
              >
                {" "}
                <i className="fa fa-inr"></i>
                <ArrowUp size={14} />{" "}
              </Button>{" "}
              <Button
                variant="primary"
                className="rounded-circle"
                onClick={sortPriceDown}
              >
                {" "}
                <i className="fa fa-inr"></i>
                <ArrowDown size={14} />{" "}
              </Button>
            </Col>
          </Row>
        </Col>
       
      </Row>
      <Row>
        <Col lg={3} className="text-center mt-4">
          <p
            variant="light"
            size="lg"
            onClick={showAll}
            className="bottom-border"
          >
            All Product
          </p>
          <p
            variant="light"
            onClick={handlecat}
            size="lg"
            className="bottom-border"
          >
            {showcat ? <CaretDownFill /> : <CaretRightFill />}Category
          </p>
          {showcat ? (
            <span >
              {Category.map((ele) => (
                <p
                  variant="light"
                  key={ele}
                   style={{ width: "100%" }} 
                  className="ele"
                  onClick={() => filterCategories(ele)}
                >
                  {ele}
                </p>
              ))}
            </span>
          ) : (
            ""
          )}
          <p
            variant="light"
            onClick={handlecolor}
            size="lg"
            className="bottom-border"
          >
            {showcolor ? <CaretDownFill /> : <CaretRightFill />}Color
          </p>
          <br />
          {showcolor ? (
            <span>
              {Color.map((ele) => (
                <Button
                  style={{ backgroundColor: ele }}
                  key={ele}
                  size="lg"
                  className="m-2 p-3 ele"
                  onClick={() => filterColors(ele)}
                ></Button>
              ))}
            </span>
          ) : (
            ""
          )}
          <br />
        </Col>

        <Col>
          <Row>
            {currentData
              ? currentData.map((product) => (
                  <Col lg={4} md={6} key={product._id} className="mb-3 mt-1">
                    <Card className="p-2">
                      <Card.Img
                        variant="top"
                        src={`images/products/${product.product_image[0]}`}
                        height="250px"
                      />
                      <Card.Body className="text-center">
                        <Card.Title>
                          <span className="cardtext">
                          <Link to={`/productdetails/${product._id}`}>
                            {" "}
                            {product.product_name}{" "}
                          </Link>{" "}
                          </span>
                          <br />
                          <br /> <i className="fa fa-inr"></i>{" "}
                          {product.product_cost}
                        </Card.Title>
                        <Card.Text>
                          <br />
                          <Button
                            variant="success"
                            onClick={() => addtoCart(product._id)}
                          >
                            Add To Cart
                          </Button>{" "}
                          <div className="d-flex justify-content-center">
                          <ReactStars
                            count={5}
                            value={product.product_rating}
                            onChange={ratingChanged}
                            size={40}
                            edit={false}
                            isHalf={true}
                            emptyIcon={<i className="far fa-star"></i>}
                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                            fullIcon={<i className="fa fa-star"></i>}
                            activeColor="#ffd700"
                          />
                          </div>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              : ""}
          </Row>

          <div className="pagination-wrapper pg">
            <Paginations
              totalRecords={NUM_OF_RECORDS}
              pageLimit={LIMIT}
              pageNeighbours={2}
              onPageChanged={onPageChanged}
              currentPage={currentPage}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

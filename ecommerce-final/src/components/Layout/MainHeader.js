import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Nav,
  Navbar,
  Button,
  Col,
  Row,
  Form,
  FormControl,
  InputGroup,
  Dropdown,
  DropdownButton,
  Badge,
} from "react-bootstrap";
import { Cart, CartCheck, CartCheckFill, CartFill, PersonBadgeFill  } from "react-bootstrap-icons";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Link,
  Switch,
  useHistory,
} from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useSelector, useDispatch } from "react-redux";
import { GETALLCART } from "../../config/myservice";
export default function MainHeader() {
  const history = useHistory();
  const tokendata = useSelector((state) => state.token);
  const productData = useSelector((state) => state.products);
  const carttotal = useSelector((state) => state.cartcount);

  const [Query, setQuery] = useState();
  const [Cartcount, setCartcount] = useState(0);
  const [UserDetail, setUserDetail] = useState();
  const searchKey = useRef("");
  const dispatch = useDispatch();

  useEffect(() => {
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
          /*  setCartcount(res.data.cartdata[0].products.length) */
          setCartcount(carttotal);
        }
      });
    }
    if (localStorage.getItem("cartItem") != undefined) {
      let arr = JSON.parse(localStorage.getItem("cartItem"));
      setCartcount(arr.length);
    }
  }, [carttotal]);

  const routeLogout = () => {
    localStorage.removeItem("_token");
    dispatch({ type: "LOGOUT" });
    dispatch({ type: "CART_COUNT", payload: 0 });
    setCartcount(0)
    history.push("/login");
  };
  const redirectOrder = () => {
    
    if (tokendata) {
      history.push("/orders");
    } else {
      history.push("/login");
    }
  };

  const keySearch = (event) => {
     history.push("/products"); 
    setQuery(event.target.value);
    dispatch({ type: "SEARCH", payload: Query });
    console.log(event.target.value);
  };
  const redirectCart = () => {
    history.push("/cart");

  };

  return (
    <div className="container-fluid">
      <Navbar bg="dark" expand="lg" className="container-fluid">
        <Navbar.Brand>
          <big>
            <b style={{color:'white'}}>
              Neo<font color="#cc0000">STORE</font>
            </b>
          </big>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="btn-light text-light bg-light"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto font-weight-bold  nav-inline">
            <Nav.Link className="mr-5 ">
              <NavLink
                to="/"
                style={{ textDecoration: "none", color: "white" }}
              >
                Home{" "}
              </NavLink>
            </Nav.Link>
            <Nav.Link className="mr-5">
              <NavLink
                to="/products"
                style={{ textDecoration: "none", color: "white" }}
              >
                Products{" "}
              </NavLink>
            </Nav.Link>
            <Nav.Link className="mr-5">
              <span
                onClick={redirectOrder}
                variant="link"
                style={{ textDecoration: "none", color: "white" }}
              >
                <b> Order</b>{" "}
              </span>
            </Nav.Link>
          </Nav>
          <Nav className="ml-auto">
            <Form  className="searchbox">
              <FormControl
                type="search"
                onChange={keySearch}
                placeholder="Search"
                 className="searchinput" 
                aria-label="Search"
              />
            </Form>
            <Button
              variant="light"
              className="ml-3 mr-3 cartbutton"
              onClick={redirectCart}
            >
              <CartCheckFill size={20} />
              {/* <sup> */}
                {" "}
                <Badge bg="primary">{Cartcount}</Badge>
             {/*  </sup> */}
            </Button>

            <DropdownButton
              variant="light"
              title={<PersonBadgeFill />}
              id="input-group-dropdown-1"
              className="ml-3 dropdown"
              drop="start"
            >
              {tokendata ? (
                <>
                  {" "}
                  <Dropdown.Item>
                    <Link
                      to="/myaccount"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      Your Account
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item
                    onClick={routeLogout}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    Logout
                  </Dropdown.Item>{" "}
                </>
              ) : (
                <Dropdown.Item>
                  <Link
                    to="/login"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    Login
                  </Link>
                </Dropdown.Item>
              )}
            </DropdownButton>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

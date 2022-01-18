import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Tabs,
  Tab,
  Modal,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Image } from "react-bootstrap";
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TwitterIcon,
  TwitterShareButton,
  LinkedinShareButton,
  LinkedinIcon,
  TelegramShareButton,
  TelegramIcon,
  InstapaperShareButton,
  InstapaperIcon,
} from "react-share";
import 'react-notifications/lib/notifications.css';
import{NotificationContainer,NotificationManager} from 'react-notifications' 
import ReactStars from "react-rating-stars-component";
import { Share, ShareFill } from "react-bootstrap-icons";
import {
  Magnifier,
  GlassMagnifier,
  SideBySideMagnifier,
  PictureInPictureMagnifier,
  MOUSE_ACTIVATION,
  TOUCH_ACTIVATION,
} from "react-image-magnifiers";
import { RATEPRODUCT } from "../../config/myservice";

export default function Producthetail(props) {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const product_id = props.match.params.id;
  const [selectedImage, setselectedImage] = useState();
  const [Rating, setRating] = useState(0);
  const [selectedProduct, setselectedProduct] = useState();
  const [flag, setflag] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const ratingChanged = (newRating) => {
    console.log(newRating);
    setRating(newRating);
  };

  const ratingSubmit = () => {
    const data = {
      id: selectedProduct._id,
      rate: Rating,
    };
    console.log(data);
    RATEPRODUCT(data).then((res) => {
      if (res.data.err === 0) {
        alert(res.data.msg);
        NotificationManager.success(res.data.msg, 'Success');
        setShow(false);
        setflag(!flag);
      }
    });
  };

  useEffect(() => {
    const filterproduct =
      products && products.filter((pro) => pro._id === product_id);
    setselectedProduct(filterproduct[0]);
    setselectedImage(filterproduct[0].product_image[0]);
    console.log(filterproduct[0].product_image[0]);
  }, [flag]);

  const mainImage = (key) => {
    const image = selectedProduct.product_image[key];
    console.log(image);
    setselectedImage(image);
  };

  return (
    <Container fluid>
      <NotificationContainer />
      {selectedProduct && (
        <Container className="mt-4 mb-4 p-3 bg-light ">
          <Row>
            <Col lg={6} className="">
              {selectedProduct && (
                <SideBySideMagnifier
                  imageSrc={`/images/products/${selectedImage}`}
                  imageAlt="main img"
                  style={{  width: '100%' }}
                />
              )}

              <Row className="mt-3 text-center">
                <Col>
                  {selectedProduct && (
                    <Image
                      onClick={() => mainImage(1)}
                      className="border border-dark"
                      alt="bottom first"
                      src={`/images/products/${selectedProduct.product_image[1]}`}
                      style={{ height: 80, width: 110 }}
                    />
                  )}
                </Col>
                <Col>
                  {selectedProduct && (
                    <Image
                      onClick={() => mainImage(2)}
                      className="border border-dark"
                      alt="bottom second"
                      src={`/images/products/${selectedProduct.product_image[2]}`}
                      style={{ height: 80, width: 110 }}
                    />
                  )}{" "}
                </Col>
                <Col>
                  {selectedProduct && (
                    <Image
                      onClick={() => mainImage(3)}
                      className="border border-dark"
                      alt="bottom third"
                      src={`/images/products/${selectedProduct.product_image[3]}`}
                      style={{ height: 80, width: 110 }}
                    />
                  )}{" "}
                </Col>

              </Row>
            </Col>

            <Col lg={6} className="mt-4 ">
              <Magnifier />
              <h3>{selectedProduct && selectedProduct.product_name} </h3>
              {selectedProduct && (
                <ReactStars
                  count={5}
                  value={selectedProduct.product_rating}
                  size={50}
                  isHalf={true}
                  edit={false}
                  emptyIcon={<i className="far fa-star"></i>}
                  halfIcon={<i className="fa fa-star-half-alt"></i>}
                  fullIcon={<i className="fa fa-star"></i>}
                  activeColor="#ffd700"
                />
              )}
              <hr className="bg-light" />
              <p>
                <tr>
                  <th width="100px">Price :-</th>
                  <td>
                    <i className="fa fa-inr"></i>
                    {selectedProduct.product_cost}
                  </td>
                </tr>
              </p>
              <p>
                <tr>
                  <th width="100px">Color :-</th>
                  <td>
                    <i style={{ backgroundColor: "black" }}> bbbb</i>
                  </td>
                </tr>
              </p>
              <p>
                <tr>
                  <th width="100px">Material :-</th>
                  <td>{selectedProduct.product_material}</td>
                </tr>
              </p>
              <b>
                <tr>
                  <th width="100px">Sharing : -</th>
                  <td>
                    <ShareFill size={30} />
                  </td>
                </tr>
              </b>
              <div className="ml-3 mt-3">
                <FacebookShareButton url="#">
                  <FacebookIcon className="btn-circle1" logoFillColor="white" />
                </FacebookShareButton>{" "}
                <WhatsappShareButton url="#">
                  <WhatsappIcon className="btn-circle1" logoFillColor="white" />
                </WhatsappShareButton>{" "}
                <TwitterShareButton url="#">
                  <TwitterIcon className="btn-circle1" logoFillColor="white" />
                </TwitterShareButton>{" "}
                <LinkedinShareButton url="#">
                  <LinkedinIcon className="btn-circle1" logoFillColor="white" />
                </LinkedinShareButton>{" "}
                <InstapaperShareButton url="#">
                  <InstapaperIcon
                    className="btn-circle1"
                    logoFillColor="white"
                  />
                </InstapaperShareButton>{" "}
                <TelegramShareButton url="#">
                  <TelegramIcon className="btn-circle1" logoFillColor="white" />
                </TelegramShareButton>{" "}
              </div>

              <tr>
                <th>
                  <Button className="mt-4 mr-2 " size="lg">Add Cart</Button>
                </th>
                <th>
                  <Button
                  size="lg"
                    className="mt-4 "
                    onClick={handleShow}
                    variant="danger"
                  >
                    Add Ratings
                  </Button>
                </th>
              </tr>
            </Col>
          </Row>
          <Container className="m-3">
            <Tabs
              defaultActiveKey="home"
              transition={false}
              id="noanim-tab-example"
              className="mb-3"
              variant="tabs"
            >
              <Tab eventKey="home" title="Description">
                <Row>
                  <Col lg={2}></Col>
                  <Col lg={8}>
                    <b> {selectedProduct.product_desc} </b>
                  </Col>
                  <Col lg={2}></Col>
                </Row>
              </Tab>
              <Tab eventKey="profile" title="Feature">
                <Row className="mt-3">
                  <Col lg={4} md={4}  sm={4} className="text-end">
                    <b> Stock :</b>{" "}
                  </Col>
                  <Col lg={8} md={8}  sm={8}>
                    {" "}
                    {selectedProduct.product_stock} (This Could Defer in Some
                    Number After Some Time){" "}
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col lg={4} md={4}  sm={4} className="text-end">
                    <b> Material : </b>
                  </Col>
                  <Col lg={8} md={8}  sm={8}>
                    {selectedProduct.product_material} (Material Used For
                    Product are Qualitative){" "}
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col lg={4} className="text-end">
                    <b> Dimension : </b>
                  </Col>
                  <Col lg={8}>
                    {selectedProduct.product_dimension} (Dimension with respect
                    to SI units){" "}
                  </Col>
                </Row>
              </Tab>
            </Tabs>
          </Container>
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
        <div className="bg-secondary">
          <Modal.Header closeButton>
            <Modal.Title>Please Give Rating</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Card>
              <ReactStars
                count={5}
                value={0}
                onChange={ratingChanged}
                size={50}
                isHalf={true}
                emptyIcon={<i className="far fa-star"></i>}
                halfIcon={<i className="fa fa-star-half-alt"></i>}
                fullIcon={<i className="fa fa-star"></i>}
                activeColor="#ffd700"
              />
            </Card>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={ratingSubmit}>
              Submit
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </Container>
  );
}

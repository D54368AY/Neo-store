import React from "react";
import Pdf from "../../terms.pdf";
import {
  Container,
  Button,
  Col,
  Row,
  Form,
  FormControl,
} from "react-bootstrap";
export default function MainFooter() {
  return (
    <div className="container-fluid text-light">
      <Row
        style={{ background: "#212529" }} /* className='text-light padding1' */
      >
        <Col lg={4} md={4} className="text-center  ">
          <h4>About Company</h4>
          <p>
            NeoSOFT Technologies is here at your quick and easy service for
            shooping
          </p>
          <p>
          <a 
          style={{ textDecoration: "none", color: "white" }}
          href = "mailto: abc@example.com"> 
            Contact information
            </a>
            </p>
          <p>
          <a 
          style={{ textDecoration: "none", color: "white" }}
          href = "mailto: abc@example.com">
            email:contact@neosofttech.com
            </a>
            </p>
          <p>
            <a 
            style={{ textDecoration: "none", color: "white" }}
            href="Tel: 123-456-7890"
            > 
            Phone: +91 0000000000 
            </a>
            </p>
          <p>PUNE,INDIA</p>
        </Col>
        <Col lg={4} md={4} className="text-center ">
          <h4>Information </h4>
         <p><a
            href={Pdf}
            style={{ textDecoration: "none", color: "white" }}
            target="_blank"
          >
            Terms and Condition
          </a>
          </p> 
         <p> <a 
           href={Pdf}
           style={{ textDecoration: "none", color: "white" }}
           target="_blank"
          >
            Gurantee and Return Policy 
          </a>
          </p>
         <p> <a
          href="https://www.neosofttech.com/"
          style={{ textDecoration: "none", color: "white" }}
          target="_blank"
          >
            Contact Us
            </a>
            </p>
          <p>Privacy Policy</p>
         <p> <a 
          href="https://www.google.com/maps/place/NeoSOFT+Technologies/@18.5790021,73.7387793,15z/data=!4m5!3m4!1s0x0:0x316090d140dfd0b3!8m2!3d18.579388!4d73.7388023"
          style={{ textDecoration: "none", color: "white" }}
          target="_blank"
          >Locate Us</a>
          </p>
        </Col>
        <Col lg={4} md={4} className="text-center paddingissue">
          <h4>Newsletter </h4>
          <p>
            Signup to get exclusive offer from our favorite brands and to be
            well up in the news
          </p>
          <Form>
            <FormControl type="email" placeholder="your email..." />
            <Button variant="light" className="mt-2">
              Subscribe
            </Button>
          </Form>
        </Col>
        <Col lg={12} className="text-center">
          Copyright 2017 NeoSOFT Technologies All rights reserved | Design By
          Anonymous
        </Col>
      </Row>
    </div>
  );
}

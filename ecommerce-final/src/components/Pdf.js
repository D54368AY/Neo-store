 import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Container, Row, Col, Table, Button } from 'react-bootstrap'
import {ArrowLeftSquare, Download, FilePdf} from 'react-bootstrap-icons'
import ReactToPdf from 'react-to-pdf'
/* import '../Css/Pdf.css' */
import jwt_decode from 'jwt-decode'
import { GETSINGLEORDER } from '../config/myservice'
const options = {
    orientation: 'landscape',
    unit: 'in',
    format: 'A4'
};

export default function Pdf(props) {
    const order_id = props.match.params.id;
    const [OrderDetails, setOrderDetails] = useState('')
    const [UserData, setUserData] = useState('')
      const ref = React.createRef();  
    const history=useHistory()
    useEffect(() => {
        
        const data = { orderid: order_id };
      GETSINGLEORDER(data).then((res) => {
        if (res.data.err === 0) {
            setOrderDetails(res.data.orderData[0]);
            console.log(res.data.orderData[0]);
        }
    })

        let token = localStorage.getItem('_token')
        let decode = jwt_decode(token);
        console.log(decode.uid[0]);
        setUserData(decode.uid[0])

    }, [])
     const backtoorder=()=>{
        history.push('/myaccount')
    } 
    return (
        <div className='m-5 pdfclass'>
           
              <Container fluid  ref={ref} >
                 <Row  className='border border-success'>
                    
                    <Col lg={12}>
                        <Row>
                            <Col lg={6} sm={6} md={6}>
                                <h3><big><b>Neo<font color="#cc0000">STORE</font></b></big></h3>
                            </Col>
                            <Col lg={6} sm={6} md={6} className='text-end'>
                                <h4> Order Tracker No.</h4>
                                <p> {OrderDetails._id} </p>

                            </Col>
                            <div className='App'>
                            <hr  />
                            </div>
                            <Col lg={12} sm={12} md={12} className='text-start'>
                                <h4>Valuable Customer</h4>
                                <p> {UserData.firstname} {UserData.lastname} </p>
                                <p>{UserData.email}</p>
                                <p>Mobile no. {UserData.phone_no ? <span> {UserData.phone_no} </span> : <span>-</span>}</p>
                                <p>Order on : {OrderDetails.order_date}</p>
                                <p>Is Delivered: {OrderDetails.isdelivered ? <span style={{ color: 'Green' }}>True</span> : <span style={{ color: 'red' }}>False</span>} </p>
                            </Col>
                            <Col lg={12} sm={12} md={12}>
                                <Table /* striped */ bordered hover>
                                    <Row className='bg-dark text-light'>
                                        <Row className='text-center fw-bold'>
                                            <Col lg={3} sm={3} md={3}>Product</Col>
                                            <Col lg={3} sm={3} md={3}>Product Name</Col>
                                            <Col lg={1} sm={1} md={1}>Quantity</Col>
                                            <Col lg={2} sm={2} md={2}> Cost (for Each)</Col>
                                            <Col lg={3} sm={3} md={3}>Product Total</Col>
                                        </Row>
                                    </Row>
                                    <tbody>
                                        {OrderDetails.products && OrderDetails.products.map((ele) =>
                                            <Row key={ele._id} className='text-center'>
                                                <Col lg={3} sm={3} md={3}>

                                                    <img src={`/images/products/${ele.product_id.product_image[0]}`} height='80px' width='80px' />
                                                </Col>
                                                <Col lg={3} sm={3} md={3} className='productname'>
                                                    {ele.product_id.product_name}
                                                </Col>
                                                <Col lg={1} sm={1} md={1}>
                                                    {ele.product_count}
                                                </Col>
                                                <Col lg={2} sm={2} md={2}>
                                                    {ele.product_id.product_cost}
                                                </Col>
                                                <Col lg={3} sm={3} md={3}>
                                                    {(ele.product_count)*(ele.product_id.product_cost) }
                                                </Col>
                                            </Row>
                                        )}
                                    </tbody>
                                </Table>
                                <div className='alert alert-primary m-2 p-2 text-center icontext fw-bold'>
                                    Total Amount: Rs.{OrderDetails.order_total}
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row> 
            </Container>
            
             <div className='text-center m-3 p-3'>
                    <Button onClick={backtoorder} size='lg'  className='me-2'> <ArrowLeftSquare/> My Account</Button>
                  

<ReactToPdf targetRef={ref} filename={`${OrderDetails.order_date}.pdf`}  options={options} x={0.7} y={0.7} scale={0.68}>
        {({toPdf}) => (
            <Button size='lg' onClick={toPdf}>Generate pdf</Button>
        )}
    </ReactToPdf>
                </div>  
        </div>
    )
}
 
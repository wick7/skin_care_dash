import React, { useEffect, useState } from "react";
import axios from 'axios'

import { Card, CardBody, Row, Col } from "shards-react";

import "react-quill/dist/quill.snow.css";
import "../../assets/quill.css";

const ProductInfo = ({ singleProductData }) => {

  // const [data, setData] = useState()
  console.log('productinfo', singleProductData)
  useEffect(() => {
    // setData(singleProductData)
  }, [])

  const dateFormater = (dataDate) => {
    const event = new Date(dataDate);
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };

    return dataDate === null ? 'N/A' : event.toLocaleDateString('en-US', options)
  }

  const data = {
    product_name: singleProductData && singleProductData.product_name,
    brand_name: singleProductData && singleProductData.brand,
    category_name: singleProductData && singleProductData.category_name,
    date_purchased: singleProductData && singleProductData.date_purchased,
    date_opened: singleProductData && singleProductData.date_opened,
    date_finished: singleProductData && singleProductData.date_finished,
    repurchase: singleProductData && singleProductData.repurchase,
    oz_size: singleProductData && singleProductData.oz_size,
    quantity: singleProductData && singleProductData.quantity,
    price_paid: singleProductData && singleProductData.price_paid,
    price_per_oz: singleProductData && singleProductData.price_per_oz,
    notes: singleProductData && singleProductData.notes,
  }

  return (
    <div>
      <Row>
        <Col>
          <Card small className="mb-3">
            <CardBody>
              <Row>
                <Col sm="12" lg="12">
                  <h3>{data.product_name}</h3>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col sm="12" lg="6">
                  Brand: {data.brand_name}
                </Col>
                <Col sm="12" lg="6">
                  Category: {data.category_name}
                </Col>
              </Row>
              <Row className="mb-3">
                <Col sm="12" lg="6">
                  Date Purchased: {data.date_purchased}
                </Col>
                <Col sm="12" lg="6">
                  Date Opened: {data.date_opened}
                </Col>
              </Row>
              <Row className="mb-3">
                <Col sm="12" lg="6">
                  Date Finished: {data.date_finished}
                </Col>
                <Col sm="12" lg="6">
                  Repurchase?: {data.repurchase === 1 ? 'Yes' : 'Undecided'}
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col sm="12" lg="6">
          <Card className="mb-3">
            <CardBody>
              <table className="table mb-0">
                <thead className="bg-light">
                  <tr>
                    <th scope="col" className="border-0">
                      OZ Size
                  </th>
                    <th scope="col" className="border-0">
                      Quantity
                  </th>
                    <th scope="col" className="border-0">
                      Price Paid
                  </th>
                    <th scope="col" className="border-0">
                      Price Per OZ
                  </th>
                  </tr>
                </thead>
                <tbody>
                  <td>{data.oz_size}</td>
                  <td>{data.quantity}</td>
                  <td>${data.price_paid}</td>
                  <td>${data.price_per_oz}</td>
                </tbody>
              </table>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md="12">
          <Card className="mb-12">
            <CardBody>
              <Row>
                <Col>
                  <h3>Notes</h3>
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  {data.notes}
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
};

export default ProductInfo;

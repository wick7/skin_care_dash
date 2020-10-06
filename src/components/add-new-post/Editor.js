import React, { useState, useReducer } from "react";
import ReactQuill from "react-quill";
import {
  Card, CardBody, Form, FormInput, FormTextarea, Row, Col, Button, Alert
} from "shards-react";

import "react-quill/dist/quill.snow.css";
import "../../assets/quill.css";

const Editor = () => {
  const [formAlert, setFormAlert] = useState(false)
  const [inputFields, setInputFields] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      product_name: '',
      brand: '',
      oz_size: '',
      price_paid: '',
      price_per_oz: '',
      notes: ''
    })

  const handleChange = evt => {
    console.log(evt)
    const name = evt.target.name;
    const newValue = evt.target.value;
    console.log(name, newValue)
    setInputFields({ [name]: newValue });
  }

  const handleOnSubmit = () => {
    if (inputFields.oz_size === '' || inputFields.price_paid === '') {
      setFormAlert(true)
    } else {
      console.log('Submitted to API')
      setFormAlert(false)
      setInputFields({
        product_name: '',
        brand: '',
        oz_size: '',
        price_paid: '',
        price_per_oz: undefined === this ? '' : this.oz_size / this.price_paid,
        notes: ''
      })
    }

  }

  let pricePerOz = inputFields.oz_size / inputFields.price_paid
  return (
    <Card small className="mb-3">
      <CardBody>
        <Form className="add-new-post">
          <Row form>
            <Col md="6" className="form-group">
              <label>Product Name</label>
              <FormInput
                name="product_name"
                value={inputFields.product_name}
                type="plaintext"
                placeholder="Product Name"
                onChange={handleChange}
              />
            </Col>
            <Col md="6">
              <label>Brand</label>
              <FormInput
                name="brand"
                value={inputFields.brand}
                type="plaintext"
                placeholder="Brand"
                onChange={handleChange}
              />
            </Col>
          </Row>
          <Row form>
            <Col md="6" className="form-group">
              <label>OZ Size</label>
              <FormInput
                name="oz_size"
                value={inputFields.oz_size}
                number
                placeholder="Product Name"
                onChange={handleChange}
              />
            </Col>
            <Col md="6">
              <label>Price Paid</label>
              <FormInput
                name="price_paid"
                value={inputFields.price_paid}
                number
                placeholder="Price Paid"
                onChange={handleChange}
              />
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <label>Price Per OZ</label>
              <FormInput
                name="price_per_oz"
                value={Number.isNaN(pricePerOz) ? '' : pricePerOz.toFixed(2)}
                number
                placeholder="Price Per OZ"
                onChange={handleChange}
                disabled
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <FormTextarea className="notes"
                name="notes"
                value={inputFields.notes}
                type="plaintext"
                placeholder="Add Notes"
                onChange={handleChange}
              />
            </Col>
          </Row>
          <Button theme="primary" onClick={handleOnSubmit}>Submit</Button>
          <Alert className="mb-3" open={formAlert} theme="warning">
            Warning: Oz Size and Price Paid are required fields.
        </Alert>
        </Form>
      </CardBody>
    </Card>
  )
};

export default Editor;

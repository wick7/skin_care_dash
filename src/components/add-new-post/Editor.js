import React, { useState, useReducer } from "react";
import ReactQuill from "react-quill";
import {
  Card, CardBody, Form, FormInput, FormTextarea, Row, Col, Button
} from "shards-react";

import "react-quill/dist/quill.snow.css";
import "../../assets/quill.css";

const Editor = () => {

  const [inputFields, setInputFields] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      product_name: '',
      brand: '',
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
    console.log('Submitted to API')
    console.log(inputFields)
    setInputFields({
      product_name: '',
      brand: '',
      notes: ''
    })
  }
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
        </Form>
      </CardBody>
    </Card>
  )
};

export default Editor;

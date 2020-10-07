import React, { useState, useReducer } from "react";
import axios from 'axios'

import {
  Card, CardBody, DatePicker, Form, FormInput, FormTextarea, FormFeedback, FormSelect, FormCheckbox, Row, Col, Button, Alert, InputGroup,
  InputGroupAddon,
  InputGroupText
} from "shards-react";

import "react-quill/dist/quill.snow.css";
import "../../assets/quill.css";

const Editor = () => {
  const [formAlert, setFormAlert] = useState(false)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formFailure, setFormFailure] = useState(false)
  const [repurchaseItemConfirm, setRepurchaseItemConfirm] = useState(false)

  const [inputFields, setInputFields] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      product_name: '',
      brand: '',
      oz_size: '',
      price_paid: '',
      price_per_oz: '',
      category: 1,
      quantity: 0,
      date_purchased: null,
      date_opened: null,
      date_finished: null,
      repurchase: false,
      notes: ''
    })

  let priceOzCaluation = inputFields.oz_size / inputFields.price_paid
  let pricePerOz = Number.isNaN(priceOzCaluation) ? '' : priceOzCaluation.toFixed(2)

  const handleChange = (evt) => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setInputFields({ [name]: newValue });
  }

  const fetchData = async (body) => {
    let newBody = JSON.stringify(body)

    axios.post(`http://localhost:3001/api/insert`, newBody, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      console.log(response);
      setFormSuccess(true)
    })
      .catch((error) => {
        console.log(error);
        setFormFailure(true)
      });

  };

  const handleOnSubmit = () => {
    if (inputFields.oz_size === '' || inputFields.price_paid === '') {
      setFormAlert(true)
      alertTimer()
    } else {
      inputFields.price_per_oz = parseInt(pricePerOz)
      inputFields.oz_size = parseInt(inputFields.oz_size)
      inputFields.price_paid = parseInt(inputFields.price_paid)
      inputFields.quantity = parseInt(inputFields.quantity)
      inputFields.category = parseInt(inputFields.category)

      fetchData(inputFields)

      alertTimer()

      setRepurchaseItemConfirm(false)
      setInputFields({
        product_name: '',
        brand: '',
        oz_size: '',
        price_paid: '',
        price_per_oz: '',
        category: 1,
        quantity: 0,
        date_purchased: null,
        date_opened: null,
        date_finished: null,
        repurchase: false,
        notes: ''
      })
    }

  }

  const handleStartDateChange = (value) => {
    const date = value.toLocaleDateString("fr-CA")
    setInputFields({
      ...value,
      ...{ date_purchased: date }
    });
  }

  const handleOpenDateChange = (value) => {
    const date = value.toLocaleDateString("fr-CA")
    setInputFields({
      ...value,
      ...{ date_opened: date }
    });
  }

  const handleEndDateChange = (value) => {
    const date = value.toLocaleDateString("fr-CA")
    setInputFields({
      ...value,
      ...{ date_finished: date }
    });
  }

  const handleRepurchaseConfirm = () => {
    setRepurchaseItemConfirm(!repurchaseItemConfirm)
    setInputFields({
      ...{ repurchase: !repurchaseItemConfirm }
    });
  }

  const alertTimer = () => {
    const timer = setTimeout(() => {
      setFormSuccess(false)
      setFormFailure(false)
      setFormAlert(false)
    }, 10000);
    return () => clearTimeout(timer);
  };

  const quanityItems = [1, 2, 3, 4, 5];
  const categoryItems = [
    { id: 1, category_name: 'Misc' },
    { id: 2, category_name: 'Face Wash' },
    { id: 3, category_name: 'Face Mask' },
    { id: 4, category_name: 'Toner' },
    { id: 5, category_name: 'Serum' },
    { id: 6, category_name: 'Makeup Remover' },
    { id: 7, category_name: 'Moisturizer' },
    { id: 8, category_name: 'Oil' },
    { id: 9, category_name: 'Sun Screen' },
    { id: 10, category_name: 'Hair' },
    { id: 11, category_name: 'Lips' },
    { id: 12, category_name: 'Body' },
  ]


  return (
    <Card small className="mb-3">
      <CardBody>
        <Form className="add-new-product">
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
                required
                invalid={formAlert}
              />
              <FormFeedback invalid>OZ Size Required</FormFeedback>
            </Col>
            <Col md="6">
              <label>Price Paid</label>
              <FormInput
                name="price_paid"
                value={inputFields.price_paid}
                number
                placeholder="Price Paid"
                onChange={handleChange}
                required
                invalid={formAlert}
              />
              <FormFeedback invalid>Price Paid Required</FormFeedback>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <label>Price Per OZ</label>
              <FormInput
                name="price_per_oz"
                value={pricePerOz}
                number
                placeholder="Price Per OZ"
                disabled
              />
            </Col>
          </Row>
          <Row form>
            <Col md="6" className="form-group">
              <label>Category</label>
              <FormSelect name="category" onChange={handleChange}>
                {categoryItems.map((value, index) => {
                  return <option id={value.id} value={index}>{value.category_name}</option>
                })}
              </FormSelect>
            </Col>
            <Col md="6">
              <label>Quantity</label>
              <FormSelect name="quantity" onChange={handleChange}>
                {quanityItems.map((value, index) => {
                  return <option id={index + 'q'}>{index + 1}</option>
                })}
              </FormSelect>
            </Col>
          </Row>
          <Row form>
            <Col md="6">
              <label>Dates:</label>
              <InputGroup className="d-flex my-auto date-range">
                <DatePicker
                  name="date_purchased"
                  size="sm"
                  selected={inputFields.date_purchased}
                  onChange={handleStartDateChange}
                  placeholderText="Purchased"
                  dropdownMode="select"
                  className="text-center"
                />
                <DatePicker
                  name="date_opened"
                  size="sm"
                  selected={inputFields.date_opened}
                  onChange={handleOpenDateChange}
                  placeholderText="Opened"
                  dropdownMode="select"
                  className="text-center"
                />
                <DatePicker
                  name="date_finished"
                  size="sm"
                  selected={inputFields.date_finished}
                  onChange={handleEndDateChange}
                  placeholderText="Finished"
                  dropdownMode="select"
                  className="text-center"
                />
                <InputGroupAddon type="append">
                  <InputGroupText>
                    <i className="material-icons">&#xE916;</i>
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </Col>
            <Col md="6">
              <label>Would you repurchase?</label>
              <FormCheckbox
                name="repurchase"
                onChange={handleRepurchaseConfirm}
                toggle
                checked={repurchaseItemConfirm}
                medium
              >
                Click to Acknowledge Repurchase
              </FormCheckbox>
            </Col>
          </Row>
          <Row form>
            <Col md="6" className="form-group">

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
          <Alert className="mb-3" open={formAlert} theme="warning" dismissible={false}>
            Warning: Oz Size and Price Paid are required fields.
        </Alert>
          <Alert open={formSuccess} theme="success">
            Success! Product Added!
          </Alert>
          <Alert open={formFailure} theme="danger">
            Failed! Product Not Added Please recheck your data!
          </Alert>
        </Form>
      </CardBody>
    </Card>
  )
};

export default Editor;

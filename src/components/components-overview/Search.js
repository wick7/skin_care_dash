import React from "react";
import {
  Form,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormInput,
  Button,
  FormSelect

} from "shards-react";

import "../../assets/search.css";

export default () => {
  return (
    <Form className="main-navbar__search w-100 filter-sort-flex">
      <InputGroup seamless className="ml-3">
        <InputGroupAddon type="prepend">
          <InputGroupText>
            <i className="material-icons">search</i>
          </InputGroupText>
        </InputGroupAddon>
        <FormInput
          className="navbar-search"
          placeholder="Search for something..."
        />
      </InputGroup>
      <InputGroup style={{ marginTop: '15px' }}>
        <strong className="text-muted d-block mb-2 filter-sort-label">Filter</strong>
        <FormSelect>
          <option>Last 30 days</option>
          <option>Last 60 days</option>
          <option>Something Else</option>
          <option>Reset</option>
        </FormSelect>
        <strong className="text-muted d-block mb-2 filter-sort-label">Sort</strong>
        <FormSelect>
          <option>Recent</option>
          <option>Product Name</option>
          <option>Something Else</option>
          <option>Reset</option>
        </FormSelect>
        <Button theme="primary" className="submit">Submit</Button>
      </InputGroup>
    </Form>
  )
};

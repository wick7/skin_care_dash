import React from "react";
import { Container, Row, Col, CardHeader } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import Editor from "../components/add-new-product/Editor";
// import SidebarActions from "../components/add-new-product/SidebarActions";
// import SidebarCategories from "../components/add-new-product/SidebarCategories";

const AddNewPost = () => (
  <Container fluid className="main-content-container px-4 pb-4">

    {/* Page Header */}
    <Row noGutters className="page-header py-4">
      <PageTitle sm="4" title="Add New Product" subtitle="Products" className="text-sm-left" />
    </Row>

    <Row>
      {/* Editor */}
      <Col lg="12" md="12">
        <Editor />
      </Col>

      {/* Sidebar Widgets */}
      {/* <Col lg="3" md="12">
        <SidebarActions />
        <SidebarCategories />
      </Col> */}
    </Row>
  </Container>
);

export default AddNewPost;

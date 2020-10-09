import React, { useState } from 'react';
import { Modal, ModalBody, ModalHeader, Button } from "shards-react";
import styled from "styled-components";
import axios from 'axios'

import Editor from '../../components/add-new-product/Editor.js'
import ProductInfo from './ProductInfo.js'

const ModalContainer = styled(Modal)`
  height: auto;
  position: relative;
  top: -25px;
  left: 5%;
`
const ModalBodyConainter = styled(ModalBody)`
  height: 100vh;
  overflow-y: auto;
`

const BackButton = styled.strong`
font-size: 16px;
cursor: pointer;
`

export default ({ modalStatus, handleDataModal, isModalBodySingleProduct, setIsModalBodySingleProduct, singleProductData, setSingleProductData }) => {

  const handleEdit = (isProduct, id) => {
    setIsModalBodySingleProduct(isProduct)
    console.log(isProduct)
    const fetchData = async () => {
      const result = await axios(`http://localhost:3001/api/${id}`);

      setSingleProductData(result.data[0])
    };
    if (id) {
      fetchData()
    }
  }
  return (
    <ModalContainer size="lg" open={modalStatus} toggle={handleDataModal}>
      <ModalHeader>{isModalBodySingleProduct ? 'Product ' : 'Edit Product'}
        {isModalBodySingleProduct ? <Button theme="info" onClick={() => handleEdit(false, singleProductData.id)}>Edit</Button> : <BackButton onClick={() => handleEdit(true, singleProductData.id)}>{'  <<<--Back'}</BackButton>}
      </ModalHeader>
      <ModalBodyConainter>{isModalBodySingleProduct ? <ProductInfo singleProductData={singleProductData} /> : <Editor />}</ModalBodyConainter>
    </ModalContainer>
  )
}

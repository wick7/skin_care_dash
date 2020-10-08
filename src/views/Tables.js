import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, CardHeader, CardBody } from "shards-react";
import styled from "styled-components";

import PageTitle from "../components/common/PageTitle";
import ReactPaginate from 'react-paginate';
import Search from "../components/components-overview/Search";

import axios from 'axios'

import "../css/global.css";

const PagFooter = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

const Tables = () => {
  const [data, setData] = useState([]);
  const [page, setPageNumber] = useState(1);
  const [count, setCount] = useState();
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`http://localhost:3001/api?search=${search}&page=${parseInt(page)}`);

      setData(result.data.results);
      setCount(result.data.count / 10)
    };

    fetchData();
  }, [page, search]);
  console.log(data)

  const handlePag = (e) => {
    console.log(e.selected + 1)
    setPageNumber(e.selected + 1)
  }

  const dateFormater = (dataDate) => {
    const event = new Date(dataDate);
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };

    return dataDate === null ? 'N/A' : event.toLocaleDateString('en-US', options)
  }

  return (
    <Container fluid className="main-content-container px-4">
      {/* Page Header */}
      <Row noGutters className="page-header py-4">
        <PageTitle sm="4" title="Purchased Products" subtitle="Purchased" className="text-sm-left" />
      </Row>

      {/* Default Light Table */}
      <Row>
        <Col>
          <Card small className="mb-4">
            <CardHeader className="border-bottom">
              <Search />
            </CardHeader>
            <CardHeader className="border-bottom">
              <h6 className="m-0">Products</h6>
            </CardHeader>
            <CardBody className="p-0 pb-3">
              <table className="table mb-0">
                <thead className="bg-light">
                  <tr>
                    <th scope="col" className="border-0">
                      Product
                  </th>
                    <th scope="col" className="border-0">
                      Brand
                  </th>
                    <th scope="col" className="border-0">
                      Quantity
                  </th>
                    <th scope="col" className="border-0">
                      Category
                  </th>
                    <th scope="col" className="border-0">
                      Price Paid
                  </th>
                    <th scope="col" className="border-0">
                      Purchase Date
                  </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map(item => {
                    return (
                      <tr>
                        <td>{item.product_name}</td>
                        <td>{item.brand}</td>
                        <td>{item.quantity}</td>
                        <td>{item.category_name}</td>
                        <td>{item.price_paid}</td>
                        <td>{dateFormater(item.date_purchased)}</td>
                      </tr>
                    )
                  })}
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="6" className="footerPagination">
                      <PagFooter>
                        <ReactPaginate
                          pageCount={count}
                          pageRangeDisplaye={10}
                          marginPagesDisplayed={1}
                          onPageChange={handlePag}
                          containerClassName={'paginationContainer'}
                          pageClassName={'numbers'}
                          previousLabel={'<'}
                          nextLabel={'>'}
                        />
                      </PagFooter>

                    </td>
                  </tr>
                </tfoot>
                <PagFooter>

                </PagFooter>
              </table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Tables;

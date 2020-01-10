import React from 'react';

import Header from 'components/Headers/Header.jsx';
import { Container, Row, Col, Card, CardBody, Button } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
// import paginationFactory from 'react-bootstrap-table2-paginator';

class Absensi extends React.Component {
  render() {
    const columns = [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name'
    }, {
      dataField: 'price',
      text: 'Product Price'
    }, {
      dataField: 'opsi',
      text: 'Opsi'
    }];
    
    const products = [
      {
        id: 1,
        name: 'Shampoo',
        price: '$0.99',
        opsi: (
          <>
            <Button color="danger">
              <i class="fas fa-trash-alt"></i>
            </Button>
            <Button color="success">
              <i class="fas fa-pencil-alt"></i>
            </Button>
            <Button color="primary">
              <i class="fas fa-eye"></i>
            </Button>
          </>
        )
      }
    ]

    return (
      <>
        <Header />
        <Container className="mt--7">
          <Row>
            <Col>
              <Card>
                <CardBody>
                  <BootstrapTable 
                    keyField="id" 
                    columns={columns} 
                    data={products} 
                    // pagination={paginationFactory()}
                  />
                </CardBody>
              </Card> 
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Absensi;
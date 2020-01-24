import React from 'react';

import {
  Container,
  Row,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Pagination,
  PaginationItem,
  PaginationLink
} from 'reactstrap';

class CardsContainer extends React.Component {
  state = {
    pagination: {
      start: 0,
      limit: 3,
      limitOption: [3, 5, 10],
      totalPage: 1
    }
  };


  componentDidMount() {
    if (this.props.paginationLimit) {
      this.setState({ pagination: { ...this.state.pagination, limit: this.props.paginationLimit } });
    }

    this.setState({
      pagination: {
        ...this.state.pagination,
        totalPage: Math.ceil(this.props.data || this.props.data.length / this.state.pagination.limit) || 1
      }
    });
  }

  changeLimit = limit => {
    this.setState({
      pagination: {
        ...this.state.pagination,
        limit,
        start: 0
      }
    }, () => this.setState({
      pagination: {
        ...this.state.pagination,
        totalPage: Math.ceil(this.props.data.length / this.state.pagination.limit) || 1
      }
    }));
  }

  prevPage = () => {
    const { start, limit } = this.state.pagination;

    this.setState({
      pagination: {
        ...this.state.pagination,
        start: start - limit
      }
    });
  }

  nextPage = () => {
    const { start, limit } = this.state.pagination;

    this.setState({
      pagination: {
        ...this.state.pagination,
        start: start + limit
      }
    });
  }

  toPage = page => {
    const { limit } = this.state.pagination;
    this.setState({ pagination: { ...this.state.pagination, start: Number(limit * page) } });
  }

  render() {
    const { start, limit } = this.state.pagination;

    return (
      <Container>
        <Row>
          {this.props.data && this.props.data.slice(start, start + limit).map(data => (
            <Col className="col-12">{this.props.card(data)}</Col>
          ))}
        </Row>
        <Row>
          <Col sm="6">
            <UncontrolledDropdown>
              <DropdownToggle color="primary" caret>
                {this.state.pagination.limit}
              </DropdownToggle>
              <DropdownMenu>
                {this.state.pagination.limitOption.map(limit => (
                  <DropdownItem onClick={() => this.changeLimit(limit)}>{limit}</DropdownItem>
                ))}
              </DropdownMenu>
            </UncontrolledDropdown>
          </Col>
          <Col sm="6" className="d-flex justify-content-end">
            <Pagination>
              <PaginationItem disabled={(start / limit + 1) <= 1}>
                <PaginationLink previous onClick={e => { e.preventDefault(); this.prevPage(); }} />
              </PaginationItem>
              <PaginationItem className="d-flex align-items-center px-3">
                {Math.floor((start / limit + 1))} dari {this.state.pagination.totalPage} halaman
              </PaginationItem>
              <PaginationItem disabled={((start / limit + 1) >= this.state.pagination.totalPage)}>
                <PaginationLink next onClick={e => { e.preventDefault(); this.nextPage(); }} />
              </PaginationItem>
            </Pagination>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default CardsContainer;
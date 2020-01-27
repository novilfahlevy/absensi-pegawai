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
  PaginationLink,
  FormGroup,
  Label,
  Input
} from 'reactstrap';

const NoDataIndication = props => (
  <div className="m-3" style={{ color: '#b2b2b2' }}>
    <p className="text-center">Tidak ada data...</p>
  </div>
)

class CardsContainer extends React.Component {
  state = {
    pagination: {
      start: 0,
      limit: 5,
      limitOptions: [5, 10, 15],
      totalPage: 1
    },
    filteredData: []
  };

  componentDidMount() {
    if (this.props.limitOptions) {
      setTimeout(() => {
        this.setState({
          pagination: {
            ...this.state.pagination,
            limitOptions: this.props.limitOptions,
            limit: this.props.limitOptions[0]
          }
        });
      }, 0);
    }

    if (this.props.filter) {
      this.setState({ filteredData: this.props.data.slice() });
    }

    this.setTotalPage();
  }

  componentWillReceiveProps() {
    this.setTotalPage();
  }

  setTotalPage() {
    this.setState({
      pagination: {
        ...this.state.pagination,
        totalPage: Math.ceil(this.props.data.length / this.state.pagination.limit) || 1
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
    }, this.setTotalPage);
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

  filter = (data, value) => {
    if (value === 'all') {
      this.setState({
        filteredData: this.props.data
      });
      return;
    }
    this.setState({
      filteredData: this.props.data.filter(field => {
        return field[data] === value;
      })
    });
  }

  render() {
    const { start, limit } = this.state.pagination;
    const data = this.props.filter ? this.state.filteredData : this.props.data;
    const totalPage = Math.ceil(this.props.data.length / this.state.pagination.limit) || 1;

    return (
      <>
        {this.props.filter && (
          <Row>
            {Object.keys(this.props.filter).map((filter, i) => {
              const filterData = this.props.filter[filter];
              return (
                <Col lg="3" key={i}>
                  <FormGroup>
                    <Label className="text-sm" htmlFor={filterData.placeholder || `select${i}`}>
                      {filterData.placeholder || `select${i}`}
                    </Label>
                    <Input type="select" className="form-control-sm" id={filterData.placeholder || `select${i}`} onChange={e => this.filter(filter, e.target.value)}>
                      <option value="all">Pilih Semua</option>
                      {Object.keys(filterData.options).map(option => {
                        return <option value={option}>{option}</option>;
                      })}
                    </Input>
                  </FormGroup>
                </Col>
              );
            })}
          </Row>
        )}
        <Row className="mb-2 mt-2">
          {data.length ? (
            <>
              {data.slice(start, start + limit).map((data, i) => (
                <Col
                  key={i}
                  className="col-12 mb-3"
                  sm={this.props.sm}
                  md={this.props.md}
                  lg={this.props.lg}
                  xl={this.props.xl}
                >
                  {this.props.card(data)}
                </Col>
              ))}
            </>
          ) : (
            <Col className="col-12">
              {this.props.NoDataIndication || <NoDataIndication />}
            </Col>
          )}
        </Row>
        <Row>
          <Col sm="6">
            <UncontrolledDropdown>
              <DropdownToggle color="primary" caret>
                {this.state.pagination.limit}
              </DropdownToggle>
              <DropdownMenu>
                {this.state.pagination.limitOptions.map((limit, i) => (
                  <DropdownItem key={i} onClick={() => this.changeLimit(limit)}>{limit}</DropdownItem>
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
                {Math.floor((start / limit + 1))} dari {totalPage} halaman
              </PaginationItem>
              <PaginationItem disabled={((start / limit + 1) >= totalPage)}>
                <PaginationLink next onClick={e => { e.preventDefault(); this.nextPage(); }} />
              </PaginationItem>
            </Pagination>
          </Col>
        </Row>
      </>
    );
  }
}

export default CardsContainer;
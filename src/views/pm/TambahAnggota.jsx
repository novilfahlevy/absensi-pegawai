import React from 'react';
import Header from 'components/Headers/Header.jsx';
import FadeIn from 'components/hoc/FadeIn.jsx';
import Swal from 'sweetalert2';
import { selectFilter } from 'react-bootstrap-table2-filter';

import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

import Table from 'components/ui/Table.jsx';

class TambahAnggota extends React.Component {
  state = {
    selectedMembers: []
  };

  toggleSelectMember = user_id => {
    if ( !this.isMemberSelected(user_id) ) {
      this.setState({ selectedMembers: [...this.state.selectedMembers, user_id] });
      return;
    }
    this.setState({ 
      selectedMembers: this.state.selectedMembers.filter(id => id !== user_id)
    });
  }

  isMemberSelected = user_id => {
    return this.state.selectedMembers.find(id => id === user_id);
  }

  addMember() {
    // console.log(this.state.selectedMembers);
  }

  render() {
    const jobDescFilterOptions = {
      'Web Developer': 'Web Developer',
      'Front-end Developer': 'Front-end Developer',
      'Back-end Developer': 'Back-end Developer',
      'Fullstack Web Developer': 'Fullstack Web Developer',
      'Android Developer': 'Android Developer',
      'Designer': 'Designer'
    };

    const columns = [
      {
        dataField: 'name',
        text: 'Nama',
        headerClasses: 'align-middle',
        headerAlign: 'center',
        sort: true
      }, 
      {
        dataField: 'email',
        headerClasses: 'align-middle',
        headerAlign: 'center',
        text: 'Email'
      }, 
      {
        dataField: 'jobdesc',
        headerClasses: 'align-middle',
        headerAlign: 'center',
        text: 'Job',
        filter: selectFilter({
          placeholder: 'Pilih semua',
          options: jobDescFilterOptions,
          className: 'mt-2 form-control-sm'
        })
      }, 
      {
        dataField: '-',
        text: 'status',
        headerClasses: 'align-middle',
        headerAlign: 'center',
        align: 'center',
        filter: selectFilter({
          placeholder: 'Pilih semua',
          options: {
            'Terpilih': 'Terpilih',
            '-': 'Belum Terpilih'
          },
          className: 'mt-2 form-control-sm'
        })
      },
      {
        dataField: 'tambah',
        text: 'Tambah',
        headerClasses: 'align-middle',
        headerAlign: 'center',
        align: 'center'
      },
    ];

    const pegawai = [
      { 
        id: 1,
        name: 'Novil Fahlevy', 
        email: 'novilfreon@gmail.com', 
        jobdesc: 'Fullstack Web Developer',
        '-': this.isMemberSelected(1) ? 'Terpilih' : '-',
        tambah: (
          <Button color={this.isMemberSelected(1) ? 'danger' : 'success'} size="sm" onClick={() => this.toggleSelectMember(1)}>
            <span className={`fas fa-${this.isMemberSelected(1) ? 'minus' : 'plus'}`}></span>
          </Button>
        )
      },
      { 
        id: 2,
        name: 'Rizky Maulidan', 
        email: 'asdasd@gmail.com', 
        jobdesc: 'Back-end Developer',
        '-': this.isMemberSelected(2) ? 'Terpilih' : '-',
        tambah: (
          <Button color={this.isMemberSelected(2) ? 'danger' : 'success'} size="sm" onClick={() => this.toggleSelectMember(2)}>
            <span className={`fas fa-${this.isMemberSelected(2) ? 'minus' : 'plus'}`}></span>
          </Button>
        )
      },
    ]

    return (
      <> 
        <Container className="mt--7" fluid>
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <Col xs="6">
                    <h2 className="mb-0">Tambah Anggota Project</h2>
                    </Col>
                    <Col className="text-right" xs="6">
                    <Button color="primary" onClick={() => this.props.history.goBack()}>
                      <i className="fas fa-arrow-left"></i>
                    </Button>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={this.handleCariSubmit}>
                    <InputGroup className="mb-3">
                      <Input onChange={this.handleCariChange} type="search" name="search" id="search"
                        placeholder="Cari pegawai" />
                      <InputGroupAddon addonType="append">
                        <Button type="submit" color="primary">Cari</Button>
                      </InputGroupAddon>
                    </InputGroup>
                  </Form>
                  <Button color="primary" className="mb-3" onClick={() => this.addMember()}>Tambah {this.state.selectedMembers.length} Anggota</Button>
                  <Table data={pegawai} columns={columns}></Table>
                </CardBody>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default FadeIn(TambahAnggota, Header);
import React from 'react';
import Header from 'components/Headers/Header.jsx';
import FadeIn from 'components/hoc/FadeIn.jsx';
import Swal from 'sweetalert2';
import { selectFilter } from 'react-bootstrap-table2-filter';
import { withRouter } from 'react-router-dom';

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

class ProjectManager extends React.Component {
  getOptions() {
    return (
      <>
        <UncontrolledDropdown>
          <DropdownToggle size="sm">
            <i className="fas fa-ellipsis-v"></i>
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem style={{ cursor: 'pointer' }} onClick={()=> {
              Swal.fire({
                title: 'Apakah anda yakin?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Hapus',
                cancelButtonText: 'Gak jadi!',
                reverseButton: true
              });
            }}>
              <i className="fas fa-trash-alt text-danger"></i>
              Hapus
            </DropdownItem>
            <DropdownItem onClick={()=> this.props.history.push(`/admin/detail-pegawai/1`)} style={{ cursor: 'pointer' }}>
              <i className="fas fa-list-alt text-primary"></i>
              Detail
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </>
    );
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
          formatter: cell => jobDescFilterOptions[cell],
          options: jobDescFilterOptions,
          className: 'mt-2 form-control-sm'
        })
      }, 
      {
        dataField: 'actions',
        text: 'Opsi',
        headerClasses: 'align-middle',
        headerAlign: 'center',
        headerStyle: { width: '110px' },
        align: 'center'
      }
    ];

    const pegawai = [
      { 
        name: 'Novil Fahlevy', 
        email: 'novilfreon@gmail.com', 
        jobdesc: 'Fullstack Web Developer',
        actions: this.getOptions()
      },
      { 
        name: 'Rizky Maulidan', 
        email: 'asdasd@gmail.com', 
        jobdesc: 'Back-end Developer',
        actions: this.getOptions()
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
                    <h2 className="mb-0">Daftar Anggota Project Manager</h2>
                    </Col>
                    <Col className="text-right" xs="6">
                    <Button color="primary" onClick={() => this.props.history.push('/admin/tambah-anggota')} size="md">
                      Tambah Anggota
                    </Button>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={this.handleCariSubmit}>
                    <InputGroup className="mb-3">
                      <Input onChange={this.handleCariChange} type="search" name="search" id="search"
                        placeholder="Cari anggota" />
                      <InputGroupAddon addonType="append">
                        <Button type="submit" color="primary">Cari</Button>
                      </InputGroupAddon>
                    </InputGroup>
                  </Form>
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

export default withRouter(FadeIn(ProjectManager, Header));
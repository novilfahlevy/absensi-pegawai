import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import overlayFactory from 'react-bootstrap-table2-overlay';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { connect } from 'react-redux';
import {
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Badge
} from 'reactstrap';
import Loading from 'components/ui/Loading.jsx';

const  remoteTable = (props) => {
  const NoDataIndication = () => (
    <div className="m-3" style={{ color: '#b2b2b2' }}>
      <Loading />
    </div>
  );

  return (
    <BootstrapTable 
      // remote
      hover
      bootstrap4 
      keyField='id' 
      data={ props.data || [] } 
      columns={ props.columns }
      className="table-flush"
      headerClasses="thead-light"
      wrapperClasses="table-responsive"
      bordered={ false }
      loading={ props.isLoaded }
      noDataIndication={ () => <NoDataIndication /> }
      pagination={ paginationFactory({ 
        page: Math.ceil(props.data.length / 5), 
        sizePerPage: 5, 
        totalSize: props.data.length,
        sizePerPageList: [{
          text: '5', value: 5
        }, {
          text: '10', value: 10
        }, {
          text: '20', value: 20
        }, {
          text: 'Tampilkan Semua', value: props.data.length
        }]
      }) }
      filter={filterFactory()}
      onTableChange={ props => alert(props) }
      overlay={ overlayFactory(
        { 
          spinner: true, 
          styles: { 
            overlay: (base) => (
              {...base, background: 'rgba(255, 255, 255, 0.3)'}
            ),
            spinner: (base) => (
              {
                ...base,
                width: '60px',
                '& svg circle': {
                  stroke: '#5E72E4'
                }
              }
            )
          } }) }
    />
  )
}

export default remoteTable;
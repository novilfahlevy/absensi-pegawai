import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import './../../assets/css/components/ui/table.css'

const remoteTable = (props) => {
  const NoDataIndication = () => (
    <div className="m-3" style={{ color: '#b2b2b2' }}>
      <p className="text-center">Tidak ada data...</p>
    </div>
  );

  return (
    <BootstrapTable
      hover
      bootstrap4
      keyField='id'
      data={props.data || []}
      columns={props.columns}
      className="table-flush"
      headerClasses="thead-light"
      wrapperClasses="table-responsive"
      bordered={false}
      loading={props.isLoaded}
      noDataIndication={() => <NoDataIndication />}
      pagination={paginationFactory({
        page: Math.ceil((props.data ? props.data.length : 1) / 5),
        sizePerPage: 5,
        totalSize: (props.data ? props.data.length : 1),
        sizePerPageList: [{
          text: '5', value: 5
        }, {
          text: '10', value: 10
        }, {
          text: '20', value: 20
        }, {
          text: 'Tampilkan Semua', value: (props.data ? props.data.length : 0)
        }]
      })}
      filter={filterFactory()}
    />
  )
}

export default remoteTable;
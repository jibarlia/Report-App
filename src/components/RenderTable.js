import React from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css'

const RenderTable = (props) => {
  return (
    <main className="container mx-auto flex flex-col items-center">
      <div className="w-full mt-12 mb-20">
        <ReactTable
          data={props.data}
          columns={props.columns}
          defaultPageSize={10}
          className="-striped -highlight text-center"
        />
      </div>
    </main>
  );
};

export default RenderTable;
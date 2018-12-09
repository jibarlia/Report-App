import React, {Fragment} from "react";
import Form from "./Form";

const AddRecords = (props) => {
    return (
      <Fragment>
        <main className="container mx-auto flex flex-col items-center">
          <Form addRecord={props.fetchInitialData}/>
        </main>
      </Fragment>
    );
  
}

export default AddRecords;

import React, { Component } from "react";
import defaultData from "./defaultData";

const DataContext = React.createContext();

class DataProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: defaultData.data
    };
  }

  render() {
    return (
      <DataContext.Provider
        value={{
          data: this.state.data,
        }}
      >
        {this.props.children}
      </DataContext.Provider>
    );
  }
}
const DataConsumer = DataContext.Consumer;

export { DataProvider, DataConsumer };

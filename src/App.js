import React, { Component, Fragment } from "react";
import { BrowserRouter, Link, Switch, Route } from "react-router-dom";
import Clock from "./components/Clock";
import AddRecords from "./components/AddRecords";
import Username from "./components/Username";
import { DataProvider } from "./DataContext";
import Statistics from "./components/Statistics";
import defaultData from "./defaultData";

class App extends Component {
  constructor(props) {
    super(props);
    let data = sessionStorage.getItem("data");
    if (data) {
      data = JSON.parse(data);
    } else {
      data = defaultData.data;
      sessionStorage.setItem("data", JSON.stringify(data));
    }

    this.state = {
      data: data
    };
  }

  fetchData = () => {
    return defaultData.data;
  };

  handleAddRecord = record => {
    const newData = this.state.data;
    newData.push(record);
    this.setState({
      data: newData
    });
    sessionStorage.setItem("data", JSON.stringify(newData));
  };

  routes = [
    {
      path: "/",
      component: Statistics,
      fetchInitialData: () => {
        return this.state.data;
      }
    },
    {
      path: "/add",
      component: AddRecords,
      fetchInitialData: record => this.handleAddRecord(record)
    },
    {
      path: "/username/:username",
      component: Username,
      fetchInitialData: () => {
        return this.state.data;
      }
    }
  ];

  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <DataProvider>
            <nav className="flex items-center justify-between flex-wrap bg-teal p-5 m-5 rounded-lg">
              <div className="flex items-center flex-no-shrink text-white mr-6">
                <svg
                  className="fill-current h-8 w-8 mr-2"
                  width="54"
                  height="54"
                  viewBox="0 0 54 54"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
                </svg>
                <span className="font-semibold text-xl tracking-tight">
                  {" "}
                  Your Report App{" "}
                </span>
              </div>
              <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                <div className="text-base lg:flex-grow">
                  <Link
                    to="/"
                    className="tblock mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white mr-4"
                  >
                    <div className="block mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white mr-4">
                      General Statistics
                    </div>
                  </Link>
                  <Link
                    to="/add"
                    className="tblock mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white mr-4"
                  >
                    <div className="block mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white mr-4">
                      Add Records
                    </div>
                  </Link>
                </div>
                <div className="flex items-center flex-no-shrink font-semibold text-xl text-white mr-6">
                  <Clock />
                </div>
              </div>
            </nav>
            <Switch>
              {this.routes.map(
                ({ path, component: C, fetchInitialData }, index) => (
                  <Route
                    key={index}
                    exact
                    path={path}
                    render={props => (
                      <C {...props} fetchInitialData={fetchInitialData} />
                    )}
                  />
                )
              )}
            </Switch>
          </DataProvider>
        </Fragment>
      </BrowserRouter>
    );
  }
}

export default App;

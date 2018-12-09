import React, { Component } from "react";
import RenderTable from "./RenderTable";
import { Link } from "react-router-dom";

class Statistics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userStatistics: [],
      maxHours: 0,
      minHours: 0
    };
  }

  componentWillMount() {
    this.prepareDataToStatistics(this.props.fetchInitialData());
  }

  render() {
    const columns = [
      {
        Header: "Username",
        accessor: "username",
        Cell: row => (
          <div>
            <Link
              to={"/username/" + row.value}
              className="no-underline text-black hover:text-teal"
            >
              {row.value}
            </Link>
          </div>
        )
      },
      {
        Header: "Total Days",
        accessor: "totalDays"
      },
      {
        Header: "Average Hours per Day",
        accessor: "averagePerDay"
      },
      {
        Header: () => (
          <span>
            <i className="bg-teal" /> Total Hours
          </span>
        ),
        accessor: "totalHours",
        Cell: row => (
          <div
            style={{
              backgroundColor:
                row.value === this.state.maxHours
                  ? "#64D5CA"
                  : row.value === this.state.minHours
                  ? "#EF5753"
                  : "#FFF"
            }}
          >
            {row.value}
          </div>
        )
      },
      {
        Header: "Total Extra Hours",
        accessor: "totalExtraHours"
      }
    ];
    return <RenderTable data={this.state.userStatistics} columns={columns} />;
  }

  prepareDataToStatistics = data => {
    const groupDataByUser = [];
    data.forEach(element => {
      const username = element.username;
      const startHour = new Date(element.start);
      const endHour = new Date(element.end);
      //convert to 2 decimal places the result
      const hours =
        Math.round(((endHour - startHour) / 1000 / 60 / 60) * 100.0) / 100;
      if (typeof groupDataByUser[username] === "undefined") {
        groupDataByUser[username] = [
          {
            date: element.date,
            hours: hours
          }
        ];
      } else {
        groupDataByUser[username].push({
          date: element.date,
          hours: hours
        });
      }
    });

    const userStatistics = [];
    for (var username in groupDataByUser) {
      const users = groupDataByUser[username];
      let totalHours = 0;
      let totalExtraHours = 0;
      users.forEach(element => {
        totalHours += element.hours;
        if (element.hours > 8) {
          totalExtraHours += element.hours - 8;
        }
      });
      userStatistics.push({
        username: username,
        totalDays: users.length,
        averagePerDay: Math.round((totalHours / users.length) * 100.0) / 100,
        totalHours: totalHours,
        totalExtraHours:
          Math.round((totalExtraHours / users.length) * 100.0) / 100,
        worstEmployee: false,
        bestEmployee: false
      });
    }

    const maxHours = Math.max.apply(
      Math,
      userStatistics.map(function(user) {
        return user.totalHours;
      })
    );
    const minHours = Math.min.apply(
      Math,
      userStatistics.map(function(user) {
        return user.totalHours;
      })
    );

    this.setState({
      userStatistics: userStatistics,
      maxHours: maxHours,
      minHours: minHours
    });
  };
}

export default Statistics;

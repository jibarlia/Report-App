import React, { Component } from "react";
import DatePicker from "react-datepicker";
import TimePicker from "rc-time-picker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import "rc-time-picker/assets/index.css";

class Form extends Component {
  constructor(props) {
    super(props);

    const currentTime = moment()
      .hour(0)
      .minute(0);
    this.state = {
      email: "",
      password: "",
      date: new Date(),
      startHour: currentTime,
      endHour: currentTime,
      emailIsEmpty: true,
      emailIsValid: true,
      endHourIsValid: false,
      formIsValid: false,
      hoursFormat: "h:mm a",
      dateFormat: "DD/MM/YYYY"
    };
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleStartHour = this.handleStartHour.bind(this);
    this.handleEndHour = this.handleEndHour.bind(this);
  }

  handleChangeDate = date => {
    this.setState({
      date: date
    });
  };

  handleStartHour = value => {
    this.validateField("startHour", value);
  };

  handleEndHour = value => {
    this.validateField("endHour", value);
  };

  handleUserInput = e => {
    this.validateField(e.target.name, e.target.value);
  };

  handleSubmit = e => {
    e.preventDefault();
    const newRecord = {
      username: this.state.email,
      date: moment(this.state.date).format(this.state.dateFormat),
      start: this.state.startHour.format("DD/MM/YYYY h:mm a"),
      end: this.state.endHour.format("DD/MM/YYYY h:mm a")
    };

    this.props.addRecord(newRecord);
    this.resetForm();
  };

  resetForm = () => {
    this.setState({
      email: "",
      password: "",
      date: new Date(),
      startHour: moment()
        .hour(0)
        .minute(0),
      endHour: moment()
        .hour(0)
        .minute(0),
      emailIsEmpty: true,
      emailIsValid: true,
      endHourIsValid: false,
      formIsValid: false
    });
  };

  validateField = (fieldName, value) => {
    let fieldValidationErrors = this.state.formErrors;
    let emailIsEmpty = this.state.emailIsEmpty;
    let emailIsValid = this.state.emailIsValid;
    let endHourIsValid = this.state.endHourIsValid;

    switch (fieldName) {
      case "email":
        if (!value) {
          emailIsEmpty = true;
          //dont show email invalid message in empty case
          emailIsValid = true;
        } else {
          const result = value.match(
            /^[a-zA-Z0-9.!#$%&’*+=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/i
          );
          emailIsValid = !(result === null || result === undefined);
        }
        break;
      case "startHour":
        endHourIsValid = value.toDate() < this.state.endHour.toDate();
        break;
      case "endHour":
        endHourIsValid = this.state.startHour.toDate() < value.toDate();
        break;
      default:
        break;
    }

    const formIsValid = emailIsEmpty && emailIsValid && endHourIsValid;

    this.setState({
      [fieldName]: value,
      formErrors: fieldValidationErrors,
      emailIsEmpty: emailIsEmpty,
      emailIsValid: emailIsValid,
      endHourIsValid: endHourIsValid,
      formIsValid: formIsValid
    });
  };

  render() {
    ///variables
    const inputClasses =
      "shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline";
    const inputClassesError =
      "shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline";

    return (
      <div className="w-full max-w-xs mt-12">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={this.handleSubmit}
        >
          <div className="mb-4">
            <label
              className="block text-grey-darker text-sm font-bold mb-2"
              htmlFor="email"
            >
              Username <span className="text-red-light">*</span>
            </label>
            <input
              className={
                this.state.emailIsValid ? inputClasses : inputClassesError
              }
              name="email"
              type="email"
              placeholder="email@gmail.com"
              value={this.state.email}
              onChange={event => this.handleUserInput(event)}
            />
            {!this.state.emailIsValid && (
              <p className="text-red text-xs italic">
                Your email is not valid.
              </p>
            )}
          </div>
          <div className="mb-6">
            <label
              className="block text-grey-darker text-sm font-bold mb-2"
              htmlFor="date"
            >
              Date
            </label>
            <DatePicker
              dateFormat="dd/MM/yyyy"
              selected={this.state.date}
              onChange={this.handleChangeDate}
              todayButton={"Today"}
              //disabled={true}
              //shouldCloseOnSelect={false}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-grey-darker text-sm font-bold mb-2"
              htmlFor="start"
            >
              Start Hour
            </label>
            <TimePicker
              id="starttime"
              showSecond={false}
              defaultValue={this.state.startHour}
              className=""
              onChange={this.handleStartHour}
              format={this.state.hoursFormat}
              use12Hours
              inputReadOnly
              allowEmpty={false}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-grey-darker text-sm font-bold mb-2"
              htmlFor="end"
            >
              End Hour
            </label>
            <TimePicker
              id="endtime"
              showSecond={false}
              defaultValue={this.state.endHour}
              //disabled
              className=""
              onChange={this.handleEndHour}
              format={this.state.hoursFormat}
              use12Hours
              inputReadOnly
              allowEmpty={false}
            />
          </div>
          <div className="mb-6" />
          <div className="flex items-center justify-between">
            {this.state.formIsValid ? (
              <button
                className="bg-teal hover:bg-teal-light text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Add Record
              </button>
            ) : (
              <button
                className="bg-teal hover:bg-teal-light text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline opacity-50 cursor-not-allowed"
                type="submit"
                disabled
              >
                Add Record
              </button>
            )}
          </div>
        </form>
      </div>
    );
  }
}

export default Form;

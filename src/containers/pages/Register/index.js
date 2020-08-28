import React from "react";
import firebase from "configs/firebase";
import { connect } from "react-redux";

class Register extends React.Component {
  state = {
    email: "",
    password: "",
  };

  _handleOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  _handleSubmit = () => {
    const { email, password } = this.state;

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(function (res) {
        console.log(res, ">> response success");
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(error, ">>> error");
        // ...
      });
  };

  componentDidMount() {
    const { isLoading } = this.props;
    console.log(isLoading, ">>> from global state");
  }

  render() {
    const { email, password } = this.state;

    return (
      <div>
        <input
          value={email}
          onChange={this._handleOnChange}
          value={email}
          placeholder="email..."
          type="text"
          name="email"
        />
        <input
          value={password}
          onChange={this._handleOnChange}
          placeholder="password..."
          type="password"
          name="password"
        />
        <button onClick={this._handleSubmit}>register</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.isLoading,
  };
};

export default connect(mapStateToProps, null)(Register);

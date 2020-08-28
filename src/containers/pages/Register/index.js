import React from "react";
import firebase from "configs/firebase";
import { connect } from "react-redux";
import { SET_LOADING } from "configs/redux/types";

// Components
import Button from "components/atoms/Button";

class Register extends React.Component {
  state = {
    email: "",
    password: "",
    isLoading: false,
  };

  _handleOnChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
  };

  _handleSubmit = () => {
    const { email, password } = this.state;
    const { setLoading } = this.props;

    this.setState({
      ...this.state,
      isLoading: true,
    });

    setTimeout(() => {
      this.setState({
        ...this.state,
        isLoading: false,
      });
    }, 3000);

    return;
    setLoading("fakingg");

    return;

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

  render() {
    const { email, password, isLoading } = this.state;

    // const { isLoading } = this.props;
    // console.log(isLoading, ">>> from global state");

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
        <Button isLoading={isLoading} onClick={this._handleSubmit}>
          register
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.isLoading,
  };
};

const handleSetLoading = (value) => (dispatch) => {
  return setTimeout(() => {
    dispatch({
      type: SET_LOADING,
      value,
    });
  }, 2000);
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLoading: (value) => dispatch(handleSetLoading(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);

import React from "react";
import { connect } from "react-redux";

// Components
import Button from "components/atoms/Button";

// Actions
import { actionRegisterUser } from "configs/redux/actions";

class Register extends React.Component {
  state = {
    email: "",
    password: "",
  };

  _handleOnChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
  };

  _handleSubmit = () => {
    const { email, password } = this.state;
    const { actionRegisterUser } = this.props;

    actionRegisterUser({ email, password })
      .then((res) => {
        this.setState({ email: "", password: "" });
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { email, password } = this.state;
    const { isLoading } = this.props;

    return (
      <div>
        <input
          value={email}
          onChange={this._handleOnChange}
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

export default connect(mapStateToProps, { actionRegisterUser })(Register);

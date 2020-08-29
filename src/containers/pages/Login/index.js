import React from "react";
import { connect } from "react-redux";

// Components
import Button from "components/atoms/Button";

// Actions
import { actionLoginUser } from "configs/redux/actions";

class Login extends React.Component {
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

  _handleSubmit = async () => {
    const { email, password } = this.state;
    const { actionLoginUser, history } = this.props;

    try {
      const resLogin = await actionLoginUser({ email, password });
      if (resLogin) {
        console.log(resLogin, ">>> login result");
        history.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { email, password } = this.state;
    const { isLoading } = this.props;

    return (
      <div>
        <input
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
          login
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

export default connect(mapStateToProps, { actionLoginUser })(Login);

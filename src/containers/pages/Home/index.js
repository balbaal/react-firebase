import React from "react";
import { actionCreatePost } from "configs/redux/actions";
import { connect } from "react-redux";
import Button from "components/atoms/Button";

class Home extends React.Component {
  state = {
    title: "",
    description: "",
  };

  _handleOnChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
  };

  _handleOnSubmit = () => {
    const { title, description } = this.state;
    const { uid, actionCreatePost } = this.props;

    const payload = {
      title,
      description,
      date: new Date().getTime(),
      uid,
    };

    actionCreatePost(payload);
  };

  render() {
    const { title, description } = this.state;
    const { isLoading } = this.props;

    return (
      <div>
        <input
          name="title"
          value={title}
          placeholder="title . . ."
          type="text"
          onChange={this._handleOnChange}
        />
        <br />
        <textarea
          onChange={this._handleOnChange}
          name="description"
          placeholder="description"
          value={description}
        ></textarea>
        <Button isLoading={isLoading} onClick={this._handleOnSubmit}>
          Submit
        </Button>

        <br />
        <br />

        <div>
          <h4>title: </h4>
          <h4>description: </h4>
          <h4>created: </h4>
          <hr />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    uid: state.user.uid,
    isLoading: state.isLoading,
  };
};

export default connect(mapStateToProps, { actionCreatePost })(Home);

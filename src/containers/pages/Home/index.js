import React from "react";
import {
  actionCreatePost,
  actionGetPost,
  actionUpdatePost,
} from "configs/redux/actions";
import { connect } from "react-redux";
import Button from "components/atoms/Button";

class Home extends React.Component {
  state = {
    title: "",
    description: "",
    buttonText: "Submit",
    id: "",
  };

  componentDidMount() {
    const { actionGetPost, posts } = this.props;
    const userData = JSON.parse(localStorage.getItem("userData"));

    actionGetPost(userData);
  }

  _handleOnChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
  };

  _handleOnSubmit = () => {
    const { title, description, buttonText, id } = this.state;
    const { actionCreatePost, actionUpdatePost } = this.props;
    const userData = JSON.parse(localStorage.getItem("userData"));

    const payload = {
      title,
      description,
      date: new Date().getTime(),
      uid: userData.uid,
    };

    if (buttonText === "Update") {
      payload.id = id;
      actionUpdatePost(payload);
    } else {
      actionCreatePost(payload);
    }
  };

  _handleCancelPost = () => {
    this.setState({
      title: "",
      description: "",
      buttonText: "Submit",
      id: "",
    });
  };

  _handleOnClickPost = (post) => {
    this.setState({
      title: post.title,
      description: post.description,
      buttonText: "Update",
      id: post.id,
    });
  };

  render() {
    const { title, description, buttonText } = this.state;
    const { isLoading, posts } = this.props;

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
        {buttonText === "Update" && (
          <Button onClick={this._handleCancelPost} isLoading={isLoading}>
            Cancel
          </Button>
        )}
        <Button isLoading={isLoading} onClick={this._handleOnSubmit}>
          {buttonText}
        </Button>

        <br />
        <br />

        {posts.length !== 0
          ? posts.map((post, i) => {
              return (
                <div
                  key={`post-key-${i}`}
                  onClick={() => this._handleOnClickPost(post)}
                >
                  <h4>title: {post.title}</h4>
                  <h4>description: {post.description}</h4>
                  <h4>created: {post.date}</h4>
                  <hr />
                </div>
              );
            })
          : isLoading && <h3>loading . . .</h3>}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    uid: state.user.uid,
    isLoading: state.isLoading,
    posts: state.posts,
  };
};

export default connect(mapStateToProps, {
  actionCreatePost,
  actionGetPost,
  actionUpdatePost,
})(Home);

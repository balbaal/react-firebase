import React from "react";
import {
  actionCreatePost,
  actionGetPost,
  actionUpdatePost,
  actionDeletePost,
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

  _handleOnClickDelete = (e, post) => {
    e.stopPropagation();

    const { actionDeletePost } = this.props;
    const userData = JSON.parse(localStorage.getItem("userData"));
    actionDeletePost({
      id: post.id,
      uid: userData.uid,
    });
  };

  render() {
    const { title, description, buttonText } = this.state;
    const { isLoading, posts } = this.props;

    return (
      <div className="container mx-auto pt-5">
        <form>
          <div className="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="title"
            >
              Title
            </label>

            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="title"
              value={title}
              id="title"
              placeholder="Title . . ."
              type="text"
              onChange={this._handleOnChange}
            />
          </div>

          <div className="mb-4">
            <label
              for="description"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Description
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={this._handleOnChange}
              name="description"
              placeholder="description"
              value={description}
              rows="8"
              id="description"
            ></textarea>
          </div>
          {buttonText === "Update" && (
            <Button
              className="mr-2"
              onClick={this._handleCancelPost}
              isLoading={isLoading}
            >
              Cancel
            </Button>
          )}
          <Button
            className="transition duration-200"
            isLoading={isLoading}
            onClick={this._handleOnSubmit}
          >
            {buttonText}
          </Button>
        </form>

        <br />
        <br />

        <div className="divide-y divide-gray-400">
          {posts.length !== 0 ? (
            posts.map((post, i) => {
              return (
                <div
                  className="py-3"
                  key={`post-key-${i}`}
                  onClick={() => this._handleOnClickPost(post)}
                  style={{ position: "relative" }}
                >
                  <h4>Title: {post.title}</h4>
                  <h4 className="max-w-lg">Description: {post.description}</h4>
                  <h4>Created: {post.date}</h4>
                  <Button
                    style={{ position: "absolute", right: 0, top: 12 }}
                    isLoading={false}
                    onClick={(e) => this._handleOnClickDelete(e, post)}
                  >
                    X
                  </Button>
                </div>
              );
            })
          ) : isLoading ? (
            // <h3>loading . . .</h3>
            <div className="border border-gray-300 shadow rounded-md p-4 w-full">
              <div className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-gray-400 h-12 w-12"></div>
                <div className="flex-1 space-y-4 py-1">
                  <div className="h-4 bg-gray-400 rounded w-3/4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-400 rounded"></div>
                    <div className="h-4 bg-gray-400 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <h3>there is no post !!</h3>
          )}
        </div>
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
  actionDeletePost,
})(Home);

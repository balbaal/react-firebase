import React from "react";
import { actionCreatePost, actionGetPost } from "configs/redux/actions";
import { connect } from "react-redux";
import Button from "components/atoms/Button";

class Home extends React.Component {
  state = {
    title: "",
    description: "",
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
    const { title, description } = this.state;
    const { actionCreatePost } = this.props;
    const userData = JSON.parse(localStorage.getItem("userData"));

    const payload = {
      title,
      description,
      date: new Date().getTime(),
      uid: userData.uid,
    };

    actionCreatePost(payload);
  };

  render() {
    const { title, description } = this.state;
    const { isLoading, posts } = this.props;
    console.log(isLoading, ">>> loaing");
    console.log(posts, ">>> post render");

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

        {posts.length !== 0
          ? posts.map((post, i) => {
              return (
                <div key={`post-key-${i}`}>
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

export default connect(mapStateToProps, { actionCreatePost, actionGetPost })(
  Home
);

import React from "react";
import ArticlesFeed from "./articlesFeed";
import fetchData from "../utils/fetchData";
import HeroProfile from "./heroProfile";
import { withRouter } from "react-router-dom";
import Loader from "./loader";
import baseurl from "../utils/constants";
import { userContext } from "./userContext";
let url;

class Profile extends React.Component {
  static contextType = userContext;
  constructor() {
    super();
    this.state = {
      articles: null,
      articlesCount: null,
      currentUser: "",
      myfeed: true,
      user: "",
      error: null,
      currentUsername: "",
    };
  }
  componentDidMount() {
    url = `${baseurl}/api/profiles/${this.props.match.params.username}`;
    this.fetch(url);
  }
  componentDidUpdate() {
    if (this.props.match.params.username !== this.state.currentUsername) {
      url = `${baseurl}/api/profiles/${this.props.match.params.username}`;
      this.fetch(url);
    }
  }
  fetch = (url) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (this.context.user) {
          this.setState({
            currentUser: this.context.user.username,
          });
        }
        this.setState(
          {
            currentUsername: data.profile.username,
            user: data.profile,
          },
          () => {
            fetchData(
              this.state.myfeed
                ? `&author=${this.state.user.username}`
                : `&favorited=${this.state.user.username}`,
              0,
              this.handleState,
              this.context.user ? this.context.user.token : ""
            );
          }
        );
      });
  };

  handleState = (key, value) => {
    this.setState(
      {
        [key]: value,
      },
      () => {
        if (key === "myfeed") {
          fetchData(
            this.state.myfeed
              ? `&author=${this.state.user.username}`
              : `&favorited=${this.state.user.username}`,
            0,
            this.handleState,
            this.context.user.token
          );
        }
      }
    );
  };
  render() {
    return (
      <>
        {this.state.loading ? (
          <Loader />
        ) : (
          <div>
            <HeroProfile
              user={this.state.user}
              currentUser={this.state.currentUser}
              follow={
                this.state.currentUser
                  ? this.state.user.username !== this.state.currentUsername
                  : ""
              }
            />
            <div className="w-3/5 mx-auto">
              <ArticlesFeed
                handleState={this.handleState}
                myfeed={this.state.myfeed}
                user={this.context.user}
                error={this.state.error}
                articles={this.state.articles}
                openTag={this.state.openTag}
              />
            </div>
          </div>
        )}
      </>
    );
  }
}

export default withRouter(Profile);

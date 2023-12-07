import React, { useEffect, useState } from "react";
import { NavLink, withRouter } from "react-router-dom";
import baseurl from "../utils/constants";
import Comment from "./comment";
import ErrorBoundary from "./errorBoundary";
import Hero from "./hero";
import Loader from "./loader";
import { userContext } from "./userContext";
import { useContext } from "react";

function Article(props) {
  const context = useContext(userContext);
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  let fetchData = () => {
    const slug = props.match.params.slug;
    fetch(`${baseurl}/api/articles/${slug}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `${context.user ? context.user.token : ""}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((article) => {
        setArticle(article.article.article);
        setProfile(article.article.article.author);
      })
      .catch((err) => {
        setError("not able to fetch article");
      });
  };
  let deleteArticle = () => {
    fetch(`${baseurl}/api/articles/${article.slug}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `${context.user.token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("can't delete article");
        }
        props.history.push(`/`);
      })
      .catch((errors) => {
        setError(errors.error);
      });
  };
  let followAuthor = () => {
    fetch(`${baseurl}/api/profiles/${profile.username}/follow`, {
      method: profile.following ? "DELETE" : "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `${context.user.token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("can't follow author");
        }
        return res.json();
      })
      .then((profile) => {
        setProfile(profile.profile);
      })
      .catch((errors) => {
        setError(errors.error);
      });
  };

  let author;
  if (article) {
    author = (
      <div className="">
        <div className="flex items-center">
          <img
            className="h-12 w-12 mx-4 inline-block rounded-full"
            src={article.author.image}
            alt={article.author.username}
          ></img>
          <NavLink to={`/profiles/${article.author.username}`}>
            <address className="text hover:underline hover:scale-110 text-xl pink capitalize">
              {article.author.username}
            </address>
          </NavLink>
        </div>
        {context.user &&
        (context.user.username === article.author.username ||
          context.user.isAdmin) ? (
          <div className="flex mt-4">
            <button
              onClick={() => {
                props.history.push({
                  pathname: "/edit-article",
                  state: {
                    article: article,
                  },
                });
              }}
              className="text-sm hover:scale-110 blue border-2 border-blue-900 mx-2 py-1 px-2 rounded-md"
            >
              <i className="mr-1 fa-solid fa-pen-to-square"></i>Edit Article
            </button>
            <button
              onClick={() => {
                deleteArticle();
              }}
              className="text-sm hover:scale-110 text-red-600 border-2 border-red-600 mx-2 py-1 px-2 rounded-md"
            >
              <i className="mr-1 fa-solid fa-trash"></i>Delete Article
            </button>
          </div>
        ) : (
          ""
        )}
        <div className="items-center">
          {context.user ? (
            context.user.username !== article.author.username ? (
              <button
                onClick={() => followAuthor()}
                className={`text-sm hover:scale-110 border-2 mx-2 mt-4 py-1 px-2 rounded-md ${
                  profile && profile.following
                    ? "text-red-600 border-red-600"
                    : "text-green-600 border-green-600"
                }`}
              >
                {profile && !profile.following
                  ? "Follow Author"
                  : "Unfollow Author"}
              </button>
            ) : (
              ""
            )
          ) : (
            <NavLink to={"/login"}>
              <p className="text-base m-4 text-black text-center">
                <span className="text-green-500">SignIn/SignUp</span> to follow
                <span className="blue"> Author</span>
              </p>
            </NavLink>
          )}
        </div>
      </div>
    );
  }
  return (
    <div>
      {article ? (
        <>
          <Hero
            title={article.title}
            description={author}
            followAuthor={followAuthor}
          />
          <div className="mx-8 my-4">
            <p className="text-lg py-4">{article.description}</p>
            <p className="text-lg py-4">{article.body}</p>
            <p className="text-base capitalize py-4">
              {article.taglist.length > 0 ? `Tags: ${article.taglist}` : ""}
            </p>

            <hr></hr>
            <ErrorBoundary message="Error occured while comments of this article. Please reload the page">
              <Comment user={context.user} slug={props.match.params.slug} />
            </ErrorBoundary>
          </div>
        </>
      ) : error ? (
        <p className="text-center mt-12 capitalize text-2xl text-red-700">
          {error}
        </p>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default withRouter(Article);

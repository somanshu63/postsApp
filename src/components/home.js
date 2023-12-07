import React, { useContext, useEffect, useState } from "react";
import Hero from "./hero";
import ArticlesFeed from "./articlesFeed";
import Pagination from "./pagination";
import fetchData from "../utils/fetchData";
import { userContext } from "./userContext";
import Loading from "./loading";

function Home(props) {
  const [openTag, setOpenTag] = useState("");
  const [articles, setArticles] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [articlesCount, setArticlesCount] = useState(0);
  const [author, setAuthor] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData(
      activeIndex,
      handleArticlesData,
      context.user ? context.user.token : ""
    );
    if (context.user) {
      setAuthor(context.user.username);
    }
  }, [activeIndex]);
  let handleArticlesData = (key, value) => {
    if (key === "articles") {
      setArticles(value);
    }
    if (key === "articlesCount") {
      setArticlesCount(value);
    }
    if (key === "activeIndex") {
      setActiveIndex(value);
    }
    if (key === "author") {
      setAuthor(value);
    }
    if (key === "openTag") {
      setOpenTag(value);
    }

    if (key === "error") {
      setError(value);
    }
  };
  let handleState = (key, value) => {
    setLoading(true);
    setOpenTag("");
    setArticles(null);
    setArticlesCount(0);

    if (key === "articles") {
      setArticles(value);
    }
    if (key === "articlesCount") {
      setArticlesCount(value);
    }
    if (key === "activeIndex") {
      setActiveIndex(value);
    }
    if (key === "author") {
      setAuthor(value);
    }
    if (key === "openTag") {
      setOpenTag(value);
    }

    if (key === "error") {
      setError(value);
    }

    setLoading(false);
  };

  let context = useContext(userContext);
  return (
    <div className="main">
      <Hero />
      <div className="flex justify-center">
        <div className="home w-4/5">
          {error ? (
            <p className="text-base capitalize text-center m-4">{error}</p>
          ) : loading ? (
            <Loading />
          ) : (
            <>
              <ArticlesFeed
                articles={articles}
                openTag={openTag}
                user={context.user}
                handleState={handleState}
              />
              {articles ? (
                <Pagination
                  handleState={handleState}
                  articlesCount={articlesCount}
                  activeIndex={activeIndex}
                />
              ) : (
                ""
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;

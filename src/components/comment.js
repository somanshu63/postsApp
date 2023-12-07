import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import baseurl from "../utils/constants";
let commentUrl;

export default function Comment(props) {
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [comments, setComments] = useState([]);
  let handleInput = ({ target }) => {
    let { name, value } = target;

    if (name === "comment") {
      setComment(value);
    }
  };
  let checkInput = () => {
    if (!comment) {
      setError("comment required to add*");
    }
  };

  useEffect(() => {
    commentUrl = `${baseurl}/api/articles/${props.slug}/comments`;
    fetchComments();
  }, [comments]);
  let addComment = () => {
    fetch(commentUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `${props.user.token}`,
      },
      body: JSON.stringify({
        comment: {
          body: comment,
        },
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("cant add new comment");
        }
        return res.json();
      })
      .then((comment) => {
        setComment("");
        fetchComments();
      })
      .catch((errors) => {
        setError(errors.error);
      });
  };
  let fetchComments = () => {
    fetch(commentUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error("cant fetch comments");
        }
        return res.json();
      })
      .then((comments) => {
        setComments(comments.comments);
      })
      .catch((errors) => {
        setError(errors.error);
      });
  };
  let deleteComment = (id) => {
    fetch(`${commentUrl}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `${props.user.token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("can't delete comment");
        }
        return res.json();
      })
      .then((data) => {
        setComments([]);
        fetchComments();
      })
      .catch((errors) => {
        setError(errors.error);
      });
  };
  let formControlClass =
    "text-sm rounded-md w-full py-1 px-4 my-2 border-2 border-solid border-blue-900 text-blue-900";

  return (
    <div className=" w-1/3 mx-auto">
      {props.user ? (
        <>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              checkInput();
              if (!error) {
                addComment();
              }
            }}
          >
            <span className="text-red-500 text-sm">{error}</span>
            <textarea
              className={formControlClass}
              placeholder="Write comment"
              rows={3}
              onChange={handleInput}
              value={comment}
              name="comment"
            ></textarea>
            <input
              type="submit"
              value="Add Comment"
              className={`bg-blue-300 hover:scale-110 blue ${formControlClass}`}
            ></input>
          </form>
        </>
      ) : (
        <NavLink to={"/login"}>
          <p className="text-base m-4 text-center">
            <span className="text-green-500">SignIn/SignUp</span> to add
            <span className="blue"> Comment</span>
          </p>
        </NavLink>
      )}
      <div>
        <h4 className="blue text-lg m-4 text-center">Comments</h4>
        {comments.map((comment, i) => {
          return (
            <SingleComment
              deleteComment={deleteComment}
              user={props.user}
              key={i}
              comment={comment}
            />
          );
        })}
      </div>
    </div>
  );
}

function SingleComment(props) {
  return (
    <div className="my-3 comment flex justify-between items-center">
      <div>
        <p className="blue text-base">{props.comment.body}</p>
        <address className="text-xs capitalize">
          {props.comment.author.username}
        </address>
        <span className="text-xs -mt-4">
          {props.comment.createdAt.slice(0, 10)}
        </span>
      </div>
      {props.user && props.user.username === props.comment.author.username ? (
        <button
          onClick={() => {
            props.deleteComment(props.comment.id);
          }}
          className="text-red-500 text-xs hover:scale-125"
        >
          <i className="fa-solid fa-trash"></i>
        </button>
      ) : (
        ""
      )}
    </div>
  );
}

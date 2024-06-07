// Types Import
import { useEffect, useRef, useState } from "react";
import { useMainContext } from "../../context/mainContext";
import { toastMsg } from "../../utils/ToastMsg";
import {
  articleType,
  commentArticle,
  userLikeArticle,
} from "./ArticleAPI";
import { settingData } from "../../api";

const ArticleCard = (data: articleType) => {
  const { isAuth, username } = useMainContext();

  // Likes
  const likeModified = useRef<string[]>();
  const [likesNumber, setlikesNumber] = useState(0);
  const [contentDisplay, setContentDisplay] = useState();

  // Comments
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");
  const commentModified =
    useRef<
      { username: string; content: string; date: string }[]
    >();
  const [commentsNumber, setCommentsNumber] = useState(0);

  const likeOrDislikeArticle = async () => {
    if (!isAuth) {
      toastMsg("error", "Login Required");
      return;
    }
    const response = await userLikeArticle(data._id);
    const likeButton = document.getElementById("likeBtn");

    if (!response.ok) {
      toastMsg("error", "Could not like article");
      return;
    } else {
      if (data.likes.includes(username)) {
        if (likeButton && likeModified.current) {
          likeButton.innerText = "Like";
          const index =
            likeModified.current.indexOf(username);

          likeModified.current.splice(index, 1);
          setlikesNumber((prev) => prev - 1);
        }
      } else {
        if (likeButton) {
          likeButton.innerText = "Dislike";
          likeModified.current!.push(username);
          setlikesNumber((prev) => prev + 1);
        }
      }
    }
  };

  const commentOnArticle = async () => {
    if (!isAuth) {
      toastMsg("error", "Login Required");
      return;
    }
    const response = await commentArticle(
      data._id,
      comment
    );

    if (!response.ok) {
      toastMsg("error", "Could not comment");
      return;
    } else {
      toastMsg("success", "Commented");
      if (commentModified.current) {
        commentModified.current.push({
          username: username,
          content: comment,
          date: "",
        });
        setCommentsNumber((prev) => prev + 1);
      }
      return;
    }
  };

  const getSettingData = async () => {
    if (isAuth) {
      const response = await settingData();
      const resBody = await response.json();
      setContentDisplay(resBody.data.contentDisplay);
    }
  };

  useEffect(() => {
    likeModified.current = data.likes;
    commentModified.current = data.comments;
    setlikesNumber(data.likes.length);
    setCommentsNumber(data.comments.length);

    getSettingData();
  }, []);

  return (
    <article
      className={`p-2 my-5 border-2 border-black rounded-md ${
        contentDisplay === "center" && "text-center"
      } ${contentDisplay === "right" && "text-right"} ${
        contentDisplay === "left" && "text-left"
      }`}
    >
      {/* Profile Pic, Author Name, Menu Dots */}
      <section className="flex flex-row items-center justify-between my-2">
        <div className="flex flex-row items-center">
          <div className="w-10 h-10 rounded-lg bg-slate-300">
            <a className="flex items-center justify-center h-full ">
              P
            </a>
          </div>
          <h2 className="ml-2">{data.author}</h2>
        </div>
        <button className="">
          <img
            src="/assets/menu-dots.png"
            width={30}
            height={30}
          />
        </button>
      </section>

      {/* Title, Content */}
      <section>
        <h2 className="font-semibold text-r-2xl ">
          <a className="hover:text-orange-500 hover:cursor-pointer">
            {data!.title}
          </a>
          <span> {data!.tag}</span>
        </h2>
        <p>
          {data!.content.substring(0, 100)}
          ...
        </p>
      </section>

      {/* Likes & Comments */}
      <section
        className={`flex gap-5 my-3 ${
          contentDisplay === "left" && "justify-start"
        } ${
          contentDisplay === "center" && "justify-center"
        } ${contentDisplay === "right" && "justify-end"}`}
      >
        <div>
          {likesNumber}
          <button
            id="likeBtn"
            className="w-20 mx-2 font-semibold text-white bg-orange-400 border-2 border-black rounded-lg hover:cursor-pointer hover:bg-orange-500"
            onClick={() => likeOrDislikeArticle()}
          >
            {likeModified.current
              ? isAuth &&
                likeModified.current.includes(username)
                ? "Dislike"
                : "Like"
              : 0}
          </button>
        </div>
        <div>
          {commentsNumber}
          <button
            className="w-24 mx-2 font-semibold text-white bg-orange-400 border-2 border-black rounded-lg hover:cursor-pointer hover:bg-orange-500"
            onClick={() => {
              setShowComments((prev) => !prev);
            }}
          >
            Comments
          </button>
        </div>
      </section>

      {/* Comment Cycle */}
      {showComments ? (
        <section>
          <textarea
            className="w-full p-2 border-2 border-black rounded-lg"
            maxLength={300}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            className="w-24 my-2 font-semibold text-white bg-orange-400 border-2 border-black rounded-lg hover:cursor-pointer hover:bg-orange-500"
            onClick={() => commentOnArticle()}
          >
            Comment
          </button>
          {commentModified.current!.map(
            (comment, index) => {
              return (
                <div
                  className="grid grid-cols-3"
                  key={index}
                >
                  <p className="h-full my-2 text-center">
                    {comment.username} ---
                  </p>{" "}
                  <p className="col-span-2 my-2">
                    {comment.content}
                  </p>
                </div>
              );
            }
          )}
        </section>
      ) : (
        ""
      )}
    </article>
  );
};
export default ArticleCard;

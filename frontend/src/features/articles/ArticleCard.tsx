// Types Import
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useMainContext } from "../../context/mainContext";
import { toastMsg } from "../../utils/ToastMsg";
import {
  articleType,
  commentArticle,
  deleteAComment,
  editAComment,
  userLikeArticle,
} from "./ArticleAPI";

import ThreeDotsDropdown from "./ThreeDotsDropdown";
import { motion } from "framer-motion";
import FollowButton from "../../components/Buttons/FollowButton";
import { Link } from "react-router-dom";

const ArticleCard = ({ data }: { data: articleType }) => {
  const { isAuth, username } = useMainContext();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLButtonElement>(null);

  // Likes
  const likeModified = useRef<string[]>();
  const [likesNumber, setlikesNumber] = useState(0);
  const { contentDisplay } = useMainContext();

  // Comments
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");
  const [commentModified, setCommentModified] = useState<
    { username: string; content: string; date: string }[]
  >([]);
  const [commentsNumber, setCommentsNumber] = useState(0);
  const [alreadyCommented, setAlreadyCommented] =
    useState(false);

  // Functions
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

    if (!comment) {
      toastMsg("error", "Comment is empty");
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
      const newComment = {
        username: username,
        content: comment,
        date: "",
      };
      setCommentModified([...commentModified, newComment]);
      setAlreadyCommented(true)

      setCommentsNumber((prev) => prev + 1);
    }
  };

  const editComment = async (articleId: string) => {
    const response = await editAComment(articleId, comment);
    const resBody = await response.json();
    if (!response.ok) {
      toastMsg("error", resBody.message);
      return;
    } else {
      toastMsg("success", "Comment Edited");
      const newComments = commentModified.map((com) => {
        if (com.username === username) {
          return { ...com, content: comment };
        }
        return com;
      });
      setCommentModified(newComments);
    }
  };

  const deleteComment = async (articleId: string) => {
    const response = await deleteAComment(articleId);
    const resBody = await response.json();
    if (!response.ok) {
      toastMsg("error", resBody.message);
      return;
    } else {
      toastMsg("success", "Comment Deleted");
      const newComments = commentModified.filter((com) => {
        if (com.username !== username) {
          setComment("");
          setAlreadyCommented(false);
          return com;
        }
      });
      setCommentModified(newComments);
    }
  };

  // Close Three Dots Menu when clicked outside
  const closeMenu = useCallback(
    (e: { target: any }) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        e.target !==
          document.getElementById(
            `${data.title}ThreeDotsDropdown`
          )
      ) {
        setMenuOpen(false);
      }
    },
    [menuOpen]
  );

  // UseEffects
  useEffect(() => {
    likeModified.current = data.likes;
    setCommentModified(data.comments);
    setlikesNumber(data.likes.length);
    setCommentsNumber(data.comments.length);
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", closeMenu);
  }, [closeMenu]);

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
        <div className="flex flex-row items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-slate-300">
            <a className="flex items-center justify-center h-full ">
              P
            </a>
          </div>
          <h2 className="ml-2 text-r-lg">
            <Link to={`/users/profile/${data.author}`}>
              {data.author}
            </Link>
          </h2>
          {data.author !== username && (
            <FollowButton author={data.author} />
          )}
        </div>
        <div className="relative">
          <motion.img
            whileHover={{ scale: 1.2 }}
            src="/assets/menu-dots.png"
            width={30}
            height={30}
            onClick={() => setMenuOpen((prev) => !prev)}
            className="hover:cursor-pointer"
            id={`${data.title}ThreeDotsDropdown`}
          />
          {menuOpen && (
            <div className="absolute top-[100%] right-0">
              <ThreeDotsDropdown
                articleId={data._id}
                menuRef={menuRef}
              />
            </div>
          )}
        </div>
      </section>

      {/* Title, Content */}
      <section>
        <h2 className="font-semibold text-r-2xl ">
          <a className="hover:text-orange-500 hover:cursor-pointer">
            {data!.title}
          </a>
        </h2>
        <p>
          {data?.content.substring(0, 100)}
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
            className="btn"
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
            className="btn "
            onClick={() => {
              setShowComments((prev) => !prev);

              commentModified?.some((comment) => {
                if (comment.username === username) {
                  setComment(comment.content);
                  setAlreadyCommented(true);
                }
              });
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

          <div className="flex items-center justify-between gap-3">
            {alreadyCommented ? (
              <>
                <button
                  className="w-[50%] p-2 bg-orange-400 border-2 border-black rounded-md hover:bg-orange-500 text-r-xl text-white "
                  onClick={() => editComment(data._id)}
                >
                  Edit
                </button>
                <button
                  className="w-[50%] p-2 bg-orange-400 border-2 border-black rounded-md hover:bg-orange-500 text-r-xl text-white "
                  onClick={() => deleteComment(data._id)}
                >
                  Delete
                </button>
              </>
            ) : (
              <button
                className="w-full p-2 text-white bg-orange-400 border-2 border-black rounded-md hover:bg-orange-500 text-r-xl"
                onClick={() => commentOnArticle()}
              >
                Comment
              </button>
            )}
          </div>

          {alreadyCommented && (
            <div>
              {commentModified.map((comment, index) => {
                if (comment.username === username) {
                  return (
                    <div
                      className="grid grid-cols-2"
                      key={index}
                    >
                      <p className="h-full my-2 text-center">
                        <Link
                          to={`/users/profile/${comment.username}`}
                        >
                          {comment.username}
                        </Link>
                        {"   ---"}
                      </p>
                      <p className="my-2 ">
                        {comment.content}
                      </p>
                    </div>
                  );
                }
              })}
            </div>
          )}

          {commentModified!.map((comment, index) => {
            if (comment.username !== username) {
              return (
                <div
                  className="grid grid-cols-2"
                  key={index}
                >
                  <p className="h-full my-2 text-center">
                    <Link
                      to={`/users/profile/${comment.username}`}
                    >
                      {comment.username}
                    </Link>
                    {"   ---"}
                  </p>
                  <p className="my-2 ">{comment.content}</p>
                </div>
              );
            }
          })}
        </section>
      ) : (
        ""
      )}
    </article>
  );
};
export default ArticleCard;

import { useLocation, useNavigate } from "react-router-dom";
import { removeSavedArticle, saveArticle } from "../../api";
import { toastMsg } from "../../utils/ToastMsg";
import { useMainContext } from "../../context/mainContext";

const ThreeDotsDropdown = ({
  articleId,
  menuRef,
}: {
  articleId: string;
  menuRef: React.RefObject<HTMLButtonElement>;
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuth } = useMainContext();

  const saveArticleToUser = async () => {
    if (isAuth) {
      const response = await saveArticle(articleId);
      const resBody = await response.json();

      if (!response.ok) {
        toastMsg("error", resBody.message);
        return;
      } else {
        toastMsg("success", "Article Saved");
        return;
      }
    } else {
      toastMsg("error", "Login is required");
    }
  };

  const removeArticleFromUser = async () => {
    if (isAuth) {
      const response = await removeSavedArticle(articleId);
      const resBody = await response.json();

      if (!response.ok) {
        toastMsg("error", resBody.message);
        return;
      } else {
        toastMsg("success", "Article Removed");
        navigate(0);
        return;
      }
    } else {
      toastMsg("error", "Login is required");
    }
  };

  return (
    <section className="flex flex-col justify-around gap-2 py-2 rounded-lg w-fit show h-fit">
      {location.pathname === "/user/savedArticles" ? (
        <button
          ref={menuRef}
          className="btn"
          onClick={() => removeArticleFromUser()}
        >
          Remove
        </button>
      ) : (
        <button
          ref={menuRef}
          className="btn"
          onClick={() => saveArticleToUser()}
        >
          Save
        </button>
      )}
    </section>
  );
};
export default ThreeDotsDropdown;

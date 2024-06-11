import { useState, useRef, useEffect } from "react";
import { getSavedArticles } from "../api";
import { articleType } from "../features/articles/ArticleAPI";
import ArticleCard from "../features/articles/ArticleCard";
import { getFollowingList } from "../features/users/@UsersAPI";

const SavedArticlesPage = () => {
  let data = useRef<articleType[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [following, setFollowing] = useState<string[]>([]);

  const savedArticles = async () => {
    setLoading(true);
    const res = await getSavedArticles(String(page));
    let allData = new Set([...data.current, ...res.data]);
    data.current = [...allData];
    setLoading(false);
  };

  const followingList = async () => {
    const response = await getFollowingList();
    const resBody = await response.json();
    setFollowing(resBody.data);
  };

  // Infinite Scroll
  const [lastElement, setLastElement] =
    useState<HTMLDivElement | null>(null);

  const observer = useRef(
    new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting) {
        setPage((no: number) => no + 1);
      }
    })
  );

  useEffect(() => {
    const currentElement = lastElement;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }
    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [lastElement]);

  // UseEffects
  useEffect(() => {
    savedArticles();
  }, [page]);

  useEffect(() => {
    followingList();
  }, []);

  return (
    <section>
      {data.current.length > 0 ? (
        data.current.map((article, index) => {
          return (
            <section key={index}>
              {data.current[data.current.length - 2]
                .title === article.title ? (
                <div ref={(elem) => setLastElement(elem)}>
                  {" "}
                </div>
              ) : null}
              <ArticleCard
                data={article}
                followingList={following}
              />
            </section>
          );
        })
      ) : (
        <div className="text-center text-r-2xl">
          No Saved Articles Found
        </div>
      )}
    </section>
  );
};
export default SavedArticlesPage;

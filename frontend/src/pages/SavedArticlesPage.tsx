import { useState, useRef, useEffect } from "react";
import { getSavedArticles } from "../api";
import { articleType } from "../features/articles/ArticleAPI";
import ArticleCard from "../features/articles/ArticleCard";

const SavedArticlesPage = () => {
  let data = useRef<articleType[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const savedArticles = async () => {
    setLoading(true)
    const res = await getSavedArticles(String(page));
    let allData = new Set([...data.current, ...res.data]);
    data.current = [...allData];
    setLoading(false)
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

  return (
    <section>
      {loading ? (
        <div>Loading</div>
      ) : (
        <section>
          {data.current.map((article, index) => {
            return (
              <section key={index}>
                {data.current[data.current.length - 2]
                  .title === article.title ? (
                  <div ref={(elem) => setLastElement(elem)}>
                    {" "}
                  </div>
                ) : null}
                <ArticleCard {...article} />
              </section>
            );
          })}
        </section>
      )}
    </section>
  );
};
export default SavedArticlesPage;

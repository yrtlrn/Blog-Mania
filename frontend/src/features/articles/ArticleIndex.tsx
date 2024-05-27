import { useState, useRef, useEffect } from "react";
import { articleType, getAllArticles } from "./ArticleAPI";
import ArticleCard from "./ArticleCard";

const ArticleIndex = () => {
  //   const [data, setData] = useState<articleType[]>([]);
  let data = useRef<articleType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error>();
  const [page, setPage] = useState(1);

  const observer = useRef(
    new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting) {
        setPage((no) => no + 1);
      }
    })
  );

  const getArticles = async () => {
    setLoading(true);
    const res = await getAllArticles(
      String(page),
      setError
    );
    let allData = new Set([...data.current, ...res.data]);
    data.current = [...allData]
    setLoading(false);
  };

  // Infinite Scroll
  const [lastElement, setLastElement] =
    useState<HTMLDivElement | null>(null);

  useEffect(() => {
    getArticles();
  }, [page]);

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
  return (
    <section>
      {error ? (
        <div>{error.message}</div>
      ) : (
        <section>
          {data.current.map((article) => {
            return (
              <>
                {" "}
                {data.current[data.current.length - 2].title ===
                article.title ? (
                  <div ref={(elem) => setLastElement(elem)}>
                    {" "}
                    Second last
                  </div>
                ) : (
                  ""
                )}
                <ArticleCard {...article} />;
              </>
            );
          })}
        </section>
      )}
      {loading ? (
        <div>
          <h3>Loading...</h3>
        </div>
      ) : (
        ""
      )}
    </section>
  );
};
export default ArticleIndex;

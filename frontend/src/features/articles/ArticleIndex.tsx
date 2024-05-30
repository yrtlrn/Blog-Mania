import { useState, useRef, useEffect } from "react";
import {
  articleType,
  getAllArticles,
  getTagArticles,
} from "./ArticleAPI";
import ArticleCard from "./ArticleCard";
import InfiniteScroll from "../../utils/InfiniteScroll";
import { useParams } from "react-router-dom";

const ArticleIndex = () => {
  let data = useRef<articleType[]>([]);
  const firstRender = useRef(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error>();
  const [page, setPage] = useState(1);
  const { tag } = useParams();

  const getArticles = async () => {
    setLoading(true);
    const res = await getAllArticles(
      String(page),
      setError
    );
    setLoading(false);
    let allData = new Set([...data.current, ...res.data]);
    data.current = [...allData];
  };

  const tagArticles = async () => {
    setLoading(true);
    const res = await getTagArticles(
      String(page),
      tag!,
      setError
    );
    setLoading(false);

    let allData = new Set([...data.current, ...res.data]);
    data.current = [...allData];
  };

  // Infinite Scroll
  const [lastElement, setLastElement] =
    useState<HTMLDivElement | null>(null);

  InfiniteScroll(setPage, lastElement);

  useEffect(() => {
    if (!tag) {
      getArticles();
    } else {
      tagArticles();
    }
  }, [page]);

  useEffect(() => {
    if (tag && firstRender.current === false) {
      data.current = [];

      tagArticles();
    }
  }, [tag]);

  useEffect(() => {
    firstRender.current = false;
  }, []);

  return (
    <section>
      {error ? (
        <div>{error.message}</div>
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

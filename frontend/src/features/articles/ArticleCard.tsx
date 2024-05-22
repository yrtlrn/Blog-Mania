// Package Imports
import { useEffect, useState } from "react";

// API calls Imports
import { getAllArticles } from "./ArticleAPI";

// Types Import
import { articleType } from "./ArticleAPI";

const ArticleCard = () => {
  const [data, setData] = useState<articleType[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error>();
  useEffect(() => {
    getAllArticles()
      .then((response) => {
        if (response.length > 0) {
          setData(response);
          setLoading(false);
        }
      })
      .catch((error: Error) => {
        setError(error);
        setLoading(false);
      });
  }, []);
  return (
    <>
      {loading ? (
        <div>
          <h3>Loading...</h3>
        </div>
      ) : error ? (
        <div>{error.message}</div>
      ) : (
        <section>
          {data?.map((article) => (
            <article
              key={article.title}
              className="p-2 my-5 border-2 border-black rounded-md"
            >
              {/* Profile Pic, Author Name, Menu Dots */}
              <section className="flex flex-row items-center justify-between">
                <div className="flex flex-row items-center">
                  <div className="w-10 h-10 text-center rounded-lg bg-slate-300">
                    P
                  </div>
                  <h2>{article.author}</h2>
                </div>
                <button className="">
                  <img
                    src="../../../public/assets/menu-dots.png"
                    width={30}
                    height={30}
                  />
                </button>
              </section>

              {/* Title, Content */}
              <section>
                <h2 className="font-semibold text-r-2xl">
                  {article.title}
                </h2>
                <p>
                  {article.content.substring(0, 100)}...
                </p>
              </section>

              {/* Likes & Comments */}
              <section>
                <div>
                  {article.likes.length}
                  <button className="w-10 mx-2 border-2 border-black">Like</button>
                </div>
              </section>
            </article>
          ))}
        </section>
      )}
    </>
  );
};
export default ArticleCard;

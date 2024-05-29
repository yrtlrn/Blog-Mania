// Types Import
import { articleType } from "./ArticleAPI";

// Utils Imports


const ArticleCard = (data:articleType) => {
  console.log(data._id)
  return (
    <article
      key={data._id}
      className="p-2 my-5 border-2 border-black rounded-md"
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
          <a className="hover:text-blue-500">
            {data.title}
          </a>
          <span> {data.tag}</span>
        </h2>
        <p>{data.content.substring(0, 100)}...</p>
      </section>

      {/* Likes & Comments */}
      <section className="flex gap-5 my-3">
        <div>
          {data.likes.length}
          <button className="w-20 mx-2 border-2 border-black">
            Like
          </button>
        </div>
        <div>
          {data.comments.length}
          <button className="w-20 mx-2 border-2 border-black">
            Comment
          </button>
        </div>
      </section>

      {/* Comment Cycle */}
      <section></section>
    </article>
  );
};
export default ArticleCard;

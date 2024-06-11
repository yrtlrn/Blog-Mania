import { useParams } from "react-router-dom";
import { getProfileData } from "./@UsersAPI";
import { useEffect, useState } from "react";
import { toastMsg } from "../../utils/ToastMsg";
import ArticleCard from "../articles/ArticleCard";
import { articleType } from "../articles/ArticleAPI";
import FollowButton from "../../components/Buttons/FollowButton";

type profilePageProps = {
  articles: [articleType];
  followers: number;
  following: number;
};

const ProfilePage = () => {
  const params = useParams();
  const [data, setData] = useState<profilePageProps>();
  const [accountPrivate, setAccountPrivate] =
    useState(false);

  const profileData = async () => {
    if (params.id) {
      const response = await getProfileData(params.id);
      const resBody = await response.json();
      if (!response.ok) {
        toastMsg("error", "Could not get data");
      }
      if (resBody.data.account === "private") {
        setAccountPrivate(true);
      }
      if (!accountPrivate) {
        setData(resBody.data);
      }
    }
  };

  useEffect(() => {
    profileData();
  }, []);

  return (
    <section className="flex flex-col gap-5 p-2">
      <section className="md:flex md:justify-between md:border-b-2">
        {/* Profile, Username, Folllow Button */}
        <section className="flex items-center justify-between pb-2 border-b-2 md:justify-normal md:gap-3 md:border-b-0">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-slate-300">
              P
            </div>
            <h1 className="text-r-2xl">{params.id}</h1>
          </div>
          <div className="flex items-center justify-center">
            
          {params.id && <FollowButton author={params.id} />}
          </div>
        </section>

        {/* # of Articles, # of Following, # of Followings */}
        <section className="flex items-center justify-between pb-2 border-b-2 md:border-b-0 md:gap-10">
          <div className="text-center">
            <span className="text-r-xl">
              {data && !accountPrivate
                ? data.articles.length
                : "X"}
            </span>
            <p className="text-r-xl">Articles</p>
          </div>
          <div className="text-center">
            <span className="text-r-xl">
              {data && !accountPrivate
                ? data.followers
                : "X"}
            </span>
            <p className="text-r-xl">Followers</p>
          </div>
          <div className="text-center">
            <span className="text-r-xl">
              {data && !accountPrivate
                ? data.following
                : "X"}
            </span>
            <p className="text-r-xl">Following</p>
          </div>
        </section>
      </section>

      {/* Articles */}
      <section>
        <h1 className="font-semibold text-center text-r-2xl">
          Articles
        </h1>
        {data?.articles ?
          data.articles.map((article) => {
            return (
              <article key={article.title}>
                <ArticleCard data={article} />
              </article>
            );
          }) : <span className="text-r-xl">No Articles</span>}
      </section>
    </section>
  );
};
export default ProfilePage;

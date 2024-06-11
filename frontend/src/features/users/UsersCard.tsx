import FollowButton from "../../components/Buttons/FollowButton";

const UsersCard = ({ data }: { data: string[] }) => {
  return (
    <section className="flex flex-col gap-3 p-2">
      {data.length > 0 &&
        data.map((user) => {
          return (
            <div
              key={user}
              className="flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-slate-300">
                  <a className="flex items-center justify-center h-full ">
                    P
                  </a>
                </div>
                <h2>{user}</h2>
              </div>

              <div>
                <FollowButton author={user} />
              </div>
            </div>
          );
        })}
    </section>
  );
};
export default UsersCard;

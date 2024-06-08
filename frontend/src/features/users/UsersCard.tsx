type UserProps = {
  username: string;
  following: [];
  followers: [];
};

const UsersCard = (data: UserProps) => {
  return (
    <section>
      <div>
        <div className="w-10 h-10 rounded-lg bg-slate-300">
          <a className="flex items-center justify-center h-full ">
            P
          </a>
        </div>
        <h2>User Name</h2>
      </div>

      <div>
        <button>Follow</button>
      </div>
    </section>
  );
};
export default UsersCard;

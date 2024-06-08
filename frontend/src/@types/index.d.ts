type loginPageProps = {
  email: string;
  password: string;
  remember?: boolean;
};

type signupPageProps = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
};

type profilePageProps = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  currentPassword: string;
  newPassword: string;
};

type UserProps = {
  username: string;
  following: [];
  followers: [];
};




export type {
  loginPageProps,
  signupPageProps,
  profilePageProps,
};

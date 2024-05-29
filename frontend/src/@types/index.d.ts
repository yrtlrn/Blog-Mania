type loginPageProps = {
  email: string;
  password: string;
  remember?: boolean
};

type signupPageProps = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
};



export type { loginPageProps, signupPageProps };

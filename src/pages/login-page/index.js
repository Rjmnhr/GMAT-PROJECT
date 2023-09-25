import SignIn from "../../components/sign-in/sign-in";

import { LoginPagestyled } from "./style";
import SignUp from "../../components/sign-up/sign-up";
import { useApplicationContext } from "../../app-context";

const LoginPage = () => {
  const { isSignIn } = useApplicationContext();

  return (
    <>
      <LoginPagestyled>
        <div
          className="container-fluid img_container "
          style={{
            backgroundImage:
              "url(https://lh5.googleusercontent.com/5fVJIifi1CIJ76Og-mHkXlY2Us2xcnaboBFakE2UVDbfMANy4tv_FFs4gZyMkiK6FduI2GhCXiu79qwMbkyMpu8=w16383)",
            backgroundPosition: "center",
            backgroundSize: "cover",
            height: "100vh",
            transform: "translate3d(0px, 0px, 0px)",
          }}
        >
          {isSignIn ? <SignIn /> : <SignUp />}
        </div>
      </LoginPagestyled>
    </>
  );
};

export default LoginPage;

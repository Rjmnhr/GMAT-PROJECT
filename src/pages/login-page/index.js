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
              "url(https://res.cloudinary.com/dsw1ubwyh/image/upload/v1695657433/pgsgfjhvitdmjl0pnbco.png)",
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

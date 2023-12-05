import SignIn from "../../components/sign-in/sign-in";

import { LoginPagestyled } from "./style";
import SignUp from "../../components/sign-up/sign-up";
import { useApplicationContext } from "../../context/app-context";
import { useLocation } from "react-router-dom";

const LoginPage = () => {
  const { isSignIn } = useApplicationContext();
  const Location = useLocation();
  const showContent = Location.pathname === "/login-app";
  return (
    <>
      <LoginPagestyled>
        <div className="main-container" style={{ height: "100vh" }}>
          <div
            className="left-container img_container"
            style={{
              backgroundImage:
                "url(https://res.cloudinary.com/dsw1ubwyh/image/upload/v1695657433/pgsgfjhvitdmjl0pnbco.png)",
              backgroundPosition: "center",
              backgroundSize: "cover",
              height: "100vh",
              transform: "translate3d(0px, 0px, 0px)",
            }}
          >
            <p style={{ fontSize: "80px" }}>
              <span className="text-primary" style={{ fontWeight: "bold" }}>
                {" "}
                Adeft
              </span>{" "}
              <span style={{ color: "white" }}>Education</span>
            </p>
          </div>
          <div className="right-container">
            <div className="right-sub-container">
              <div>
                {showContent ? (
                  <p>
                    To access our free GMAT test, please register or log in to
                    your account. Registration is quick and easy.
                  </p>
                ) : (
                  ""
                )}

                {isSignIn ? <SignIn /> : <SignUp />}
              </div>
            </div>
          </div>
        </div>
      </LoginPagestyled>
    </>
  );
};

export default LoginPage;

import SignIn from "../../components/sign-in/index";
import NavBar from "../../components/nav-bar";
import { LoginPageStyled } from "./style";
import SignUp from "../../components/sign-up/index";
import { useApplicationContext } from "../../context/app-context";
import pointArrow from "../../icons/right-arrow.png";
const LoginPage = () => {
  const { isSignIn } = useApplicationContext();

  return (
    <>
      <LoginPageStyled>
        <NavBar />

        <div className="main-container" style={{ height: "100vh" }}>
          <div
            className="left-container img_container bg-dark"
            style={{
              height: "100vh",
              transform: "translate3d(0px, 0px, 0px)",
            }}
          >
            <h2 className="text-left w-100">
              Log in to unlock exclusive content
            </h2>

            <div className="text-left w-100 mt-3">
              <h5 className="d-flex justify-contents-start align-items-center mb-3  col-12">
                <img
                  style={{ marginRight: "8px" }}
                  src={pointArrow}
                  alt=""
                  height={50}
                  width={50}
                />{" "}
                GMAT Practice Test
              </h5>
              <h5 className="d-flex justify-contents-start align-items-center mb-3  col-12">
                <img
                  style={{ marginRight: "8px" }}
                  src={pointArrow}
                  alt=""
                  height={50}
                  width={50}
                />
                Profiler
              </h5>
              <h5 className="d-flex justify-contents-start align-items-center mb-3  col-12">
                <img
                  style={{ marginRight: "8px" }}
                  src={pointArrow}
                  alt=""
                  height={50}
                  width={50}
                />
                Recorded Videos
              </h5>
              <h5 className="d-flex justify-contents-start align-items-center mb-3  col-12">
                <img
                  style={{ marginRight: "8px" }}
                  src={pointArrow}
                  alt=""
                  height={50}
                  width={50}
                />
                Practice Questions
              </h5>
            </div>
          </div>
          <div className="right-container">
            <div className="right-sub-container">
              <div>{isSignIn ? <SignIn /> : <SignUp />}</div>
            </div>
          </div>
        </div>
      </LoginPageStyled>
    </>
  );
};

export default LoginPage;

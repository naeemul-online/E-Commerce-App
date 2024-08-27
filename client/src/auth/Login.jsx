import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const Login = () => {
  const { signIn, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/");
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        console.log(result);
        navigate("/");
      })
      .catch((error) => {
        // Handle Errors here.
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };
  return (
    <div className="">
      <div className="lg:w-2/3 mx-auto flex flex-col justify-center items-center lg:p-16 md:mt-16">
        <h2 className="text-2xl font-bold">Please Login!</h2>
        <form onSubmit={handleLogin}>
          <div className="flex flex-col p-4 gap-4">
            <input type="email" name="email" placeholder="email" />
            <input type="password" name="password" placeholder="password" />
            <button className="btn bg-blue-500 text-white" type="submit">
              Login
            </button>
          </div>
        </form>
        <p>or</p>
        <p>
          Please login with
          <span>
            <button
              onClick={handleGoogleLogin}
              className="text-blue-500 underline"
            >
              Google Account
            </button>
          </span>
        </p>
        <p>
          Haven&apos;t account? Please{" "}
          <Link to="/signUp" className="text-blue-500 underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

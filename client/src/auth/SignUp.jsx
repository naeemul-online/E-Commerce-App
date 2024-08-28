import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const { createUser } = useContext(AuthContext);
  const navigate = useNavigate()
  console.log(createUser);
  const handleSignUp = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    createUser(email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log(user);
        navigate('/')
      })
      .catch((error) => {
        const errorMessage = error.message;
        // ..
        console.log(errorMessage);
      });
  };
  return (
    <div className="">
      <div className="lg:w-1/3  mx-auto flex flex-col justify-center items-center p-16 mt-16">
        <h2 className="text-2xl font-bold">Please Sign Up!</h2>
        <form onSubmit={handleSignUp}>
          <div className="flex flex-col p-4 gap-4">
            <label className="font-bol">Your Email:</label>
            <input type="email" name="email" placeholder="email" />
            <label className="font-bol">Password:</label>
            <input type="password" name="password" placeholder="password" />
            <button className="btn bg-blue-500 text-white" type="submit">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;

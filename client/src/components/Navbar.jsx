import { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "/ecom.png";
import { AuthContext } from "../provider/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  console.log(user);

  const handleLogout = () => {
    logOut();
  };
  return (
    <nav className="bg-blue-600 text-white p-4 fixed z-10 w-full">
      <div className="container mx-auto flex justify-between items-center">
        <div className="font-bold text-2xl">
          <h2 className="flex">
            <img src={logo} className="rounded mr-2" />
            <Link to="/">Digital Store</Link>
          </h2>
        </div>

        <ul className="flex space-x-4">
          {user ? (
            <>
              <li>{user.email}</li>
              <li>
                <button
                  onClick={handleLogout}
                  className="font-bold hover:text-gray-300"
                >
                  Log Out
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link to="login" className="hover:text-gray-300 font-bold">
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

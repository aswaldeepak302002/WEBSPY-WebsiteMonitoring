import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import ThemeToggle from "../ThemeToggle";
// import UserNav from "../dashboard/UserNav";

const NewNav = () => {
  const [state, setState] = useState(false);

  const menus = [
    { title: "Signup", path: "/signup" },
    { title: "Login", path: "/login" },
  ];
  const user = false
  return (
   
    <nav className="w-full my-5">
      <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
        <div className="flex items-center justify-between md:block">
          <Link to="/">
            <h1 className="">WEBSPY.</h1>
          </Link>
          <div className="md:hidden">
            <Button
              className="outline-none p-2 rounded-md focus:border-gray-400 focus:border"
              onClick={() => setState(!state)}
            >
              <Menu />
            </Button>
          </div>
        </div>
        <div
          className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
            state ? "block" : "hidden"
          }`}
        >
          <ul
            className={`justify-end items-center space-y-5 md:flex md:space-x-6 md:space-y-0 `}
          >
            {!user && !user ? (
              <>
                {menus.map((item, idx) => (
                  <li key={idx}>
                    <Link to={`${item.path}`}>
                      <Button className="min-w-30">{item.title}</Button>
                    </Link>
                  </li>
                ))}
              </>
            ) : (
              <>
                <span className="border-none">
                  {/* <UserNav /> */}
                </span>
                {/* <Logout /> */}
              </>
            )}
            <li>
              <ThemeToggle />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NewNav;
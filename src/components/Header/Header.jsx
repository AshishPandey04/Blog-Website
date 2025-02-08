import React from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];
  const authItem = [
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/Signup",
      active: !authStatus,
    },
  ];
  return (
    <header className="bg-gradient-to-r from-gray-900 to-gray-950 text-white shadow-md  pt-3 text-l ">
      <Container>
        <nav className="flex items-center">
          <div className="flex-1 flex justify-start">
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>

          <ul className="flex-1  flex justify-center  items-center border border-gray-800 shadow-sm text-base bg-gray-900 rounded-full py-2">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className="inline-block px-6 py-2 duration-200 hover:bg-blue-600 rounded-full"
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}
          </ul>
          <ul className="flex-1 flex justify-end">
            {authItem.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className="inline-block px-6 py-2 duration-200 hover:bg-blue-600 rounded-full"
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

import "./App.css";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaPhoneAlt } from "react-icons/fa";
import Lottie from "lottie-react";
import animationData from "./assets/animation_emoji.json";

export default function Navbar() {
  return (
    // <nav className="nav navbar navbar-expand-lg navbar-light bg-light">
    <nav className="nav navbar navbar-light">
      <Link to="/" className="site-title">
        PhoneBook
        <Lottie id="circle_animation" animationData={animationData} />
      </Link>

      <ul>
        <CustomLink to="/">Contact List</CustomLink>
        <CustomLink to="/createUser">Create Contact</CustomLink>
      </ul>
    </nav>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}

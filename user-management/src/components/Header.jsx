import React from "react";
import { Link } from "react-router";

const Header = () => {
  return (
    <div>
      <Link to="/blogs">Blogs</Link> <br />
      <Link to="/customers">Customers</Link> <br />
      <Link to="/users">Users</Link>
    </div>
  );
};

export default Header;

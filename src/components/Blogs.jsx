import React from "react";
import Header from "./Header";
import { Link, useLoaderData } from "react-router";

const Blogs = () => {
  const blogs = useLoaderData();
  return (
    <div>
      <h2>All Blogs: {blogs.length}</h2>
      {blogs.map((blog) => (
        <li key={blog.id}>
          <Link to={`/blog/${blog.id}`}>{blog.author}</Link>{" "}
        </li>
      ))}
    </div>
  );
};

export default Blogs;

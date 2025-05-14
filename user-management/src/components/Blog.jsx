import React from "react";
import { useLoaderData } from "react-router";

const Blog = () => {
  const blog = useLoaderData();
  return (
    <div>
      {blog.author}
      <br />
      {<img src={blog.cover} alt="" />}
    </div>
  );
};

export default Blog;

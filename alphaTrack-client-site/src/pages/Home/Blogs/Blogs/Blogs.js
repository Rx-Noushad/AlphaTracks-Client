import React, { useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import Blog from "../Blog/Blog";
import "./Blogs.css";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const { isLoading } = useAuth();

  useEffect(() => {
    fetch("https://alpha-tracks-server-site-kw9aq2sdn-rx-noushad.vercel.app/newsBlog")
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
        console.log(data);
      });
  }, []);

  return (
    <div id="blogs" className="container-fluid py-5" data-wow-delay="0.1s">
      <div className="container py-5">
        <div
          className="section-title text-center position-relative pb-3 mb-5 mx-auto"
          style={{ maxWidth: "600px" }}
        >
          <h2 className="text-danger">Latest Blogs</h2>
        </div>
        <div className="row g-5">
            {blogs.map((blog) => <Blog key={blog._id} blog={blog}></Blog>)}
        </div>
      </div>
    </div>
  );
};

export default Blogs;

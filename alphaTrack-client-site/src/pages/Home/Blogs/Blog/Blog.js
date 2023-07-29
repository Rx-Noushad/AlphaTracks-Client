import React from "react";
import { useHistory } from 'react-router-dom';

const Blog = ({blog}) => {
    const {_id, blog_name, image, short_des1, short_des2, short_des3, brand, author, publishDate } = blog;

    const history = useHistory();

    const handleBlogDetails = (id) => {
        history.push("/blogDetails", id);
    }
  return (
    <div className="col-lg-4 wow slideInUp" data-wow-delay="0.3s">
      <div className="blog-item bg-light rounded overflow-hidden">
        <div className="blog-img position-relative overflow-hidden">
          <img
            className="img-fluid"
            src={image}
            alt=""
          />
          <a
            style={{ textDecoration: "none", fontWeight: "bold" }}
            className="position-absolute top-0 start-0 bg-primary text-white rounded-end mt-5 py-2 px-4"
            href=""
          >
            {brand}
          </a>
        </div>
        <div className="p-4">
          <div className="d-flex mb-3">
            <small className="me-3">
              <i className="far fa-user text-primary me-2"></i>{author}
            </small>
            <small>
              <i className="far fa-calendar-alt text-primary me-2"></i>{publishDate}
            </small>
          </div>
          <h4 className="mb-3">{blog_name}</h4>
          <p>
            {short_des1.slice(0, 100)}...{" "}
          </p>
          <a 
          onClick={() => handleBlogDetails(_id)} 
          style={{textDecoration: "none"}} 
          className="text-uppercase" href=""
          >
            Read More <i className="bi bi-arrow-right"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Blog;

import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import Fade from "react-reveal/Fade";
import { Link } from 'react-router-dom';
import Footer from "../../Shared/Footer/Footer";
import Navigation from "../../Shared/Navigation/Navigation";
import Banner from "../Banner/Banner";
import Bike from "../Bikes/Bike/Bike";
import Blog from "../Blogs/Blog/Blog";
import Brands from "../Brands/Brands";
import ShowReview from "../ShowReview/ShowReview";

const Home = () => {
  const [bikes, setBikes] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [showCount, setShowCount] = useState(3);

  useEffect(() => {
    fetch("https://alpha-tracks-server-site-kw9aq2sdn-rx-noushad.vercel.app/bikes")
      .then((res) => res.json())
      .then((data) => setBikes(data));
  }, [bikes]);

  useEffect(() => {
    fetch("https://alpha-tracks-server-site-kw9aq2sdn-rx-noushad.vercel.app/newsBlog")
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
        console.log(data);
      });
  }, []);

  return (
    <div>
      <Navigation></Navigation>
      <Banner></Banner>
      <Brands></Brands>

      <div className="container">
        <div className="text-center">
          <Fade top>
            <h2 className="text-danger">Bikes for You</h2>
          </Fade>
          {bikes ? (
            <div className="row my-5">
              {bikes.slice(0, 6).map((bike) => (
                <Bike key={bike._id} bike={bike}></Bike>
              ))}
            </div>
          ) : (
            <div className="text-center">
              <Spinner animation="border" variant="danger" />
            </div>
          )}
        </div>
      </div>
      <ShowReview></ShowReview>
      <div id="blogs" className="container-fluid py-5" data-wow-delay="0.1s">
        <div className="container py-5">
          <div
            className="section-title text-center position-relative pb-3 mb-5 mx-auto"
            style={{ maxWidth: "600px" }}
          >
            <h2 className="text-danger">Latest Blogs</h2>
          </div>
          <div className="row g-5">
            {blogs.slice(0, showCount).map((blog) => (
              <Blog key={blog._id} blog={blog}></Blog>
            ))}
          </div>
          {showCount <= blogs.length && (
          <div className="text-center py-3">
            <Link to="/blogs">
            <button className="btn btn-outline-danger">
              Load More
            </button>
            </Link>
          </div>
        )}
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Home;

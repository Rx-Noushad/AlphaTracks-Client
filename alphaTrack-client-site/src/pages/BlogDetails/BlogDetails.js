import React, { useEffect, useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Footer from "../Shared/Footer/Footer";
import Navigation from "../Shared/Navigation/Navigation";

const BlogDetails = () => {
  const [blogDetails, setBlogDetails] = useState({});
  const { isLoading } = useAuth();
  const location = useLocation();
  const blogId = location.state;

  useEffect(() => {
    fetch(`https://alpha-tracks-server-site-kw9aq2sdn-rx-noushad.vercel.app/newsBlog/${blogId}`)
      .then((res) => res.json())
      .then((data) => {
        setBlogDetails(data);
      });
  }, [blogId]);
  return (
    <div>
      <Navigation />
      <Container>
      <Card className='text-start'>
      <Card.Img variant="top" src={blogDetails.image} />
      <Card.Body>
        <Card.Title style={{textTransform:'uppercase', fontWeight:'bold'}} as="h3">{blogDetails.blog_name}</Card.Title>
        <hr></hr>
        <Card.Text>
            {blogDetails.short_des1}
        </Card.Text>
        <hr></hr>
        <Card.Text>
            {blogDetails.short_des2}
        </Card.Text>
        <hr></hr>
        <Card.Text>
            {blogDetails.short_des3}
        </Card.Text>
        <hr></hr>
        <Button variant="danger">Add Reviews</Button>
      </Card.Body>
    </Card>
    </Container>
      <Footer />
    </div>
  );
};

export default BlogDetails;

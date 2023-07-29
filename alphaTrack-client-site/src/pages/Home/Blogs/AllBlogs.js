import React from 'react';
import Footer from '../../Shared/Footer/Footer';
import Navigation from '../../Shared/Navigation/Navigation';
import Blogs from './Blogs/Blogs';

const AllBlogs = () => {
    return (
        <div>
            <Navigation />
            <Blogs />
            <Footer />
        </div>
    );
};

export default AllBlogs;
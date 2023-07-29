import React, { useRef, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import swal from 'sweetalert';
import useAuth from '../../../hooks/useAuth';

const AddBlog = () => {
    const { isLoading } = useAuth();

    const [imagePreview, setImagePreview] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const blogNameRef = useRef();
    const brandRef = useRef();
    const descriptionRef1 = useRef();
    const descriptionRef2 = useRef();
    const descriptionRef3 = useRef();
    const authorRef = useRef();
    const dateRef = useRef();

    if (isLoading) {
        return <div>
            <div className="text-center"><Spinner animation="border" variant="danger" /></div>
        </div>
    }

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("image", file);
        formData.append("key", "92eeeed5a0d0b4f02eb14244b08565d9"); // replace with your own API key

        try {
            const response = await fetch("https://api.imgbb.com/1/upload", {
                method: "POST",
                body: formData,
            });
            const data = await response.json();
            setImageUrl(data.data.url);
            setImagePreview(URL.createObjectURL(file));
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddBlog = e => {
        e.preventDefault();
        const blog_name = blogNameRef.current.value;
        const brand = brandRef.current.value;
        const short_des1 = descriptionRef1.current.value;
        const short_des2 = descriptionRef2.current.value;
        const short_des3 = descriptionRef3.current.value;
        const image = imageUrl;
        const author = authorRef.current.value;
        const publishDate = dateRef.current.value;

        const newBlog = { blog_name, image, short_des1, short_des2, short_des3, brand, author, publishDate }
        // console.log(newBike)

        fetch('https://alpha-tracks-server-site-kw9aq2sdn-rx-noushad.vercel.app/newsBlog', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newBlog)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    swal("Added!", "Successfully added a new Blog!", "success");
                    e.target.reset();
                }
            })
    }
    return (
        <div className="my-4">
            <h2 className="text-center bg-danger text-light py-2 my-4">Add a New Blog with Details</h2>
            <form onSubmit={handleAddBlog} className="add-product-form">
                <input ref={blogNameRef} type="text" placeholder="Blog Name" required />
                <input ref={authorRef} type="text" placeholder="Blog Author" required />
                <input ref={dateRef} type="date" placeholder="Blog Author" required />
                <input ref={brandRef} type="text" placeholder="Brand Name" required />
                <input type="file" onChange={handleImageUpload} accept="image/*" />
                {imagePreview && <img className='w-50' src={imagePreview} alt="Preview" />}
                {imageUrl && <p>Image URL: {imageUrl}</p>}
                <textarea ref={descriptionRef1} name="" id="" cols="30" rows="5" placeholder="Write Here Short Description of Blog" required></textarea>
                <textarea ref={descriptionRef2} name="" id="" cols="30" rows="5" placeholder="Write Here Short Description of Blog" required></textarea>
                <textarea ref={descriptionRef3} name="" id="" cols="30" rows="5" placeholder="Write Here Short Description of Blog" required></textarea>
                <button className="order-btn">Add Blog</button>
            </form>
        </div>
    );
};

export default AddBlog;
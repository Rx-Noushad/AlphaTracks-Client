import React, { useRef, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import swal from 'sweetalert';
import useAuth from '../../../hooks/useAuth';
import './AddProduct.css';

const AddProduct = () => {
    const { isLoading } = useAuth();

    const [imagePreview, setImagePreview] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const bikeNameRef = useRef();
    const brandRef = useRef();
    const descriptionRef = useRef();
    const priceRef = useRef();

    if (isLoading) {
        return <div>
            <div className="text-center"><Spinner animation="border" variant="danger" /></div>
        </div>
    }

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("image", file);
        formData.append("key", "2b1cd512cf87d35893763e855ee99cbc");

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

    const handleAddBike = e => {
        e.preventDefault();
        const bike_name = bikeNameRef.current.value;
        const brand = brandRef.current.value;
        const short_des = descriptionRef.current.value;
        const image = imageUrl;
        const price = priceRef.current.value;

        const newBike = { bike_name, image, short_des, brand, price }
        // console.log(newBike)

        fetch('https://alpha-tracks-server-site-kw9aq2sdn-rx-noushad.vercel.app/bikes', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newBike)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    swal("Added!", "Successfully added a Bike!", "success");
                    e.target.reset();
                }
            })
    }

    return (
        <div className="my-4">
            <h2 className="text-center bg-danger text-light py-2 my-4">Add here a Bike with Details</h2>
            <form onSubmit={handleAddBike} className="add-product-form">
                <input ref={bikeNameRef} type="text" placeholder="Bike Name" required />
                <input ref={brandRef} type="text" placeholder="Brand Name" required />
                <textarea ref={descriptionRef} name="" id="" cols="30" rows="5" placeholder="Write Here Short Description of Bike" required></textarea>
                <input type="file" onChange={handleImageUpload} accept="image/*" />
                {imagePreview && <img className='w-50' src={imagePreview} alt="Preview" />}
                {imageUrl && <p>Image URL: {imageUrl}</p>}
                <input ref={priceRef} type="text" placeholder="Price Of Bike" required />
                <button className="order-btn">Add Bike</button>
            </form>
        </div>
    );
};

export default AddProduct;
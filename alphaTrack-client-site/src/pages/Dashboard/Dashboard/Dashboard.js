import React from 'react';
import Footer from '../../Shared/Footer/Footer';
import Navigation from '../../Shared/Navigation/Navigation';
import './Dashboard.css';

import { Spinner } from 'react-bootstrap';
import {
    Link,
    Route,
    Switch,
    useRouteMatch
} from "react-router-dom";
import useAuth from '../../../hooks/useAuth';
import AdminRoute from '../../AdminRoute/AdminRoute';
import AddBlog from '../AddBlog/AddBlog';
import AddProduct from '../AddProduct/AddProduct';
import MakeAdmin from '../MakeAdmin/MakeAdmin';
import ManageOrders from '../ManageOrders/ManageOrders';
import ManageProducts from '../ManageProducts/ManageProducts';
import MyOrders from '../MyOrders/MyOrders';
import Payment from '../Payment/Payment';
import Review from '../Review/Review';

const Dashboard = () => {
    const { handleLogout, admin, isLoading } = useAuth();
    let { path, url } = useRouteMatch();

    if (isLoading) {
        return <div className="text-center"><Spinner animation="border" variant="danger" /></div>
    }

    return (
        <div>
            <Navigation></Navigation>
            <div className="container">
                <div className="row">
                    <div className="col-md-3 col-lg-2">
                        <div className="py-5 border-end">
                            <h3 className="text-danger">Dashboard</h3>

                            {
                                !admin ? <>
                                    <Link className="dashboard-option fw-bold" to={`${url}/myorder`}>My Orders</Link>
                                    <br />
                                    {/* <Link className="dashboard-option fw-bold" to={`${url}/payment`}>Make Payment</Link> */}
                                    {/* <br /> */}
                                    <Link className="dashboard-option fw-bold" to={`${url}/review`}>Review</Link>
                                    <br />
                                </> : <>
                                    <Link className="dashboard-option fw-bold" to={`${url}/manageOrders`}>Manage Orders</Link>
                                    <br />
                                    <Link className="dashboard-option fw-bold" to={`${url}/manageProducts`}>Manage Products</Link>
                                    <br />
                                    <Link className="dashboard-option fw-bold" to={`${url}/addProduct`}>Add a Product</Link>
                                    <br />
                                    <Link className="dashboard-option fw-bold" to={`${url}/addBlog`}>Add a Blog</Link>
                                    {/* <Link className="dashboard-option fw-bold" to={`${url}/makeAdmin`}>Make Admin</Link> */}
                                </>
                            }
                            <br />
                            <Link className="dashboard-option fw-bold" to={`/login`}> <p onClick={handleLogout}>Logout</p></Link>
                        </div>

                    </div>
                    <div className="col-md-9 col-lg-10">
                        <Switch>
                            <Route exact path={path}>
                                {
                                    !admin ? <MyOrders></MyOrders> : <ManageOrders></ManageOrders>
                                }
                            </Route>

                            <Route path={`${url}/myOrder`}>
                                <MyOrders></MyOrders>
                            </Route>
                            <Route path={`${path}/payment/:orderId`}>
                                <Payment></Payment>
                            </Route>
                            <Route path={`${path}/review`}>
                                <Review></Review>
                            </Route>
                            <AdminRoute path={`${path}/manageOrders`}>
                                <ManageOrders></ManageOrders>
                            </AdminRoute>
                            <AdminRoute path={`${path}/manageProducts`}>
                                <ManageProducts></ManageProducts>
                            </AdminRoute>
                            <AdminRoute path={`${path}/addProduct`}>
                                <AddProduct></AddProduct>
                            </AdminRoute>
                            <AdminRoute path={`${path}/addBlog`}>
                                <AddBlog></AddBlog>
                            </AdminRoute>
                            <AdminRoute path={`${path}/makeAdmin`}>
                                <MakeAdmin></MakeAdmin>
                            </AdminRoute>
                        </Switch>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Dashboard;
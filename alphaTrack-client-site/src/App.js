import 'bootstrap/dist/css/bootstrap.min.css';
import MessengerCustomerChat from 'react-messenger-customer-chat';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
import ScrollToTop from './ScrollTopTop/ScrollToTop';
import AuthProvider from './context/AuthProvider';
import BikeDetails from './pages/BikeDetails/BikeDetails';
import BlogDetails from './pages/BlogDetails/BlogDetails';
import BrandItems from './pages/BrandItems/BrandItems';
import Dashboard from './pages/Dashboard/Dashboard/Dashboard';
import UpdateProduct from './pages/Dashboard/UpdateProduct/UpdateProduct';
import Explore from './pages/Explore/Explore';
import AllBlogs from './pages/Home/Blogs/AllBlogs';
import Home from './pages/Home/Home/Home';
import Login from './pages/Login/Login/Login';
import NotFound from './pages/NotFound/NotFound';
import Order from './pages/Order/Order';
import PrivateRoute from './pages/PrivateRoute/PrivateRoute';


function App() {
  return (
    <div className="">
      <MessengerCustomerChat
        pageId="106925892287005"
        appId="883226362718909"
        // htmlRef="<REF_STRING>"
      />
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <Switch>
            <Route exact path="/">
              <Home></Home>
            </Route>
            <Route path="/home">
              <Home></Home>
            </Route>
            <Route path="/explore">
              <Explore></Explore>
            </Route>
            <PrivateRoute path="/order/:id">
              <Order></Order>
            </PrivateRoute>
            <Route path="/login">
              <Login></Login>
            </Route>
            <Route path="/brandItems">
              <BrandItems></BrandItems>
            </Route>
            <Route path="/bikeDetails">
              <BikeDetails></BikeDetails>
            </Route>
            <Route path="/blogs">
              <AllBlogs></AllBlogs>
            </Route>
            <Route path="/blogDetails">
              <BlogDetails></BlogDetails>
            </Route>
            <PrivateRoute path="/updateProduct/:id">
              <UpdateProduct></UpdateProduct>
            </PrivateRoute>
            <PrivateRoute path="/dashboard">
              <Dashboard></Dashboard>
            </PrivateRoute>
            <Route path="*">
              <NotFound></NotFound>
            </Route>
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;

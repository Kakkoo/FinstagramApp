import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';
import ChangeAvatar from "./components/changeAvatar/ChangeAvatar";
import ChangePassword from './components/changePassword/ChangePassword';
import ForgotPassword from './components/auth/ForgotPassword';
import TempProfile from "./components/auth/TempProfile";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import AllProfiles from "./components/allprofiles/AllProfiles"
import CreateProfile from './components/auth/CreateProfile';
import Dashboard from "./components/dashboard/Dashboard";
import CreatePost from "./components/createpost/CreatePost";
import DeleteAccount from './components/deleteAccount/DeleteAccount';
import Post from "./components/post/Post";
import PostFeed from "./components/posts/PostFeed";
import Posts from "./components/posts/Posts";
import jwt_decode from 'jwt-decode';
import { logoutUser } from './actions/authActions';
import setAuthToken from './utils/setAuthToken';
import { SET_USER } from './actions/types';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import NotFound from "./components/not-found/NotFound";
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import store from './store';

import Settings from './components/settings/Settings';
import PrivateRoute from "./components/common/PrivateRoute";
import EditProfile from './components/editProfile/EditProfile';



if (localStorage.jwtToken) {
  //decode
  const decoded = jwt_decode(localStorage.jwtToken);
  //check the expiry of the token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //Expired
    //Logout user
    store.dispatch(logoutUser());
    //Redirect user to login
    window.location.href = '/login';
  }

  //Set auth header
  setAuthToken(localStorage.jwtToken);
  //dispatch
  store.dispatch({
    type: SET_USER,
    payload: decoded,
  });
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <main className="site-content">
              <Route exact path="/" component={Landing} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/forgotPassword" component={ForgotPassword} />
              {/* LEAVING THESE HERE FOR DEV; THERE ARE UPDATED ONES FOR DEPLOYMENT */}
             
              <Route exact path="/posts" component={Posts} />
              <Route exact path="/tempProfile" component={TempProfile} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/allprofiles/:handle" component={AllProfiles} />
              
              {/* <Route exact path="/profile" component={Profile} /> */}
              <Route exact path="/post" component={Post} />
              <Route exact path="/not-found" component={NotFound} />
              {/* END DEV ROUTES */}
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <Switch>
                  <PrivateRoute
                    exact
                    path="/createpost"
                    component={CreatePost}
                  />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/posts/:id" component={Post} />
                </Switch>
                {/* <Switch>
                <PrivateRoute exact path='/postfeed' component={PostFeed} />
              </Switch> */}
                {/* <Switch>
                <PrivateRoute exact path='/posts' component={Posts} />
              </Switch> */}
                <PrivateRoute
                  exact
                  path="/createprofile"
                  component={CreateProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/settings" component={Settings} />
              </Switch>

              <Switch>
                <PrivateRoute
                  exact
                  path="/changePassword"
                  component={ChangePassword}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/changeAvatar"
                  component={ChangeAvatar}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/deleteAccount"
                  component={DeleteAccount}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/editProfile"
                  component={EditProfile}
                />
              </Switch>
            </main>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;

import {
  Link, Redirect, Switch, Route,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { PrimaryButton } from '@fluentui/react';
import React from 'react';
import { Nav, NavMenu } from './NavbarElements';
import * as UserActions from '../Redux/Actions/UserActions';
import Footer from './Footer';
import CheckIn from './check-in/Check-In';
import InFlight from './in-flight/In-Flight';
import Dashboard from './dashboard/Dashboard';
import Carousel from './Carousal';

const Home = () => {
  const state = useSelector((state: any) => state.user);
  const clientid = '302716817736-hc6kaarr76uk2gr9l6h88m78hclh9530.apps.googleusercontent.com';
  return (
    <>
      <Nav>
        <h1 className="main-heading">Airway Management</h1>
        {state.loginEmail !== '' ? (
          <>
            <NavMenu>
              <Link to="/dashboard" className="nav-page-btn">
                Dashboard
              </Link>
              {' '}
              <br />
              <Link to="/checkin" className="nav-page-btn">
                Check In
              </Link>
              {' '}
              <br />
              <Link to="/inflight" className="nav-page-btn">
                In-Flight
              </Link>
            </NavMenu>
            <GoogleLogout
              clientId={clientid}
              buttonText="Logout"
              onLogoutSuccess={() => {
                UserActions.onSignoutSuccess();
              }}
              render={(renderProps) => (
                <PrimaryButton
                  onClick={renderProps.onClick}
                  className="login-logout"
                >
                  Logout
                </PrimaryButton>
              )}
            />
          </>
        ) : (
          <GoogleLogin
            clientId={clientid}
            buttonText="Login"
            onSuccess={UserActions.onLoginSuccess}
            onFailure={UserActions.onFailureSuccess}
            cookiePolicy="single_host_origin"
            render={(renderProps) => (
              <PrimaryButton
                onClick={renderProps.onClick}
                className="login-logout"
              >
                Login
              </PrimaryButton>
            )}
          />
        )}
      </Nav>
      <Switch>
        {state.loginEmail === '' ? <Redirect to="/" /> : null}
        {state.loginEmail !== '' ? <Redirect to="checkin" /> : null}
      </Switch>
      <br />
      <Switch>

        <div>
          <Route exact path="/" children={<Carousel />} />
          {state.loginEmail !== '' ? (
            <div>
              <Route path="/checkin" children={<CheckIn />} />
              <Route path="/inflight" children={<InFlight />} />
              <Route path="/dashboard" children={<Dashboard />} />
            </div>
          ) : null}
        </div>
      </Switch>
      <br />
      <Footer />
    </>
  );
};
export default Home;

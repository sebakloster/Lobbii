import React, { Component, Suspense } from 'react';
import Layout from './components/Layout/';
import HubLayout from './components/HubLayout/'

import {
  Route,
  Switch,
  BrowserRouter as Router,
  withRouter,
} from 'react-router-dom';

// Import Css
import './assets/css/materialdesignicons.min.css';
import './styles/App.scss'


import routes from './routes/allRoutes';


function withLayout(WrappedComponent, hasDarkTopBar) {
  // ...and returns another component...
  /* eslint-disable react/display-name */
  return class extends React.Component {
    render() {
      return (
        <Layout hasDarkTopBar={hasDarkTopBar}>
          <WrappedComponent></WrappedComponent>
        </Layout>
      );
    }
  };
}


function withHubLayout(WrappedComponent) {
  return class extends React.Component {
    render() {
      return (
        <HubLayout>
          <WrappedComponent></WrappedComponent>
        </HubLayout>
      );
    }
  };
}

function withoutLayout(WrappedComponent) {
  return class extends React.Component {
    render() {
      return (
        <WrappedComponent></WrappedComponent>
      );
    }
  };
}

class App extends Component {
  Loader = () => {
    return (
      <div id="preloader">
        <div id="status">
          <div className="spinner">
            <div className="double-bounce1"></div>
            <div className="double-bounce2"></div>
          </div>
        </div>
      </div>
    );
  };
  render() {
    return (
      <React.Fragment>
        <Router>
          <Suspense fallback={this.Loader()}>
            <Switch>
              {routes.map((route, idx) =>
                {if(route.isWithHubLayout){
                  return <Route 
                    path={route.path}
                    exact
                    component={withHubLayout(route.component)}
                    key={idx}
                  />
                }else if(route.isWithoutLayout){
                  return <Route

                    path={route.path}
                    exact
                    component={withoutLayout(route.component)}
                    key={idx}
                  />
                }else{
                  return <Route
                    path={route.path}
                    exact
                    component={withLayout(route.component, route.isTopbarDark)}
                    key={idx}
                  />
                }}
              )}
            </Switch>
          </Suspense>
        </Router>
      </React.Fragment>
    );
  }
}

export default withRouter(App);

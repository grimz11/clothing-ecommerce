import React, { PureComponent } from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import {connect} from 'react-redux';

import Homepage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInSignUp from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import CheckoutPage from './pages/checkout/checkout.component';

import { auth,createUserProfileDocument } from "./firebase/firebase.util";
import {createStructuredSelector} from 'reselect';
import { setCurrentUser } from './redux/user/user.actions';
import {selectCurrentUser} from './redux/user/user.selector';


class App extends PureComponent {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const {setCurrentUser} = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth) {
        const userRef = await  createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShopt => {
            setCurrentUser ({
              id: snapShopt.id,
              ...snapShopt.data()
            }
          )
        }) 
      } 
      setCurrentUser(userAuth);
    })
  }

  UNSAFE_componentWillMount() {
    this.unsubscribeFromAuth = null;
  }
  

  render() {
    const {currentUser} = this.props;
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route exact path="/signin" render={() => currentUser ? (<Redirect to='/'/>) : (<SignInSignUp/>)} />
        </Switch>
      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: userPayload => dispatch(setCurrentUser(userPayload))
})

export default connect(mapStateToProps,mapDispatchToProps)(App);

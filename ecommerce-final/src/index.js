import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { createStore } from "redux";
import {Provider} from 'react-redux';

const initialState = 
        {
           token: localStorage.getItem('_token') ? localStorage.getItem('_token') : '',
           products : '',
           keyname : '',
           cart : '',
           cartcount: 0
           };

function reducer(state = initialState, actions) {
  console.log(state);
  switch (actions.type) {
    case "LOGIN_SUCCESS":
           console.log(actions.payload);
      return { ...state,token:  actions.payload };

      case "LOGOUT":
   return {  token: '' };

   case "EDIT_PROFILE":
    return { ...state,token:  actions.payload };

    case "ADD_ADDRESS":
      return { ...state,token:  actions.payload };
  
      case "ALL_PRODUCTS":
      return { ...state,products:  actions.payload };
  
      case "SEARCH" :
        return { ...state,keyname:  actions.payload };
      case "ADD_TO_CART" :
          return { ...state,cart:  actions.payload };
      case "REMOVE_FROM_CART" :
            return { ...state,cart:  actions.payload };
      case "CART_COUNT" :
          return { ...state, cartcount: actions.payload };
      case "INCREASE_COUNT" :
            return { ...state,cartcount: (state.cartcount + 1) };
    default:
      return state;
  }
}

const store = createStore(reducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import {BrowserRouter, Routes, Route} from "react-router-dom";
import React from 'react';

import './App.css';
import {Home} from "./view/pages/Home";
import {SignUp} from "./view/pages/SignUp";

import {About} from "./view/pages/About";


import {SignIn} from "./view/pages/SignIn";



import SignInII from "./view/pages/SignInII";
import {SignUpII} from "./view/pages/SignUpII";
import Header from "./view/components/Header";
import {PrivateRoute} from "./view/components/PrivateRoute";
import Profile from "./view/pages/Profile";
import {CreateListingII} from "./view/pages/CreateListingII";
import {UpdateListing} from "./view/pages/UpdateListing";
import {Listing} from "./view/pages/Listing";
import { Search } from "./view/pages/Search";





function App() {
  return (

      <BrowserRouter>
          <Header/>
          <Routes>
            <Route path="/" Component={Home}/>

            <Route path="/sign-up" Component={SignUpII}/>
            <Route path="/sign-in" Component={SignInII} />
            <Route path="/about" Component={About}/>
              <Route path='/listing/:listingId' element={<Listing />} />
              <Route path='/search' element={<Search />} />
              <Route element={<PrivateRoute />}>
                  <Route path='/profile' element={<Profile />} />
                  <Route path='/create-listing' element={<CreateListingII />} />
                  <Route
                      path='/update-listing/:listingId'
                      element={<UpdateListing />}
                  />

              </Route>
          </Routes>

      </BrowserRouter>

  );
}

export default App;

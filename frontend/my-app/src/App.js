import React from 'react';
import logo from './logo.svg';
import './App.css';
import Student from "./component/Student"
import Navbar from "./component/navbar"
import 'bootstrap/dist/css/bootstrap.min.css';

import {Container, Row,Col} from 'react-bootstrap'
function App() {
  return (
    <>
    <Navbar/>
     <Student />
    </>
  );
}

export default App;

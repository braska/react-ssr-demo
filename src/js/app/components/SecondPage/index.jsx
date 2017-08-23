import React from 'react';
import { Link } from 'react-router-dom';

const SecondPage = () => [
  <h1 key="heading">Second Page</h1>,
  <Link to="/" key="link">Go to home</Link>,
];

export default SecondPage;

import React from 'react';
import Navbar from './components/Navbar';
import Students from './components/Students';

export default () => {
  return (
    <div className="container">
      <Navbar></Navbar>
      <div className="component-app">
        <div className="card">
          <div className="card-body">
            <Students></Students>
          </div>
        </div>
      </div>
    </div>
  );
}

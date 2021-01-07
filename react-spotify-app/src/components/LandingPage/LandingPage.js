import React from 'react';
import './App.css';
import Typical from 'react-typical';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Conc</h1>

        <p>
          Listen to {' '}
          
          <Typical 
            loop={Infinity}
            wrapper="b"
            steps={[
              'Beyonce',
              1000,
              'Chloe x Halle',
              1000,
              'Erykah Badu',
              1000,
              'Bree Runway',
              1000
            ]}
          />
        </p>
      </header>
    </div>
  );
}

export default LandingPage;
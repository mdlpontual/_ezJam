import React from 'react';
import LoginPage from './pages/Login/LoginPage.jsx';
import HomePage from './pages/Home/HomePage.jsx';
import { TrackProvider } from './hooks/TrackContext.jsx'; // Import the provider

const code = new URLSearchParams(window.location.search).get('code');

function App() {
    return (
      <TrackProvider>
        {code ? <HomePage code={code}/> : <LoginPage />}
      </TrackProvider>
    );
}

export default App;
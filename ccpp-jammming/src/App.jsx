import React from 'react';
import LoginPage from './pages/Login/LoginPage.jsx';
import HomePage from './pages/Home/HomePage.jsx';
import { TrackProvider } from './hooks/TrackContext.jsx'; // Import the provider
import { SaveProvider } from './hooks/user_hooks/SaveContext.jsx'; // Import the save context provider

const code = new URLSearchParams(window.location.search).get('code');

function App() {
    return (
      <TrackProvider>
        <SaveProvider>
          {code ? <HomePage code={code}/> : <LoginPage />}
        </SaveProvider>
      </TrackProvider>
    );
}

export default App;
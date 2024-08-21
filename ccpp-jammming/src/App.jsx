import React from 'react';
import LoginPage from './pages/Login/LoginPage.jsx';
import HomePage from './pages/Home/HomePage.jsx';

const code = new URLSearchParams(window.location.search).get('code');

function App() {
    return code ? <HomePage code={code}/> : <LoginPage/>;
}

export default App;

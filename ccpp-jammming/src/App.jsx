import React from 'react';
import HomePage from './pages/Home/HomePage.jsx';
import LoginPage from './pages/Login/LoginPage.jsx';

const code = new URLSearchParams(window.location.search).get('code');

function App() {
    return code ? <HomePage code={code}/> : <LoginPage/>;
}

export default App;
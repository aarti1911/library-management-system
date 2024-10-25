// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './pages/Resgister';
import Login from './pages/Login';
import Protected from './component/Protected';
import Home from './pages/Home';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>} /> {/* Default redirect to login */}
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route
                    path="/dashboard"
                    element={<Protected />} // Protected handles role-based redirection
                />
            </Routes>
        </Router>
    );
};

export default App;

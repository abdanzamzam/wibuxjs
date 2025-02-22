import React from 'react';
import Navbar from './components/Navbar';

export default function Register({ title, message }) {
    return (
        <div>
            <Navbar />
            <h1>{title}</h1>
            <p>{message}</p>
        </div>
    );
}

import React from 'react';
import Navbar from './components/Navbar';
import Counter from './components/Counter';

export default function Login({ title, message }) {
    return (
        <div>
            <Navbar />
            <h1>{title}</h1>
            <p>{message}</p>
        </div>
    );
}

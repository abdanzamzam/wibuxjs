import React from 'react';

// Pages
import Home from './pages/Home';
import Contact from './pages/Contact';
import About from './pages/About';

function App(props) {
    if (props.path === '/') return <Home title={props.title} message={props.message} />;
    if (props.path === '/contact') return <Contact title={props.title} message={props.message} />;
    if (props.path === '/about') return <About title={props.title} message={props.message} />;
    return <h1>404 Not Found</h1>;
}

export default App;
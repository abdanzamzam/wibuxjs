import React from 'react';

function About({ data }) {
    return (
        <div>
            <h1>{data.title}</h1>
            <p>Welcome to the About Page!</p>
        </div>
    );
}

export default About;

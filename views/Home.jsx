import React from 'react';
import Counter from './components/Counter';

function Home(props) {
    return (
        <div>
            <h1>{props.title}</h1>
            <p>{props.message}</p>
            <Counter />
        </div>
    );
}

export default Home;
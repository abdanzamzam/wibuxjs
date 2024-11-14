import React, { useState } from 'react';

function Home({ data }) {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <h1>{data.title}</h1>
      <p>Welcome to the Home Page!</p>
      <p>Counter: {count}</p>
      <button onClick={handleClick}>Add +1</button>
    </div>
  );
}

export default Home;

import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Home</h1>
      <div>
        <Link to="todo">todo으로</Link>
      </div>
      <div>
        <Link to="antd/todo">antd todo으로</Link>
      </div>
    </div>
  );
}

export default Home;

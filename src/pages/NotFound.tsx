import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div>
      <h1>Not Found</h1>
      <div>
        <Link to="/">Home으로</Link>
      </div>
    </div>
  );
}

export default NotFound;

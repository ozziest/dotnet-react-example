import React from 'react';

export default () => {
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li className="page-item"><a className="page-link" href="/1">Previous</a></li>
        <li className="page-item"><a className="page-link" href="/1">1</a></li>
        <li className="page-item"><a className="page-link" href="/1">2</a></li>
        <li className="page-item"><a className="page-link" href="/1">3</a></li>
        <li className="page-item"><a className="page-link" href="/1">Next</a></li>
      </ul>
    </nav>
  );
}

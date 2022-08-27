import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootNode = document.getElementById('root');

if (!rootNode) {
  throw new Error('root 노드를 찾을 수 없습니다');
}

ReactDOM.createRoot(rootNode).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

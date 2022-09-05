import ReactDOM from 'react-dom/client';
import axios from 'axios';
import App from './App';

axios.defaults.baseURL = process.env.API_URL;
axios.defaults.withCredentials = true;

const rootNode = document.getElementById('root');

if (!rootNode) {
  throw new Error('root 노드를 찾을 수 없습니다');
}

ReactDOM.createRoot(rootNode).render(<App />);

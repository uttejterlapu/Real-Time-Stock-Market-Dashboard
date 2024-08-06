import { BrowserRouter as Router } from 'react-router-dom';
import Finnhub from './routes/Finnhub';

function App() {
  return (
    <div className="App bg-black-900 h-screen">
      <Router>
        <Finnhub/>
      </Router>
    </div>
  );
}

export default App;

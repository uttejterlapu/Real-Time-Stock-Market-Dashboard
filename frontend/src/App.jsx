import { BrowserRouter as Router } from 'react-router-dom';
import Finnhub from './routes/Finnhub';

function App() {
  return (
    <div className="App">
      <Router>
        <Finnhub/>
      </Router>
    </div>
  );
}

export default App;

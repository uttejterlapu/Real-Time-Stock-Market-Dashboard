import { BrowserRouter as Router } from 'react-router-dom';
import Finnhub from './routes/Finnhub';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Router>
        <Finnhub/>
      </Router>
      <Footer/>
    </div>
  );
}

export default App;

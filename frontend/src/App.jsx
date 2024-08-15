import { BrowserRouter as Router } from 'react-router-dom';
import Finnhub from './routes/Finnhub';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import AnimatedCursor from "react-animated-cursor"
function App() {
  return (
    <div className="App">
      <AnimatedCursor
        innerSize={8}
        outerSize={12}
        color='0, 173, 181' // Teal color from your palette
        outerAlpha={0.3} // Slightly more opaque to stand out
        innerScale={0.8} // Slightly larger inner cursor
        outerScale={6} // Larger outer cursor for better visibility
        clickables={[
          'a',
          'input[type="text"]',
          'input[type="email"]',
          'input[type="number"]',
          'input[type="submit"]',
          'input[type="image"]',
          'label[for]',
          'select',
          'textarea',
          'button',
          '.link',
          {
            target: '.custom', // Add your specific class for custom cursor effects
            options: {
              innerSize: 10,
              outerSize: 14,
              color: '255, 255, 255', // White color for specific elements
              outerAlpha: 0.4, // Slightly more opaque for better visibility
              innerScale: 1, // Normal size for inner cursor
              outerScale: 8 // Larger outer cursor for specific elements
            }
          }
        ]}
      />
      <NavBar />
      <Router>
        <Finnhub />
      </Router>
      {/* <Footer/> */}
    </div>
  );
}

export default App;

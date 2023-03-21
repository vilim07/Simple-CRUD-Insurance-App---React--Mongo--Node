import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Customer from './pages/Customer';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path='/'
            element={<Home />}
          />
          <Route
            path='/customer/:id'
            element={<Customer />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

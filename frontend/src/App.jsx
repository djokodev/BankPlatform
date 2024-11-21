import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterPage from './components/Register';
import LoginPage from './components/Login';
import HomePage from './components/Home';
import Dashboard from './pages/dashboard';

function App() {

  return (
    <>
      <Router>
          <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
      </Router>
    </>
  )
}

export default App


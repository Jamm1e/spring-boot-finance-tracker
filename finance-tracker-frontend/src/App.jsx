import { Routes, Route } from 'react-router-dom';
import Navigation from './components/MyNavbar';
import Insights from './pages/Insights';
import Transactions from './pages/Transactions';
import Goals from './pages/Goals';
import Dashboard from './pages/Dashboard';
import './App.css';
import './theme.css';

function App() {
  return (
    <>
      <Navigation />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/goals" element={<Goals />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

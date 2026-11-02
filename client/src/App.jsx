import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateMysteryPage from './pages/CreateMysteryPage';
import InvestigationPage from './pages/InvestigationPage';
import SolutionPage from './pages/SolutionPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/create" element={<CreateMysteryPage />} />
      <Route path="/investigation/:mysteryId/:sessionId" element={<InvestigationPage />} />
      <Route path="/solution/:sessionId" element={<SolutionPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

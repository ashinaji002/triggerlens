import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Landing } from './pages/Landing';
import { Scanner } from './pages/Scanner';
import { Result } from './pages/Result';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-white text-zinc-900 font-sans selection:bg-zinc-200">
        <Header />
        <main className="flex-1 flex flex-col overflow-hidden">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/scan" element={<Home />} />
            <Route path="/scan/:category" element={<Scanner />} />
            <Route path="/result" element={<Result />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import StylesShowcase from './pages/styles-showcase'
import EnhancedStumb from './pages/enhanced-stumb'
import Stumber from './pages/stumber'
import { ThemeProvider } from './components/theme-provider'
import Stumble from './pages/Stumble';
import Rabbit from './pages/rabbit';

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme" attribute="class">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stumber/:id" element={<Stumber />} />
          <Route path="/stumber" element={<Stumber />} />
          <Route path="/styles" element={<StylesShowcase />} />
          <Route path="/enhanced" element={<EnhancedStumb />} />
          <Route path="/stumble" element={<Stumble />} />
          <Route path="/stumble/:id" element={<Stumble />} />
          <Route path="/rabbit" element={<Rabbit />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App

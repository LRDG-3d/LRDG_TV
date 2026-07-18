import { HashRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar.jsx"
import Home from "./pages/Home.jsx"
import Episodes from "./pages/Episodes.jsx"
import Watch from "./pages/Watch.jsx"
import Admin from "./pages/Admin.jsx"

export default function App() {
  return (
    <HashRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/episodios" element={<Episodes />} />
        <Route path="/ver/:episodeId" element={<Watch />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </HashRouter>
  )
}

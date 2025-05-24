import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Events from './Events';
import Friends from './Friends';
import Discovery from './Discovery';
import '../App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Sidebar />}>
          <Route index element={<Events />} />
          <Route path="events" element={<Events />} />
          <Route path="friends" element={<Friends />} />
          <Route path="discovery" element={<Discovery />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App

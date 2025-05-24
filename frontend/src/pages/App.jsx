import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Events from './Events';
import Friends from './Friends';
import Discovery from './Discovery';
import Login from './Login';
import '../App.css'

/*
function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        {!loggedIn ? (
          <Route path="*" element={<Login onLogin={() => setLoggedIn(true)} />} />
        ) : (
          <Route path="/" element={<Sidebar />}>
            <Route index element={<Events />} />
            <Route path="events" element={<Events />} />
            <Route path="friends" element={<Friends />} />
            <Route path="discovery" element={<Discovery />} />
          </Route>
        )}
      </Routes>
    </Router>
  );
}
*/

export default function App() {
  return <h1>Hello from LiveLink 🚀</h1>;
}

//export default App

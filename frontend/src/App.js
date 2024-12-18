
import './App.css';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Menulist from './Components/Menulist';

function App() {
  return (
    <div>
       <Router>
      <Routes>
        <Route path="/" element={<Menulist/>} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;

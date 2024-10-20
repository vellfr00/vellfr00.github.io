import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';

import './styles/common/colors.css';
import './styles/common/scrollbar.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

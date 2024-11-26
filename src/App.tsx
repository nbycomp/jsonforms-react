import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { JsonFormsDemo } from './components/JsonFormsDemo';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<JsonFormsDemo />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

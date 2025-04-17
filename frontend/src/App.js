import useTitle from './hooks/useTitle';
import { Routes, Route } from 'react-router-dom';
import GlobalLayout from './components/GlobalLayout';
import LandingPage from './components/LandingPage';
import RunescapeCalc from './components/RunescapeCalc';
import DevTools from './components/DevTools';

function App() {
  useTitle('Dan D. Repairs')

  return (
    <Routes>
      <Route path = "/" element={<GlobalLayout/>}>
        <Route index element={<LandingPage/>}></Route>
        <Route path="runescapecalc" element={<RunescapeCalc/>}/>
        <Route path="devtools" element = {<DevTools/>}/>
      </Route>
    </Routes>
    
      
    
  );
}

export default App;

import useTitle from './hooks/useTitle';
import { Routes, Route } from 'react-router-dom';
import GlobalLayout from './components/GlobalLayout';
import LandingPage from './components/LandingPage';
import RunescapeCalc from './components/RunescapeCalc/RunescapeCalc';
import DevTools from './components/DevTools/DevTools'

function App() {
  useTitle('Skeeter Cathcart')

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

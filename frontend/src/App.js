import useTitle from './hooks/useTitle';
import { Routes, Route } from 'react-router-dom';
import GlobalLayout from './components/GlobalLayout';
import LandingPage from './components/LandingPage';
import RunescapeCalc from './components/RunescapeCalc/RunescapeCalc';
import NotFound from './components/NotFound'
import BlackJack from './components/BlackJack/BlackJack';

function App() {
  useTitle('Skeeter Cathcart')

  return (
    <Routes>
      <Route path = "/" element={<GlobalLayout/>}>
        <Route index element={<LandingPage/>}></Route>
        <Route path="runescapecalc" element={<RunescapeCalc/>}/>
        <Route path="blackjack" element = {<BlackJack/>}/>
        <Route path = '*' element = {<NotFound/>}/>
      </Route>
    </Routes>
    
      
    
  );
}

export default App;

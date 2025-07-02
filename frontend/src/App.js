import './App.css';
import { React } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import PageList from './PageList';
import { ThemeContext } from './ThemeContext';
import Landing from './Landing';

function App() {
  return (
    <ThemeContext>
      <Router>
        <PageList />
      </Router>
      {/* <Landing /> */}
    </ThemeContext>
  );
}

export default App;

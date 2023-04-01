import Container from 'react-bootstrap/Container';

import GameInfoProvider from './contexts/GameInfoProvider';
import Dashboard from './Dashboard';

import './App.css';

function App() {

  return (
    <Container fluid className="App">
      <GameInfoProvider>
        <Dashboard />
      </GameInfoProvider>
    </Container>
  );
}

export default App;

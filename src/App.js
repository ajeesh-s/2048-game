import './App.css';
import './assets/css/common.css'
import GameBoardComponent from './components/GameBoardComponent';
import { GlobalStateProvider } from './context';
function App() {
  return (
    <GlobalStateProvider>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <GameBoardComponent />
          </div>
        </div>
      </div>
    </GlobalStateProvider>
  );
}

export default App;

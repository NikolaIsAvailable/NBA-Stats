import React, {Component} from 'react';
import PlayersList from './PlayersList';
import './App.css';

class App extends Component {

  render()
  {
    return (
      <div className="App">
        <header>
          <h1>NBA Stats</h1>
          
        </header>

        <PlayersList>
          
        </PlayersList>
      </div>
    );
  }
  
}

export default App;

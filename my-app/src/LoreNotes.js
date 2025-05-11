import './App.css';
import LoreChatBox from './LoreChatBox';

function LoreNotes() {
  return (
    <div className="App">
      <div className="App-header">
        <div className="Top">
          <h1>LORE BUILDER</h1>
          <img alt="Slime" className="image" src="https://gamepedia.cursecdn.com/maplestory2_gamepedia/3/38/Slime.png" />
        </div>
        <div className="inputbox"> <LoreChatBox> </LoreChatBox> </div>
        <p><code> Tell me about your character! </code></p>
        <div className='Top'> </div>
      </div>
    </div>
  );
    // return <h1> Home page </h1>
}

export default LoreNotes;

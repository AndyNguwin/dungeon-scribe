import './App.css';
import ChatBox from './ChatBox';

// import Button from '@mui/material/Button';



function App() {
  const sendIt = (message) => {
    console.log('User sent:', message)
    // You could route this to OpenAI, a backend, or anything else here.
  }
  
  return (
    <div className="App">
      <div className="App-header">
        <div className="Top">
          <img alt="Slime" className="image" src="https://gamepedia.cursecdn.com/maplestory2_gamepedia/3/38/Slime.png" />
        </div>
        <div class="inputbox">
          <ChatBox onSend={sendIt}> </ChatBox>
        </div>
        <p><code> Tell me about your character! </code></p>
      </div>
    </div>
  );
}

export default App;

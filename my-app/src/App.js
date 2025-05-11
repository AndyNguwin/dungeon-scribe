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
      <header className="App-header">
        <img alt="oops" class="resize" src="https://gamepedia.cursecdn.com/maplestory2_gamepedia/3/38/Slime.png" />
        <p class="inputbox">
          <ChatBox onSend={sendIt}> </ChatBox>
        </p>
        <p>
          <code>Tell me about your character!</code>.
        </p>
      </header>
    </div>
  );
}

export default App;

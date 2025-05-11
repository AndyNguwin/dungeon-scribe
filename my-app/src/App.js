import './App.css';
import React, { useState } from 'react';
import ChatBox from './ChatBox';
// import ChatBoxResponse from './ChatBoxResponse'

import axios from 'axios'

function App() {
  const [responses, setResponses] = useState([]);

  const doSend = async (input) => {
    try {

      axios.post("https://sr1sgbqa1h.execute-api.us-west-2.amazonaws.com/roleplay-notes", {
        "user_prompt" : input}, {header: {"Content-Type": "application/json" }})
      .then(function (response) {
        console.log("YIPEE");
        const formatted_responses = Object.entries(response).map(([category, traits]) => ({
          title: category.replace(/_/g, ' ').toUpperCase(), // e.g. CORE_TRAITS
          items: traits // each item is [summary, explanation]
        }));

        setResponses(formatted_responses)

        console.log(response);
        console.log(formatted_responses);
        console.log("BOOO");
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data)
        }
      })

      // setResponses(messages)
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="App">
      <div className="App-header">
        <div className="Top">
          <img alt="Slime" className="image" src="https://gamepedia.cursecdn.com/maplestory2_gamepedia/3/38/Slime.png" />
        </div>
        <div className="inputbox"> <ChatBox onSend={doSend}> </ChatBox> </div>
        <p><code> Tell me about your character! </code></p>
        <div className='Top'> </div>
      </div>
    </div>
  );
}

export default App;

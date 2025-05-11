import './App.css';
import ChatBox from './ChatBox';
import ChatBoxResponse from './ChatBoxResponse';

import { useState } from 'react'


const _parseResponses = (rawResponses) => {
    return Object.entries(rawResponses).map(([key, items]) => ({
    title: key.replace(/_/g, " ").toUpperCase(), // Convert e.g. core_traits → CORE TRAITS
    items: items, // Keep the array of [summary, explanation] pairs as-is
    }));
};

function RoleplayNotes() {
    const [response, setResponse] = useState("");

    const handleChatResponse = (data) => {
        setResponse(data); // raw data from ChatBox
    };

  const formattedData = response ? _parseResponses(response[0]["items"]) : [];

  return (
    <div className="App">
      <div className="App-header">
        <div className="Top">
            <h1> The Dungeon Scribe </h1>
          <img alt="Slime" className="image" src="https://gamepedia.cursecdn.com/maplestory2_gamepedia/3/38/Slime.png" />
          <h6> Your DnD roleplay AI assistant! 🐵 </h6>
        </div>
        <div className="inputbox"> <ChatBox onResponse={handleChatResponse}> </ChatBox> </div>
        <p><code> Tell me about your character! </code></p>

        {formattedData.length > 0 && <ChatBoxResponse responses={formattedData} />}
      </div>
    </div>
  );
    // return <h1> Home page </h1>
}

export default RoleplayNotes;

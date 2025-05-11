import { useState } from 'react';

const parseResponses = (rawResponses) => {
    const traits = rawResponses[0]["items"]

    return traits;
};


const ChatBoxResponse = ({ responses }) => {
    const [response, setResponses] = useState('')



    return (
        <div className='chat-responses'>
            {responses}

        </div>
    )
}

export default ChatBoxResponse
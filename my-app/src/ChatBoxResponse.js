import './ChatBoxResponse.css';

const ChatBoxResponse = ({ responses }) => {
    return (
        <div className='chat-responses'>
            {responses.map((section, index) => (
                <div key={index} className="response-box">
                <h2 className="response-title">{section.title}</h2>
                <ul className="response-items">
                {section.items.map(([summary, explanation], idx) => (
                    <li key={idx} className="response-item">
                    <strong>{summary}:</strong> {explanation}
                    </li>
                ))}
                </ul>
            </div>
            ))}

        </div>
    )
}

export default ChatBoxResponse
// src/hooks/useChatResponses.js
import { useState } from 'react';

export default function useChatResponses() {
    // const [input, setInput] = useState('');
    const [responses, setResponses] = useState([]);

    const handleSend = () => {
        if (!input.trim()) return;

        const newResponses = Array.from({ length: 5 }, (_, i) => `${input} - response ${i + 1}`);
        setResponses(newResponses);
        setInput('');
    };

    return {
        input,
        setInput,
        responses,
        handleSend,
    };
}

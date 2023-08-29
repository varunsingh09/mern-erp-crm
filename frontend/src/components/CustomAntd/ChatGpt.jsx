import { useState } from "react"
import { postChatGptResponse } from '@/config/socketIo';

function ChatGpt() {
    const [input, setInput] = useState("");
    const [completedSentence, setCompletedSentence] = useState("");

    async function handleClick() {
        try {
            const completedSentence = await fetchData(input);
            setCompletedSentence(completedSentence);
        } catch (error) {
            console.error(error);
        }
    }
    const fetchData = async (input) => {

        const response = postChatGptResponse(input);
        console.log('response', response)
    };
    return (
        <div className="container">
            <h2>Tell me something, and I'll tell you more</h2>
            <textarea
                value={input}
                onChange={(event) => setInput(event.target.value)}
                rows={5}
                placeholder="Type in some words and I'll finish the rest..."
            />
            <button className="button" onClick={handleClick}>Complete Sentence</button>
            {completedSentence && <p>Completed sentence: {completedSentence}</p>}
        </div>
    );
}

export default ChatGpt;
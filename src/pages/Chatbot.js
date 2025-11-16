import React, { useState, useEffect, useRef, useCallback } from 'react';
// NOTE: For a real React app, marked.js would be installed via npm and imported:
// import { marked } from 'marked'; 
// window.SpeechRecognition/webkitSpeechRecognition is a browser API, accessed via window.

// --- Helper Functions (Mocked or Simplified for React Environment) ---

// Mock marked.parse function since marked.min.js isn't loaded globally in React
const marked = {
  parse: (text) => {
    // A simplified markdown to HTML conversion for demonstration
    let html = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'); // **bold**
    html = html.replace(/#(.*?)\n/g, '<h2>$1</h2>'); // # heading
    html = html.replace(/\n\*/g, '<br/>&bull; ').replace(/^\*/, '&bull; '); // * list
    return html;
  }
};

const getRecognitionLanguage = () => {
    // In a real app, you would manage this state with React context or global state.
    // Since the translate element was removed, we default.
    const lang = localStorage.getItem('selectedLanguage') || 'en';
    const langMap = {
        'en': 'en-US', 'ta': 'ta-IN', 'te': 'te-IN', 'hi': 'hi-IN'
    };
    return langMap[lang] || 'en-US';
};

const speak = (text, lang) => {
    if (window.speechSynthesis) {
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
        }
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang; 
        window.speechSynthesis.speak(utterance);
    }
};

// --- CSS Styles (Converted to a style string for a single-file component) ---

const styles = `
:root {
    --primary-green: #2e7d32;
    --dark-green: #1b5e20;
    --light-green: #e8f5e9;
    --earthy-brown: #795548;
    --text-color: #333;
    --bg-color-light: #f7f7f7;
    --bg-color-gradient: linear-gradient(to bottom, #c8e6c9, #e8f5e9);
    --card-bg: #fff;
    --shadow-light: 0 4px 8px rgba(0, 0, 0, 0.1);
    --shadow-medium: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.chatbot-body {
    font-family: Arial, sans-serif;
    margin: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: var(--bg-color-gradient);
    color: var(--text-color);
}

.chatbot-container-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 20px;
    margin-top: 0; 
}

.chat-container {
    width: 95%;
    max-width: 600px;
    height: 80vh;
    border-radius: 15px;
    box-shadow: var(--shadow-medium);
    background-color: var(--card-bg);
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.chat-header {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px;
    background-color: var(--primary-green);
    color: #fff;
    box-shadow: var(--shadow-light);
    z-index: 1;
}

.header-text {
    font-size: 1.5rem;
    font-weight: bold;
    color: #fff;
    text-align: center;
    margin: 0;
}

.chat-history {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    background-color: var(--bg-color-light);
}

.message {
    padding: 12px 16px;
    border-radius: 20px;
    margin-bottom: 15px;
    max-width: 80%;
    line-height: 1.5;
    box-shadow: var(--shadow-light);
}

.user-message {
    background-color: var(--primary-green);
    color: #fff;
    align-self: flex-end;
    margin-left: auto;
}

.ai-message {
    background-color: var(--light-green);
    color: var(--text-color);
    align-self: flex-start;
    margin-right: auto;
}

.ai-message h1, .ai-message h2, .ai-message h3 {
    font-size: 1.2em;
    margin: 0.5em 0;
}

.ai-message p {
    margin: 0.5em 0;
}

.ai-message ul, .ai-message ol {
    padding-left: 20px;
    margin: 0.5em 0;
}

.ai-message li {
    margin-bottom: 0.2em;
}

.chat-input-area {
    display: flex;
    padding: 15px;
    background-color: var(--card-bg);
    border-top: 1px solid #eee;
    align-items: center;
}

.text-input {
    flex: 1;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 25px;
    margin-right: 10px;
    outline: none;
    transition: all 0.3s ease;
}

.text-input:focus {
    border-color: var(--primary-green);
    box-shadow: 0 0 5px rgba(46, 125, 50, 0.5);
}

.mic-button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    padding: 10px;
    margin-right: 5px;
}

.mic-button ion-icon {
    font-size: 28px;
    color: var(--primary-green);
    transition: color 0.3s ease;
}

.mic-button:hover ion-icon {
    color: var(--dark-green);
}

.mic-button.listening ion-icon {
    color: #ff0000;
}

.stop-button {
    padding: 12px 20px;
    background-color: #dc3545;
    color: white;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-right: 10px;
}

.stop-button:hover {
    background-color: #c82333;
}

.send-button {
    padding: 12px 20px;
    background-color: var(--primary-green);
    color: white;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.send-button:hover {
    background-color: var(--dark-green);
}
`;

// --- React Component ---

const Chatbot = () => {
    // State for chat messages
    const [messages, setMessages] = useState([]);
    // State for the user's current input
    const [userInput, setUserInput] = useState('');
    // State for speech recognition status
    const [isListening, setIsListening] = useState(false);
    // Ref for the chat history div to manage scrolling
    const chatHistoryRef = useRef(null);
    // Ref for the SpeechRecognition object
    const recognitionRef = useRef(null);

    // Scroll to the bottom whenever messages update
    useEffect(() => {
        if (chatHistoryRef.current) {
            chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
        }
    }, [messages]);

    // Cleanup for speech synthesis and recognition on unmount
    useEffect(() => {
        return () => {
            if (window.speechSynthesis && window.speechSynthesis.speaking) {
                window.speechSynthesis.cancel();
            }
            if (recognitionRef.current && isListening) {
                recognitionRef.current.stop();
            }
        };
    }, [isListening]);

    // Function to append a message to the chat history
    const appendMessage = useCallback((message, sender, isMarkdown = false) => {
        setMessages((prevMessages) => {
            // Remove "Thinking..." message if present
            const updatedMessages = prevMessages.filter(msg => msg.id !== 'loading');
            
            // Add the new message
            const newMessage = {
                id: Date.now() + Math.random(),
                text: message,
                sender,
                isMarkdown,
                isLoading: sender === 'ai' && message === 'Thinking...'
            };
            
            return [...updatedMessages, newMessage];
        });
    }, []);

    // Core function to send the message and get AI response
    const sendMessage = useCallback(async (prompt = userInput) => {
        const trimmedPrompt = prompt.trim();
        if (!trimmedPrompt) return;

        // 1. Add user message
        appendMessage(trimmedPrompt, 'user');
        setUserInput(''); // Clear input

        // 2. Add 'Thinking...' message
        appendMessage('Thinking...', 'ai');

        try {
            // NOTE: Using a mock API endpoint. In a real application, you'd handle 
            // the state and language for the API call correctly.
            const selectedLanguage = localStorage.getItem('selectedLanguage') || 'en';
            const apiUrl = "https://ecokisan-disease.onrender.com/chat";

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                // Mock API call structure
                body: JSON.stringify({ prompt: trimmedPrompt, model: 'openai/gpt-oss-20b', lang: selectedLanguage }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`AI server error ${response.status}: ${errorText}`);
            }

            const aiData = await response.json();
            const aiResponseText = aiData.response || 'No report generated.';

            // 3. Replace 'Thinking...' and add final AI response
            setMessages((prevMessages) => prevMessages.filter(msg => msg.text !== 'Thinking...'));
            appendMessage(aiResponseText, 'ai', true);
            speak(aiResponseText, selectedLanguage);

        } catch (err) {
            console.error('Prediction failed:', err);
            
            // 3. Remove 'Thinking...' and add error message
            setMessages((prevMessages) => prevMessages.filter(msg => msg.text !== 'Thinking...'));
            const errorMessage = 'Request failed. Check your network and backend.';
            appendMessage(errorMessage, 'ai');
            speak(errorMessage, localStorage.getItem('selectedLanguage') || 'en');
        }
    }, [userInput, appendMessage]);

    // Handle speech recognition setup
    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (SpeechRecognition) {
            const recognition = new SpeechRecognition();
            recognition.interimResults = false;
            recognition.continuous = false;
            recognitionRef.current = recognition;

            recognition.onstart = () => {
                setIsListening(true);
                appendMessage('Listening...', 'ai');
            };

            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                setUserInput(transcript);
                // Auto send on result if we were listening
                if (recognitionRef.current.isListening) { // Use a flag if needed, or rely on the final stop
                   // Send the message after a short delay or directly
                   sendMessage(transcript);
                }
            };

            recognition.onend = () => {
                setIsListening(false);
                // Remove the "Listening..." message if it's still there
                setMessages((prevMessages) => prevMessages.filter(msg => msg.text !== 'Listening...'));
            };

            recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                setIsListening(false);
                if (event.error === 'no-speech') {
                    // Remove "Listening..." and add error message
                    setMessages((prevMessages) => prevMessages.filter(msg => msg.text !== 'Listening...'));
                    appendMessage('Could not detect any speech. Please try again.', 'ai');
                }
            };
        }
    }, [appendMessage, sendMessage]);

    // Event handler for the mic button
    const handleMicClick = () => {
        if (!recognitionRef.current) {
            console.warn('Speech Recognition not supported.');
            return;
        }

        if (!isListening) {
            // Start listening
            recognitionRef.current.lang = getRecognitionLanguage();
            recognitionRef.current.start();
        } else {
            // Stop listening
            recognitionRef.current.stop();
        }
    };

    // Event handler for the stop button (speech synthesis)
    const handleStopClick = () => {
        if (window.speechSynthesis && window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
        }
    };

    // Event handler for the send button (or Enter key)
    const handleSendClick = () => {
        sendMessage(userInput);
    };

    // Render the Message component (a sub-component for clarity)
    const Message = ({ text, sender, isMarkdown }) => {
        return (
            <div className={`message ${sender}-message`}>
                {isMarkdown ? (
                    // In a real app, you'd use a safer HTML rendering approach
                    <div dangerouslySetInnerHTML={{ __html: marked.parse(text) }} />
                ) : (
                    text
                )}
            </div>
        );
    };

    return (
        <div className="chatbot-body">
            {/* Injecting CSS into the component's scope (good for single component demo) */}
            <style>{styles}</style>
            
            <div className="chatbot-container-wrapper">
                <div className="chat-container">
                    <div className="chat-header">
                        <h1 className="header-text">AI Chatbot</h1>
                    </div>
                    
                    <div id="chat-history" className="chat-history" ref={chatHistoryRef}>
                        {messages.map((msg) => (
                            <Message 
                                key={msg.id} 
                                text={msg.text} 
                                sender={msg.sender} 
                                isMarkdown={msg.isMarkdown} 
                            />
                        ))}
                    </div>
                    
                    <div className="chat-input-area">
                        <input
                            type="text"
                            id="user-input"
                            className="text-input"
                            placeholder="Type or speak your message..."
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    handleSendClick();
                                }
                            }}
                        />
                        {/* ionicons are used as a fallback, ideally you'd use a proper React icon library */}
                        <button 
                            id="mic-button" 
                            className={`mic-button ${isListening ? 'listening' : ''}`}
                            onClick={handleMicClick}
                            disabled={!recognitionRef.current} // Disable if speech API not supported
                        >
                            <ion-icon name="mic-outline"></ion-icon>
                        </button>
                        <button 
                            id="stop-button" 
                            className="stop-button"
                            onClick={handleStopClick}
                        >
                            Stop
                        </button>
                        <button 
                            id="send-button" 
                            className="send-button"
                            onClick={handleSendClick}
                            disabled={!userInput.trim()} // Disable if input is empty
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
            
            {/* NOTE: You would need to ensure the ionicons script is loaded in your index.html or equivalent */}
            <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js" async></script>
            <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js" async></script>
        </div>
    );
};

export default Chatbot;
import React, { useState, useEffect, useRef } from 'react';
import { Send, LogOut } from './Icons';

function ChatPage({ messages, setMessages, activeScenarioIndex, scenarios, onExit }) {
    const [input, setInput] = useState('');
    const [isAiTyping, setIsAiTyping] = useState(false);
    const [scenarioStep, setScenarioStep] = useState(0);
    const [hasStarted, setHasStarted] = useState(false); // 채팅 시작 여부
    const chatEndRef = useRef(null);

    // 채팅창 자동 스크롤
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // AI 응답 로직
    const getAiResponse = () => {
        setIsAiTyping(false);
        let aiText;

        // 활성화된 시나리오가 있는지 확인
        if (activeScenarioIndex !== null) {
            const scenario = scenarios[activeScenarioIndex];
            if (scenario.responses && scenario.responses.length > 0) {
                aiText = scenario.responses[scenarioStep];
                // 다음 응답 순서로 이동 (순환)
                setScenarioStep(prev => (prev + 1) % scenario.responses.length);
            }
        }

        // 시나리오가 없거나 응답이 비어있으면 기본 응답
        if (!aiText) {
            aiText = '그렇군요. 좀 더 자세히 말씀해 주시겠어요? 당신의 이야기에 귀 기울이고 있어요.';
        }

        const newAiMessage = { sender: 'ai', text: aiText };
        setMessages(prev => [...prev, newAiMessage]);
    };

    // 메시지 전송 핸들러
    const handleSend = () => {
        if (input.trim() === '') return;

        // 첫 메시지 전송 시 채팅 시작
        if (!hasStarted) {
            setHasStarted(true);
        }

        const newUserMessage = { sender: 'user', text: input };
        setMessages(prev => [...prev, newUserMessage]);
        setInput('');
        setIsAiTyping(true);

        // Mock AI 응답 (2초 딜레이)
        setTimeout(getAiResponse, 2000);
    };

    // Enter 키 전송 (Shift+Enter는 줄바꿈)
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="h-screen w-full flex flex-col bg-white font-light">
            {/* 채팅 헤더 */}
            <header className="flex-shrink-0 flex justify-between items-center p-4 bg-white/80 backdrop-blur-md shadow-sm z-10 sticky top-0">
                <div>
                    <h1 className="text-lg font-medium text-purple-700">Crosstalk AI</h1>
                    <span className="text-sm text-gray-500">전문 상담사</span>
                </div>
                <button
                    onClick={onExit}
                    className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors"
                >
                    <LogOut size={20} className="mr-1" />
                    나가기
                </button>
            </header>

            {/* 채팅 영역 */}
            <div className="flex-grow relative overflow-hidden">
                {/* GIF - 항상 absolute, top 값만 변경 */}
                <div className={`gif-container-absolute ${!hasStarted ? '' : 'gif-moved'}`}>
                    <img 
                        src="/images/aiLoadingMotion.gif" 
                        alt="AI" 
                        className={`gif-smooth-transition ${!hasStarted ? 'gif-large' : 'gif-small'}`}
                    />
                </div>

                {/* 안내 텍스트 (시작 전에만) */}
                {!hasStarted && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <p className="text-gray-500 text-center mt-72">
                            메시지를 입력하여 대화를 시작하세요
                        </p>
                    </div>
                )}

                {/* 채팅 메시지 (시작 후에만) - 독립적인 스크롤 영역 */}
                {hasStarted && (
                    <div className="absolute top-24 left-0 right-0 bottom-0 overflow-y-auto px-4">
                        <div className="space-y-4 pb-4">
                            {messages.map((msg, index) => (
                                <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div
                                        className={`p-4 max-w-sm md:max-w-lg break-words rounded-2xl ${
                                            msg.sender === 'user' 
                                            ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white' 
                                            : 'bg-gray-100 text-gray-800'
                                        }`}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            {isAiTyping && (
                                <div className="flex justify-start">
                                    <div className="p-4 bg-gray-100 rounded-2xl">
                                        <div className="flex space-x-1">
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {/* 스크롤을 위한 빈 div */}
                            <div ref={chatEndRef}></div>
                        </div>
                    </div>
                )}
            </div>

            {/* 입력 영역 */}
            <footer className="flex-shrink-0 p-4 bg-white border-t border-gray-100 sticky bottom-0">
                <div className="flex items-center space-x-2">
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="메시지를 입력하세요..."
                        rows="1"
                        className="flex-grow p-3 border border-gray-300 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-purple-400"
                        style={{ minHeight: '48px', maxHeight: '150px' }}
                    ></textarea>
                    <button
                        onClick={handleSend}
                        className="p-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-full shadow-md hover:shadow-lg transition-shadow"
                    >
                        <Send size={24} />
                    </button>
                </div>
            </footer>
        </div>
    );
}

export default ChatPage;
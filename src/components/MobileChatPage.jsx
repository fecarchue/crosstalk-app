import React, { useState, useEffect, useRef } from 'react';
import { Send, LogOut } from './Icons';

function MobileChatPage({ messages, setMessages, activeScenarioIndex, scenarios, onExit }) {
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

    // 이미지 전송 핸들러
    const handleSendImage = () => {
        // 첫 메시지 전송 시 채팅 시작
        if (!hasStarted) {
            setHasStarted(true);
        }

        const newImageMessage = { sender: 'user', type: 'image', image: '/images/message.png' };
        setMessages(prev => [...prev, newImageMessage]);
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
        <div className="h-screen w-full flex flex-col bg-white font-light max-w-[430px] mx-auto">
            {/* 채팅 헤더 - 모바일 최적화 */}
            <header className="flex-shrink-0 flex justify-between items-center p-3 bg-white/80 backdrop-blur-md shadow-sm z-10 sticky top-0">
                <div>
                    <img 
                        src="/images/Layer2.png" 
                        alt="Home" 
                        className="h-5 w-auto"
                    />
                </div>
                <button
                    onClick={onExit}
                    className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors p-2"
                >
                    <LogOut size={18} className="mr-1" />
                </button>
            </header>

            {/* 채팅 영역 */}
            <div className="flex-grow relative overflow-hidden">
                {/* 배경 PNG - 채팅 시작 시 상단으로 이동 */}
                <div 
                    className="absolute flex items-center justify-center pointer-events-none transition-all duration-700"
                    style={{
                        top: !hasStarted ? '50%' : '60px',
                        left: '50%',
                        transform: 'translate(-50%, -50%)'
                    }}
                >
                    <img 
                        src="/images/aibackground.png" 
                        alt="AI Background" 
                        className="w-72 h-72"
                    />
                </div>

                {/* GIF - 항상 absolute, top 값만 변경 */}
                <div className={`gif-container-absolute ${!hasStarted ? '' : 'gif-moved'}`}>
                    <img 
                        src="/images/aiLoadingMotion.gif" 
                        alt="AI" 
                        className={`gif-smooth-transition ${!hasStarted ? 'gif-large-mobile' : 'gif-small-mobile'}`}
                    />
                </div>

                {/* 안내 텍스트 (시작 전에만) */}
                {!hasStarted && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <p className="text-center mt-72">
                            <span className="text-black text-xl">
                                안녕하세요!
                            </span>
                            <br />
                            <span className="text-gray-500 text-sm">
                                오늘은 어떤 고민이 있으신가요?
                            </span>
                        </p>
                    </div>
                )}

                {/* 채팅 메시지 (시작 후에만) - 독립적인 스크롤 영역 */}
                {hasStarted && (
                    <div className="absolute top-20 left-0 right-0 bottom-0 overflow-y-auto px-3">
                        <div className="space-y-3 pb-4">
                            {messages.map((msg, index) => (
                                <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    {msg.type === 'image' ? (
                                        // 이미지 메시지
                                        <div className="flex justify-center w-full">
                                            <img 
                                                src={msg.image} 
                                                alt="Sent" 
                                                className="max-w-[70%]"
                                            />
                                        </div>
                                    ) : (
                                        // 텍스트 메시지
                                        <div
                                            className={`relative px-4 py-3 max-w-[75%] break-words text-sm ${
                                                msg.sender === 'user' 
                                                ? 'bg-gray-300 text-gray-900 rounded-2xl rounded-tr-sm' 
                                                : 'bg-lime-200 text-gray-900 rounded-2xl rounded-tl-sm'
                                            }`}
                                        >
                                            {/* 왓츠앱 스타일 날카로운 말풍선 꼬리 */}
                                            {msg.sender === 'user' ? (
                                                <div
                                                    className="absolute"
                                                    style={{
                                                        top: 0,
                                                        right: '-8px',
                                                        width: 0,
                                                        height: 0,
                                                        borderLeft: '8px solid rgb(209 213 219)',
                                                        borderTop: '8px solid transparent',
                                                        borderBottom: '4px solid transparent',
                                                    }}
                                                ></div>
                                            ) : (
                                                <div
                                                    className="absolute"
                                                    style={{
                                                        top: 0,
                                                        left: '-8px',
                                                        width: 0,
                                                        height: 0,
                                                        borderRight: '8px solid rgb(217 249 157)',
                                                        borderTop: '8px solid transparent',
                                                        borderBottom: '4px solid transparent',
                                                    }}
                                                ></div>
                                            )}
                                            {msg.text}
                                        </div>
                                    )}
                                </div>
                            ))}
                            {isAiTyping && (
                                <div className="flex justify-start">
                                    <div className="px-4 py-3 bg-lime-200 rounded-2xl rounded-tl-sm">
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

            {/* 입력 영역 - 모바일 최적화 */}
            <footer className="flex-shrink-0 p-3 bg-gray-200 border-t border-gray-300 sticky bottom-0">
                <div className="flex items-center space-x-2">
                    {/* Plus 버튼 */}
                    <button 
                        onClick={handleSendImage}
                        className="p-2 flex-shrink-0"
                    >
                        <img 
                            src="/images/Plus.png" 
                            alt="Plus" 
                            className="w-5 h-5"
                        />
                    </button>
                    
                    {/* 텍스트 입력창 + Send 버튼 */}
                    <div className="flex-grow flex items-center bg-white border border-gray-300 rounded-xl px-3 py-2">
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="메시지를 입력하세요..."
                            rows="1"
                            className="flex-grow resize-none focus:outline-none bg-transparent text-sm"
                            style={{ minHeight: '28px', maxHeight: '120px' }}
                        ></textarea>
                        
                        {/* Send 버튼 (입력창 안) */}
                        <button
                            onClick={handleSend}
                            className="p-1 flex-shrink-0 ml-2"
                        >
                            <img 
                                src="/images/Send.png" 
                                alt="Send" 
                                className="w-5 h-5"
                            />
                        </button>
                    </div>
                    
                    {/* Image 버튼 */}
                    <button className="p-2 flex-shrink-0">
                        <img 
                            src="/images/Image.png" 
                            alt="Image" 
                            className="w-5 h-5"
                        />
                    </button>
                    
                    {/* Camera 버튼 */}
                    <button className="p-2 flex-shrink-0">
                        <img 
                            src="/images/Camera.png" 
                            alt="Camera" 
                            className="w-5 h-5"
                        />
                    </button>
                </div>
            </footer>
        </div>
    );
}

export default MobileChatPage;
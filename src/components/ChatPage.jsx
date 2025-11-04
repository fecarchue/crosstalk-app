import React, { useState, useEffect, useRef } from 'react';
import { Send, LogOut } from './Icons';

function ChatPage({ messages, setMessages, activeScenarioIndex, scenarios, onExit }) {
    const [input, setInput] = useState('');
    const [isAiTyping, setIsAiTyping] = useState(false);
    const [scenarioStep, setScenarioStep] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);
    const chatEndRef = useRef(null);

    // 채팅창 자동 스크롤
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // AI 응답 로직
    const getAiResponse = () => {
        setIsAiTyping(false);
        let aiText;

        if (activeScenarioIndex !== null) {
            const scenario = scenarios[activeScenarioIndex];
            if (scenario.responses && scenario.responses.length > 0) {
                aiText = scenario.responses[scenarioStep];
                setScenarioStep(prev => (prev + 1) % scenario.responses.length);
            }
        }

        if (!aiText) {
            aiText = '그렇군요. 좀 더 자세히 말씀해 주시겠어요? 당신의 이야기에 귀 기울이고 있어요.';
        }

        const messageParts = aiText.split('\\a').filter(part => part.trim() !== '');
        
        messageParts.forEach((part, index) => {
            setTimeout(() => {
                const newAiMessage = { sender: 'ai', text: part.trim() };
                setMessages(prev => [...prev, newAiMessage]);
            }, index * 500);
        });
    };

    // 메시지 전송 핸들러
    const handleSend = () => {
        if (input.trim() === '') return;

        if (!hasStarted) {
            setHasStarted(true);
        }

        const newUserMessage = { sender: 'user', text: input };
        setMessages(prev => [...prev, newUserMessage]);
        setInput('');
        setIsAiTyping(true);

        setTimeout(getAiResponse, 2000);
    };

    // 이미지 전송 핸들러
    const handleSendImage = () => {
        if (!hasStarted) {
            setHasStarted(true);
        }

        const newImageMessage = { sender: 'user', type: 'image', image: '/images/message.png' };
        setMessages(prev => [...prev, newImageMessage]);
        setIsAiTyping(true);

        setTimeout(getAiResponse, 2000);
    };

    // Enter 키 전송
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="h-screen w-full flex relative overflow-hidden">
            {/* 전체 배경 이미지 */}
            <div className="fixed inset-0 z-0 flex items-center justify-center">
                <img
                    src="/images/messageBackground.png"
                    alt=""
                    className="h-full"
                    style={{ width: 'auto', maxWidth: 'none', transform: 'scaleX(1) translateX(15%)' }}
                />
            </div>

            {/* 좌측 사이드바 */}
            <div className="relative z-10 w-64 h-full flex-shrink-0">
                <img
                    src="/images/messagePage.png"
                    alt="Sidebar"
                    className="w-full h-full object-cover"
                />
                
                {/* 사이드바 내용 */}
                <div className="absolute inset-0 flex flex-col justify-between p-4">
                    {/* 상단 로고 */}
                    <div className="flex items-center pt-2">
                        <img
                            src="/images/Layer1.png"
                            alt="Logo"
                            className="h-12 cursor-pointer"
                        />
                    </div>

                    {/* 하단 사용자 정보 */}
                    <div className="flex items-center space-x-3 pb-2">
                        <img
                            src="/images/Group.png"
                            alt="User"
                            className="w-10 h-10 rounded-full"
                        />
                        <span className="text-dark text-sm font-medium">username</span>
                    </div>
                </div>
            </div>

            {/* 메인 채팅 영역 */}
            <div className="relative z-10 flex-grow flex flex-col">
                {/* 우측 상단 나가기 버튼 */}
                <div className="absolute top-4 right-4 z-20">
                    <button
                        onClick={onExit}
                        className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors bg-white/80 backdrop-blur-md px-3 py-2 rounded-lg shadow-sm"
                    >
                        <LogOut size={20} className="mr-1" />
                    </button>
                </div>

                {/* 채팅 영역 */}
                <div className="flex-grow relative overflow-hidden">
                    {/* AI 배경 이미지 - 좌측 상단에서 시작해서 중앙으로 */}
                    <div 
                        className="absolute pointer-events-none transition-all duration-700"
                        style={{
                            top: !hasStarted ? '80px' : '80px',
                            left: !hasStarted ? '80px' : '50%',
                            transform: !hasStarted ? 'translate(0, 0)' : 'translate(-50%, -50%)',
                        }}
                    >
                        <img 
                            src="/images/aibackground.png" 
                            alt="AI Background" 
                            className={`transition-all duration-700 ${!hasStarted ? 'w-64 h-64' : 'w-32 h-32'}`}
                        />
                    </div>

                    {/* AI 로딩 GIF - 좌측 상단에서 시작해서 중앙으로 */}
                    <div 
                        className="absolute pointer-events-none transition-all duration-700"
                        style={{
                            top: !hasStarted ? '150px' : '80px',
                            left: !hasStarted ? '150px' : '50%',
                            transform: !hasStarted ? 'translate(0, 0)' : 'translate(-50%, -50%)',
                        }}
                    >
                        <img 
                            src="/images/aiLoadingMotion.gif" 
                            alt="AI" 
                            className={`transition-all duration-700 ${!hasStarted ? 'w-32 h-32' : 'w-16 h-16'}`}
                        />
                    </div>

                    {/* 안내 텍스트 (시작 전에만) - GIF 바로 아래 */}
                    {!hasStarted && (
                        <div 
                            className="absolute pointer-events-none transition-opacity duration-500"
                            style={{
                                top: '300px',
                                left: '80px',
                            }}
                        >
                            <p className="text-left">
                                <span className="text-black text-2xl font-medium">
                                    안녕하세요!
                                </span>
                                <br />
                                <span className="text-gray-600 text-lg">
                                    오늘은 어떤 고민이 있으신가요?
                                </span>
                            </p>
                        </div>
                    )}

                    {/* messageBar 이미지 (시작 전에만) - 채팅창 바로 위 중앙 */}
                    {!hasStarted && (
                        <div 
                            className="absolute pointer-events-none transition-opacity duration-500"
                            style={{
                                bottom: '80px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                            }}
                        >
                            <img 
                                src="/images/messageBar.png" 
                                alt="Message Bar" 
                                className="w-auto h-auto max-w-2xl"
                            />
                        </div>
                    )}

                    {/* 채팅 메시지 (시작 후에만) */}
                    {hasStarted && (
                        <div className="absolute top-0 left-0 right-0 bottom-0 overflow-y-auto pl-32 pr-8 pt-8">
                            <div className="space-y-4 pb-4 max-w-4xl ml-8">
                                {messages.map((msg, index) => (
                                    <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        {msg.type === 'image' ? (
                                            <div className="flex justify-center w-full">
                                                <img 
                                                    src={msg.image} 
                                                    alt="Sent" 
                                                    className="max-w-xs rounded-lg"
                                                />
                                            </div>
                                        ) : (
                                            <div
                                                className={`relative p-4 max-w-xs break-words ${
                                                    msg.sender === 'user' 
                                                    ? 'bg-gray-300 text-gray-900 rounded-2xl rounded-tr-sm' 
                                                    : 'bg-lime-200 text-gray-900 rounded-2xl rounded-tl-sm'
                                                }`}
                                            >
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
                                        <div className="p-4 bg-gray-100 rounded-2xl">
                                            <div className="flex space-x-1">
                                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
                                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
                                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div ref={chatEndRef}></div>
                            </div>
                        </div>
                    )}
                </div>

                {/* 입력 영역 */}
                <footer className="flex-shrink-0 p-4 bg-white border-t border-black">
                    <div className="pl-44 pr-16 flex items-center space-x-2 max-w-3xl ml-20">
                        {/* Plus 버튼 */}
                        <button 
                            onClick={handleSendImage}
                            className="p-2 flex-shrink-0"
                        >
                            <img 
                                src="/images/Plus.png" 
                                alt="Plus" 
                                className="w-6 h-6"
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
                                className="flex-grow resize-none focus:outline-none bg-transparent"
                                style={{ minHeight: '32px', maxHeight: '150px' }}
                            ></textarea>
                            
                            {/* Send 버튼 */}
                            <button
                                onClick={handleSend}
                                className="p-1 flex-shrink-0 ml-2"
                            >
                                <img 
                                    src="/images/Send.png" 
                                    alt="Send" 
                                    className="w-6 h-6"
                                />
                            </button>
                        </div>
                        
                        {/* Image 버튼 */}
                        <button className="p-2 flex-shrink-0">
                            <img 
                                src="/images/Image.png" 
                                alt="Image" 
                                className="w-6 h-6"
                            />
                        </button>
                        
                        {/* Camera 버튼 */}
                        <button className="p-2 flex-shrink-0">
                            <img 
                                src="/images/Camera.png" 
                                alt="Camera" 
                                className="w-6 h-6"
                            />
                        </button>
                    </div>
                </footer>
            </div>
        </div>
    );
}

export default ChatPage;
import React, { useState, useEffect } from 'react';
import WelcomePage from './components/WelcomePage';
import MainPage from './components/MainPage';
import LoadingPage from './components/LoadingPage';
import ChatPage from './components/ChatPage';
import MobileChatPage from './components/MobileChatPage';
import ScenarioPage from './components/ScenarioPage';
import './App.css';

function App() {
    // page: 'welcome', 'main', 'loading', 'chat', 'mobilechat', 'scenario'
    const [page, setPage] = useState('welcome');
    const [isTransitioning, setIsTransitioning] = useState(false);
    
    // 7개의 시나리오 저장 공간
    const [scenarios, setScenarios] = useState(
        Array(7).fill({ responses: [] })
    );
    
    // 현재 활성화된 시나리오 인덱스 (0-6, null은 비활성)
    const [activeScenarioIndex, setActiveScenarioIndex] = useState(null);
    
    // 현재 수정 중인 시나리오 인덱스
    const [editingScenarioIndex, setEditingScenarioIndex] = useState(null);
    
    // 채팅 메시지 목록
    const [messages, setMessages] = useState([]);
    
    // 알림 메시지
    const [notification, setNotification] = useState(null);

    // 알림 자동 숨김
    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => {
                setNotification(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    // 부드러운 페이지 전환 함수
    const smoothTransitionToPage = (targetPage) => {
        setIsTransitioning(true);
        setTimeout(() => {
            setPage(targetPage);
            setIsTransitioning(false);
        }, 600); // 애니메이션 시간과 동일
    };

    // 페이지 전환 로직
    const renderPage = () => {
        switch (page) {
            case 'welcome':
                return (
                    <WelcomePage 
                        onScrollToMain={() => smoothTransitionToPage('main')} 
                        onDevButtonClick={(index) => {
                            setEditingScenarioIndex(index);
                            setPage('scenario');
                        }}
                    />
                );
            case 'main':
                return (
                    <MainPage
                        onStartChat={() => setPage('loading')}
                        notification={notification}
                        setPage={setPage}
                    />
                );
            case 'loading':
                return <LoadingPage onLoadingComplete={() => setPage('chat')} />;
            case 'chat':
                return (
                    <ChatPage
                        messages={messages}
                        setMessages={setMessages}
                        activeScenarioIndex={activeScenarioIndex}
                        scenarios={scenarios}
                        onExit={() => {
                            setMessages([]); // 채팅방 나갈 때 메시지 초기화
                            setPage('main');
                        }}
                    />
                );
            case 'mobilechat':
                return (
                    <MobileChatPage
                        messages={messages}
                        setMessages={setMessages}
                        activeScenarioIndex={activeScenarioIndex}
                        scenarios={scenarios}
                        onExit={() => {
                            setMessages([]); // 채팅방 나갈 때 메시지 초기화
                            setPage('main');
                        }}
                    />
                );
            case 'scenario':
                return (
                    <ScenarioPage
                        scenarioIndex={editingScenarioIndex}
                        initialResponses={scenarios[editingScenarioIndex]?.responses || []}
                        onBack={() => setPage('main')}
                        onSave={(index, responses) => {
                            const newScenarios = [...scenarios];
                            newScenarios[index] = { responses };
                            setScenarios(newScenarios);
                            setActiveScenarioIndex(index);
                            
                            // 7번째 시나리오(index 6)는 로딩 후 모바일 채팅으로
                            if (index === 6) {
                                setPage('loading');
                                setTimeout(() => {
                                    setPage('mobilechat');
                                }, 5000); // 로딩 페이지 5초 후 모바일 채팅
                            } else {
                                setPage('main');
                            }
                            
                            setNotification(`시나리오 ${index + 1}이(가) 저장 및 활성화되었습니다.`);
                        }}
                    />
                );
            default:
                return <WelcomePage onScrollToMain={() => setPage('main')} />;
        }
    };

    return (
        <div className="font-light text-gray-800">
            <div className={`page-transition ${isTransitioning ? 'page-exit' : 'page-enter'}`}>
                {renderPage()}
            </div>
        </div>
    );
}

export default App;
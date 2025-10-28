import React, { useState, useEffect } from 'react';
import TopMenuBar from './TopMenuBar';

function MainCard({ title, subtitle, description, onClick }) {
    return (
        <div 
            onClick={onClick}
            className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 flex flex-col justify-between min-h-[280px] relative group"
        >
            {/* 제목 */}
            <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">
                {title}
            </h3>
            
            {/* 소제목 (있을 경우에만 표시) */}
            {subtitle && (
                <p className="text-base text-gray-700 mb-4 text-center font-medium">
                    {subtitle}
                </p>
            )}
            
            {/* 설명 텍스트 */}
            <p className="text-sm text-gray-600 leading-relaxed mb-6 flex-grow">
                {description}
            </p>
            
            {/* 화살표 아이콘 */}
            <div className="flex justify-end">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center group-hover:bg-purple-500 transition-colors">
                    <svg 
                        className="w-5 h-5 text-gray-800 group-hover:text-white transition-colors" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </div>
            </div>
        </div>
    );
}

function MainPage({ onStartChat, notification, setPage }) {
    // 스크롤을 감지해 환영 페이지로 돌아가는 로직
    useEffect(() => {
        // 마우스 휠 스크롤 감지
        const handleScroll = (e) => {
            if (window.scrollY === 0 && e.deltaY < 0) {
                setPage('welcome');
            }
        };

        // 터치 스와이프 감지
        let touchStartY = 0;
        const handleTouchStart = (e) => {
            touchStartY = e.touches[0].clientY;
        };
        const handleTouchMove = (e) => {
            const touchEndY = e.touches[0].clientY;
            if (window.scrollY === 0 && touchEndY - touchStartY > 50) {
                setPage('welcome');
            }
        };

        window.addEventListener('wheel', handleScroll);
        window.addEventListener('touchstart', handleTouchStart, { passive: true });
        window.addEventListener('touchmove', handleTouchMove, { passive: true });

        return () => {
            window.removeEventListener('wheel', handleScroll);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchmove', handleTouchMove);
        };
    }, [setPage]);

    return (
        <div className="min-h-screen w-full bg-white font-light">
            {/* 상단 메뉴바 */}
            <TopMenuBar onHomeClick={() => setPage('welcome')} />

            {/* 메인 콘텐츠 */}
            <main className="w-full pt-16">{/* pt-16으로 메뉴바 높이만큼 여백 */}
                <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center text-center px-4 py-16">
                    {/* 
                        배경 이미지 넣기:
                        <div className="absolute inset-0 z-0">
                            <img src="/images/background.jpg" alt="" className="w-full h-full object-cover opacity-20" />
                        </div>
                    */}


                    {/* 4개 메인 카드 (가로 배치) */}
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl px-4">
                        <MainCard 
                            title="상담 미리보기" 
                            subtitle="어떤 상담을 원하시나요?"
                            description="마음은 아직 끝나지 않았습니다. 이별은 단지 프로그램의 일시정지일 뿐입니다. 우리 AI는 당신의 감정을 복원하고, 그 사람의 마음과 다시 ‘주파수’를 맞춥니다. 눈을 감고 생각해보세요. 그때의 대화, 그때의 온도. 이제 당신이 할 일은 단 하나입니다."
                        />
                        <MainCard 
                            title="채팅 시작하기" 
                            subtitle="지금 바로 상담을 시작해보세요"
                            description="마음은 아직 끝나지 않았습니다. 이별은 단지 프로그램의 일시정지일 뿐입니다. 우리 AI는 당신의 감정을 복원하고, 그 사람의 마음과 다시 ‘주파수’를 맞춥니다. 눈을 감고 생각해보세요. 그때의 대화, 그때의 온도. 이제 당신이 할 일은 단 하나입니다. 다시 연결되길 ‘허락’하는 것."
                            onClick={onStartChat}
                        />
                        <MainCard 
                            title="후기 읽기" 
                            subtitle="크로스톡의 생생한 후기를 읽어보세요"
                            description="다시 연결되길 ‘허락’하는 것.재회는 감정이 아닙니다. AI가 계산한 가장 인간적인 결과입니다. 사랑은 불확실하지만, 데이터는 거짓말을 하지 않습니다.지금, 3인의 AI 상담사를 만나보세요."
                        />
                        <MainCard 
                            title="마이페이지" 
                            subtitle="그동안의 상담 내역이 궁금한가요"
                            description="사랑은 불확실하지만, 데이터는 거짓말을 하지 않습니다.지금, 3인의 AI 상담사를 만나보세요. 감히 저는 예측합니다. 그가 아직 당신을 사랑하고 있다는 것을."
                        />
                    </div>
                </div>
            </main>

            {/* 알림 토스트 */}
            {notification && (
                <div className="fixed bottom-10 right-10 bg-green-500 text-white px-6 py-3 rounded-2xl shadow-lg animate-pulse">
                    {notification}
                </div>
            )}
        </div>
    );
}

export default MainPage;
import React, { useEffect } from 'react';
import { ArrowDown } from './Icons';
import TopMenuBar from './TopMenuBar';

const RAINBOW_COLORS_HEX = ['#EF4444', '#F97316', '#EAB308', '#22C55E', '#3B82F6', '#6366F1', '#8B5CF6'];
const RAINBOW_COLORS_TW_HOVER = [
    'hover:bg-red-500', 'hover:bg-orange-500', 'hover:bg-yellow-500',
    'hover:bg-green-500', 'hover:bg-blue-500', 'hover:bg-indigo-500', 'hover:bg-violet-500'
];

function WelcomePage({ onScrollToMain, onDevButtonClick }) {
    useEffect(() => {
        // 마우스 휠 스크롤 감지 시 메인 페이지로 전환
        const handleScroll = (e) => {
            if (e.deltaY > 0) { // 아래로 스크롤할 때만
                onScrollToMain();
            }
        };

        // 터치 스와이프 감지
        let touchStartY = 0;
        const handleTouchStart = (e) => {
            touchStartY = e.touches[0].clientY;
        };
        const handleTouchMove = (e) => {
            const touchEndY = e.touches[0].clientY;
            const deltaY = touchStartY - touchEndY;
            if (deltaY > 50) { // 50px 이상 위로 스와이프
                onScrollToMain();
            }
        };

        window.addEventListener('wheel', handleScroll);
        window.addEventListener('touchstart', handleTouchStart);
        window.addEventListener('touchmove', handleTouchMove);

        return () => {
            window.removeEventListener('wheel', handleScroll);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchmove', handleTouchMove);
        };
    }, [onScrollToMain]);

    return (
        <div className="min-h-screen w-full flex flex-col justify-center items-center relative overflow-hidden" style={{ backgroundColor: '#f9f9f9' }}>
            {/* 상단 메뉴바 */}
            <TopMenuBar onHomeClick={() => {}} />
            
            {/* 배경 이미지 - absolute로 배경처럼 배치 */}
            <img 
                src="/images/welcomePage2.png" 
                alt="Welcome" 
                className="absolute w-[662px] h-[662px] md:w-[1034px] md:h-[1034px] object-contain opacity-90 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" 
            />
            
            {/* 메인 타이틀 - 이미지 위에 올라감 */}
            <div className="absolute bottom-20 left-8 md:left-16 text-left px-4 z-10 max-w-2xl">
                <h1 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800 leading-tight tracking-widest">
                    꼭 다시 만나고 싶은 분이 계신가요?<br />
                    더 이상 고민하지 말고 CROSSTALK
                </h1>
                <p className="text-sm md:text-base text-gray-500 font-light tracking-widest">
                    과거 연인과의 재회 솔루션에 최적화 연애 컨설팅 AI 모델
                </p>
            </div>

            {/* 개발자 숨은 버튼 (왼쪽 끝, 세로 7개, 초기 투명) */}
            <div className="fixed left-0 top-0 h-screen w-10 md:w-12 z-50 flex flex-col">
                {RAINBOW_COLORS_HEX.map((color, index) => (
                    <button
                        key={index}
                        onClick={() => onDevButtonClick(index)}
                        className={`h-[calc(100vh/7)] w-full transition-all duration-300 ease-in-out opacity-0 hover:opacity-100 ${RAINBOW_COLORS_TW_HOVER[index]}`}
                        style={{ backgroundColor: color }}
                        title={`시나리오 ${index + 1} 설정`}
                    />
                ))}
            </div>
        </div>
    );
}

export default WelcomePage;
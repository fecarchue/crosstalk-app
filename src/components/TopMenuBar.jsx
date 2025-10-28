import React from 'react';

function TopMenuBar({ onHomeClick }) {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 h-16">
            {/* 메뉴바 배경 이미지 */}
            <img 
                src="/images/topMenuBar.png" 
                alt="Menu Bar" 
                className="absolute inset-0 w-full h-full object-cover"
            />
            
            {/* 메뉴바 내용 */}
            <div className="relative h-full max-w-7xl mx-auto px-4 flex justify-between items-center">
                {/* 왼쪽: 홈 버튼 */}
                <button 
                    onClick={onHomeClick}
                    className="flex items-center hover:opacity-80 transition-opacity"
                >
                    <img 
                        src="/images/Layer1.png" 
                        alt="Home" 
                        className="h-6 w-auto"
                    />
                </button>

                {/* 오른쪽: 마이페이지 버튼 (기능 없음) */}
                <button 
                    className="flex items-center hover:opacity-80 transition-opacity"
                >
                    <img 
                        src="/images/myPageIcon.png" 
                        alt="My Page" 
                        className="h-6 w-auto"
                    />
                </button>
            </div>
        </nav>
    );
}

export default TopMenuBar;
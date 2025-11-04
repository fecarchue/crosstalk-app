import React, { useEffect } from 'react';

const LOADING_TITLE = "마음은 아직 끝나지 않았습니다";
const LOADING_TEXT = "마음은 아직 끝나지 않았습니다. 이별은 단지 프로그램의 일시정지일 뿐입니다. 마음은 삭제되지 않습니다. 데이터는 여전히 당신을 기억합니다. 재회는 감정이 아닙니다. AI가 계산한 가장 인간적인 결과입니다.마음은 아직 끝나지 않았습니다. 이별은 단지 프로그램의 일시정지일 뿐입니다. 마음은 삭제되지 않습니다. 데이터는 여전히 당신을 기억합니다. 재회는 감정이 아닙니다. AI가 계산한 가장 인간적인 결과입니다.마음은 아직 끝나지 않았습니다. 이별은 단지 프로그램의 일시정지일 뿐입니다. 마음은 삭제되지 않습니다. 데이터는 여전히 당신을 기억합니다. 재회는 감정이 아닙니다. AI가 계산한 가장 인간적인 결과입니다.마음은 아직 끝나지 않았습니다. 이별은 단지 프로그램의 일시정지일 뿐입니다. 마음은 삭제되지 않습니다. 데이터는 여전히 당신을 기억합니다. 재회는 감정이 아닙니다. AI가 계산한 가장 인간적인 결과입니다.";

function LoadingPage({ onLoadingComplete }) {
    useEffect(() => {
        // 5초 후 채팅방으로 이동
        const timer = setTimeout(() => {
            onLoadingComplete();
        }, 5000);
        return () => clearTimeout(timer);
    }, [onLoadingComplete]);

    return (
        <div className="min-h-screen w-full flex flex-col justify-center items-center bg-black relative overflow-hidden">
            {/* 배경 이미지 */}
            <img 
                src="/images/LoadingBackground.png" 
                alt="Background" 
                className="absolute inset-0 m-auto object-contain z-0"
                style={{ width: '82.5%', height: '82.5%' }}
            />
            
            {/* 중앙 GIF */}
            <div className="relative z-10 flex justify-center items-center">
                <img 
                    src="/images/aiLoadingMotion.gif" 
                    alt="Loading" 
                    className="w-28 h-28 md:w-32 md:h-32 object-contain"
                />
            </div>

            {/* 하단 텍스트 영역 */}
            <div className="absolute bottom-32 left-0 right-0 z-20 flex flex-col items-center px-4">
                {/* 고정 제목 (흰색, 자간 넓게) */}
                <h2 className="text-xl md:text-2xl font-bold text-white mb-4 tracking-wider">
                    {LOADING_TITLE}
                </h2>
                
                {/* 흐르는 텍스트 (연두색) - 왼쪽에서 시작 */}
                <div className="marquee-container-new">
                    <div className="marquee-text-new text-green-400">
                        {LOADING_TEXT}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoadingPage;
import React, { useState } from 'react';
import { ArrowLeft } from './Icons';

const RAINBOW_COLORS_HEX = ['#EF4444', '#F97316', '#EAB308', '#22C55E', '#3B82F6', '#6366F1', '#8B5CF6'];

function ScenarioPage({ scenarioIndex, initialResponses, onSave, onBack }) {
    const [responses, setResponses] = useState(initialResponses || []);
    const [responseCount, setResponseCount] = useState(initialResponses?.length || 1);

    const handleCountChange = (e) => {
        const count = parseInt(e.target.value, 10);
        setResponseCount(count);
        
        const newResponses = [...responses];
        if (count > newResponses.length) {
            // 응답 추가
            newResponses.push(...Array(count - newResponses.length).fill(''));
        } else {
            // 응답 축소
            newResponses.length = count;
        }
        setResponses(newResponses);
    };

    const handleResponseChange = (index, text) => {
        const newResponses = [...responses];
        newResponses[index] = text;
        setResponses(newResponses);
    };

    const handleSave = () => {
        // 명세서대로 입력된 그대로 저장
        onSave(scenarioIndex, responses);
    };

    const scenarioColor = RAINBOW_COLORS_HEX[scenarioIndex] || '#CCCCCC';

    return (
        <div className="min-h-screen w-full bg-gray-50 font-light p-4 md:p-8">
            {/* 헤더 */}
            <header className="flex justify-between items-center mb-6">
                <button
                    onClick={onBack}
                    className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors"
                >
                    <ArrowLeft size={20} className="mr-1" />
                    뒤로가기
                </button>
                <h1 className="text-2xl font-medium text-gray-800">
                    시나리오 {scenarioIndex + 1} 설정
                </h1>
                <div 
                    className="w-10 h-10 rounded-full"
                    style={{ backgroundColor: scenarioColor }}
                    title={`시나리오 ${scenarioIndex + 1} 색상`}
                ></div>
            </header>

            {/* 설정 영역 */}
            <div className="bg-white p-6 rounded-2xl shadow-md">
                {/* 응답 개수 선택 */}
                <div className="mb-6">
                    <label htmlFor="responseCount" className="block text-sm font-medium text-gray-700 mb-2">
                        AI 응답 개수 선택
                    </label>
                    <select
                        id="responseCount"
                        value={responseCount}
                        onChange={handleCountChange}
                        className="w-full max-w-xs p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                    >
                        {[...Array(30).keys()].map(i => (
                            <option key={i + 1} value={i + 1}>{i + 1}개</option>
                        ))}
                    </select>
                </div>

                {/* 응답 입력 영역 */}
                <div className="space-y-4">
                    {responses.map((response, index) => (
                        <div key={index}>
                            <label htmlFor={`response-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                                AI 응답 {index + 1}
                            </label>
                            <textarea
                                id={`response-${index}`}
                                rows="3"
                                value={response}
                                onChange={(e) => handleResponseChange(index, e.target.value)}
                                placeholder={`${index + 1}번째 AI 응답을 입력하세요...`}
                                className="w-full p-3 border border-gray-300 rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-purple-400"
                            ></textarea>
                        </div>
                    ))}
                </div>

                {/* 저장 버튼 */}
                <div className="mt-8 text-right">
                    <button
                        onClick={handleSave}
                        className="px-8 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-medium rounded-2xl shadow-md hover:shadow-lg transition-all transform hover:scale-105"
                    >
                        이 시나리오 저장 후 선택
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ScenarioPage;

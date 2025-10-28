import React from 'react';

// 공용 아이콘 컴포넌트
const Icon = ({ size = 24, className, children }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    {children}
  </svg>
);

export const Send = ({ size, className }) => (
  <Icon size={size} className={className}>
    <path d="m22 2-7 20-4-9-9-4Z"/>
    <path d="m22 2-11 11"/>
  </Icon>
);

export const ArrowDown = ({ size, className }) => (
  <Icon size={size} className={className}>
    <path d="M12 5v14"/>
    <path d="m19 12-7 7-7-7"/>
  </Icon>
);

export const Menu = ({ size, className }) => (
  <Icon size={size} className={className}>
    <line x1="4" x2="20" y1="12" y2="12"/>
    <line x1="4" x2="20" y1="6" y2="6"/>
    <line x1="4" x2="20" y1="18" y2="18"/>
  </Icon>
);

export const X = ({ size, className }) => (
  <Icon size={size} className={className}>
    <path d="M18 6 6 18"/>
    <path d="m6 6 12 12"/>
  </Icon>
);

export const ArrowLeft = ({ size, className }) => (
  <Icon size={size} className={className}>
    <path d="m12 19-7-7 7-7"/>
    <path d="M19 12H5"/>
  </Icon>
);

export const LogOut = ({ size, className }) => (
  <Icon size={size} className={className}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <path d="M16 17l5-5-5-5"/>
    <path d="M21 12H9"/>
  </Icon>
);

"use client"
import React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes';
/**
 * 설치 및 사용법
https://github.com/pacocoursey/next-themes
테마 변경 적용 라이브러리
npm install next-themes
npm install --save-dev @types/next-themes

*/
type ThemeProviderProps = React.ComponentProps<typeof NextThemesProvider>;


const ThemeProvider:React.FC<ThemeProviderProps> = ({children, ...props}) => {
  return (
    <NextThemesProvider  {...props}>
        {children}
    </NextThemesProvider>
  )
}

export default ThemeProvider;
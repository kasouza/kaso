import React, { Dispatch, FC, SetStateAction, useEffect, useState } from "react"

export type Theme = 'light' | 'dark'

export const ThemeContext = React.createContext<{theme: Theme, setTheme?: Dispatch<SetStateAction<Theme>>}>({ theme: 'light'})

export const ThemeProvider: FC = ({ children }) => {
	const [theme, setTheme] = useState<Theme>('light')

    useEffect(() => {
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
		setTheme(prefersDarkMode ? 'dark' : 'light')
    }, [])

    useEffect(() => {
        const html = document.querySelector('html')
        if (html) {
            if (theme === 'dark') html.classList.add('dark')
            else html.classList.remove('dark')
        }
    })

	return (
		<ThemeContext.Provider value={{ theme, setTheme }}>
			{children}
		</ThemeContext.Provider>
	)

}

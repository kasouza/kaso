import React, { Dispatch, FC, SetStateAction, useEffect, useState } from "react"

export type Theme = 'light' | 'dark'

export const ThemeContext = React.createContext<{ theme: Theme, setTheme?: Dispatch<SetStateAction<Theme>> }>({ theme: 'light' })

export const ThemeProvider: FC = ({ children }) => {
	const [theme, setTheme] = useState<Theme>('light')

	useEffect(() => {
		const theme = localStorage.getItem('theme') as Theme | null
		if (theme) {
			setTheme(theme)
		} else {
			const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
			setTheme(prefersDarkMode ? 'dark' : 'light')
		}
	}, [])

	useEffect(() => {
		const html = document.querySelector('html')
		if (html) {
			let newTheme = 'light'
			if (theme === 'dark') {
				newTheme = 'dark'
			}

			localStorage.setItem('theme', newTheme)
			if (newTheme === 'dark') {
				html.classList.add('dark')
			} else {
				html.classList.remove('dark')
			}
		}
	}, [theme])

	return (
		<ThemeContext.Provider value={{ theme, setTheme }}>
			{children}
		</ThemeContext.Provider>
	)

}

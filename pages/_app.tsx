import '../styles/globals.css'
import { app } from '../firebase/initFirebase'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '../components/ThemeProvider'

function MyApp({ Component, pageProps }: AppProps) {
    app();
    return (
        <ThemeProvider>
            <Component {...pageProps} />
        </ThemeProvider>
    )
}

export default MyApp

import { mdiLinkedin } from '@mdi/js'
import { mdiGithub } from '@mdi/js'
import Icon from '@mdi/react'

export default function Footer() {
    return (
        <footer>
            <address className="flex justify-center items-center gap-2">
                <a target="_blank" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors" href="https://github.com/kasouza" rel="noreferrer">
                    <Icon path={mdiGithub} size={1} />
                </a>

                <a target="_blank" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors" href="https://www.linkedin.com/in/kau%C3%A3-de-souza-costa-martins-moura-5892261b9/" rel="noreferrer">
                    <Icon path={mdiLinkedin} size={1} />
                </a>
            </address>
        </footer>
    )
}
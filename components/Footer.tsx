import { mdiLinkedin } from '@mdi/js'
import { mdiGithub } from '@mdi/js'
import Icon from '@mdi/react'

export default function Footer() {
    return (
        <footer>
            <address className="flex justify-center items-center gap-2">
                <a className="hover:text-gray-700 transition-colors" href="https://github.com/kasouza">
                    <Icon path={mdiGithub} size={1} />
                </a>

                <a className="hover:text-gray-700 transition-colors" href="https://www.linkedin.com/in/kau%C3%A3-de-souza-costa-martins-moura-5892261b9/">
                    <Icon path={mdiLinkedin} size={1} />
                </a>
            </address>
        </footer>
    )
}
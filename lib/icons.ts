import { mdiLanguageCpp, mdiLanguageTypescript, mdiLanguageJavascript, mdiReact, mdiLanguageHtml5, mdiLanguageCss3, mdiTailwind } from "@mdi/js"

interface Tech {
    icon: string,
    displayName: string,
}

function tech(icon: string, displayName: string): Tech {
    return {
        icon,
        displayName
    }
}

const icons = new Map([
    ['cpp', tech(mdiLanguageCpp, 'C++')],
    ['typescript', tech(mdiLanguageTypescript, 'TypeScript')],
    ['javascript', tech(mdiLanguageJavascript, 'JavaScript')],
    ['react', tech(mdiReact, 'React')],
    ['html', tech(mdiLanguageHtml5, 'HTML')],
    ['css', tech(mdiLanguageCss3, 'CSS')],
    ['tailwind', tech(mdiTailwind, 'TailwindCSS')],
    ['jss', tech('M0 2.5v19h19.2v-1.95c.506.263 1.124.42 1.857.42c1.687 0 2.943-.877 2.943-2.475c0-1.483-.852-2.143-2.36-2.79l-.444-.19c-.762-.33-1.092-.546-1.092-1.078c0-.431.33-.761.85-.761c.51 0 .838.215 1.142.76l1.383-.887c-.585-1.029-1.396-1.422-2.525-1.422c-.715 0-1.312.207-1.754.555V2.5zm.36.359h18.48v9.182a2.266 2.266 0 0 0-.487 1.432c0 .654.176 1.152.486 1.552v2.537l-1.018.592c.232.456.57.864 1.018 1.177v1.81H.361zm14.188 8.268c-1.586 0-2.6 1.014-2.6 2.346c0 1.445.85 2.13 2.132 2.675l.443.19c.81.355 1.293.57 1.293 1.18c0 .508-.47.875-1.205.875c-.876 0-1.371-.457-1.752-1.078l-1.443.839c.521 1.03 1.587 1.816 3.236 1.816c1.687 0 2.943-.876 2.943-2.475c0-1.483-.852-2.143-2.361-2.79l-.444-.19c-.762-.33-1.092-.546-1.092-1.078c0-.431.33-.761.85-.761c.51 0 .838.215 1.143.76l1.382-.887c-.584-1.029-1.396-1.422-2.525-1.422zm-5.868.101v6.038c0 .888-.368 1.116-.951 1.116c-.61 0-.864-.418-1.143-.913l-1.446.875c.419.886 1.242 1.622 2.664 1.622c1.574 0 2.652-.837 2.652-2.676v-6.062zm10.52 4.173c.345.295.781.532 1.286.747l.443.19c.81.355 1.293.57 1.293 1.18c0 .508-.47.875-1.206.875c-.876 0-1.37-.457-1.752-1.078l-.064.037z', 'JSS')]
])

export function getTech(iconName: string): Tech | undefined {
    return icons.get(iconName)
}

export function getIcon(iconName: string) {
    const icon = icons.get(iconName)
    if (icon) {
        return icon.icon
    }
}

export function getDisplayName(iconName: string): string | undefined {
    const icon = icons.get(iconName)
    if (icon) {
        return icon.displayName
    }
}
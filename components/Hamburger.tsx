import React, { useEffect, useState } from "react"
import classNames from "classnames"
import { mdiMenu, mdiClose } from '@mdi/js'
import Icon from "@mdi/react"

interface HamburgerProps {
    children: React.ReactNode
}

export default function Hamburger({ children }: HamburgerProps) {
    const [open, setOpen] = useState(false)

    useEffect(() => {
        // Locks scroll when hamburger is open
        document.body.style.overflowY = open ? 'hidden' : 'auto'
    }, [open])

    const navItems = React.Children.map(children, (child, i) => (
		<div className="flex justify-center w-full md:border-none border-b py-6 last:border-b-0 border-black dark:border-white border-opacity-60 dark:border-opacity-60 border-b last:border-b-0" key={i}>{child}</div>
    ))

    const toggleOpen = () => setOpen(!open)

    return (
        <nav>
            <div className="items-center gap-4 hidden md:flex">
                {navItems}
            </div>

            <button className="md:hidden" onClick={toggleOpen}>
                <Icon path={open ? mdiClose : mdiMenu} size={1.4}/>
            </button>

            <div onClick={() => setOpen(false)} className={classNames('z-40 absolute top-0 left-0 bg-black bg-opacity-20 dark:bg-opacity-80 w-screen h-screen', { 'hidden': !open })}>
            </div>

            <div className={classNames('border-default z-50 flex flex-col items-center w-4/5 text-2xl bg-white dark:bg-black px-4 py-6 shadow-lg absolute top-full right-3', { 'hidden': !open })}>
                {navItems}
            </div>
        </nav>
    )
}

import React from "react"

interface HamburgerProps {
    children: React.ReactNode
}

export default function Hamburger({children}: HamburgerProps) {
    return (
        <>
            {React.Children.map(children, (child, i) => (
                <div key={i}>{child}</div>
            ))}
        </>
    )
}
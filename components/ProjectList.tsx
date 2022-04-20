import React from "react"

interface ProjectListProps {
    projects: string[]
}

export default function ProjectList({ projects }: ProjectListProps) {
    return (
        <ul className="grid gap-4 grid-cols-3 w-4/6">
            {projects.map((project, i) => (
                <li key={i} className="h-64 bg-orange-500">{project}</li>
            ))}
        </ul>
    )
}
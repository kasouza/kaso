import Link from "next/link"
import Router from "next/router"
import React, { FC, KeyboardEventHandler, useEffect, useState } from "react"
import { PostData } from "../lib/posts"
import Image from "next/image"
import classNames from "classnames"
import Icon from "@mdi/react"
import { getDisplayName, getIcon } from "../lib/icons"

import styles from "../styles/ProjectList.module.css"

interface PostProps {
    subDirectory: string,
    postData: PostData
}

const PostComponent: FC<PostProps> = ({ subDirectory, postData }) => {
    const [showing, setShowing] = useState(false)

    const postHref = `/${subDirectory}/${postData.id}`

    const toggleShow = () => {
        console.log('dakldasldlas')
        setShowing(!showing)
    }

    useEffect(() => {
        console.log(showing)
    })

    const show = () => {
        setShowing(true)
        console.log("show")
    }
    const hide = () => {

        setShowing(false)
        console.log("hide")
    }

    // Used for keyboard based navigation
    const handleKeyUp: KeyboardEventHandler<HTMLLIElement> = e => {
        if (e.key === 'Enter')
            Router.push(postHref)
    }

    return (
        <li tabIndex={0} onKeyUp={handleKeyUp} onMouseLeave={hide} onClick={toggleShow}  className={classNames('relative min-w-[256px] shadow-lg', styles.container)}>
            <div>
                <Image layout="responsive" src={`/images/posts/${subDirectory}/${postData.id}/thumb.jpg`} width={256} height={256} />
            </div>

            <div className={classNames('p-1 text-center flex flex-col gap-2 items-center justify-center absolute inset-0 bg-white bg-opacity-95', styles.overlay, { [styles.show]: showing})}>
                <h2 className="text-2xl">{postData.title}</h2>

                <h3 className="">{postData.description}</h3>
                <Link href={postHref}>
                    <a tabIndex={-1} className="underline underline-offset-2 hover:font-medium">Read More</a>
                </Link>

                <ul className="mt-4 flex flex-wrap items-center justify-center gap-1">
                    {postData.techs.map(tech => {
                        const icon = getIcon(tech)
                        return (
                            <li title={getDisplayName(tech) || tech} className="whitespace-nowrap" key={tech}>
                                {icon
                                    ? <Icon path={icon} size={0.75} />
                                    : <>{tech}</>
                                }
                            </li>
                        )
                    })}
                </ul>
            </div>
        </li>
    )
}

interface ProjectListProps {
    subDirectory: string,
    posts: PostData[]
}

export default function ProjectList({ subDirectory, posts }: ProjectListProps) {
    return (
        <ul className="grid justify-items-center gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {posts.map(post => (
                <PostComponent key={post.id} subDirectory={subDirectory} postData={post} />
            ))}
        </ul>
    )
}
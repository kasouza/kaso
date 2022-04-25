import fs from "fs"
import matter from "gray-matter"
import { GetStaticPropsContext, PreviewData } from "next"
import { ParsedUrlQuery } from "querystring"
import { remark } from "remark"
import html from "remark-html"

export interface PostData {
    id: string,
    title: string,
    description: string,
    date: Date,
    techs: string[],
    hasDemo: boolean,

    content?: string
}

export const sortPostsByDate = (a: PostData, b: PostData) => {
    const aTime = a.date.getTime()
    const bTime = b.date.getTime()

    if (aTime < bTime) return -1
    if (aTime > bTime) return 1

    return 0
}

export function postsIds(subDir: string) {
    const postsPath = `${process.cwd()}/posts/${subDir}/`
    if (fs.lstatSync(postsPath).isDirectory()) {
        const ids = fs.readdirSync(postsPath).filter(path => path !== '.gitkeep').map(post => post.replace(/.md/, ''))

        return ids
    }

    return []
}

/**
 * 
 * @param subDir A directory under /posts/
 * @returns A list of possible paths for the posts
 */
export function postsPaths(subDir: string) {
    const ids = postsIds(subDir)
    const paths = ids.map(id => `/${subDir}/${id}`)

    return paths
}

export async function getPostData(context: GetStaticPropsContext<ParsedUrlQuery, PreviewData>, subDir: string) {
    if (!context.params) return

    const { id } = context.params
    if (!id || Array.isArray(id)) return

    const postData = await readPost(subDir, id)
    const images = getPostCarouselImages(subDir, id)

    return {
        postData,
        images,
    }
}

/** 
 * @param subDir A directory under /posts/
 * @returns A list of possible paths for the demonstrations
*/
export function demoPaths(subDir: string) {
    return (allPosts(subDir)
        .filter(post => post.hasDemo)
        .map(post => `/${subDir}/demo/${post.id}`))
}

export async function demoPostData(context: GetStaticPropsContext<ParsedUrlQuery, PreviewData>, subDir: string) {
    if (!context.params) return { props: {} }

    const { id } = context.params
    if (!id || Array.isArray(id)) return { props: {} }

    const postData = await readPost('portfolio', id)

    return {
        props: {
            postData,
        }
    }
}

/**
 * 
 * @param subDir A directory under /posts/
 * @param id Post ID
 * @returns Post's data
 */
export async function readPost(subDir: string, id: string): Promise<PostData> {
    const postPath = `${process.cwd()}/posts/${subDir}/${id}.md`
    const fileContent = fs.readFileSync(postPath)

    const matterResult = matter(fileContent)

    const contentHtml = await remark()
        .use(html)
        .process(matterResult.content)

    const { title, description, date, techs, hasDemo } = matterResult.data

    return {
        id,
        title,
        description,
        date: new Date(date),
        techs: techs,
        content: contentHtml.toString(),
        hasDemo
    }
}

/**
 * 
 * @param subDir A directory under /posts/
 * @returns A list of posts (metadata only, no content)
 */
export function allPosts(subDir: string): PostData[] {
    const paths = postsIds(subDir)

    const posts = paths.map((id): PostData => {
        const path = `${process.cwd()}/posts/${subDir}/${id}.md`
        const content = fs.readFileSync(path)

        const matterResult = matter(content)
        const { title, description, date, techs, hasDemo } = matterResult.data

        return {
            id,
            title,
            description,
            date: new Date(date),
            techs,
            hasDemo
        }
    })

    return posts
}

type compare = (a: PostData, b: PostData) => number
/**
 * 
 * @param subDir A directory under /posts/
 * @param limit Max number of posts
 * @returns A list of sorted posts 
 */
export function sortedPosts(subDir: string, sortingFunction: compare, limit?: number): PostData[] {
    const posts = allPosts(subDir)
    return posts.sort(sortingFunction).slice(0, limit)
}

/**
 * 
 * @param subDir A directory under /posts/
 * @param id Post ID
 * @returns A list of images src
 */
export function getPostCarouselImages(subDir: string, id: string): string[] {
    const imagesPath = `${process.cwd()}/public/images/posts/${subDir}/${id}/carousel`
    const images = fs.readdirSync(imagesPath).map(path => `/images/posts/${subDir}/${id}/carousel/${path}`)

    return images
}
import fs from "fs"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"

/**
 * 
 * @param subDir A directory under /posts/
 * @returns A list of possible paths
 */
export function staticPaths(subDir: string) {
    const postsPath = `${process.cwd()}/posts/${subDir}/`
    const paths = fs.readdirSync(postsPath).map(post => `/${subDir}/${post.replace(/.md/, '')}`)

    return paths
}

export async function readFile(subDir: string, id: string): Promise<any> {
    const postPath = `${process.cwd()}/posts/${subDir}/${id}.md`
    const fileContent = fs.readFileSync(postPath)

    const matterResult = matter(fileContent)

    const contentHtml = (await remark()
        .use(html)
        .process(matterResult.content)).toString()


    return {
        id,
        ...matterResult.data,
        contentHtml
    }
}
import fs from "fs"
import matter from "gray-matter"
import { GetStaticPropsContext, PreviewData } from "next"
import { ParsedUrlQuery } from "querystring"

import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkMath from 'remark-math'
import rehypeMathjax from 'rehype-mathjax'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'

export interface PostData {
	id: string,
	title: string,
	description: string,
	date: Date,
	techs: string[],
	demoURL: string,

	content?: string
}

export const sortPostsByDate = (a: PostData, b: PostData) => {
	const aTime = a.date.getTime()
	const bTime = b.date.getTime()

	if (aTime < bTime) return -1
	if (aTime > bTime) return 1

	return 0
}

export const sortPostsByDateReversed = (a: PostData, b: PostData) => {
	const aTime = a.date.getTime()
	const bTime = b.date.getTime()

	if (aTime > bTime) return -1
	if (aTime < bTime) return 1

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
 * @param subdir A directory under /posts/
 * @returns A list of possible paths for the posts
 */
export function postsPaths(subdir: string) {
	const ids = postsIds(subdir)
	const paths = ids.map(id => `/${subdir}/${id}`)

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
 * 
 * @param subDir A directory under /posts/
 * @param id Post ID
 * @returns Post's data
 */
export async function readPost(subDir: string, id: string): Promise<PostData> {
	const postPath = `${process.cwd()}/posts/${subDir}/${id}.md`
	const fileContent = fs.readFileSync(postPath)

	const matterResult = matter(fileContent)

	let contentHtml = ''
	if (matterResult.content) {
		contentHtml = (await unified()
			.use(remarkParse)
			.use(remarkMath)
			.use(remarkRehype)
			.use(rehypeMathjax, { svg: { scale: 1.5 } })
			.use(rehypeStringify)
			.process(matterResult.content)).toString()
	}

	const { title, description, date, techs, demoURL } = matterResult.data

	return {
		id,
		title,
		description,
		date: new Date(date),
		techs: techs,
		content: contentHtml,
		demoURL
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
		const { title, description, date, techs, demoURL } = matterResult.data

		return {
			id,
			title,
			description,
			date: new Date(date),
			techs,
			demoURL
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
 * @returns A list of image sources
 */
export function getPostCarouselImages(subDir: string, id: string): string[] {
	const imagesPath = `${process.cwd()}/public/images/posts/${subDir}/${id}/carousel`
	const images = fs.readdirSync(imagesPath).map(filename => `/images/posts/${subDir}/${id}/carousel/${filename}`)

	return images
}

import classNames from "classnames";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import Form from "../components/Form/Form";
import Layout from "../components/Layout";
import { notEmpty, isEmail, maxCharacters } from "../lib/input";
import { MESSAGE_LENGTH, SENDER_EMAIL_LENGTH, SENDER_NAME_LENGTH, SUBJECT_LENGTH } from '../lib/messages/common'

export default function Contact() {
	const [modalOpen, setModalOpen] = useState(false)

	const router = useRouter()

	useEffect(() => {
		document.body.style.overflowY = modalOpen ? 'hidden' : 'auto'
	}, [modalOpen])

	const handleModalClick = useCallback(() => {
		router.push('/')
	}, [])

	const handleSubmit = useCallback(async (data: Map<string, string>) => {
		const json = JSON.stringify(Object.fromEntries(data))
		fetch('/api/messages', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: json,
			mode: 'cors'
		}).catch(() => {
			alert("An error happened while sending your message, please try again later")
		}).then(() => {
			window.scrollTo(0, 0);
			// setModalOpen(true)
		})
	}, [])

	return (
		<Layout title="Contact">
			<section className="flex flex-col gap-12 w-11/12 md:w-4/5 lg:w-3/5 mb-16">
				<div className="flex flex-col gap-4">
					<h1 className="font-light text-4xl">Contact</h1>
					<p>If you want to talk to me, just fill in the field bellow and I&apos;ll get in touch as soon as possible!</p>
				</div>

				<Form onSubmit={handleSubmit} inputs={[
					{ name: 'name', displayName: 'Name', placeholder: 'Rick Astley', type: 'text', validations: [notEmpty(), maxCharacters(SENDER_NAME_LENGTH)] },
					{ name: 'email', displayName: 'Email', placeholder: 'rick@email.com', type: 'email', validations: [notEmpty(), isEmail(), maxCharacters(SENDER_EMAIL_LENGTH)] },
					{ name: 'subject', displayName: 'Subject', placeholder: 'I will never give you up', type: 'text', validations: [notEmpty(), maxCharacters(SUBJECT_LENGTH)] },
					{
						name: 'message',
						displayName: 'Message',
						placeholder: 'Never gonna give you up\nNever gonna let you down\nNever gonna run around and desert you\nNever gonna make you cry\nNever gonna say goodbye\nNever gonna tell a lie and hurt you',
						type: 'textarea',
						validations: [notEmpty(), maxCharacters(MESSAGE_LENGTH)]
					},
				]} />
			</section>

			<div className={classNames('flex items-center justify-center absolute bg-opacity-80 bg-black inset-0', { 'hidden': !modalOpen })}>
				<div className="flex flex-col items-center justify-center gap-8 text-center bg-white dark:bg-black border-default p-8 m-1">
					<p className="text-xl">Your message has been sent!</p>
					<button className="block whitespace-nowrap px-4 py-2 text-xl border-default hover-default transition-colors" onClick={handleModalClick}>Ok!</button>
				</div>
			</div>
		</Layout>
	)
}

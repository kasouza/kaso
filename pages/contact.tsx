import classNames from "classnames";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import Form from "../components/Form/Form";
import Layout from "../components/Layout";

import { messageValidators } from '../lib/messages/common'

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
			setModalOpen(true)
		})
	}, [])

	return (
		<Layout title="Contact">
			<div className="w-11/12 md:w-4/5 lg:w-3/5">
				<Form onSubmit={handleSubmit} inputs={[
					{ name: 'name', displayName: 'Name', placeholder: 'Rick Astley', type: 'text', validations: messageValidators.name },
					{ name: 'email', displayName: 'Email', placeholder: 'rick@email.com', type: 'email', validations: messageValidators.email },
					{ name: 'subject', displayName: 'Subject', placeholder: 'I will never give you up', type: 'text', validations: messageValidators.subject },
					{
						name: 'message',
						displayName: 'Message',
						placeholder: 'Never gonna give you up\nNever gonna let you down\nNever gonna run around and desert you\nNever gonna make you cry\nNever gonna say goodbye\nNever gonna tell a lie and hurt you',
						type: 'textarea',
						validations: messageValidators.message
					},
				]} />
			</div>

			<div className={classNames('flex items-center justify-center absolute bg-opacity-80 bg-black inset-0', { 'hidden': !modalOpen })}>
				<div className="flex flex-col item-center justify-center gap-8 text-center bg-white dark:bg-black border-default p-8 m-1">
					<p className="text-xl">Your message has been sent!</p>
					<button className="block whitespace-nowrap px-4 py-2 text-xl border-default hover-default transition-colors" onClick={handleModalClick}>Ok!</button>
				</div>
			</div>
		</Layout>
	)
}

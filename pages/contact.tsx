import classNames from "classnames";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import Form, { BeforeSubmitValidator } from "../components/Form/Form";
import Layout from "../components/Layout";

import { createMessage, messageValidators } from '../lib/messages/common'

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
        const ok = await createMessage(
            data.get('name') || '',
            data.get('subject') || '',
            data.get('message') || '',
            data.get('email'),
            data.get('phoneNumber')
        );

        if (!ok) {
            alert('erro')
            return
        }

        setModalOpen(true);
    }, [])

    const beforeSubmitValidator: BeforeSubmitValidator = (inputs, values, setError) => {
        const emailIdx = inputs.findIndex(input => input.name == 'email');
        const phoneNumberIdx = inputs.findIndex(input => input.name == 'phoneNumber');

        const emailValue = values[emailIdx];
        const phoneNumberValue = values[phoneNumberIdx];

        // At least one of these must be set
        if (emailValue.trim() === '' && phoneNumberValue.trim() === '') {
            setError(emailIdx, 'either email or phone number must be present');
            setError(phoneNumberIdx, 'either email or phone number must be present');

            return false;
        }

        return true;
    }

    return (
        <Layout title="Contact">
            <div className="w-11/12 md:w-4/5 lg:w-3/5">
                <Form onSubmit={handleSubmit} beforeSubmitValidator={beforeSubmitValidator} inputs={[
                    { name: 'name', displayName: 'Name', placeholder: 'Rick Astley', type: 'text', validations: messageValidators.name, required: true },
                    { name: 'email', displayName: 'Email', placeholder: 'rick@email.com', type: 'email', validations: messageValidators.email },
                    { name: 'phoneNumber', displayName: 'Phone number', placeholder: '+55 (99) 99999-9999', type: 'email', validations: messageValidators.phoneNumber },
                    { name: 'subject', displayName: 'Subject', placeholder: 'I will never give you up', type: 'text', validations: messageValidators.subject, required: true },
                    {
                        name: 'message',
                        displayName: 'Message',
                        placeholder: 'Never gonna give you up\nNever gonna let you down\nNever gonna run around and desert you\nNever gonna make you cry\nNever gonna say goodbye\nNever gonna tell a lie and hurt you',
                        type: 'textarea',
                        validations: messageValidators.message,
                        required: true,
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

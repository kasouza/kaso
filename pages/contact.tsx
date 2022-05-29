import classNames from "classnames";
import { ChangeEventHandler, Dispatch, FC, FormEventHandler, SetStateAction, useEffect, useState } from "react";
import Layout from "../components/Layout";
import { validateEmail } from "../lib/email";

interface FormItemProps { value: string, setValue: Dispatch<SetStateAction<string>>, name: string, displayName: string, placeholder: string, error: string, setError: Dispatch<SetStateAction<string>>, isTextArea?: boolean };

const FormItem: FC<FormItemProps> = ({ value, setValue, name, displayName, placeholder, error, setError, isTextArea }) => {
    const hasError = error !== ''

    const handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
        setValue(e.target.value)
        if (hasError) {
            setError('')
        }
    }

    const props = {
        value: value,
        onChange: handleChange,
        name: name,
        id: name,
        className: classNames('placeholder:dark:text-white placeholder:dark:text-opacity-20 placeholder:text-black placeholder:text-opacity-40 focus:outline-none bg-inherit px-3 py-1', { 'h-44': isTextArea }, {'border-default focus:border-black focus:dark:border-gray-300': !hasError}, {'border border-red-error text-red-error': hasError}),
        placeholder: placeholder,
    }

    return (
        <label className={classNames('flex font-thin flex-col gap-2', {'text-red-error': hasError})} htmlFor={name}>
            <span>{displayName}</span>

            {isTextArea
                ? <textarea {...props}></textarea>
                : <input {...props} type="text" />
            }
            {hasError && <span className="top-full text-sm">{error}</span>}
        </label>
    )
}

export default function Contact() {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')

    const [emailError, setEmailError] = useState('')
    const [nameError, setNameError] = useState('')
    const [subjectError, setSubjectError] = useState('')
    const [messageError, setMessageError] = useState('')

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        // Validate name
        if (name === '') {
            setNameError('Please insert your name')
        }

        if (email === '') {
            setEmailError('Please insert you email')
        } else if (!validateEmail(email)) {
            setEmailError('Invalid email address')
        }

        if (subject === '') {
            setSubjectError('Please insert the subject')
        }

        if (message === '') {
            setMessageError('Please insert a message')
        }

        if (nameError === '' && emailError === '' && subjectError === '' && messageError === '') {
            const response = await fetch("/api/saske", {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache'
            });
        }
    }

    return (
        <Layout title="Contact">
            <section className="flex flex-col gap-12 w-11/12 md:w-4/5 lg:w-3/5 mb-16">
                <div className="flex flex-col gap-4">
                    <h1 className="text-4xl">Contact</h1>
                    <p>If you want to talk to me, just fill in the field bellow and I'll respond as soon as possible!</p>
                </div>

                <form className="flex flex-col gap-6" onSubmit={handleSubmit} method="post">
                    <FormItem error={nameError} setError={setNameError} value={name} setValue={setName} name="name" displayName="Name" placeholder="Rick Astley" />
                    <FormItem error={emailError} setError={setEmailError} value={email} setValue={setEmail} name="email" displayName="Email" placeholder="rick@email.com" />
                    <FormItem error={subjectError} setError={setSubjectError} value={subject} setValue={setSubject} name="subject" displayName="Subject" placeholder="I will never give you up" />
                    <FormItem error={messageError} setError={setMessageError}
                        value={message}
                        setValue={setMessage}
                        name="message"
                        displayName="Message"
                        placeholder="Never gonna give you up
Never gonna let you down
Never gonna run around and desert you
Never gonna make you cry
Never gonna say goodbye
Never gonna tell a lie and hurt you" isTextArea />
                    <button className="self-center mt-8 px-8 py-2 border-default hover-default" type="submit">Submit</button>
                </form>
            </section>
        </Layout>
    )
}
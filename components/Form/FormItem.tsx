import classNames from "classnames";
import { ChangeEventHandler, FC } from "react";
import { InputType } from "../../lib/input";

export interface FormItemProps {
    value: string
    setValue: (val: string) => void,

    error: string,
    setError: (err: string) => void,

    name: string,
    displayName: string,
    placeholder: string,
    type: InputType,
}

const FormItem: FC<FormItemProps> = ({ value, setValue, error, setError, name, displayName, placeholder, type }) => {
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
        className: classNames('placeholder:dark:text-white placeholder:dark:text-opacity-20 placeholder:text-black placeholder:text-opacity-40 focus:outline-none bg-inherit px-3 py-1', { 'h-44': type === 'textarea' }, { 'border-default focus:border-black focus:dark:border-gray-300': !hasError }, { 'border border-red-error text-red-error': hasError }),
        placeholder: placeholder,
    }

    return (
        <>
            {type === 'submit'
                ? <button type="submit">{displayName}</button>
                : <label className={classNames('flex  flex-col gap-2', { 'text-red-error': hasError })} htmlFor={name}>
                    <span>{displayName}</span>

                    {type === 'textarea' && <textarea {...props}></textarea>}
                    {(type === 'text' || type === 'email') && <input {...props} type="text" />}
                    {type === 'password' && <input {...props} type="password" />}

                    {hasError && <span className="top-full text-sm">{error}</span>}
                </label>
            }
        </>
    )
}

export default FormItem

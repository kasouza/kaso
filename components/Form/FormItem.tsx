import classNames from "classnames";
import { ChangeEventHandler, FC } from "react";
import { InputType, validate, validator } from "../../lib/input";

export interface FormItemProps {
    value: string
    setValue: (val: string) => void,

    error: string,
    setError: (err: string) => void,
    clearError: () => void,

    name: string,
    displayName: string,
    placeholder: string,
    type: InputType,

    validations?: validator[],
}

const FormItem: FC<FormItemProps> = ({ value, setValue, error, setError, clearError, name, displayName, placeholder, type, validations }) => {
    const hasError = error !== ''

    const handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = e => {
        setValue(e.target.value)

        if (hasError) {
            clearError();
        }
    }

    const handleBlur = () => {
        const validated = validate(value, validations);
        if (!validated.ok && validated.err) {
            setError(validated.err);
        }
    }

    const props = {
        value: value,
        onBlur: handleBlur,
        onChange: handleChange,
        name: name,
        id: name,
        className: classNames(
            'dark:placeholder-text-white not:dark:placeholder-black focus:outline-none bg-inherit px-3 py-1',
            { 'h-44': type === 'textarea' },
            { 'border-default focus:border-black focus:dark:border-gray-300': !hasError },
            { 'border border-red-error text-red-error placeholder-red-error': hasError }
        ),
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

                    {hasError && <span className="px-1 top-full text-sm">{error}</span>}
                </label>
            }
        </>
    )
}

export default FormItem

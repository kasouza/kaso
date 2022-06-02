import { stringify } from "querystring";
import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { FC, ReactElement } from "react"
import { validateEmail } from "../../lib/email";
import FormItem, { FormItemProps, FormItemType } from "./FormItem"

export interface Input {
    name: string,
    displayName: string,
    placeholder: string,
    type: FormItemType,
}

interface FormProps {
    inputs: Input[],
    onSubmit?: (data: Map<string, string>) => void
    action?: string,
    method?: string,
}

const Form: FC<FormProps> = ({ inputs, onSubmit, action, method }) => {
    const [values, setValues] = useState<string[]>(Array(inputs.length).fill(''))
    const [errors, setErrors] = useState<string[]>(Array(inputs.length).fill(''))

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = useCallback((e) => {
        const newErrors: string[] = [...errors]

        let ok = true
        inputs.forEach((input, i) => {
            if (input.type === 'submit') {
                return;
            }

            if (values[i] === '') {
                newErrors[i] = `${input.displayName} cannot be empty.`
                ok = false

            } else if (input.type === 'email' && !validateEmail(values[i])) {
                newErrors[i] = 'Invalid email address'
                ok = false
            }
        })

        if (!ok) {
            e.preventDefault()
            setErrors(newErrors)

        } else {
            if (onSubmit) {
                const data = new Map<string, string>()
                inputs.forEach((input, i) => data.set(input.name, values[i]))
                onSubmit(data);
            }
        }
    }, [errors, inputs, onSubmit, values]);

    // Creates a setter function for a specific state(errors/values) and idx(idx in input array)
    const createSetter = useCallback((i: number, setter: React.Dispatch<React.SetStateAction<string[]>>) => (val: string) => {
        setter(current => {
            const newArr = [...current]
            newArr[i] = val
            return newArr
        })
    }, [])

    return (
        <form className="flex flex-col gap-6" onSubmit={handleSubmit} action={action || ''} method={method || 'get'} >
            {inputs.map((input, i) => (
                <FormItem  {...input} key={i} value={values[i]} setValue={createSetter(i, setValues)} error={errors[i]} setError={createSetter(i, setErrors)} />
            ))}

            <button className="self-center mt-8 px-6 py-1 border-default hover-default" type="submit">Submit</button>
        </form>
    )
}

export default Form
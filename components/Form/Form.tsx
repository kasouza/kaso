import { stringify } from "querystring";
import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { FC, ReactElement } from "react"
import { validateEmail } from "../../lib/email";
import FormItem, { FormItemProps, FormItemType } from "./FormItem"

export interface Input {
    value?: string
    setValue?: Dispatch<SetStateAction<string>>,

    error?: string,
    setError?: Dispatch<SetStateAction<string>>,

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
    const values = inputs.map((input): [string, React.Dispatch<React.SetStateAction<string>>] => {
        const val = input.value || ''

        if (input.setValue) {
            return [val, input.setValue]
        }

        return useState(val)
    })

    const errors = inputs.map((input): [string, React.Dispatch<React.SetStateAction<string>>] => {
        const err = input.error || ''

        if (input.setError) {
            return [err, input.setError]
        }

        return useState(err)
    })

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = useCallback((e) => {
        let ok = true;
        inputs.forEach((input, i) => {
            if (input.type === 'submit') {
                return;
            }

            if (values[i][0] === '') {
                errors[i][1](`${input.displayName} cannot be empty.`)
                ok = false

            } else if (input.type === 'email' && !validateEmail(values[i][0])) {
                errors[i][1]('Invalid email address')
                ok = false
            }
        })

        if (!ok) {
            e.preventDefault()
            
        } else {
            if (onSubmit) {
                const data = new Map<string, string>()
                inputs.forEach((input, i) => data.set(input.name, values[i][0]))
                onSubmit(data);
            }
        }
    }, [values, errors]);

    return (
        <form className="flex flex-col gap-6" onSubmit={handleSubmit} action={action || ''} method={method || 'get'} >
            {inputs.map((input, i) => (
                <FormItem  {...input} key={i} value={values[i][0]} setValue={values[i][1]} error={errors[i][0]} setError={errors[i][1]} />
            ))}

            <button className="self-center mt-8 px-6 py-1 border-default hover-default" type="submit">Submit</button>
        </form>
    )
}

export default Form
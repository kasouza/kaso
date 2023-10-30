import React, { useCallback, useState } from "react";
import { FC } from "react"
import { Input, validate } from "../../lib/input";
import FormItem from "./FormItem"

export type BeforeSubmitValidator = (inputs: Input[], values: string[], setError: (i: number, error: string) => void) => boolean

interface FormProps {
    inputs: Input[],
    onSubmit?: (data: Map<string, string>) => void
    action?: string,
    method?: string,
    beforeSubmitValidator?: BeforeSubmitValidator,
}

const Form: FC<FormProps> = ({ inputs, onSubmit, action, method, beforeSubmitValidator: validationBeforeSubmit }) => {
    const [values, setValues] = useState<string[]>(Array(inputs.length).fill(''))
    const [errors, setErrors] = useState<string[]>(Array(inputs.length).fill(''))

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = useCallback((e) => {
        e.preventDefault()
        const newErrors: string[] = [...errors]

        let ok = true
        inputs.forEach((input, i) => {
            if (input.type === 'submit') {
                return;
            }

            const validated = validate(values[i], input.validations);
            if (!validated.ok) {
                newErrors[i] = `${input.displayName} ${validated.err}`
                ok = false;
            }
        })

        if (validationBeforeSubmit) {
            const setError = (i: number, error: string) => {
                newErrors[i] = error;
            }

            if (!validationBeforeSubmit(inputs, values, setError)) {
                ok = false;
            }
        }

        if (!ok) {
            setErrors(newErrors)
            return;
        }

        if (onSubmit) {
            const data = new Map<string, string>()
            inputs.forEach((input, i) => data.set(input.name, values[i]))
            onSubmit(data);
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

    const createClearError = useCallback((idx: number) => {
        return () => {
            const newErrors = [...errors];
            newErrors[idx] = ''

            for (let i = 0; i < values.length; i++) {
                // Do not clear error for required fields if they are empty
                if (inputs[i].required) {
                    continue;
                }

                if (values[i].trim() === '') {
                    newErrors[i] = '';
                }
            }

            setErrors(newErrors);
        }
    }, [errors])

    return (
        <form className="flex flex-col gap-6" onSubmit={handleSubmit} action={action || ''} method={method || 'GET'} >
            {inputs.map((input, i) => (
                <FormItem  {...input} key={i} value={values[i]} setValue={createSetter(i, setValues)} error={errors[i]} setError={createSetter(i, setErrors)} clearError={createClearError(i)} />
            ))}

            <button className="self-center mt-8 px-6 py-1 border-default hover-default" type="submit">Submit</button>
        </form>
    )
}

export default Form

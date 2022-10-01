import React, { useCallback, useState } from "react";
import { FC } from "react"
import { Input } from "../../lib/input";
import FormItem from "./FormItem"


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
		e.preventDefault()
		const newErrors: string[] = [...errors]

		let ok = true
		inputs.forEach((input, i) => {
			if (input.type === 'submit') {
				return;
			}

			if (input.validations) {
				for (const validator of input.validations) {
					const result = validator(values[i])

					if (!result.ok) {
						newErrors[i] = `${input.displayName} ${result.err}`
						ok = false

						break
					}
				}
			}
		})

		if (!ok) {
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
		<form className="flex flex-col gap-6" onSubmit={handleSubmit} action={action || ''} method={method || 'GET'} >
			{inputs.map((input, i) => (
				<FormItem  {...input} key={i} value={values[i]} setValue={createSetter(i, setValues)} error={errors[i]} setError={createSetter(i, setErrors)} />
			))}

			<button className="self-center mt-8 px-6 py-1 border-default hover-default" type="submit">Submit</button>
		</form>
	)
}

export default Form

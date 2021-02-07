import React from 'react'
import { FieldRenderProps } from 'react-final-form'
import { Form, FormFieldProps, Label, Select } from 'semantic-ui-react'

interface IProps extends FieldRenderProps<string, HTMLSelectElement>, FormFieldProps { }


const SelectInput = ({ input, width, options, placeholder,
    meta: { touched, error } }: IProps): JSX.Element => {
    return (
        <Form.Field error={touched && !!error} width={width}>
            <Select
                value={input.value}
                style={{ margin: '0px' }}
                onChange={(e, data) => input.onChange(data.value)}
                placeholder={placeholder}
                options={options}
            />
            {touched && error && (
                <Label basic color='red'>
                    {error}
                </Label>
            )}
        </Form.Field>
    )
}

export default SelectInput

import React from 'react'
import { FieldRenderProps } from 'react-final-form'
import { Form, FormFieldProps, Label } from 'semantic-ui-react'
import { DateTimePicker } from 'react-widgets'

interface IProps extends FieldRenderProps<Date, HTMLInputElement>, FormFieldProps { }


const DateInput = ({ input, width, id, placeholder, date = false, time = false,
    meta: { touched, error }, ...rest }: IProps): JSX.Element => {
    return (
        <Form.Field error={touched && !!error} width={width}>
            <DateTimePicker
                placeholder={placeholder}
                value={input.value || null}
                date={date}
                time={time}
                onChange={input.onChange}
                {...rest}
            />
            {touched && error && (
                <Label basic color='red'>
                    {error}
                </Label>
            )}
        </Form.Field>
    )
}

export default DateInput

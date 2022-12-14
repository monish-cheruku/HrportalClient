import React from 'react'
import { FieldRenderProps } from 'react-final-form';
import { FormFieldProps, Form, Label, Select } from 'semantic-ui-react';

interface IProps
  extends FieldRenderProps<string, HTMLElement>,
    FormFieldProps {}


const SelectMulti: React.FC<IProps> = ({
    input,
    width,
    options,
    placeholder,
    isMultiple,
    meta: { touched, error }
  }) => {
    // var temp=input.value
    return (
        <Form.Field error={touched && !!error} width={width}>
        <Select 
            value={input.value.toString().split(",")}
            onChange={(e, data) => input.onChange(JSON.stringify(data.value).slice(1,-1).replace(/"/g,''))}
            placeholder={placeholder}
            options={options}
            multiple
            search
        />
        {touched && error && (
          <Label basic color='red'>
            {error}
          </Label>
        )}
      </Form.Field>
    )
}

export default SelectMulti;

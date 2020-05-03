import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';

interface IProps {
  name: string;
  textFieldProps?: TextFieldProps;
}


const InputText: React.FC<IProps> = ({ name, textFieldProps }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { fieldName, registerField, defaultValue, error } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value'
    });
  }, [fieldName, registerField]);

  return (<TextField inputRef={inputRef} defaultValue={defaultValue} {...textFieldProps} error={!!error} helperText={error} ></TextField>);
}


export default InputText;
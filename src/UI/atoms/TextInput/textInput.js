import React from 'react';
import { useStyle } from '@magento/venia-ui/lib/classify';
import defaultClasses from './textInput.module.css';

const TextInput = props => {
    const {
        value,
        id,
        placeholder,
        handleChange
    } = props;

    const classes = useStyle(defaultClasses);

    return <input className={classes.input} id={props.id} value={value} name={id} placeholder={placeholder} onChange={handleChange} onClick={props.onClick} />
};

export default TextInput;

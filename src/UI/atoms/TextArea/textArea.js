import React from 'react';

import { useStyle } from '@magento/venia-ui/lib/classify';
import Message from "../Message/message";
import defaultClasses from './textArea.module.css';

const TextArea = props => {
    const {
        classes: propClasses,
        value,
        handleChange,
        id,
        field,
        message,
        placeholder,
    } = props;
    const classes = useStyle(defaultClasses, propClasses);

    return (
        <>
            <textarea
                className={classes.input}
                placeholder={placeholder}
                field={field}
                name={id}
                value={value}
                onChange={handleChange}
            />
            <Message>{message}</Message>
        </>
    );
};

export default TextArea;

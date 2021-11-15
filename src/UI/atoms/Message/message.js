import React from 'react';
import { useStyle } from '@magento/venia-ui/lib/classify';
import defaultClasses from './message.module.css';


const Message = props => {
    const { message, isError } = props;

    const classes = useStyle(defaultClasses);
    const className = isError ? classes.root_error : classes.root;

    return <p className={className}>{ message }</p>;
};

export default Message;

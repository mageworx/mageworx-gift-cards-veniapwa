import React from 'react';
import { useStyle } from '@magento/venia-ui/lib/classify';
import defaultClasses from './field.module.css';
import Message from "../../atoms/Message/message";

const Field = props => {
    const {
        id,
        label,
        children,
        error,
        display
    } = props;
    if ( display === false ) return null;
    const classes = useStyle(defaultClasses, props.classes);
    let labelJSX;
    if (label) {
        labelJSX = (
            <label className={classes.label} htmlFor={id}>
                { label }
            </label>
        )
    }
    else {
        labelJSX = null;
    }

    return (
        <div className={classes.root}>
            { labelJSX }
            { children }
            <Message isError={error} message={error}/>
        </div>
    );
};

export default Field;

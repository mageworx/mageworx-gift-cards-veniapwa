import React from 'react';
import TextInput from "../../atoms/TextInput/textInput";
import Field from "../../molecules/Field/field";
import Select from "../../molecules/Selection/select";

const EmailForm = props => {
    const {
        values,
        errors,
        handleChange,
        placeholders,
        attributes,
        currency
    } = props;

    const {
        mageworx_gc_open_amount_min,
        mageworx_gc_open_amount_max,
        mageworx_gc_additional_price
    } = attributes;

    const amount_placeholder_from_to = mageworx_gc_open_amount_min + " - " + mageworx_gc_open_amount_max;

    return (
        <>
            <Field id={"card_amount"} display={ mageworx_gc_additional_price } >
                <Select currency={currency} value={values.card_amount} id={"card_amount"} items={ mageworx_gc_additional_price } handleChange={ handleChange } />
            </Field>
            <Field id={"card_amount_other"} error={ errors.card_amount_other } label={ placeholders.amount_placeholder } display={ values.card_amount === "other_amount" }>
                <TextInput value={ values.card_amount_other } placeholder={ amount_placeholder_from_to } id={"card_amount_other"} handleChange={ handleChange } />
            </Field>
        </>
    );
};

export default EmailForm;

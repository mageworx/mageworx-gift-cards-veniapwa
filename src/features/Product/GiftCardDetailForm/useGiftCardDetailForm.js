import { useState } from 'react';

const initialValues = {
    card_amount: '',
    card_amount_other: '',
    mail_from: '',
    mail_to: '',
    mail_to_email: '',
    mail_message: '',
    mail_delivery_date_user_value: new Date(),
}

const initialErrors = {
    card_amount: null,
    card_amount_other: null,
    mail_from: null,
    mail_to: null,
    mail_to_email: null,
    mail_message: null,
    mail_delivery_date_user_value: null
}

const useForm = (validate) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState(initialErrors);

    const handleChange = e => {
        const { name, value } = e.target;
        setErrors({
            ...errors,
            [name]: validate(name, value)
        });
        setValues({
            ...values,
            [name]: value
        });
    };

    const handleChangeDate = value => {
        setErrors({
            ...errors,
            mail_delivery_date_user_value: validate("mail_delivery_date_user_value", value)
        });
        setValues({
            ...values,
            mail_delivery_date_user_value: value
        });
    }

    const setInitialAmount = (type, value) => {
        setValues({
            ...values,
            [type]: value
        });
    }

    const addError = (name, value) => {
        setErrors({
            ...errors,
            [name]: value,
        });
    }

    const resetForm = () => {
        setValues(initialValues);
        setErrors(initialErrors);
    }

    return { handleChange, handleChangeDate, addError, setInitialAmount, resetForm, values, errors };
};

export default useForm;

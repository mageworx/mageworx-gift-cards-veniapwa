import React from 'react';
import { useIntl } from 'react-intl';
import DatePicker, { registerLocale } from "react-datepicker";
require('react-datepicker/dist/react-datepicker.css');
import TextInput from "../../atoms/TextInput/textInput";
import Field from "../../molecules/Field/field";
import TextArea from "../../atoms/TextArea/textArea";
import { dateLocale } from "../../../../../../../mageworx/configs/GiftCards/date.locale";

dateLocale.forEach(el => {
    registerLocale(el.name, el.data);
});

const CustomDateInput = React.forwardRef(({value, onClick, onChange}, ref) => (
    <TextInput innerRef={ref} value={value} onClick={onClick} handleChange={onChange} />
));

const EmailForm = props => {
    const {
        errors,
        values,
        placeholders,
        type,
        handleChange,
        handleChangeDate,
    } = props;

    const {
        mail_from,
        mail_to,
        mail_to_email,
        mail_message,
        mail_delivery_date_user_value,
    } = values;

    const {
        from_name_placeholder,
        message_placeholder,
        to_email_placeholder,
        to_name_placeholder,
    } = placeholders;

    const { formatMessage, locale } = useIntl();

    const messages = {
        "to_email": formatMessage({
            id: 'mageworx.giftCardSection.to_email',
            defaultMessage: 'To email'
        }),
        "to_name": formatMessage({
            id: 'mageworx.giftCardSection.to_name',
            defaultMessage: 'To name'
        }),
        "from_name": formatMessage({
            id: 'mageworx.giftCardSection.from_name',
            defaultMessage: 'From name'
        }),
        "your_message": formatMessage({
            id: 'mageworx.giftCardSection.your_message',
            defaultMessage: 'Message'
        }),
        "delivery_date": formatMessage({
            id: 'mageworx.giftCardSection.delivery_date',
            defaultMessage: 'Delivery date'
        }),
    }

    return (
        <>
            <Field id={"mail_to_email"} label={messages.to_email + ":"} error={errors.mail_to_email} display={type === "EMAIL"}>
                <TextInput value={mail_to_email} id={"mail_to_email"} placeholder={to_email_placeholder} handleChange={handleChange} />
            </Field>
            <Field id={"mail_to"} label={messages.to_name + ":"} error={errors.mail_to}>
                <TextInput value={mail_to} id={"mail_to"} placeholder={to_name_placeholder} handleChange={handleChange} />
            </Field>
            <Field id={"mail_from"} label={messages.from_name + ":"} error={errors.mail_from}>
                <TextInput value={mail_from} id={"mail_from"} placeholder={from_name_placeholder} handleChange={handleChange} />
            </Field>
            <Field id={"mail_message"} label={messages.your_message + ":"} error={errors.mail_message}>
                <TextArea value={mail_message} placeholder={message_placeholder} id={"mail_message"} handleChange={handleChange} />
            </Field>
            <Field id={"mail_delivery_date_user_value"} label={messages.delivery_date + ":"} error={errors.mail_delivery_date_user_value} display={type === "EMAIL"}>
                <DatePicker locale={locale} isClearable minDate={new Date()} selected={mail_delivery_date_user_value} id={"mail_delivery_date_user_value"} onChange={handleChangeDate} customInput={<CustomDateInput/>} dateFormat="dd/MM/yyyy" />
            </Field>
        </>
    );
};

export default EmailForm;

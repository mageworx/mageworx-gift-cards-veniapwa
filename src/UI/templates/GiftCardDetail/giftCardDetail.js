import React from 'react';
import { useIntl } from "react-intl";
import {useStyle} from "@magento/venia-ui/lib/classify";
import defaultClasses from "./giftCardDetail.module.css";
import EmailForm from "../../organisms/EmailForm/emailForm";
import AmountForm from "../../organisms/AmountForm/amountForm";

const GiftCardDetail = props => {
    const {
        giftCardAttributes,
        giftCardFormData
    } = props;

    const { formatMessage } = useIntl();
    const classes = useStyle(defaultClasses, props.classes);

    if (!giftCardAttributes) return null;

    const {
        handleChange,
        handleChangeDate,
        values,
        errors
    } = giftCardFormData;

    const {
        amount_placeholder,
        from_name_placeholder,
        message_placeholder,
        to_email_placeholder,
        to_name_placeholder,
        mageworx_gc_type,
        currency,
    } = giftCardAttributes;

    const {
        card_amount,
        card_amount_other,
        mail_from,
        mail_to,
        mail_to_email,
        mail_message,
        mail_delivery_date_user_value,
    } = errors;

    const mailErrors = {
        mail_from,
        mail_to,
        mail_to_email,
        mail_message,
        mail_delivery_date_user_value,
    }
    const mailValues = {
        mail_from: values.mail_from,
        mail_to: values.mail_to,
        mail_to_email: values.mail_to_email,
        mail_message: values.mail_message,
        mail_delivery_date_user_value: values.mail_delivery_date_user_value,
    }
    const mailPlaceholders = {
        from_name_placeholder,
        message_placeholder,
        to_email_placeholder,
        to_name_placeholder,
    }

    const amountsAttributes = {
        mageworx_gc_additional_price: giftCardAttributes.mageworx_gc_additional_price,
        mageworx_gc_open_amount_min: giftCardAttributes.mageworx_gc_open_amount_min,
        mageworx_gc_open_amount_max: giftCardAttributes.mageworx_gc_open_amount_max
    }
    const amountsErrors = {
        card_amount,
        card_amount_other,
    }
    const amountsValues = {
        card_amount: values.card_amount,
        card_amount_other: values.card_amount_other
    }
    const amountsPlaceholders = {
        amount_placeholder
    }

    const CHOOSE_AMOUNT = formatMessage({
        id: 'mageworx.giftCardSection.choose_amount',
        defaultMessage: 'Choose amount'
    });

    const SEND_INFORMATION = formatMessage({
        id: 'mageworx.giftCardSection.send_information',
        defaultMessage: 'Send information'
    });

    const Amount_section = (amountsAttributes.mageworx_gc_additional_price.length > 1)
        ? (
            <section className={`${classes.section} ${classes.giftAmount}`}>
                <h2 className={classes.giftCardOptionsTitle}>
                    { CHOOSE_AMOUNT }
                </h2>
                <AmountForm currency={currency} attributes={ amountsAttributes } values={ amountsValues } errors={ amountsErrors } placeholders={ amountsPlaceholders } handleChange={ handleChange } />
            </section>
        )
        : null;

    const Email_form_section = (
        <section className={`${classes.section} ${classes.giftInfo}`}>
            <h2 className={classes.giftCardOptionsTitle}>
                { SEND_INFORMATION }
            </h2>
            <EmailForm values={ mailValues } errors={ mailErrors } placeholders={ mailPlaceholders } type={ mageworx_gc_type } handleChange={ handleChange } handleChangeDate={ handleChangeDate } />
        </section>
    );

    return (
        <>
            { Amount_section }
            { Email_form_section }
        </>
    );
};

export default GiftCardDetail;

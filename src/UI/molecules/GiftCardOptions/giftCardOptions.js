import React from 'react';
import { useIntl } from "react-intl";
import ProductOptions from "@magento/venia-ui/lib/components/LegacyMiniCart/productOptions";

const GiftCardOptions = props => {
    const { formatMessage } = useIntl();

    const {
        mail_to,
        mail_from,
        mail_to_email,
        mail_message,
        mail_delivery_date,
        classes
    } = props;

    const options = {
        mail_to,
        mail_from,
        mail_to_email,
        mail_message,
        mail_delivery_date,
    }

    const messages = {
        "to_email": formatMessage({
            id: 'MageWorx.giftCardSection.to_email',
            defaultMessage: 'To email'
        }),
        "to_name": formatMessage({
            id: 'MageWorx.giftCardSection.to_name',
            defaultMessage: 'To name'
        }),
        "from_name": formatMessage({
            id: 'MageWorx.giftCardSection.from_name',
            defaultMessage: 'From name'
        }),
        "your_message": formatMessage({
            id: 'MageWorx.giftCardSection.your_message',
            defaultMessage: 'Message'
        }),
        "delivery_date": formatMessage({
            id: 'MageWorx.giftCardSection.delivery_date',
            defaultMessage: 'Delivery date'
        }),
    }

    const options_messages = {
        mail_to: messages["to_name"],
        mail_from: messages["from_name"],
        mail_to_email: messages["to_email"],
        mail_message: messages["your_message"],
        mail_delivery_date: messages["delivery_date"],
    }

    let formattedOptions = [];
    for (let key in options) {
        if (options[key]) {
            formattedOptions.push({
                option_label: options_messages[key],
                value_label: options[key]
            })
        }
    }

    return <ProductOptions options={formattedOptions} classes={classes} />;
};

export default GiftCardOptions;

const validate = (type, value, formatMessage) => {
    const MAX_LENGTH = {
        message: 255,
        name: 255,
        email: 255,
    };

    const messages = {
        "required": formatMessage({
            id: 'MageWorx.giftCards.required',
            defaultMessage: 'This is a required field'
        }),
        "not_valid_amount": formatMessage({
            id: 'MageWorx.giftCards.not_valid_amount',
            defaultMessage: 'Not valid amount'
        }),
        "not_valid_email": formatMessage({
            id: 'MageWorx.giftCards.not_valid_email',
            defaultMessage: 'Not valid email'
        }),
        "not_valid_length": formatMessage({
            id: 'MageWorx.giftCards.bigLength',
            defaultMessage: `Max length is `
        }),
    }

    const checkIsNotNull = value => {
        if (value === "") return messages.required;
        else return null;
    }
    const checkIsValidLength = (value, type) => {
        switch (type) {
            case "message":
                if (value.length > MAX_LENGTH.message) return messages.not_valid_length + MAX_LENGTH.message;
                return null;
            case "name":
                if (value.length > MAX_LENGTH.name) return messages.not_valid_length + MAX_LENGTH.name;
                return null;
            case "email":
                if (value.length > MAX_LENGTH.email) return messages.not_valid_length + MAX_LENGTH.email;
                return null;
            default:
                return null;
        }
    }

    switch (type) {
        case "money":
            if (checkIsNotNull(value)) return checkIsNotNull(value);
            if (!(/^\d+\.?\d*$/.test(value))) return messages.not_valid_amount;;
            return null;
        case "email":
            if (checkIsNotNull(value)) return checkIsNotNull(value);
            if (checkIsValidLength(value, "email")) return checkIsValidLength(value, "email");
            if (!(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value))) return messages.not_valid_email;
            return null;
        case "message":
            if (checkIsValidLength(value, "message")) return checkIsValidLength(value, "message");
            return null;
        case "name":
            if (checkIsValidLength(value, "name")) return checkIsValidLength(value, "name");
            return null;
        default:
            return null;
    }
}
export default validate;

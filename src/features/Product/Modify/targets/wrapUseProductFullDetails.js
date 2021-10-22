import {useCallback, useMemo} from "react";
import {useIntl} from "react-intl";
import {useCartContext} from "@magento/peregrine/lib/context/cart";
import {useMutation} from "@apollo/client";
import {deriveErrorMessage} from "@magento/peregrine/lib/util/deriveErrorMessage";
import {ADD_GIFT_CARD_MUTATION} from "./queries/addGiftCardToCart.gql";
import getFormattedPrice from "../../../Common/getFormattedPrice/getFormattedPrice";
import useGiftCardDetailsForm from "../../../Product/GiftCardDetailForm/useGiftCardDetailForm";
import validateResult from "../../../Common/validate/validate";

function validate (amountFrom, amountTo, amountFromFormatted, amountToFormatted, formatMessage) {
    return function validateWithAmountValues (name, value) {
        switch (name) {
            case "card_amount_other":
                if (!isNaN(value) && (value<amountFrom || value>amountTo)) {
                    return `${amountFromFormatted} - ${amountToFormatted}`;
                }
                return validateResult("money", value, formatMessage);
            case "mail_to_email":
                return validateResult("email", value, formatMessage);
            case "mail_from":
                return validateResult("name", value, formatMessage);
            case "mail_to":
                return validateResult("name", value, formatMessage);
            case "mail_message":
                return validateResult("message", value, formatMessage);
            default:
                return null;
        }
    }
}

const wrapUseProductFullDetails = (original) => {
    return function useProductFullDetails (props, ...restArgs) {
        const {
            product,
        } = props;

        const { productDetails, ...defaultReturnData } = original(
            props,
            ...restArgs
        );

        const giftCardData = props.product.giftCardAttributes;

        const { locale, formatMessage } = useIntl();

        // get form handles, errors, values. Send validate callback with other_amount from value and to value
        const amount_min = giftCardData && giftCardData.mageworx_gc_open_amount_min;
        const amount_max = giftCardData && giftCardData.mageworx_gc_open_amount_max;
        const amount_min_formatted = giftCardData && getFormattedPrice(amount_min, productDetails.price.currency, locale);
        const amount_max_formatted = giftCardData &&  getFormattedPrice(amount_max, productDetails.price.currency, locale);
        const validateWithAmounts = giftCardData && validate(amount_min, amount_max, amount_min_formatted, amount_max_formatted, formatMessage, productDetails.price.currency);
        const {
            handleChange,
            handleChangeDate,
            addError,
            setInitialAmount,
            resetForm,
            values,
            errors
        } = useGiftCardDetailsForm(validateWithAmounts);

        // data for handleAddToCart
        const [{ cartId }] = useCartContext();
        const [addGiftCardToCart, { loading: addCardToCartLoading, error: addCardToCartError }] = useMutation(ADD_GIFT_CARD_MUTATION);

        const handleAddToCart = useCallback(async formValues => {
                const { quantity } = formValues;

                // start validation before add to cart
                let hasErrors = false;
                let needCheckKeys = [];

                for (let key in values) {
                    if (key === "mail_to_email" || key === "mail_delivery_date_user_value" || key === "card_amount_other") continue;
                    needCheckKeys.push(key);
                }
                if (giftCardData.mageworx_gc_type === "EMAIL") needCheckKeys.push("mail_to_email", "mail_delivery_date_user_value");
                if (values.card_amount === "other_amount") {
                    needCheckKeys.push("card_amount_other");
                }
                needCheckKeys.map(elem => {
                    let error = validateWithAmounts(elem, values[elem]);
                    if (error) {
                        addError(elem, error);
                        hasErrors = true;
                    }
                })
                if (hasErrors) {
                    return;
                }
                // end validation before add to cart

                const payload = {
                    item: product,
                    productType: product.__typename,
                    quantity
                };

                let formatDate = new Date(values.mail_delivery_date_user_value);
                formatDate = ("0" + formatDate.getDate()).slice(-2) + "/" + ("0" + (formatDate.getMonth() + 1)).slice(-2) + "/" + formatDate.getFullYear();
                if (formatDate.toString() === "01/01/1970") formatDate = "";

                if (isSupportedProductType) {
                    const variables = {
                        cartId,
                        parentSku: payload.parentSku,
                        quantity: payload.quantity,
                        sku: payload.item.sku,
                        card_amount: values.card_amount ? values.card_amount : productDetails.price.value,
                        card_amount_other: (values.card_amount !== "other_amount") ? 0 : values.card_amount_other,
                        mail_from: values.mail_from,
                        mail_to: values.mail_to,
                        mail_to_email: values.mail_to_email,
                        mail_message: values.mail_message,
                        mail_delivery_date_user_value: formatDate,
                    };

                    if (product.__typename === 'MageWorxGiftCards') {
                        try {
                            await addGiftCardToCart({
                                variables
                            });

                            resetForm();
                        } catch {
                            return;
                        }
                    }
                }
        },
            [
                    product,
                    values,
                    cartId
            ]
        );

        const derivedErrorMessage = useMemo(
            () =>
                deriveErrorMessage([
                    addCardToCartError
                ]),
            [addCardToCartError]
        );

        // exit if it's not gift card
        if (!(product.__typename === 'MageWorxGiftCards')) return {
            ...defaultReturnData,
            productDetails
        };

        // if custom amount is enabled, add option to <select>
        let giftCardResultWithAddOptions = null;
        if (giftCardData) {
            let amounts = [];
            const option_default_price = {value: productDetails.price.value, label: getFormattedPrice(productDetails.price.value, productDetails.price.currency, locale)};
            const LABEL_OTHER_AMOUNT = formatMessage({
                id: 'MageWorx.giftCards.other_amount',
                defaultMessage: 'Custom amount'
            });
            const option_custom_amount = {value: "other_amount", label: LABEL_OTHER_AMOUNT};

            amounts.push(option_default_price);
            if (giftCardData.mageworx_gc_additional_price) amounts = [...amounts, ...giftCardData.mageworx_gc_additional_price]
            if (giftCardData.mageworx_gc_allow_open_amount) amounts.push(option_custom_amount);

            giftCardResultWithAddOptions = {
                ...giftCardData,
                mageworx_gc_additional_price: amounts,
                currency: productDetails.price.currency,
            }
        }

        // set initial amount
        if (giftCardData && (values.card_amount === '') && (values.card_amount_other === '')) {
            if (giftCardResultWithAddOptions.mageworx_gc_additional_price) setInitialAmount("card_amount", giftCardResultWithAddOptions.mageworx_gc_additional_price[0].value);
        }

        // set product price
        let priceValue;
        // if custom amounts is enabled or additional_price is not null
        if (giftCardData && giftCardResultWithAddOptions.mageworx_gc_additional_price.length > 1) {
            priceValue = values.card_amount >= 0 ? Number(values.card_amount) : Number(values.card_amount_other);
            if (isNaN(priceValue)) priceValue = 0;
        }
        // return default price
        else priceValue = productDetails.price.value;
        const isSupportedProductType = true;

        return {
            ...defaultReturnData,
            errorMessage: derivedErrorMessage,
            isAddToCartDisabled:
                defaultReturnData.isAddToCartDisabled ||
                addCardToCartLoading,
            isSupportedProductType,
            handleAddToCart,
            productDetails: {
                ...productDetails,
                price: {
                    ...productDetails.price,
                    value: priceValue,
                },
                giftCardAttributes: giftCardResultWithAddOptions,
                giftCardFormData: {
                    handleChange,
                    handleChangeDate,
                    values,
                    errors
                },
            }
        };
    };
};

export default wrapUseProductFullDetails;

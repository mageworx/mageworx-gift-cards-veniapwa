import patches from "@magento/peregrine/lib/util/intlPatches";

const getFormattedPrice = ( value, currencyCode, locale ) => {
    const parts = patches.toParts.call(
        new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currencyCode
        }),
        value
    );

    const children = parts.map(part => part.value);

    return children.join('');
};

export default getFormattedPrice;

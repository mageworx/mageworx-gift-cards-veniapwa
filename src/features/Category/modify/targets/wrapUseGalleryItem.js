const wrapUseAddToCartButton = (original) => {
    return function useAddToCartButton (props, ...restArgs) {
        const { ...defaultReturnData } = original(
            props,
            ...restArgs
        );

        const { item } = props;
        const productType = item ? item.__typename : null;
        const isSupportedProductType = defaultReturnData.isSupportedProductType || productType === "MageWorxGiftCards";

        return {
            ...defaultReturnData,
            isSupportedProductType
        };
    };
};

export default wrapUseAddToCartButton;

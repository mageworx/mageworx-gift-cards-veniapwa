const wrapUseGalleryItem = (original) => {
    return function useGalleryItem (props, ...restArgs) {
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

export default wrapUseGalleryItem;

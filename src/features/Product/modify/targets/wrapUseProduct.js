import {useStyle} from "@magento/venia-ui/lib/classify";
import defaultClasses from "../css/productFullDetail.css";
import useProductGiftCard from "../hooks/useProductGiftCard";

const progress = {
    NONE: 'none',
    SUCCESS: 'success',
    FAILURE: 'failure'
};

const wrapUseProduct = (original) => {
    return function useProduct (props, ...restArgs) {
        const { ...defaultReturnData } = original(
            props,
            ...restArgs
        );

        let urlKey = null;
        let typename = null;
        if (!defaultReturnData.loading && defaultReturnData.product){
            urlKey = defaultReturnData.product.url_key;
            typename = defaultReturnData.product.__typename;
        }
        const giftCardQueryResult = useProductGiftCard({
            urlKey,
            typename,
            qError: defaultReturnData.error,
            qLoading: defaultReturnData.loading,
        });

        const classes = useStyle(defaultClasses); // classes for giftCard forms

        const {
            error,
            loading,
            giftCardAttributes,
            queryState
        } = giftCardQueryResult;

        switch (queryState) {
            case progress.NONE:
                return {
                    ...defaultReturnData,
                    loading: true,
                    product: null,
                };
            case progress.SUCCESS:
                return {
                    ...defaultReturnData,
                    classes,
                    product: {
                        ...defaultReturnData.product,
                        giftCardAttributes: {...giftCardAttributes}},
                    loading,
                    error,
                }
            case progress.FAILURE:
                return defaultReturnData;
        }
    };
};

export default wrapUseProduct;

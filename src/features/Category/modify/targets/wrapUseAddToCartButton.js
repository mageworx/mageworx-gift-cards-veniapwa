import {useHistory} from "react-router-dom";
import {useCallback} from "react";

const wrapUseAddToCartButton = (original) => {
    return function useAddToCartButton (props, ...restArgs) {
        const { ...defaultReturnData } = original(
            props,
            ...restArgs
        );

        const { item } = props;
        const isInStock = item.stock_status === 'IN_STOCK';
        const productType = item.type_id;
        const history = useHistory();

        const handleAddToCart = useCallback(() => {
            history.push(`${item.url_key}.html`);
        }, [history, item.url_key]);

        if (productType !== "mageworx_giftcards") {
            return defaultReturnData;
        }

        return {
            ...defaultReturnData,
            isDisabled: !isInStock,
            handleAddToCart
        };
    };
};

export default wrapUseAddToCartButton;

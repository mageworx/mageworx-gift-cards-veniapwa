import {useCartContext} from "@magento/peregrine/lib/context/cart";
import {useQuery} from "@apollo/client";
import { GET_APPLIED_GIFTCARDS } from './queries/appliedGiftCards';

const wrapUsePriceSummary = (original) => {
    return function usePriceSummary (props, ...restArgs) {
        const { ...defaultReturnData } = original(
            props,
            ...restArgs
        );

        const [{ cartId }] = useCartContext();

        const { error, loading, data } = useQuery(GET_APPLIED_GIFTCARDS, {
            fetchPolicy: 'cache-and-network',
            skip: !cartId,
            variables: {
                cartId
            }
        });

        const giftCards = data && data.cart.applied_mw_gift_cards;

        return {
            ...defaultReturnData,
            hasError: defaultReturnData.hasError || !!error,
            hasItems: defaultReturnData.hasItems || !!data.cart.items.length,
            isLoading: defaultReturnData.isLoading || !!loading,
            flatData: {...defaultReturnData.flatData, giftCards}
        };
    };
};

export default wrapUsePriceSummary;

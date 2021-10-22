import {useCartContext} from "@magento/peregrine/lib/context/cart";
import {useQuery} from "@apollo/client";
import { gql } from '@apollo/client';
import { PriceSummaryFragment } from '@magento/peregrine/lib/talons/CartPage/PriceSummary/priceSummaryFragments.gql.js';
const GET_PRICE_SUMMARY = gql`
    query getPriceSummary($cartId: String!) {
        cart(cart_id: $cartId) {
            id
            ...PriceSummaryFragment
        }
    }
    ${PriceSummaryFragment}
`;

const flattenData = data => {
    if (!data) return {};
    return {
        subtotal: data.cart.prices.subtotal_excluding_tax,
        total: data.cart.prices.grand_total,
        discounts: data.cart.prices.discounts,
        giftCards: data.cart.applied_mw_gift_cards,
        taxes: data.cart.prices.applied_taxes,
        shipping: data.cart.shipping_addresses
    };
};

const wrapUsePriceSummary = (original) => {
    return function usePriceSummary (props, ...restArgs) {
        const { ...defaultReturnData } = original(
            props,
            ...restArgs
        );

        const getPriceSummary = GET_PRICE_SUMMARY;
        const [{ cartId }] = useCartContext();

        const { error, loading, data } = useQuery(getPriceSummary, {
            fetchPolicy: 'cache-and-network',
            nextFetchPolicy: 'cache-and-network',
            skip: !cartId,
            variables: {
                cartId
            }
        });

        return {
            ...defaultReturnData,
            hasError: !!error,
            hasItems: data && !!data.cart.items.length,
            isLoading: !!loading,
            flatData: flattenData(data)
        };
    };
};

export default wrapUsePriceSummary;

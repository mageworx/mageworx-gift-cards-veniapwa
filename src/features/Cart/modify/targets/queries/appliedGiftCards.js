import gql from "graphql-tag";

export const GET_APPLIED_GIFTCARDS = gql`
    query getAppliedGiftCards($cartId: String!) {
        cart(cart_id: $cartId) {
            id
            applied_mw_gift_cards {
                code
                remaining {
                    value
                    currency_code
                    label
                }
                applied {
                    value
                    currency_code
                    label
                }
            }
            prices {
                grand_total {
                   currency
                   value
                }
            }
        }
    }
`;

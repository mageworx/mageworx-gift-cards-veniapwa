import { gql } from '@apollo/client';

export const GET_APPLIED_GIFT_CARDS_QUERY = gql`
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
        }
    }
`;

export const GET_GIFT_CARD_BALANCE_QUERY = gql`
    query getGiftCardBalance($giftCardCode: String!) {
      mwGiftCardInfo(code: $giftCardCode)
      {
        status
        balance {
            value
            currency_code
            label
        }
        valid_till
      }
    }
`;

export const APPLY_GIFT_CARD_MUTATION = gql`
    mutation applyMwGiftCard($cartId: String!, $giftCardCode: String!) {
      applyMwGiftCardToCart(
        input: {
          cart_id: $cartId
          gift_card_code: $giftCardCode
        })
        {
        cart {
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
        }
      }
}
`;

export const REMOVE_GIFT_CARD_MUTATION = gql`
    mutation removeMwGiftCard($cartId: String!, $giftCardCode: String!) {
      removeMwGiftCardFromCart(
        input: {
          cart_id: $cartId
          gift_card_code: $giftCardCode
          })
        {
        cart {
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
        }
      }
    }
`;

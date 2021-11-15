import {gql} from "@apollo/client";

export const ADD_GIFT_CARD_MUTATION = gql`
mutation (
        $cartId: String!
        $quantity: Float!
        $sku: String!
        $card_amount: String!
        $card_amount_other: Float!
        $mail_from: String!
        $mail_to: String!
        $mail_to_email: String!
        $mail_message: String!
        $mail_delivery_date_user_value: String!
    ) {
        addGiftCardProductsToCart(
            input: {
                cart_id: $cartId
                cart_items: [
                    {
                        data: {
                            quantity: $quantity
                            sku: $sku
                        },
                        gift_card_product_options:
                        {
                            card_amount: $card_amount
                            card_amount_other: $card_amount_other
                            mail_from: $mail_from
                            mail_to: $mail_to
                            mail_to_email: $mail_to_email
                            mail_message: $mail_message
                            mail_delivery_date_user_value: $mail_delivery_date_user_value
                        }
                    }
                ]
          }
          ) {
            cart {
                items {
                    product {
                        name
                        sku
                    }
                    quantity
                    prices {
                        price {
                            value
                            currency
                        }
                    }
                    ... on MageWorxGiftCardsCartItem {
                    mail_from,
                    mail_to,
                    mail_to_email,
                    mail_message,
                    mail_delivery_date
                    }
                }
            }
          }
    }
`;

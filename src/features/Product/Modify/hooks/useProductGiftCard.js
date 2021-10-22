import {useEffect, useMemo, useState} from "react";
import {useLazyQuery} from "@apollo/client";
import gql from "graphql-tag";

const GET_PRODUCT_GIFTCARD = gql`
  query getProductGiftCard($urlKey: String!) {
    products(filter: { url_key: { eq: $urlKey } }) {
      items {
          url_key
          name
          ... on MageWorxGiftCards {
              mageworx_gc_type
              mageworx_gc_additional_price
              {
                value
                label
              }
                mageworx_gc_customer_groups
              {
                id
              }
              mageworx_gc_allow_open_amount
              mageworx_gc_open_amount_min
              mageworx_gc_open_amount_max
              amount_display_mode
              amount_placeholder
              from_name_placeholder
              to_name_placeholder
              to_email_placeholder
              message_placeholder
          }
      }
    }
  }
`;

const progress = {
    NONE: 'none', // waiting query
    SUCCESS: 'success', // query done with product data, without errors
    FAILURE: 'failure' // query done without data or with errors
};

const useProductGiftCard = (props) => {
    const {
        urlKey,
        typename,
        qError,
        qLoading,
    } = props;

    const [queryState, setQueryState] = useState(progress.NONE);

    const [loadGreeting, { error, loading, data }] = useLazyQuery(GET_PRODUCT_GIFTCARD, {
        fetchPolicy: "cache-and-network",
        nextFetchPolicy: "cache-first",
        variables: {
            urlKey: urlKey
        }
    });

    useEffect(() => {
        if (qLoading) setQueryState(progress.NONE);
        else if (!qLoading) {
            if (!qError && (urlKey !== null) && (typename === "MageWorxGiftCards")){
                loadGreeting();
                setQueryState(progress.SUCCESS);
            }
            else setQueryState(progress.FAILURE)
        }
    }, [
        urlKey,
        typename,
        qError,
        qLoading,
    ]);

    const giftCardAttributes = useMemo(() => {
        if (!data) {
            // The product isn't in the cache and we don't have a response from GraphQL yet.
            return null;
        }

        // Note: if a product is out of stock _and_ the backend specifies not to
        // display OOS items, the items array will be empty.

        // Only return the product that we queried for.
        const product = data.products.items.find(
            item => item.url_key === urlKey
        );

        if (!product) return null;
        return product;
    }, [data]);

    return {
        loading,
        giftCardAttributes,
        error,
        queryState,
    };
};

export default useProductGiftCard;

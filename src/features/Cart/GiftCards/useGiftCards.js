import { useCallback, useEffect, useState } from 'react';
import { useFormApi } from 'informed';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { useCartContext } from '@magento/peregrine/lib/context/cart';

const actions = {
    APPLY: 'apply',
    CHECK_BALANCE: 'check',
    REMOVE: 'remove'
};

export const useGiftCards = props => {
    const {
        setIsCartUpdating,
        mutations: { applyCardMutation, removeCardMutation },
        queries: { appliedCardsQuery, cardBalanceQuery }
    } = props;

    const [{ cartId }] = useCartContext();
    const formApi = useFormApi();

    /*
     * Apollo hooks.
     *
     * Immediately execute the cart query and set up the other graphql actions.
     */
    const appliedCardsResult = useQuery(appliedCardsQuery, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
        skip: !cartId,
        variables: { cartId }
    });

    const [checkCardBalance, balanceResult] = useLazyQuery(cardBalanceQuery, {
        // For security, always fetch this from the network and never cache the
        // result.
        fetchPolicy: 'no-cache'
    });

    const [applyCard, applyCardResult] = useMutation(applyCardMutation);
    const [removeCard, removeCardResult] = useMutation(removeCardMutation);

    const [mostRecentAction, setMostRecentAction] = useState(null);

    const applyGiftCard = useCallback(async () => {
        setMostRecentAction(actions.APPLY);

        const giftCardCode = formApi.getValue('card');

        try {
            await applyCard({
                variables: {
                    cartId,
                    giftCardCode
                }
            });
        } catch {
            return;
        }

        formApi.reset();
    }, [formApi, applyCard, cartId]);

    const checkGiftCardBalance = useCallback(() => {
        setMostRecentAction(actions.CHECK_BALANCE);

        const giftCardCode = formApi.getValue('card');

        checkCardBalance({
            variables: { giftCardCode }
        });
    }, [formApi, checkCardBalance]);

    const removeGiftCard = useCallback(
        async giftCardCode => {
            setMostRecentAction(actions.REMOVE);

            try {
                await removeCard({
                    variables: {
                        cartId,
                        giftCardCode
                    }
                });
            } catch (err) {
                return;
            }
        },
        [cartId, removeCard]
    );

    const {
        called: applyCardCalled,
        loading: applyCardLoading
    } = applyCardResult;
    const {
        called: removeCardCalled,
        loading: removeCardLoading
    } = removeCardResult;

    useEffect(() => {
        if (applyCardCalled || removeCardCalled) {
            // If a gift card mutation is in flight, tell the cart.
            setIsCartUpdating(applyCardLoading || removeCardLoading);
        }
    }, [
        applyCardCalled,
        applyCardLoading,
        removeCardCalled,
        removeCardLoading,
        setIsCartUpdating
    ]);

    const shouldDisplayCardBalance =
        mostRecentAction === actions.CHECK_BALANCE &&
        Boolean(balanceResult.data);

    // We should only display the last card error if the most recent action was apply or check and they had an error
    const shouldDisplayCardError =
        (mostRecentAction === actions.APPLY && applyCardResult.error) ||
        (mostRecentAction === actions.CHECK_BALANCE && balanceResult.error);

    return {
        applyGiftCard,
        checkBalanceData:
            balanceResult.data && balanceResult.data.mwGiftCardInfo,
        checkGiftCardBalance,
        errorLoadingGiftCards: Boolean(appliedCardsResult.error),
        errorRemovingCard: Boolean(removeCardResult.error),
        giftCardsData:
            (appliedCardsResult.data &&
                appliedCardsResult.data.cart.applied_mw_gift_cards) ||
            [],
        isLoadingGiftCards: appliedCardsResult.loading,
        isApplyingCard: applyCardLoading,
        isCheckingBalance: balanceResult.loading,
        isRemovingCard: removeCardLoading,
        removeGiftCard,
        shouldDisplayCardBalance,
        shouldDisplayCardError
    };
};

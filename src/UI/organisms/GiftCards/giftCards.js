import React, { useEffect } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Form } from 'informed';
import { AlertCircle as AlertCircleIcon } from 'react-feather';
import { useToasts } from '@magento/peregrine';
import { useStyle } from '@magento/venia-ui/lib/classify';
import { isRequired } from '@magento/venia-ui/lib/util/formValidators';
import Button from '@magento/venia-ui/lib/components/Button';
import Field from '@magento/venia-ui/lib/components/Field';
import Icon from '@magento/venia-ui/lib/components/Icon';
import LinkButton from '@magento/venia-ui/lib/components/LinkButton';
import LoadingIndicator from '@magento/venia-ui/lib/components/LoadingIndicator';
import TextInput from '@magento/venia-ui/lib/components/TextInput';
import defaultClasses from './giftCards.module.css';
import { useGiftCards } from '../../../features/Cart/GiftCards/useGiftCards';
import GiftCard from './giftCard';
import {
    GET_APPLIED_GIFT_CARDS_QUERY,
    GET_GIFT_CARD_BALANCE_QUERY,
    APPLY_GIFT_CARD_MUTATION,
    REMOVE_GIFT_CARD_MUTATION
} from '../../../features/Cart/GiftCards/queries/giftCardQueries.gql';
import getFormattedPrice from "../../../features/common/getFormattedPrice/getFormattedPrice";

const errorIcon = (
    <Icon
        src={AlertCircleIcon}
        attrs={{
            width: 18
        }}
    />
);

const GiftCards = props => {
    const talonProps = useGiftCards({
        setIsCartUpdating: props.setIsCartUpdating,
        mutations: {
            applyCardMutation: APPLY_GIFT_CARD_MUTATION,
            removeCardMutation: REMOVE_GIFT_CARD_MUTATION
        },
        queries: {
            appliedCardsQuery: GET_APPLIED_GIFT_CARDS_QUERY,
            cardBalanceQuery: GET_GIFT_CARD_BALANCE_QUERY
        }
    });
    const {
        applyGiftCard,
        checkBalanceData,
        checkGiftCardBalance,
        errorLoadingGiftCards,
        errorRemovingCard,
        giftCardsData,
        isLoadingGiftCards,
        isApplyingCard,
        isCheckingBalance,
        isRemovingCard,
        removeGiftCard,
        shouldDisplayCardBalance,
        shouldDisplayCardError
    } = talonProps;

    const classes = useStyle(defaultClasses, props.classes);
    const { locale } = useIntl();
    const { formatMessage } = useIntl();
    const [, { addToast }] = useToasts();
    useEffect(() => {
        if (errorRemovingCard) {
            addToast({
                type: 'error',
                icon: errorIcon,
                message: formatMessage({
                    id: 'mageworx.giftCards.errorRemoving',
                    defaultMessage:
                        'Unable to remove gift card. Please try again.'
                }),
                dismissable: true,
                timeout: 7000
            });
        }
    }, [addToast, errorRemovingCard, formatMessage]);

    if (isLoadingGiftCards) {
        return (
            <LoadingIndicator>
                <FormattedMessage
                    id={'mageworx.giftCards.loading'}
                    defaultMessage={'Loading Gift Cards...'}
                />
            </LoadingIndicator>
        );
    }

    const cardEntryErrorMessage = shouldDisplayCardError
        ? formatMessage({
              id: 'mageworx.giftCards.errorInvalid',
              defaultMessage: 'Invalid card. Please try again.'
          })
        : null;

    let appliedGiftCards = null;
    if (errorLoadingGiftCards) {
        appliedGiftCards = (
            <span className={classes.errorText}>
                <FormattedMessage
                    id={'mageworx.giftCards.errorLoading'}
                    defaultMessage={
                        'There was an error loading applied gift cards. Please refresh and try again.'
                    }
                />
            </span>
        );
    }
    if (giftCardsData.length > 0) {
        const cardList = giftCardsData.map(giftCardData => {
            const { code, remaining } = giftCardData;

            return (
                <GiftCard
                    code={code}
                    currentBalance={getFormattedPrice(remaining.value, remaining.currency_code, locale)}
                    isRemovingCard={isRemovingCard}
                    key={code}
                    removeGiftCard={removeGiftCard}
                />
            );
        });

        appliedGiftCards = (
            <div className={classes.cards_container}>{cardList}</div>
        );
    }
    const cardBalance = shouldDisplayCardBalance && (
        <div className={classes.balance}>
            <span className={classes.price}>
                <FormattedMessage
                    id={'mageworx.giftCards.balance'}
                    defaultMessage={'Balance: '}
                />
                {getFormattedPrice(checkBalanceData.balance.value, checkBalanceData.balance.currency_code, locale)}
            </span>
        </div>
    );

    const containerClass = shouldDisplayCardError
        ? classes.card_input_container_error
        : classes.card_input_container;

    const cardEntryContents = (
        <div className={classes.card}>
            <Field
                classes={{
                    root: classes.entry
                }}
                id={classes.card}
                label={formatMessage({
                    id: 'mageworx.giftCards.cardNumber',
                    defaultMessage: 'Gift Card Number'
                })}
            >
                <div className={containerClass}>
                    <TextInput
                        id={classes.card}
                        disabled={isApplyingCard || isCheckingBalance}
                        field="card"
                        mask={value => value && value.trim()}
                        maskOnBlur={true}
                        message={cardEntryErrorMessage}
                        placeholder={formatMessage({
                            id: 'mageworx.giftCards.cardEntry',
                            defaultMessage: 'Enter card number'
                        })}
                        validate={isRequired}
                    />
                </div>
                {cardBalance}
            </Field>
            <Field
                classes={{
                    label: classes.applyLabel
                }}
            >
                <Button
                    priority={'normal'}
                    disabled={isApplyingCard}
                    onClick={applyGiftCard}
                >
                    <FormattedMessage
                        id={'mageworx.giftCards.apply'}
                        defaultMessage={'Apply'}
                    />
                </Button>
            </Field>
            <LinkButton
                className={classes.check_balance_button}
                disabled={isCheckingBalance}
                onClick={checkGiftCardBalance}
            >
                <FormattedMessage
                    id={'mageworx.giftCards.checkBalance'}
                    defaultMessage={'Check balance'}
                />
            </LinkButton>
        </div>
    );

    return (
        <div className={classes.root}>
            <div className={classes.entryForm}>{cardEntryContents}</div>
            {appliedGiftCards}
        </div>
    );
};

export default props => {
    return (
        <Form>
            <GiftCards {...props} />
        </Form>
    );
};

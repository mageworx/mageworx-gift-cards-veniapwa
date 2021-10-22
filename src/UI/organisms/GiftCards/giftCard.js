import React, { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { useStyle } from '@magento/venia-ui/lib/classify';
import LinkButton from '@magento/venia-ui/lib/components/LinkButton';
import { useGiftCard } from '../../../features/Cart/GiftCards/useGiftCard';
import defaultClasses from './giftCard.css';

const GiftCard = props => {
    const { code, currentBalance, isRemovingCard, removeGiftCard } = props;

    const { removeGiftCardWithCode } = useGiftCard({
        code,
        removeGiftCard
    });

    const classes = useStyle(defaultClasses, props.classes);

    return (
        <Fragment>
            <div className={classes.card_info}>
                <span className={classes.code}>{code}</span>
                <span className={classes.balance}>
                    <FormattedMessage
                        id={'MageWorx.giftCard.balance'}
                        defaultMessage={'Balance: '}
                    />
                    {currentBalance}
                </span>
            </div>
            <LinkButton
                disabled={isRemovingCard}
                onClick={removeGiftCardWithCode}
            >
                <FormattedMessage
                    id={'MageWorx.giftCard.remove'}
                    defaultMessage={'Remove'}
                />
            </LinkButton>
        </Fragment>
    );
};

export default GiftCard;

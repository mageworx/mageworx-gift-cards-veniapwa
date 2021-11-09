import React, { Fragment } from 'react';
import {FormattedMessage, useIntl} from 'react-intl';
import { useStyle } from '@magento/venia-ui/lib/classify';
import getFormattedPrice from "../../../features/common/getFormattedPrice/getFormattedPrice";

const MINUS_SYMBOL = '-';

const getFormattedSumOfAppliedAmounts = (amounts, locale) => {
    let sum = 0;
    for (let i = 0; i < amounts.length; i += 1) {
        sum += amounts[i].applied.value;
    }
    return getFormattedPrice(sum, amounts[0].applied.currency_code, locale);
}

export default props => {
    const classes = useStyle({}, props.classes);
    const { locale } = useIntl();

    if (!props.data) return null;

    return (
        <Fragment>
            <span className={classes.lineItemLabel}>
                <FormattedMessage
                    id={'MageWorx.giftCardSummary.lineItemLabel'}
                    defaultMessage={'Gift Card(s) applied'}
                />
            </span>
            <span className={classes.price}>
                {MINUS_SYMBOL}
                { getFormattedSumOfAppliedAmounts(props.data, locale) }
            </span>
        </Fragment>
    );
};

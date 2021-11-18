import React, { Suspense } from 'react';
import { useIntl } from 'react-intl';
import LoadingIndicator from '@magento/venia-ui/lib/components/LoadingIndicator';
import { Section } from "@magento/venia-ui/lib/components/Accordion";

const GiftCards = React.lazy(() => import('../../organisms/GiftCards/giftCards'));

const GiftCardSection = props => {
    const { setIsCartUpdating } = props;
    const { formatMessage } = useIntl();
    return (
        <Section
            id={'gift_card'}
            title={formatMessage({
                id: 'mageworx.giftCards.cartSection',
                defaultMessage: 'Gift Cards'
            })}
        >
            <Suspense fallback={<LoadingIndicator />}>
                <GiftCards setIsCartUpdating={setIsCartUpdating} />
            </Suspense>
        </Section>
    );
};

export default GiftCardSection;

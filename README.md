# MageWorx Gift Cards extension for Magento Venia PWA
This add-on integrates [Gift Cards extension for Magento 2](https://www.mageworx.com/magento-2-gift-cards.html) using [MageWorx GiftCards GraphQl extension](https://repos.mageworx.com/mageworx_extensions_m2/gc/MageWorx_GiftCardsGraphQl)  with [Magento 2 Venia PWA storefront](https://magento.github.io/pwa-studio/venia-pwa-concept/).

## Features
- Add product type MageWorxGiftCards
- Add fields to the gift card product page
- Apply, remove gift cards from the cart
- Check gift card balance on the cart page
- Show gift cards summary amount on the cart page

## Upload the extension
1. Run `yarn add @mageworx/giftcards-veniapwa` or `npm i @mageworx/giftcards-veniapwa` in the root of your project.
2. Open `local-intercept.js` in the root of your project and put this code into `function localIntercept`. Pay attention, `function localIntercept` must have `targets` as parameter (you can see example of `local-intercept.js` in `@mageworx/giftcards-veniapwa/documentation`).
```
/* MageWorx giftcards-veniapwa start */
const giftCardsTargetables = Targetables.using(targets);

const ProductDetails_giftCards = giftCardsTargetables.reactComponent(
    '@magento/venia-ui/lib/components/ProductFullDetail/productFullDetail.js'
);
const GiftCardOptions = ProductDetails_giftCards.addImport("{GiftCardDetail} from '../../../../../@mageworx/giftcards-veniapwa/src/UI/templates/GiftCardDetail'");
ProductDetails_giftCards.insertAfterJSX(
    '<section className={classes.imageCarousel} />',
    `<${GiftCardOptions} className={classes.giftCardOptions} classes={ defaultClasses } giftCardAttributes={productDetails.giftCardAttributes} giftCardFormData={productDetails.giftCardFormData} />`
);

const Product_giftCards = giftCardsTargetables.reactComponent(
    '@magento/venia-ui/lib/RootComponents/Product/product.js'
);
Product_giftCards.replaceJSX(
    '<ProductFullDetail product={product} />',
    `<ProductFullDetail product={product} classes={talonProps.classes}/>`
);

const PriceSummary_giftCards = giftCardsTargetables.reactComponent(
    '@magento/venia-ui/lib/components/CartPage/PriceSummary/priceSummary.js'
);
const GiftCardSummaryMW = PriceSummary_giftCards.addImport("{GiftCardSummaryMW} from '../../../../../../@mageworx/giftcards-veniapwa/src/UI/molecules/GiftCardSummary'");
PriceSummary_giftCards.replaceJSX(
    '<GiftCardSummary/>',
    `<${GiftCardSummaryMW} classes={{lineItemLabel: classes.lineItemLabel, price: priceClass}} data={giftCards}/>`
);

const CartPriceAdjustments_giftCards = giftCardsTargetables.reactComponent(
    '@magento/venia-ui/lib/components/CartPage/PriceAdjustments/priceAdjustments.js'
);
const CartGiftCardSectionMW = CartPriceAdjustments_giftCards.addImport("{GiftCardSectionMW} from '../../../../../../@mageworx/giftcards-veniapwa/src/UI/templates/GiftCardSection'");
CartPriceAdjustments_giftCards.replaceJSX(
    '<GiftCardSection/>',
    `<${CartGiftCardSectionMW} setIsCartUpdating={setIsCartUpdating}/>`
);

const CheckoutPriceAdjustments_giftCards = giftCardsTargetables.reactComponent(
    '@magento/venia-ui/lib/components/CheckoutPage/PriceAdjustments/priceAdjustments.js'
);
const CheckoutGiftCardSectionMW = CheckoutPriceAdjustments_giftCards.addImport("{GiftCardSectionMW} from '../../../../../../@mageworx/giftcards-veniapwa/src/UI/templates/GiftCardSection'");
CheckoutPriceAdjustments_giftCards.replaceJSX(
    '<GiftCardSection setIsCartUpdating={setPageIsUpdating} />',
    `<${CheckoutGiftCardSectionMW} setIsCartUpdating={setPageIsUpdating} />`
);

const MiniCartListingProduct_giftCards = giftCardsTargetables.reactComponent(
    '@magento/venia-ui/lib/components/MiniCart/ProductList/item.js'
);
const GiftCardOptionsMW_MiniCartListing = MiniCartListingProduct_giftCards.addImport("{GiftCardOptionsMW} from '../../../../../../@mageworx/giftcards-veniapwa/src/UI/molecules/GiftCardOptions'");
MiniCartListingProduct_giftCards.insertAfterJSX(
    '<ProductOptions/>',
    `<${GiftCardOptionsMW_MiniCartListing} mail_to={props.mail_to} mail_from={props.mail_from} mail_to_email={props.mail_to_email} mail_message={props.mail_message} mail_delivery_date={props.mail_delivery_date} classes={{options: classes.options}} />`
);

const ProductListingProduct_giftCards = giftCardsTargetables.reactComponent(
    '@magento/venia-ui/lib/components/CartPage/ProductListing/product.js'
);
const GiftCardOptionsMW_ProductListing = ProductListingProduct_giftCards.addImport("{GiftCardOptionsMW} from '../../../../../../@mageworx/giftcards-veniapwa/src/UI/molecules/GiftCardOptions'");
ProductListingProduct_giftCards.insertAfterJSX(
    '<ProductOptions/>',
    `<${GiftCardOptionsMW_ProductListing} mail_to={item.mail_to} mail_from={item.mail_from} mail_to_email={item.mail_to_email} mail_message={item.mail_message} mail_delivery_date={item.mail_delivery_date} classes={{options: classes.options, optionLabel: classes.optionLabel}} />`
);

const ItemsReviewItem_giftCards = giftCardsTargetables.reactComponent(
    '@magento/venia-ui/lib/components/CheckoutPage/ItemsReview/item.js'
);
const GiftCardOptionsMW_ItemsReview = ItemsReviewItem_giftCards.addImport("{GiftCardOptionsMW} from '../../../../../../@mageworx/giftcards-veniapwa/src/UI/molecules/GiftCardOptions'");
ItemsReviewItem_giftCards.insertAfterJSX(
    '<ProductOptions/>',
    `<${GiftCardOptionsMW_ItemsReview} mail_to={props.mail_to} mail_from={props.mail_from} mail_to_email={props.mail_to_email} mail_message={props.mail_message} mail_delivery_date={props.mail_delivery_date} classes={{options: classes.options}} />`
);

const graphqlItemsFragmentForGiftCards = '\t... on MageWorxGiftCardsCartItem {\n' +
    '\tmail_from\n' +
    '\tmail_to\n' +
    '\tmail_to_email\n' +
    '\tmail_message\n' +
    '\tmail_delivery_date\n' +
    '\t}\n';

const MiniCartProductListingGql_GiftCard = giftCardsTargetables.module(
    '@magento/peregrine/lib/talons/MiniCart/ProductList/productListFragments.gql.js'
);
MiniCartProductListingGql_GiftCard.insertAfterSource(
    'items {\n',
    graphqlItemsFragmentForGiftCards
);

const ProductListingGql_GiftCard = giftCardsTargetables.module(
    '@magento/peregrine/lib/talons/CartPage/ProductListing/productListingFragments.gql.js'
);
ProductListingGql_GiftCard.insertAfterSource(
    'items {\n',
    graphqlItemsFragmentForGiftCards
);

const ItemsReviewFragmentsGql_GiftCard = giftCardsTargetables.module(
    '@magento/peregrine/lib/talons/CheckoutPage/ItemsReview/itemsReviewFragments.gql.js'
);
ItemsReviewFragmentsGql_GiftCard.insertAfterSource(
    'items {\n',
    graphqlItemsFragmentForGiftCards
);
/* MageWorx giftcards-veniapwa end */
```
3. Check that your `local-intercept` has this code before `module.exports`, if don't have you should add them (you can see example of `local-intercept.js` in `@mageworx/giftcards-veniapwa/documentation`)
```
const { Targetables } = require('@magento/pwa-buildpack');
```
4. Create folder `mageworx/configs/GiftCards` in the root of your project. Copy config `@mageworx/giftcards-veniapwa/documentation/date.locale.js` from the package to created folder `mageworx/configs/GiftCards`.
5. Let's run your project.
```
yarn watch
```

## Localization of datepicker
You can add localizations that you need in `mageworx/configs/GiftCards/date.locale.js`, for example:
```
import { 
    enGB, 
    ru,
} from 'date-fns/locale'

export const dateLocale = [
    {
        name: "ru-RU",
        data: ru
    },
    {
        name: "en-GB",
        data: enGB
    },
]
```
Name has to be in ISO 639 format.

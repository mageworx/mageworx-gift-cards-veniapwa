module.exports = targets => {
    const { Targetables } = require('@magento/pwa-buildpack');
    const targetables = Targetables.using(targets);
    targetables.setSpecialFeatures('esModules','cssModules');

    const peregrineTargets = targets.of("@magento/peregrine");
    const talonsTarget = peregrineTargets.talons;

    // product
    talonsTarget.tap((talonWrapperConfig) => {
        talonWrapperConfig.RootComponents.Product.useProduct.wrapWith(
            "@mageworx/giftcards-veniapwa/src/features/Product/modify/targets/wrapUseProduct"
        );
    });
    talonsTarget.tap((talonWrapperConfig) => {
        talonWrapperConfig.ProductFullDetail.useProductFullDetail.wrapWith(
            "@mageworx/giftcards-veniapwa/src/features/Product/modify/targets/wrapUseProductFullDetails"
        );
    });

    // cart
    talonsTarget.tap((talonWrapperConfig) => {
        talonWrapperConfig.CartPage.PriceSummary.usePriceSummary.wrapWith(
            "@mageworx/giftcards-veniapwa/src/features/Cart/modify/targets/wrapUsePriceSummary"
        );
    });
};

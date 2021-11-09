module.exports = targets => {
    // For extends productFullDetail component in local-intercept
    const { Targetables } = require('@magento/pwa-buildpack');
    const targetables = Targetables.using(targets);
    targetables.setSpecialFeatures('esModules','cssModules');

    const peregrineTargets = targets.of("@magento/peregrine");
    const talonsTarget = peregrineTargets.talons;

    // product
    talonsTarget.tap((talonWrapperConfig) => {
        talonWrapperConfig.RootComponents.Product.useProduct.wrapWith(
            "@mageworx/GiftCards-veniapwa/src/features/Product/modify/targets/wrapUseProduct"
        );
    });
    talonsTarget.tap((talonWrapperConfig) => {
        talonWrapperConfig.ProductFullDetail.useProductFullDetail.wrapWith(
            "@mageworx/GiftCards-veniapwa/src/features/Product/modify/targets/wrapUseProductFullDetails"
        );
    });

    // cart
    talonsTarget.tap((talonWrapperConfig) => {
        talonWrapperConfig.CartPage.PriceSummary.usePriceSummary.wrapWith(
            "@mageworx/GiftCards-veniapwa/src/features/Cart/modify/targets/wrapUsePriceSummary"
        );
    });

    // category
    talonsTarget.tap((talonWrapperConfig) => {
        talonWrapperConfig.Gallery.useAddToCartButton.wrapWith(
            "@mageworx/GiftCards-veniapwa/src/features/Category/modify/targets/wrapUseAddToCartButton"
        );
    });
    talonsTarget.tap((talonWrapperConfig) => {
        talonWrapperConfig.Gallery.useGalleryItem.wrapWith(
            "@mageworx/GiftCards-veniapwa/src/features/Category/modify/targets/wrapUseGalleryItem"
        );
    });
};

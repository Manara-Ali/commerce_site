export const formatPrice = (price) => {
    return Number((Math.round(price * 100) / 100).toFixed(2));
}
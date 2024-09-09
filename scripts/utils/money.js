export function formatCurrency (priceCents){

    const formattedCurrency = (priceCents/100).toFixed(2);

    return formattedCurrency;
}
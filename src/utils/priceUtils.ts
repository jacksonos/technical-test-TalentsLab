export const isValidOfferPrice = (offerPrice: string): boolean => {
  return offerPrice !== 'false' && offerPrice !== '0' && offerPrice !== null;
};

export const getDisplayPrice = (price: string, offerPrice: string): number => {
  return isValidOfferPrice(offerPrice)
    ? Number.parseFloat(offerPrice)
    : Number.parseFloat(price);
};

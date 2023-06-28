export const findCardsGridCongig = (width: number) => {
  if (width > 1280) {
    return { init: 12, add: 3 };
  }
  if (width < 1280 && width > 767) {
    return { init: 8, add: 2 };
  }
  return { init: 5, add: 2 };
};

export default findCardsGridCongig;

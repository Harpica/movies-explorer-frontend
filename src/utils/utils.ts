export const findCardsGridCongig = (width: number) => {
  if (width > 1280) {
    return { init: 12, add: 3 };
  } else if (width < 1280 && width > 767) {
    return { init: 8, add: 2 };
  } else {
    return { init: 5, add: 1 };
  }
};

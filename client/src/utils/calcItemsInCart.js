export const calcItemsInCart = (arr) => {
  return arr?.reduce((accumulator, element) => {
    return (accumulator += element.qty);
  }, 0);
};

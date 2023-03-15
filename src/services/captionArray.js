export const captionArray = (res) => {
  let array = [];

  Object.values(res).map((items) => {
    array.push(items.caption);
  });

  return array;
};

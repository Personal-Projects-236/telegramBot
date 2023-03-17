export const getFromDB = async (model, userName) => {
  return await model.find(userName).then(async (res) => {
    return await res;
  });
};

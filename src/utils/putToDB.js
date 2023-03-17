export const putToDB = async (update) => {
  const { model, findUser, updateObject } = update;

  return await model.findOneAndUpdate({ findUser }, updateObject, {
    new: true,
  });
};

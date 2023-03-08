export const postToDB = async (model, object) => {
  const name = new model(object);

  await name.save();
};

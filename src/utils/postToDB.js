export const postToDB = async (userModel) => {
  const { model, object } = userModel;

  const name = new model(object);

  await name.save();
};

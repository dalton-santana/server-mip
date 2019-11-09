import models from "../models";

export const getFazendas = async args => {
  const fazendas = await models.Fazenda.findAll({
    where: {
      userId: args.id
    }
  });
  return fazendas;
};
export const createFazenda = async (args, req) => {

  try {
    if (!req.isAuth) {
      throw new Error("Acesso Negado!!");
    }

    const existingFazenda = await models.Fazenda.findOne({
      where: { name: args.name, userId: req.userId }
    });
    if (existingFazenda) {
      throw new Error("Fazenda já cadastrada");
    }
    const fazenda = await models.Fazenda.create({
      ...args,
      userId: req.userId
    });
    return fazenda;
  } catch (err) {
    throw err;
  }
};
export const updateFazenda = async (args, req) => {
  try {
    /*if (!req.isAuth) {
      throw new Error('Acesso Negado!!');
    }*/
    const existingFazenda = await models.Fazenda.findOne({
      where: { name: args.name }
    });
    if (existingFazenda && existingFazenda.id !== args.id) {
      throw new Error("Fazenda já cadastrada");
    }

    await models.Fazenda.update(
      {
        name: args.name
      },
      {
        where: { id: args.id },
        returning: true,
        plain: true
      }
    );

    return true;
  } catch (err) {
    throw err;
  }
};
export const deleteFazenda = async (args, req) => {
  try {
    await models.Fazenda.destroy({
      where: { id: args.id }
    });
    return true;
  } catch (err) {
    throw err;
  }
};
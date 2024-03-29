import models from "../models";
import { getAreas } from "./area"

export const getFazendas = async args => {
  const fazendas = await models.Fazenda.findAll({
    where: {
      userId: args.userId
    }
  });
  return fazendas;
};

export const getFazenda = async args => {

  const fazenda = await models.Fazenda.findByPk(args.id);

  const areas = await models.Area.findAll({
    where: {
      fazendaId: args.id
    }
  });
  

  return { ...fazenda, areas }
};


export const fazendas = async args => {
  const fazendas = await models.Fazenda.findAll({
    where: {
      userId: args.id
    }
  });
  return fazendas;
};

export const createFazenda = async (args, req) => {

  try {
    /*if (!req.isAuth) {
      throw new Error("Acesso Negado!!");
    }*/

    const existingFazenda = await models.Fazenda.findOne({
      where: { nome: args.nome }
    });

    if (existingFazenda) {
      throw new Error("Fazenda já cadastrada");
    }

    const fazenda = await models.Fazenda.create({
      ...args
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
      where: { nome: args.nome }
    });
    if (existingFazenda && existingFazenda.id !== args.id) {
      throw new Error("Fazenda já cadastrada");
    }

    await models.Fazenda.update(
      {
        nome: args.nome
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

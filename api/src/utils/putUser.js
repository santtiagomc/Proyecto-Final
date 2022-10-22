const { Users } = require("../db");

async function putUser({ id, province, city, address, zipCode }) {
  try {
    const user = await Users.findByPk(id);
    if (user === null) return { messageError: "Usuario no existente" };

    user.set({
      [!province || "province"]: province,
      [!city || "city"]: city,
      [!address || "address"]: address,
      [!zipCode || "zipCode"]: zipCode,
    });

    await user.save();

    return { message: "Usuario editado con exito" };
  } catch (error) {
    return { messageError: "Error" };
  }
}

module.exports = {
  putUser,
};

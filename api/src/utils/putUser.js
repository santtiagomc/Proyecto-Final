const { Users } = require("../db");

async function putUser({ id, province, city, address, zipCode, status, role }) {
  try {
    const user = await Users.findByPk(id);
    if (user === null) return { messageError: "Usuario no existente" };

    if (status) {
      user.status === "Activo" ? (user.status = "Inactivo") : (user.status = "Activo");
      await user.save();
      return { message: user.status === "Activo" ? `Has desbaneado al usuario ${user.fullName}` : `Has baneado al usuario ${user.fullName}` }
    }

    if (role) {
      user.role === "Administrador" ? (user.role = "Usuario") : (user.role = "Administrador");
      await user.save();
      return { message: user.role === "Administrador" ? `Has hecho administrador al usuario ${user.fullName}` : `Has quitado el rol de administrador al usuario ${user.fullName}` }
    }

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

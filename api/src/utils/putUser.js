const { Users } = require("../db");

async function putUser({ id, province, city, address, zipCode, status, role }) {
  try {
    const user = await Users.findByPk(id);
    if (user === null) return { messageError: "Usuario no existente" };

    if (status) {
      user.status === "Activo" ? (user.status = "Baneado") : (user.status = "Activo");
      await user.save();
      return { message: user.status === "Activo" ? `Has desbaneado al usuario "${user.fullName}"` : `Has baneado al usuario "${user.fullName}"` }
    }

    if (role) {
      user.role === "Admin" ? (user.role = "Usuario") : (user.role = "Admin");
      await user.save();
      return { message: user.role === "Admin" ? `Has hecho administrador al usuario "${user.fullName}"` : `Has quitado el rol de administrador al usuario "${user.fullName}"` }
    }

    user.set({
      [!province || "province"]: province,
      [!city || "city"]: city,
      [!address || "address"]: address,
      [!zipCode || "zipCode"]: zipCode,
    });

    await user.save();

    return { message: "Usuario editado con éxito" };
  } catch (error) {
    return { messageError: "Error" };
  }
}

module.exports = {
  putUser,
};

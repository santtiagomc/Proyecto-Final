const { Users } = require("../db");

async function getUser({ id }) {
	try {
		const user = await Users.findByPk(id);

		if (!user) return { messageError: "Usuario no existente." };

		return user;
	} catch (error) {
		return { messageError: "Se ha producido un error." };
	}
}

module.exports = {
	getUser,
};

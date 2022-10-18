const { Users } = require("../db");

async function getUser({ id }) {
	console.log(id);
	try {
		const user = await Users.findByPk(id);
		console.log(user);
		if (!user) return { messageError: "Usuario no existente." };
		return user;
	} catch (error) {
		return { messageError: "Se ha producido un error." };
	}
}

module.exports = {
	getUser,
};

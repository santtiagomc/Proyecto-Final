const { Users } = require("../db");

async function postUser({
	// id,
	// fullName,
	name,
	lastName,
	email,
	password,
	province,
	city,
	address,
	zipCode,
}) {
	try {
		const [user, created] = await Users.findOrCreate({
			where: {
				email,
			},
			defaults: {
				name,
				lastName,
				password,
				province,
				city,
				address,
				zipCode,
			},
		});
		console.log(user, created);
		return { message: "Usuario creado correctamente" };
	} catch (e) {
		return { messageError: "Error" };
	}
}

module.exports = {
	postUser,
};

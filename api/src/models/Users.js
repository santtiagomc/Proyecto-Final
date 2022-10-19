const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
	// defino el modelo
	sequelize.define(
		"Users",
		{
			id: {
				type: DataTypes.STRING,
				primaryKey: true,
			},
			fullName: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			province: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			city: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			address: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			zipCode: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			role: {
				type: DataTypes.ENUM("Administrador", "Usuario"),
				allowNull: false,
				defaultValue: "Usuario",
			},
			status: {
				type: DataTypes.ENUM("Activo", "Inactivo"),
				allowNull: true,
				defaultValue: "Activo",
			},
		},
		{
			timestamps: false,
		}
	);
};

module.exports = (sequelize, DataTypes) => {
    const Sponsor = sequelize.define("Sponsors", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        organisationName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        townCity: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        county: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        licenseTier: {
            type: DataTypes.STRING(1000),
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM("active", "removed", "updated"),
            defaultValue: "active",
        },
        newSponsor: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,  // Initially false
        },
    }, 
    {
        tableName: "Sponsors",
        timestamps: false,
    });

    return Sponsor;
};

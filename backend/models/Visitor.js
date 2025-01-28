
module.exports = (sequelize, DataTypes) => {
    const Visitor = sequelize.define("Visitor", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      organisation_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Organisations",
          key: "id",
        },
        onDelete: 'CASCADE', 
      },
      name:{
          type: DataTypes.STRING,
          allowNull:false,
      },
      designation : {
        type: DataTypes.STRING,
        allowNull:false,
      },
      email : {
        type: DataTypes.STRING,
        allowNull:false,
      },
      contact : {
        type: DataTypes.STRING,
        allowNull:false,
      },
      description : {
        type: DataTypes.STRING,
        allowNull:false,
      },
      date : {
        type: DataTypes.DATEONLY,
        allowNull:false,
      },
      time : {
        type : DataTypes.TIME,
        allowNull : false,
      },
      reference : {
        type : DataTypes.STRING,
        allowNull : false
      },
      address: {
          type :DataTypes.STRING,
          allowNull:false
      }
    },
    {
      tableName: "Visitors",
      timestamps: false,
    });
    return Visitor;
  };

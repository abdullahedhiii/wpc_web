
module.exports = (sequelize, DataTypes) => {
    const OrgDocument = sequelize.define("OrgDocument", {
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
      document_type:{
          type: DataTypes.STRING,
          allowNull:false,
      },
      document_url :{
        type : DataTypes.STRING,
        allowNull:false
      }
    },
    {
      tableName: "OrgDocuments",
      timestamps: false,
    });
    return OrgDocument;
  };
  
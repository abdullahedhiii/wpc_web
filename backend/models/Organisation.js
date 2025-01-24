module.exports = (sequelize, DataTypes) => {
  const Organisation = sequelize.define(
    "Organisation",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Company_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Company_Type: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Private Company Limited by shares",
      },
      Company_RegNo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Company_Contact: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Company_OrganisationEmail: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Company_Website: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Company_Landline: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Company_TradingName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Company_Period: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Over 12 to 18 months",
      },
      Company_Sector: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Other service activities",
      },
      Company_NameChanged: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "No",
      },
      Company_Penalty: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "No",
      },
      Company_Logo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Authorizing_fname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Authorizing_lname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Authorizing_designation: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Authorizing_email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Authorizing_phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Authorizing_proof_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Authorizing_history: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      KeyContact_fname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      KeyContact_lname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      KeyContact_designation: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      KeyContact_email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      KeyContact_phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      KeyContact_proof_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      KeyContact_history: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      Level1_fname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Level1_lname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Level1_designation: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Level1_email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Level1_phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Level1_proof_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Level1_history: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      Address_Postcode: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Address_Select: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Address_Line1: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Address_Line2: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Address_Line3: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Address_City_County: {
        type: DataTypes.STRING,
        allowNull: true,
      },
       Address_Country: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      RTI_fname: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      RTI_department: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      RTI_job_type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      RTI_job_title:{
        type: DataTypes.STRING,
        allowNull: true,
      },
      RTI_Immigration_status:{
        type: DataTypes.STRING,
        allowNull: true,
      }, 

      admin_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
    },
    {
      tableName: "Organisations",
      timestamps: true,
    }
  );

  Organisation.belongsTo(sequelize.models.User, {
    foreignKey: "admin_id",
    as: "admin",
  });

  return Organisation;
};

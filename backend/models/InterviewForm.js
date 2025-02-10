module.exports = (sequelize, DataTypes) => {
  const InterviwForm = sequelize.define(
    "InterviwForm",
    {
      id:{
         type : DataTypes.INTEGER,
         autoIncrement: true,
         primaryKey: true,
      },
      job_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Jobs",
          key: "id",
        },
        onDelete: 'CASCADE',   
    },
      form_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      scaling: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      industry: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      capstone_title: {
        type: DataTypes.STRING,
      },
      capstone_weightage: {
        type: DataTypes.INTEGER,
      },
      cognitive_factor: {
        type: DataTypes.STRING,
      },
      cognitive_weightage: {
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: "InterviewForms",
      timestamps: false,
    }
  );
  return InterviwForm;
};

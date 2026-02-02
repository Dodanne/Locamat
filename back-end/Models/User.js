import { DataTypes } from "sequelize";
import sequelize from "../db/sequelize.js";
import bcrypt from "bcryptjs";

const User = sequelize.define(
  "user",
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Le prénom est obligatoire" },
        notEmpty: { msg: "Le prénom ne peut pas être vide" },
        len: {
          args: [2, 50],
          msg: "Le prénom doit contenir entre 2 et 50 caractères",
        },
        isNotAdmin(value) {
          if (value.toUpperCase() === "ADMIN") {
            throw new Error(`Le prénom doit être différent de ${value}`);
          }
        },
      },
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Le nom est obligatoire" },
        notEmpty: { msgs: "Le nom ne peut pas être vide" },
        len: {
          args: [2, 50],
          msg: "Le nom doit contenir entre 2 et 50 caractères",
        },
        isNotAdmin(value) {
          if (value.toUpperCase() === "ADMIN") {
            throw new Error(`Le nom doit être différent de ${value}`);
          }
        },
      },
    },
    birthday: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: true,
        isAdult(value) {
          const today = new Date();
          const birthDate = new Date(value);
          const age = today.getFullYear() - birthDate.getFullYear();
          const monthDiff = today.getMonth() - birthDate.getMonth();
          const dayDiff = today.getDate() - birthDate.getDate();
          const actualAge =
            monthDiff < 0 || (monthDiff === 0 && dayDiff < 0) ? age - 1 : age;
          if (actualAge < 18) {
            throw new Error("L'utilisateur doit avoir au moins 18 ans.");
          }
        },
      },
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: { msg: "L’email est obligatoire" },
        notEmpty: { msg: "L’email ne peut pas être vide" },
        isEmail: { msg: "Format d’email invalide" },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Le mot de passe est obligatoire" },
        notEmpty: { msg: "Le mot de passe ne peut pas être vide" },
        len: {
          args: [8, 255],
          msg: "Le mot de passe doit contenir au moins 8 caractères",
        },
        isPwdCorrect(value) {
          const regex =
            /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?-]).{8,}$/;
          if (!regex.test(value)) {
            throw new Error(
              "Le mot de passe doit contenir au moins 8 caractères, une majuscule, un chiffre et un caractère spécial",
            );
          }
        },
      },
    },
    number: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Le numéro de rue est obligatoire" },
        notEmpty: { msg: "Le numéro de rue ne peut pas être vide" },
        len: {
          args: [1, 10],
          msg: "Le numéro de rue doit contenir entre 1 et 10 caractères",
        },
      },
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "La rue est obligatoire" },
        notEmpty: { msg: "La rue ne peut pas être vide" },
        len: {
          args: [3, 100],
          msg: "La rue doit contenir entre 3 et 100 caractères",
        },
      },
    },
    postal_code: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Le code postal est obligatoire" },
        notEmpty: { msg: "Le code postal ne peut pas être vide" },
        is: {
          args: /^[0-9]{5}$/,
          msg: "Le code postal doit contenir 5 chiffres",
        },
      },
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "La ville est obligatoire" },
        notEmpty: { msg: "La ville ne peut pas être vide" },
        len: {
          args: [2, 100],
          msg: "La ville doit contenir entre 2 et 100 caractères",
        },
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unqiue: true,
      validate: {
        notNull: { msg: "Le téléphone est obligatoire" },
        notEmpty: { msg: "Le téléphone ne peut pas être vide" },
        is: {
          args: /^[0-9+\s.-]{8,20}$/,
          msg: "Numéro de téléphone invalide",
        },
      },
    },
    user_type: {
      type: DataTypes.ENUM("particulier", "professionnel"),
      allowNull: false,
      validate: {
        notNull: { msg: "Le type d’utilisateur est obligatoire" },
      },
    },
    compagny_name: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: {
          args: [2, 100],
          msg: "Le nom de l’entreprise doit contenir entre 2 et 100 caractères",
        },
      },
    },
    siret: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        is: {
          args: /^[0-9]{14}$/,
          msg: "Le SIRET doit contenir 14 chiffres",
        },
      },
    },
    rating_avg: {
      type: DataTypes.DECIMAL(2, 1),
      validate: {
        min: 1,
        max: 5,
      },
    },
    rating_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
    status: {
      type: DataTypes.ENUM("active", "pending", "cancelled"),
      allowNull: false,
      defaultValue: "active",
    },
    role: {
      type: DataTypes.ENUM("user", "admin", "super-admin"),
      allowNull: false,
      defaultValue: "user",
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
  },
);
User.beforeCreate(async (user) => {
  if (user.password) {
    user.password = await bcrypt.hash(user.password, 10);
  }
});

User.beforeUpdate(async (user) => {
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
});

export default User;

//BCRYPT es una dependencia que me permite hashear contraseñas. 

//1) Instalamos: npm install bcrypt
//2) Importamos el módulo. 

import bcrypt from "bcrypt";

//Vamos a crear dos funciones: 

//a) createHash: aplicar el hash al password. 
//b) isValidPassword: comparar el password proporcionado por la base de datos. 

const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

//hashSync: toma el password que le pasamos y aplica el proceso de hasheo a partir de un salt. 

//Un "salt" es un string random que hacer que el proceso se realice de forma impredecible. 

//Este proceso es irreversible!! Ahh vamos a morir!

const isValidPassword = (password, user) => bcrypt.compareSync(password, user.password);

//Compara los password, retorna true o falsete segun corresponda. 

export {createHash, isValidPassword};
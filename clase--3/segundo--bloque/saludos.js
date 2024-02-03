const temprano = () => {
    console.log("Buenos dias");
}

const tarde = () => {
    console.log("Buenas tardes");
}

const noche = () => {
    console.log("Buenas noches");
}

// module.exports = {
//     temprano, 
//     tarde, 
//     noche
// }


//No se olviden de exportarlo!!! 

//Si van a exportar con ES Modules: 

export {temprano, tarde, noche};
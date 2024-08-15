// Config
const urlApiThrones = 'https://thronesapi.com/api/v2/characters'

const fs = require("fs")

// 1. Realizar una función que permita recuperar la información del personaje “Ned Stark”.

const getCharacter = async (fullName) => {
    try {
        const response = await fetch(urlApiThrones);

        if (!response.ok) {
            throw new Error("Error", response.status);
        }
        
        const datos = await response.json();

        let captura = datos.find(personaje => personaje.fullName == String(fullName));

        console.log(captura);
        
    } catch (error) {
        response.send(error);
    };
};


// 2. Realizar una función que permita recuperar todos los personajes disponibles.
const getAll = async () => {
    try {
        const response = await fetch(urlApiThrones);

        if (!response.ok) {
            throw new Error("Error", response.status);
        }
        
        const datos = await response.json();
        console.log(datos);
        
    } catch (error) {
        response.send(error);
    };
};

// getCharacter("Ned Stark")
// getAll()
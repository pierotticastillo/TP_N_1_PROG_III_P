// Config
const urlApiThrones = 'https://thronesapi.com/api/v2/characters'

import fs from "fs";
import { promises } from "fs";


// 1. Realizar una función que permita recuperar la información del personaje “Ned Stark”.

const getCharacter = async (fullName) => {
    try {
        const response = await fetch(urlApiThrones);

        if (!response.ok) {
            throw new Error("Error", response.status);
        }

        const datos = await response.json();

        let captura = datos.find(personaje => personaje.fullName == String(fullName));

        if (captura) {
            console.log(captura)
        }
        else {
            console.log(`El personaje con el nombre ${fullName} no fue encontrado`);
        }


    } catch (error) {
        console.error(error);
    };
};


// 2. Realizar una función que permita recuperar todos los personajes disponibles.
// 3. Persistir el resultado de la segunda consulta localmente en un archivo JSON.
const getAll = async () => {
    try {
        const response = await fetch(urlApiThrones);

        if (!response.ok) {
            throw new Error("Error", response.status);
        }
        const datos = await response.json();
        console.log(datos);

        try {
            await fs.promises.access('./personajes.json', fs.constants.F_OK);
            console.log("El archivo *personajes.json* ya existe");
        }
        catch (error) {
            if (error.code === 'ENOENT') {

                const datosParseados = JSON.stringify(datos, null, 2);
                await fs.promises.writeFile("./personajes.json", datosParseados);
                console.log("Los personajes fueron guardados en el archivo *personajes.json*");
            }
        }

    } catch (error) {
        console.error(error);
    };
};

// 4. Leer el archivo local de personajes
const readFile = async () => {
    try {
        const characters = await promises.readFile("./personajes.json", "utf-8")
        const datosParseados = JSON.parse(characters)
        console.log(datosParseados)
    }
    catch (error) {
        console.error(error)
    }
}

// a. Mostrar por consola los personajes de la familia Stark. Es decir: “family” = “House Stark”.
const getFamily = async (family) => {
    try {

        const datos = await promises.readFile("./personajes.json");

        const datosParseados = JSON.parse(datos)

        const captura = datosParseados.filter(personaje => personaje.family == String(family))

        if (datosParseados && captura) {
            console.log(`Los personajes de la familia ${family} son:`);
            captura.forEach(personaje => {
                // console.log(JSON.stringify(personaje, null, 2))
                console.log(personaje)
            })
        }
        else {
            console.log(`No se encontraron personajes para la famlia ${family}`)
        }

    }
    catch (error) {
        console.error(error)
    }

}

// b. Agregar un nuevo personaje y sobrescribir el archivo original.

const createCharacter = async (character) => {
    try {

        const datos = await promises.readFile("./personajes.json");

        const personajesParseados = JSON.parse(datos)

        const ultimoID = personajesParseados[personajesParseados.length - 1].id

        const newCharacter = {
            "id": parseInt(ultimoID + 1),
            "firstName": character.firstName,
            "lastName": character.lastName,
            "fullName": character.fullName,
            "title": character.title,
            "family": character.family,
        }

        personajesParseados.push(newCharacter)

        const datosParseados = JSON.stringify(personajesParseados, null, 2)

        await promises.writeFile("./personajes.json", datosParseados)

        console.log(`El personaje fue creado exitosamente, sus datos son:\nid: ${ultimoID + 1}'\nFirst Name:${character.firstName}\nLast Name: ${character.lastName}\nFullname:${character.fullName}\nTitle Family:${character.family}`)
    }
    catch (error) {
        console.error(error)
    }

};

// c. Eliminar los personajes cuyo ID sean mayores a 25 y sobrescribir el archivo original.

const removeGreaterThan = async (id) => {
    try {
        const datos = await promises.readFile("./personajes.json");

        const personajesParseados = JSON.parse(datos)

        let capturaPersonajes = personajesParseados.filter(personaje => personaje.id <= parseInt(id));

        const datosParseados = JSON.stringify(capturaPersonajes, null, 2)

        await promises.writeFile("./personajes.json", datosParseados)

        console.log("Los personajes fueron eliminados exitosamente")

    }
    catch (error) {
        console.error(error)
    }
}

// TESTEO

async function main() {
    // 1
    await getCharacter("Ned Stark")

    // 2 & 3
    await getAll()


    // 4
    await readFile()

    // a
    await getFamily("House Stark")

    // b
    const newCharacter = {
        "firstName": "Leonardo",
        "lastName": "da Vinci",
        "fullName": "Leonardo da Vinci",
        "title": "Artista",
        "family": "Italiana",
    }

    await createCharacter(newCharacter)


    // c

    // await removeGreaterThan(25)


}

main()
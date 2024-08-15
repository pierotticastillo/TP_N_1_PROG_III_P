// Config
const urlApiThrones = 'https://thronesapi.com/api/v2/characters'

// const { error } = require("console");
const fs = require("fs")

// console.log(fs)

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
        const datosParseados = JSON.stringify(datos, null, 2)
        await fs.promises.appendFile("./personajes.json", datosParseados)
        console.log(datos);

    } catch (error) {
        console.error(error);
    };
};

// 4
const readFile = async () => {
    try {
        const characters = await fs.promises.readFile("./personajes.json", "utf-8")
        const datosParseados = JSON.parse(characters)
        console.log(datosParseados)
    }
    catch (error) {
        console.error(error)
    }
}

// a
const getFamilyStark = async (family) => {
    try {

        const datos = await fs.promises.readFile("./personajes.json");

        const datosParseados = JSON.parse(datos)

        const captura = datosParseados.filter(personaje => personaje.family == String(family))

        console.log(captura)
    }
    catch (error) {
        console.error(error)
    }

}

// b

const createCharacter = async (character) => {
    try {

        const datos = await fs.promises.readFile("./personajes.json");

        const personajesParseados = JSON.parse(datos)

        personajesParseados.push(character)

        const datosParseados = JSON.stringify(personajesParseados, null, 2)

        await fs.promises.writeFile("./personajes.json", datosParseados)

        console.log(`El personaje fue creado exitosamente, sus datos son:\nid: ${character.id}'\nFirst Name:${character.firstName}\nLast Name: ${character.lastName}\nFullname:${character.fullName}\nTitle Family:${character.family}`)
    }
    catch (error) {
        console.error(error)
    }

};

// c
const removeGreaterThan25 = async () => {
    try {
        const datos = await fs.promises.readFile("./personajes.json");

        const personajesParseados = JSON.parse(datos)

        let capturaPersonajes = personajesParseados.filter(personaje => personaje.id <= 25);

        const datosParseados = JSON.stringify(capturaPersonajes, null, 2)

        await fs.promises.writeFile("./personajes.json", datosParseados)

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
    await getFamilyStark("House Stark")

    // b
    const newCharacter = {
        "id": 53,
        "firstName": "Leonardo",
        "lastName": "da Vinci",
        "fullName": "Leonardo da Vinci",
        "title": "Artista",
        "family": "Italiana",
    }

    await createCharacter(newCharacter)


    // c

    await removeGreaterThan25()

}

main()
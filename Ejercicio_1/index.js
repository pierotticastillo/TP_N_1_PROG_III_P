const funciones = require("./funciones.js");
// TESTEO

async function main() {
    // 1
    await funciones.getCharacter("Ned Stark")

    // 2 & 3
    await funciones.getAll()


    // 4
    await funciones.readFile()

    // a
    await funciones.getFamily("House Stark")

    // b
    const newCharacter = {
        "firstName": "Leonardo",
        "lastName": "da Vinci",
        "fullName": "Leonardo da Vinci",
        "title": "Artista",
        "family": "Italiana",
    }

    await funciones.createCharacter(newCharacter)


    // c

    // await funciones.removeGreaterThan(25)


}

main()
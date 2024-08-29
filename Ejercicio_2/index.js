// TESTEO

const funciones = require("./funciones.js")

const main = async () => {
    // 1

    await funciones.getAll();

    // 2
    await funciones.getLimited(9);


    // 3
    const newProduct = {
        title: 'test product',
        price: 13.5,
        description: 'lorem ipsum set',
        image: 'https://i.pravatar.cc',
        category: 'electronic'
    };
// 
    await funciones.createProduct(newProduct);


    // 4
    await funciones.getById(18);

    // 5
    await funciones.deleteProduct(9)

}

main()
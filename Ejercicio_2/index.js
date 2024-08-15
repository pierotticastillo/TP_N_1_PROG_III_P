const urlApiProducts = 'https://fakestoreapi.com/products'

// 1. Recuperar la información de todos los productos (products).
const getAll = async () => {
    try {
        const response = await fetch(urlApiProducts);

        if (!response.ok) {
            throw new Error("Error", response.status);
        }

        const datos = await response.json();
        console.log(datos);

    } catch (error) {
        console.error(error);
    };
};


// 2. Recuperar la información de un número limitado de productos (products).
const getLimited = async (limit) => {
    try {
        if (limit <= 0 || limit == undefined) {
            throw new Error("Esta consulta no es posible");
        }

        const response = await fetch(`${urlApiProducts}?limit=${parseInt(limit)}`);

        if (!response.ok) {
            throw new Error("Error", response.status);
        }

        const datos = await response.json();
        console.log(datos);

    } catch (error) {
        console.error(error);
    };
};


// 3. Agregar un nuevo producto (product).
const createProduct = async (addProduct) => {
    try {
        const response = await fetch(urlApiProducts, {
            method: "POST", headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(addProduct)
        });

        if (!response.ok) {
            throw new Error("Error", response.status);
        }

        const datos = await response.json();
        console.log(`Los datos del producto agregado son:\nTitulo: ${addProduct.title} \nPrecio: ${addProduct.price} \nDescripción: ${addProduct.description} \nCategoria: ${addProduct.category}`);


    } catch (error) {
        console.error(error);
    };
};


// 4. Retornar un producto (product) según un “id” como parámetro.
const getById = async (id) => {
    try {
        const response = await fetch(`${urlApiProducts}/${parseInt(id)}`);

        if (!response.ok) {
            throw new Error("Error", response.status);
        }

        const datos = await response.json();
        console.log(datos);


    } catch (error) {
        console.error(error);
    };
};


const deleteProduct = async (id) => {
    try {
        const response = await fetch(`${urlApiProducts}/${id}`, {
            method: "DELETE", headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error("Error", response.status);
        }

        const datos = await response.json();
        console.log(`Los datos del producto eliminado son:\nTitulo: ${datos.title} \nPrecio: ${datos.price} \nDescripción: ${datos.description} \nCategoria: ${datos.category}`);


    } catch (error) {
        console.error(error);
    };
}


// TESTEO

const main = async () => {
    // 1

    getAll();

    // 2
    getLimited(9);


    // 3
    const newProduct = {
        title: 'test product',
        price: 13.5,
        description: 'lorem ipsum set',
        image: 'https://i.pravatar.cc',
        category: 'electronic'
    };
    createProduct(newProduct);


    // 4
    getById(18);

    // 5
    deleteProduct(9)

}


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

        const idProducto = await response.json();

        console.log(`Los datos del producto agregado son:\nID: ${idProducto.id}\nTitulo: ${addProduct.title}\nPrecio: ${addProduct.price}\nDescripción: ${addProduct.description}\nCategoria: ${addProduct.category}`);


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

// 5. Eliminar un producto (product).
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
        console.log(`Los datos del producto eliminado son:\nID: ${datos.id}\nTitulo: ${datos.title} \nPrecio: ${datos.price} \nDescripción: ${datos.description} \nCategoria: ${datos.category}`);


    } catch (error) {
        console.error(error);
    };
}


// TESTEO

const main = async () => {
    // 1

    // await getAll();

    // 2
    // await getLimited(9);


    // 3
    const newProduct = {
        title: 'test product',
        price: 13.5,
        description: 'lorem ipsum set',
        image: 'https://i.pravatar.cc',
        category: 'electronic'
    };

    await createProduct(newProduct);


    // 4
    // await getById(18);

    // 5
    await deleteProduct(9)

}

main()


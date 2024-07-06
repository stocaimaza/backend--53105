//Integramos MercadoPago del lado del cliente: 

const mp = new MercadoPago("tukey", {
    locale: "es-AR"
})

document.getElementById("checkout-btn").addEventListener("click", async () => {

    try {
        //Datos de mi producto: 

        const orderData = {
            title: "Patito",
            quantity: 1,
            price: 100
        }

        //Usamos fetch para conectarnos con nuestro backend: 
        const response = await fetch("http://localhost:3000/create-preference", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(orderData)
        });

        const preference = await response.json();
        createCheckoutButton(preference.id);
    } catch (error) {
        alert("Error fatal vamos a re morir! ahhh re locooo");
    }
})

const createCheckoutButton = (preferenceId) => {
    const bricksBuilder = mp.bricks(); 

    const renderComponent = async () => {
        //Correccion para evitar que se dupliquen los botones: 
        if(window.checkoutButton) window.checkoutButton.unmount();
            //Si ya existe el boton lo voy a desmontar. 
        await bricksBuilder.create("wallet", "wallet_container", {
            initialization: {
                preferenceId: preferenceId
            }
        })
    }
    renderComponent();
}
/** CLASE 16 - PRIMER BLOQUE: MAILING Y MENSAJERIA  **/

//Temas de hoy: 

//1) Protocolo SMTP. 
//2) Nodemailer. 
//3) Twilio: sms y whatsapp. 

///////////////////////////////////////////////////////////////

//SMTP: (Simple Mail Tranfer Protocol) o espanish: Protocolo de Transferencia de Mail Simple, es el protocolo que nuestras aplicaciones utilizan siempre que se tiene que enviar un correo electronico. 

//Nodemailer: es una librería que nos permite realizar el envio de mensaje desde nuestras Apps. 
//Recuerden que Nodemailer trabaja como un puente entre nuestra aplicación y los servicios de un mail traicional. 

import express from "express";
import nodemailer from "nodemailer";
const app = express();
const PUERTO = 8080; 

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("./src/public"));

//Creamos un objeto especial llamado "transport". Acá voy a configurar el servicio SMTP que vamos a utilizar. 

const transport = nodemailer.createTransport({
    service: "gmail", 
    port: 587,
    auth: {
        user: "coderhouse53105@gmail.com",
        pass: "sdwq mebe kqzt ennc"
    }
})

//Rutas

app.get("/mail", async (req, res) => {
    try {
        await transport.sendMail({
            from: "Banco Macro <seguridad@macro.com>",
            to: "stocaimaza@hotmail.com",
            subject: "Correo de Prueba",
            html: `<h1>Te secuestramos el Visual!</h1>
                    <img src="cid:logo1"> `,
            //Para enviar como un archivo adjunto: 
            attachments: [{
                filename: "logo.jpg",
                path:"./src/public/img/logo.jpg",
                cid: "logo1"
            }]
        })

        res.send("Correo enviado correctamente!");
    } catch (error) {
        res.status(500).send("Error al enviar mail, vamos a morir.");
    }
})

//Usando el index.html:

app.post("/enviarmensaje", async (req, res) => {
    const {email, mensaje} = req.body; 

    try {
        await transport.sendMail({
            from: "Coder Test",
            to: email, 
            subject: "TEST",
            text: mensaje
        })

        res.send("Correo enviado exitosamenteee la vida nos sonrieeeee, este find e semana sera perfecto")
    } catch (error) {
        res.status(500).send("Todo nos sale mal, tantas carreras para decidir y elegi la que no tengo talento"); 
    }
})


app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto ${PUERTO}`);
})

/////////////////////////////////////////////////////////////

//TWILIO: servicio que nos permite enviar SMS, WhatsApp, Chatbots, mensajes de voz pregrabados. 


//Instalamos: npm install twilio
//Importamos: 
import twilio from "twilio";

const TWILIO_ACCOUNT_SID = "ACfaf23f26e4751e69130a69a8a3f3cdd3"; 
const TWILIO_AUTH_TOKEN = "398386f770f80f2487709f7053db1d83";
const TWILIO_SMS_NUMBER = "+13133297827";

//Configurar un cliente: 
const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_SMS_NUMBER);

//Creamos una ruta para enviar sms: 

app.get("/sms", async (req, res) => {
    await client.messages.create({
        body: "Esto es un sms de prueba, no te asustes",
        from: TWILIO_SMS_NUMBER,
        to: "+542236693878"
    })
    res.send("Enviado al SMS!");
})



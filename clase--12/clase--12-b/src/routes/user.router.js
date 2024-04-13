import Router from "./router.js";

class UserRouter extends Router {
    init() {
        //Acá colocamos todas nuestra rutas: 
        this.get("/", (req, res) => {
            //res.send("Get de usuarios");
            res.sendSuccess("Hola, aguante dormir la siesta");
        })

    }
}

export default UserRouter;

import express from "express";
const router = express.Router(); 

router.get("/register", (req, res) => {
    if(req.session.login) {
        return res.redirect("/profile");
    }
    res.render("register");
})

router.get("/login", (req, res) => {
    res.render("login");
})

router.get("/profile", (req, res) => {
    if(!req.session.login){
        return res.redirect("/login");
    }
    res.render("profile", {user: req.session.user})
})

export default router; 
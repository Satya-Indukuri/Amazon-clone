const express = require("express");
const router = new express.Router();
const Products = require("../models/productsSchema");
const USER = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const products = require("../constant/productsdata");
const jwt = require("jsonwebtoken");
const secretKey = process.env.KEY;
const protectedRoute = require("../middleware/protectedResource");


router.get("/getproducts", async(req, res)=>{
    try {
        console.log("getting all the products details in the database");
        const productsdata = await Products.find();
        // console.log(productsdata);
        res.status(201).json(productsdata);
    } catch (error) {
        console.log("error "+error.message);
        res.status(500).json({ error: error.message });
    }
})

// router.get("/getproductsone/:id", async(req, res) =>{
//     try {
//         const {id} = req.params;
//         console.log(id);
//         const individualdata = await Products.findOne({id:id});
//         // console.log(individualdata);
//         res.status(201).json(individualdata);
//     } catch (error) {
        
//     }
// })

router.get("/getproductsone/:id", async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`Getting product details for ID: ${id}`);
        const individualdata = await Products.findOne({ id: id });
        if (!individualdata) {
            console.log("Product not found");
            return res.status(404).json({ error: "Product not found" });
        }
        console.log("Product details:", individualdata);
        res.status(200).json(individualdata);
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ error: error.message });
    }
});

router.post("/register", async(req,res)=>{
    // console.log(req.body);
    const {fname, email, mobile, password, cpassword} = req.body
    console.log(req.body);
    if(!fname || !email || !mobile || !password || !cpassword){
        console.log("necessary fields missing");
        return res.status(500).json({error: "Fill all the fields"});
        
    }

    try {
        const preuser = await USER.findOne({email:email});

        if(preuser){
            res.status(500).json({error: "User with email already exists"});
        }else if(password !== cpassword){
            res.status(500).json({error: "password and confirm password doesn't match"});
        }else{
            const finalUser = new USER({
                fname, email, mobile, password, cpassword
            });

            const storedata = await finalUser.save();
            console.log(storedata);

            res.status(201).json(storedata);
        }


    } catch (error) {
        console.log("error");
        console.log(error.message);
    }
})

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Invalid credentials - fill all the fields" });
    }

    try {
        const userLogin = await USER.findOne({ email: email });
        if (!userLogin) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, userLogin.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }else{
            const jwtToken = jwt.sign({_id:userLogin._id}, secretKey);
            const userInfo = {"email": userLogin.email, "fname":userLogin.fname}
            res.status(201).json({ result: {token:jwtToken, user:userLogin}});
        }
        
    } catch (error) {
        console.error("Error logging in:", error.message);
        res.status(500).json({ error: "Server error" });
    }
});


router.post("/addcart/:id", protectedRoute, async(req,res)=>{
    try {
        console.log("adding to cartttt");
        const {id} = req.params
        const cart = await Products.findOne({id:id});
        console.log("cart "+cart);

        const userContact = await USER.findOne({_id: req.user._id});
        console.log(userContact);

        if(userContact){
            const cartData = await userContact.addcartdata(cart);
            await userContact.save();
            console.log(cartData);
            res.status(201).json(userContact);
        }else{
            res.status(401).json({error:"invalid user - make sure to login"});
        }
    } catch (error) {
        res.status(401).json({error:"invalid user - make sure to login"});
    }
})

router.post("/cartdetails", protectedRoute, async(req,res)=>{
    try {
        console.log("getting cart details be");
        const buyuser = await USER.findOne({_id:req.user._id});
        res.status(201).json(buyuser);
    } catch (error) {
        console.log("error "+error);
        res.status(401).json({error: "User not logged in"});
    }
})

router.post("/validuser", protectedRoute, async(req,res)=>{
    try {
        console.log("validating the userrrrrrrrrrrr");
        const validuserone = await USER.findOne({_id:req.user._id});
        res.status(201).json(validuserone);
    } catch (error) {
        console.log("error "+error);
        res.status(401).json({error: "User not logged in router"});
    }
})

router.post("/remove/:id", protectedRoute, async(req,res)=>{
    try {
        console.log("removing item from cart");
        const {id} = req.params;
        req.user.carts = req.user.carts.filter((curval)=>{
            return curval.id != id;
        });

        req.user.save();
        res.status(201).json(req.user);
        console.log("item removed from cart");
    } catch (error) {
        console.log("error - "+error);
        res.status(400).json({error: "Error while removing item from cart"});
    }
});


router.post("/logout", protectedRoute, async (req, res) => {
    try {
        console.log("logging out user");
        req.user.tokens = []; // Clear the entire tokens array
        await req.user.save(); // Save the updated user document
        
        res.status(201).json({ message: "Logged out successfully" });
        console.log("user logges out successfully");
    } catch (error) {
        console.log("Error during logout: " + error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
const express = require("express");
const router = express.Router();

const City = require("../models/City");
const verifyToken = require("../middleware/auth");

router.delete("/:id", verifyToken, async (req, res) => {
    try {
        const cityDeleteCondition = { _id: req.params.id, user: req.userId };
        const deletedCity = await City.findByIdAndDelete(cityDeleteCondition);

        if (!deletedCity) {
            return res.status(401).json({
                success: false,
                message: "city not found or usernot authorise",
            });
        }
        res.json({
            success: true,
            cities: deletedCity,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});

// /api/cites
router.post("/", verifyToken, async (req, res) => {
    const { lat, lon } = req.body;
    if (!lat || !lon)
        return res.status(400).json({
            success: false,
            message: "latitude and longtude is required",
        });
    try {
        const newCity = new City({
            lat,
            lon,
            user: req.userId,
        });

        await newCity.save();

        res.json({ success: true, message: "Success", cities: newCity });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});
router.get("/", verifyToken, async (req, res) => {
    try {
        const cities = await City.find({ user: req.userId }).populate("user", [
            "username",
        ]);
        res.json({ success: true, cities });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});
module.exports = router;

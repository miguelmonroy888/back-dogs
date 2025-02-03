const express = require('express');
const DogsService = require('../services/dogs');

function dogsApi(app) {
    const router = express.Router();
    app.use("/api/dogs", router);

    const dogsService = new DogsService();

    router.get("/", async function (req, res, next) {
        try {
            const dogs = await dogsService.getBreeds();
            res.status(200).json({
                data: dogs.data,
                message: 'dogs listed'
            });
        } catch (err) {
            next(err);
        }
    });

    router.post("/favorite-dog", async function (req, res, next) {
        const { body: email } = req;
        try {
            const img = await dogsService.getFavoriteDog(email.email);
            res.status(200).json({
                data: img,
                message: 'favorite dog'
            });
        } catch (err) {
            next(err);
        }
    });

    router.post("/add-favorite-dog", async function (req, res, next) {
        const { body: email } = req;
        try {
            const img = await dogsService.createFavoriteDog(email);
            res.status(200).json({
                data: img,
                message: 'favorite dog created'
            });
        } catch (err) {
            next(err);
        }
    });

    router.put("/update-favorite-dog", async function (req, res, next) {
        const { body: obj } = req;
        try {
            const updateUsr = await dogsService.updateFavoriteDog(obj);
            res.status(200).json({
                data: updateUsr,
                message: 'favorite dog updated'
            });
        } catch (err) {
            next(err);
        }
    });

    router.get("/random-image", async function (req, res, next) {
        try {
            const img = await dogsService.randomImage();
            res.status(200).json({
                data: img.data,
                message: 'random image'
            });
        } catch (err) {
            next(err);
        }
    });

    router.get("/random-images", async function (req, res, next) {
        try {
            const img = await dogsService.randomImages();
            res.status(200).json({
                data: img.data,
                message: 'random images'
            });
        } catch (err) {
            next(err);
        }
    });

}

module.exports = dogsApi;
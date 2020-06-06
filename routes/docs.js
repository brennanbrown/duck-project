const express = require("express");

const router = express.Router();

module.exports = () => {
    router.get("/", async (request, response, next) => {
        try {
            return response.render("layout", {
                pageTitle: "Duck Portfolio - Documentation",
                template: "docs",
            });
        } catch (err) {
            return next(err);
        }
    });
    return router;
};
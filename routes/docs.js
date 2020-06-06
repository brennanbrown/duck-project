const express = require("express");

const router = express.Router();

module.exports = () => {
    router.get("/", async (request, response, next) => {
        return response.render("layout", {
            pageTitle: "Documentation",
            template: "docs",
        });
    });
    return router;
};
const express = require("express");

const projectRoute = require("./project");
const feedbackRoute = require("./feedback");

const router = express.Router();

// This method allows arguments to be passed 
// from the application down to the route as function parameters. 
module.exports = params => {
    router.get("/", (request, response, next) => {

        // Using cookies to track the amount of visitors,
        // specific to a given user.
        if(!request.session.visitcount) {
            request.session.visitcount = 0;
        }

        request.session.visitcount += 1;
        console.log(`Number of visits: ${request.session.visitcount}`);

        try {
            response.render("pages/index", { pageTitle: "Home of the Ducks! 🦆"});
        } catch (err){
            return next(err);
        }    
    });

    router.use("/project", projectRoute(params));
    router.use("/feedback", feedbackRoute(params));

    return router;
};

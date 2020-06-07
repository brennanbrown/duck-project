const express = require("express");

const projectRoute = require("./project");
const feedbackRoute = require("./feedback");
const docsRoute = require("./docs");


const router = express.Router();

// This method allows arguments to be passed 
// from the application down to the route as function parameters. 
module.exports = params => {
    router.get("/", async (request, response, next) => {
        const { projectService } = params;

        // Using cookies to track the amount of visitors,
        // specific to a given user.
        if(!request.session.visitcount) {
            request.session.visitcount = 0;
        }

        request.session.visitcount += 1;
        console.log(`Number of visits: ${request.session.visitcount}`);

        try {
            const getList = await projectService.getList();
            return response.render("layout", {
                pageTitle: "Duck Portfolio - Home 🦆",
                template: "index",
                getList
            });
        } catch (err) {
            return next(err);
        }
    });

    router.use("/project", projectRoute(params));
    router.use("/feedback", feedbackRoute(params));
    router.use("/docs", docsRoute(params));

    return router;
};

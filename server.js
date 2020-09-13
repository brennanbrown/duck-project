/**
 * Required External Modules
 */

const express = require("express");
const path = require("path");
const cookieSession = require("cookie-session");
const createError = require("http-errors");
const bodyParser = require("body-parser");
const csp = require("helmet-csp");

// Adding business logic to the server.
const ProjectService = require("./services/ProjectService");
const FeedbackService = require("./services/FeedbackService");

// Create instances of the above classes.
const projectService = new ProjectService("./data/project.json");
const feedbackService = new FeedbackService("./data/feedback.json");

const routes = require("./routes");


/**
 * App Variables 
 */

const app = express();
const port = process.env.PORT || "3000";

// Required if running through reverse proxy like NGINX
app.set("trust proxy", 1);


/**
 * Middleware
 */

// Request the lifecycle, to fetch cookies that are sent with
// the headers that come from the client and parse them 
// and also then set them on the request object.
app.use(
    cookieSession({
        name: "session",
        // Just example keys.
        keys: ["F56FsQQwE3r5", "htryhfgDSFG4"],
    })
);

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

/**
 * Routes Definitions
 */

// Utilizing the EJS template
app.set("view engine", "ejs");
// Expects the template to be in the "views" folder
app.set("views", path.join(__dirname, "./views"));

app.locals.siteName = "Untitled Duck Project";


// Before routing handlers are defined, there needs to be
// "app.use" and the middleware called "express.static"
app.use(express.static(path.join(__dirname, "./src")));

app.use(
    "/",
    // Will pass down the service instances to the routes. 
    routes({
        feedbackService: feedbackService,
        projectService: projectService
    })
);


/**
 * Error Handling
 */

app.use(async (request, response, next) => {
    try {
        return next();
    } catch (err) {
        return next(err);
    }
});

app.use((request, response, next) => {
    try {
        return next();
    } catch (err) {
        return next(createError(404, "File not found"));
    }
});

app.use((err, request, response, next) => {
    response.locals.message = err.message;
    // Will log the error information and trace stack
    // to the developer, but not the user.
    console.error(err);
    const status = err.status || 500;
    response.locals.status = status;
    response.status(status);
    response.render("error");
});


/**
 * Content Security Policy
 */

app.use(csp({
    directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "maxcdn.bootstrapcdn.com", "fonts.googleapis.com"]
    }
}));

/**
 * Server Activation
 */

app.listen(port, () => {
    console.log(`Express Server is Listening on port ${port}!`);
});
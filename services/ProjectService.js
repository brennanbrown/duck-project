const fs = require("fs");
const util = require("util");

/**
 * We want to use async/await with fs.readFile - util.promisfy gives us that
 */
const readFile = util.promisify(fs.readFile);

/**
 * Logic for fetching project information
 */
class ProjectService {
    /**
   * Constructor
   * @param {*} datafile Path to a JSOn file that contains the project data
   */
    constructor(datafile) {
        this.datafile = datafile;
    }

    /**
   * Returns a list of project name and short name
   */
    async getNames() {
        const data = await this.getData();

        // We are using map() to transform the array we get into another one
        return data.map(project => {
            return { name: project.name, topic: project.topic };
        });
    }

    /**
   * Get all artwork of a given project
   * @param {*} topic The project short name
   */
    async getArtworkForProject(topic) {
        const data = await this.getData();
        const project = data.find(elm => {
            return elm.topic === topic;
        });
        if (!project || !project.artwork) return null;
        return project.artwork;
    }

    /**
   * Get project information provided a topic
   * @param {*} topic
   */
    async getProject(topic) {
        const data = await this.getData();
        const project = data.find(elm => {
            return elm.topic === topic;
        });
        if (!project) return null;
        return {
            date: project.date,
            name: project.name,
            topic: project.topic,
            description: project.description,
        };
    }

    /**
   * Returns a list of project with only the basic information
   */
    async getListShort() {
        const data = await this.getData();
        return data.map(project => {
            return {
                name: project.name,
                topic: project.topic,
                date: project.date,
            };
        });
    }

    /**
   * Get a list of project
   */
    async getList() {
        const data = await this.getData();
        return data.map(project => {
            return {
                name: project.name,
                topic: project.topic,
                date: project.date,
                end: project.end,
                description: project.description,
                hyperlink: project.hyperlink,
                artwork: project.artwork
            };
        });
    }

    /**
   * Fetches project data from the JSON file provided to the constructor
   */
    async getData() {
        const data = await readFile(this.datafile, "utf8");
        // if (!data) return [];
        return JSON.parse(data).project;
    }
}

module.exports = ProjectService;

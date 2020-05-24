const fs = require("fs");
const util = require("util");

/**
 * We want to use async/await with fs.readFile - util.promisfy gives us that
 */
const readFile = util.promisify(fs.readFile);

/**
 * Logic for fetching animals information
 */
class AnimalService {
    /**
   * Constructor
   * @param {*} datafile Path to a JSOn file that contains the animals data
   */
    constructor(datafile) {
        this.datafile = datafile;
    }

    /**
   * Returns a list of animals name and short name
   */
    async getNames() {
        const data = await this.getData();

        // We are using map() to transform the array we get into another one
        return data.map(animal => {
            return { name: animal.name, shortname: animal.shortname };
        });
    }

    /**
   * Get all artwork
   */
    async getAllArtwork() {
        const data = await this.getData();

        // Array.reduce() is used to traverse all animals and
        // create an array that contains all artwork
        const artwork = data.reduce((acc, elm) => {
            if (elm.artwork) {
                // eslint-disable-next-line no-param-reassign
                acc = [...acc, ...elm.artwork];
            }
            return acc;
        }, []);
        return artwork;
    }

    /**
   * Get all artwork of a given animal
   * @param {*} shortname The animals short name
   */
    async getArtworkForAnimal(shortname) {
        const data = await this.getData();
        const animal = data.find(elm => {
            return elm.shortname === shortname;
        });
        if (!animal || !animal.artwork) return null;
        return animal.artwork;
    }

    /**
   * Get animal information provided a shortname
   * @param {*} shortname
   */
    async getAnimal(shortname) {
        const data = await this.getData();
        const animal = data.find(elm => {
            return elm.shortname === shortname;
        });
        if (!animal) return null;
        return {
            title: animal.name,
            name: animal.name,
            shortname: animal.shortname,
            description: animal.description
        };
    }

    /**
   * Returns a list of animals with only the basic information
   */
    async getListShort() {
        const data = await this.getData();
        return data.map(animal => {
            return {
                name: animal.name,
                shortname: animal.shortname,
                title: animal.title
            };
        });
    }

    /**
   * Get a list of animals
   */
    async getList() {
        const data = await this.getData();
        return data.map(animal => {
            return {
                name: animal.name,
                shortname: animal.shortname,
                title: animal.title,
                summary: animal.summary
            };
        });
    }

    /**
   * Fetches animals data from the JSON file provided to the constructor
   */
    async getData() {
        const data = await readFile(this.datafile, "utf8");
        return JSON.parse(data).animals;
    }
}

module.exports = AnimalService;

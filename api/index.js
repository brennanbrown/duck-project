const express = require('express')

const setupV2Routes = require('./setupv2Routes')

const Router = express.Router

const database = require('../database')

const setupV1Routes = (apiRouter) => {

  // Controller Functions
  function findAllPosts(request, response) {
    let allPosts = database.findAllPosts()
    response.send(allPosts)
  }

  function addNewPost(request, response) {
    console.log('saving post', request.body)
    database.addPost(request.body)
    response.sendStatus(200)
  }

  // Routing
  const v1Router = Router()
  v1Router.get('/posts', findAllPosts)
  v1Router.post('/addPost', addNewPost)

  apiRouter.use('/v1', v1Router)
};

const apiRouter = Router()
setupV1Routes(apiRouter)
setupV2Routes(apiRouter)

module.exports = apiRouter

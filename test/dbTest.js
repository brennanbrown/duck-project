let chai = require('chai')
let db = require('../database/inMemory')

let expect = chai.expect

describe('Database', (done)=> {

  beforeEach('clean out the database', (done) => {
    db.clear().then(done, done)
  })

  after('close the database connection', (done) => {
    db.close().then(done, done)   
  })

  it('should be empty at the start of the test', (done) => {
    db.findAllPosts()
    .then((posts) => {
        expect(posts).to.be.an('array')
        expect(posts.length).to.equal(0)
    })
    .then(done)
    .catch(done)
  })

  it('should find a post that is added', (done) => {
    const message = {
      messageText: 'Your very first message',
      author: 'Anonymous',
      messageDate: new Date().toISOString().substring(0, 10),
    }

    db.addPost(message)
    .then(() => db.findAllPosts())    
    .then((posts) => {
        expect(posts).to.be.an('array')
        expect(posts.length).to.equal(1)
        expect(posts[0].messageText).to.equal('Your very first message')
    })
    .then(done)
    .catch(done)
  })

  it('should update a post', (done) => {
    const message = {
      messageText: 'Your very first message',
      author: 'Anonymous',
      messageDate: new Date().toISOString().substring(0, 10),
    }
    
    db.addPost(message)
    .then((addedMessage) => {
        let updatedMessage = { ...addedMessage }
        updatedMessage.messageText = 'My updated message'
        return db.updatePost(updatedMessage)
    })
    .then(() => db.findAllPosts())
    .then((posts) => {
        expect(posts).to.be.an('array')
        expect(posts.length).to.equal(1)
        expect(posts[0].messageText).to.equal('My updated message')
    })
    .then(done)
    .catch(done)
  })

})
/*
*
*
*       Complete the API routing below
*       
*       
*/
const Server = require('../database/server');

'use strict';

module.exports = function (app) {

  app.route('/api/books')
    .get(function (req, res){
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
      Server.getAllBook()
        .then((data) => {
          res.json(data);
        })
        .catch((err) => {
          res.send('ERROR!!')
        })
    })
    
    .post(function (req, res){
      let title = req.body.title;
      //response will contain new book object including atleast _id and title
      if(!title || title === "") {
        return res.send('missing required field title');
      }

      Server.addBook(title)
        .then((data) => {
          res.json(data);
        })
        .catch((err) => {
          res.send('ERROR!!')
        })
    })
    
    .delete(function(req, res){
      //if successful response will be 'complete delete successful'
      Server.deleteAllBooks()
        .then(() => {
          res.send('complete delete successful');
        })
        .catch((err) => {
          res.send('ERROR!!');
        })
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      let bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
      if(!bookid || bookid === "") {
        return res.send('no book exists');
      }

      Server.getBook(bookid)
        .then((data) => {
          res.json(data);
        })
        .catch((err) => {
          return res.send('no book exists');
        })
    })
    
    .post(function(req, res){
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get
      if(!comment || comment === "") {
        return res.send('missing required field comment');
      }

      Server.addComment(bookid, comment)
        .then((data) => {
          res.json(data);
        })
        .catch((err) => {
          return res.send('no book exists');
        })
    })
    
    .delete(function(req, res){
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
      if(!bookid || bookid === "") {
        return res.send('no book exists');
      }

      Server.deleteBook(bookid)
        .then((data) => {
          return res.send(data);
        })
        .catch((err) => {
          return res.send('no book exists');
        })
    });
  
};

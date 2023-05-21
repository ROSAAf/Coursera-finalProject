const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const {username,password} = req.body;
  if(isValid(username)){
    users.append({username,password})
    return res.status(300).json({message: "register successfully"});
  }else{
    return res.status(401).json({message:"invalid username"})
  }
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  // get book info
  const book = Object.values(books)
  return res.status(300).json({message: "list of available books in the shop are readyb",books:book});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const id = Object.keys(books)
  // check for id checking
  const filteredID = id.filter(item=>item==req.params.isbn)
  const book = books[filteredID]?books[filteredID]:null
  return res.status(300).json({message: "Yet to be implemented",book});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const book = Object.values(books)
  const filteredBook = book.filter(item=>item.author==req.params.author)
  return res.status(300).json({message: "Yet to be implemented",book:filteredBook});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const book = Object.values(books)
  const filteredBook = book.filter(item=>item.title==req.params.title)
  return res.status(300).json({message: "Yet to be implemented",book:filteredBook});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const id = Object.keys(books)
  // check for id checking
  const filteredID = id.filter(item=>item==req.params.isbn)
  const book = books[filteredID]?books[filteredID]:null
  let reviews;
  if(book!=null) reviews = book.reviews;
  else reviews = null; 
  return res.status(300).json({message: "Yet to be implemented",reviews});
});

module.exports.general = public_users;
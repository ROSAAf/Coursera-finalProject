const express = require("express");
const jwt = require("jsonwebtoken");
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => {
  //returns boolean
  //write code to check is the username is valid
  if(username.lenght<3 || username ==""){
    return false
  }
  else if(username.lenght>3 ){
    return true
  }
};

const authenticatedUser = (username, password) => {
  //returns boolean
  //write code to check if username and password match the one we have in records.
  users.filter(item=>{
    if(item.username===username && item.password===password){
      return true;
    }else{
      return false;
    }
  })
};

//only registered users can login
regd_users.post("/login", (req, res) => {
  //Write your code here
  const {username,password} = req.body;
  if(isValid(username)){
    if(authenticatedUser(username,password)){
      return res.status(300).json({ message: "login",user:req.params.body});
    }else{
      return res.status(300).json({ message: "wrong password"});
    }
  }else{
    return res.status(300).json({ message: "Invalid username"});
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  if (existBook) {
    const review = req.body;
    const lenght = Object.keys(books[req.params.isbn].reviews).length;
    books[req.params.isbn].reviews[lenght + 1] = review;
    return res.status(300).json({ message: "review added", books });
  } else {
    return res
      .status(300)
      .json({ message: "book with this isbn number is not exist!" });
  }
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;

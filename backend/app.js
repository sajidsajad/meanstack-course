const express = require('express'); //import 
const bodyParser = require('body-parser');

const app = new express();

// ---------------------------   for example purpose ------------------------------------
// app.use((req, res, next) => {
//     next(); // purpose of next() - make the request to continue its journey
// });


// app.use((req, res, next) => {  
//     res.send('Welcome from express!'); // here we stop the request to continue and send  back the response
// });
//-------------------------------------------------------------------------------------

// return a valid express middleware for parsing Json data
app.use(bodyParser.json());
// for parsing URLencoded data and adding configuration: "extended: false" - to support only default features in URL encoding
app.use(bodyParser.urlencoded({extended: false})); 

//to avoid CORS error issue, set headers:
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers", 
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods", 
        "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
});


app.post('/api/posts', (req, res, next) => {
    const post = req.body; //body we will get by body-parser
    console.log(post);
    res.status(201).json({
        message: 'Post is added successfully!'
    });
});


app.use('/api/posts', (req, res, next) => {
    const posts = [
          { id:1, title: 'first', content: 'first post'},
          { id:2, title: 'second', content: 'second post'},
          { id:3, title: 'third', content: 'third post'}
        ];
    res.status(200).json({
        message: 'Posts are fetched successfully!',
        posts: posts
    });
});

module.exports = app;
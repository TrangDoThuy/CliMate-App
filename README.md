# CliMate-App
## High Level Design

## NLP design
### Input data: 
+ You can run file get_data.py to get the data from NewsAPI. Please change the key API in url link to your key API if exceed the limit :))

https://newsapi.org/

### 2 main points:
+ classification: ? how can we label articles

+ chatbot: answer questions related to environment and climate change

Based on https://github.com/deepset-ai/haystack
https://haystack.deepset.ai/docs/latest/documentstoremd
### Output:
Use FastAPI to send data to mobile app backend

[
![Screenshot 2020-12-29 123610](https://user-images.githubusercontent.com/30380242/105354141-1922eb00-5c2b-11eb-8008-de6b0edebf83.jpg)
](url)

## Mobile app part:
### 1. Environment set up:

#### Node.js: https://nodejs.org/en/ for backend part
#### VS Code: https://code.visualstudio.com/ for text editor

We may need some extensions for better programming:

- Bracket Pair Colorizer
- ES7 React/Redux/GraphQL/React-Native snippets
- Prettier
#### git: https://git-scm.com/
#### Postman: https://www.postman.com/ to test API for backend
#### React Developer Tools: from chrome web store, when our project has website version
#### Redux DevTools: from chrome web store, to show whole application
#### Git Bash: for window user if you like

### 2. Database: MongoDB

We're using a cloud database

- Install Mongoose package with NPM to interact with database

### 3. Install dependencies and Setup Express

- Type `npm init` in terminal in VSCode

- We will use Express as our main web framework backend

Type `npm i express express-validator bcryptjs config gravatar jsonwebtoken mongoose request`

`validator` to validate data when we call API,

`bcryptjs` for password encryption then we will never store plain text passwords in database, 

`config` for global variables

`gravatar` for profile avatar: when users sign up with an registered email, then it will automatically show their profile image

`jsonwebtoken` we use JWT to pass a token for validation

`mongoose` a top layer of database for us to interact with it

`request` to make recall HDP requests to another API

 - Type `npm i -D nodemon concurrently`
 
`nodemon` to constantly watch our server so that we dont have to refresh it when we make any change

`concurrently` to run our back end Express server and front end React Native server at the same time with a command.

### 4. Start with Express:

- Create file server.js

with content as follow:

```
const express = require('express');

const app = express();

app.get('/', (req, res) => res.send('API Running'));

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>console.log(`Server started on port ${PORT}`));
```

We open terminal in VSCode, then type `npn run server`

When you go to Postman, at GET type `http://localhost:5000` you will receive "API running"

### 5. Connect backend to database Mongo D.B Atlas
- Go to MongoDB Atlas, click connect and get connection string

- In VSCode, create a folder called "Config" and a new file called "default.json" inside
```
{
    "mongoURI": <connection string>
}
```

- We create a file called "db.js" to connect to MongoDB


```
const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () =>{
    try {
        await mongoose.connect(db,{
            useNewUrlParser: true 
        });
        console.log('MongoDB Connected ...');
    } catch (err){
        console.error(err.message);
        // Exit process with failure
        process.exit(1); 
    }
}
```

- Back to our server.js file, we need add 2 lines to call function `connectDB()`

after that, our server.js file looks like this

```
const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();

app.get('/', (req, res) => res.send('API Running'));

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>console.log(`Server started on port ${PORT}`));
```

### 6. Create Route files with Express Router

- Create a foulder routes/api/, inside that we have these files: 

users.js : to register and add new users

auth.js : to get web token for authentication

profile.js : to fetch profiles

post.js : to add post, like and comment

For each file, we have some small thing like that: 
```
const express = require('express');
const router = express.Router(); 
// @route       GET api/auth
// @desc        Test route 
// @access      Public
router.get('/',(req, res) => res.send('Auth route'));

module.exports = router;
```

And in the "server.js" file we define all routes
```
app.use('/api/users',require('./routes/api/users'));
app.use('/api/auth',require('./routes/api/auth'));
app.use('/api/posts',require('./routes/api/posts'));
app.use('/api/profile',require('./routes/api/profile'));
```

Then at that point, we can use Postman to test our API

For example: type "http://localhost:5000/api/users", the we will get User route

In the Postman, we create 3 folder in collections: Posts, Profiles, and Users&Auth

### 7. Creating the user model

We will handle users registers and authentication. To interact with database, we need to create model for each resource.

So, first, we will create "models" folder containing a file called User.js

This file will have schema to hold different fields that we want

```
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type:String,
        required: true
    },
    avatar:{
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('user', UserSchema);
```

### 8. Request & Body Validation
In this step, we will use POST instead of GET in the routes/users.js file because we need to send name, email and password to register a user.

We also need to init the middleware for the body parser, so we add 2 lines in the server.js file

```
// Init Middleware
app.use(express.json({extended: false}));
```

By doing that, we are able to get the data in request.body

When users endtered email and password, we need to validate these data

We use `check` and `validationResult` from express

Our routes/api/users.js should be changed to this:

```
const express = require('express');
const router = express.Router(); 
const {check, validationResult} = require("express-validator");

// @route       POST api/users  
// @desc        Register route 
// @access      Public
router.post('/',
    [
        check('name','Name is required')
        .not()
        .isEmpty(),
        check('email','Please include a valid email').isEmail(),
        check(
            'password',
            'Please enter a password with 6 or more characters'
            ).isLength({min: 6})
    ],
    (req, res) => {
        const errors = validationResult(req); 
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }

        res.send('User route')
    }
    );

module.exports = router;
```

Now we can successfully send a post request to "api/users", then we save this request to Users & Auth in Postman Collection

### 9. User registration
- Check if user exists: we use `await User.findOne({email})` to find user by email
```
            let user = await User.findOne({email});
            if(user){
                res.status(400).json({error:[{msg:'Users already exists'}]});
            }
```

  If you find this "DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes inste Use createIndexes instead.", go to config and change try block into this part
  ```
        await mongoose.connect(db,{
            useNewUrlParser: true,
            useCreateIndex: true
        });
        console.log('MongoDB Connected ...');
  ```
- Get users gravatar
    first, we add package Gravatar
    
     `const gravatar = require('gravatar');`

    We pass the user's email into a method and get the URL of the gavatar
    
    ```
            const avatar = gravatar.url(email,{
                s: '200', //size
                r: 'pg',
                d: 'mm'
            })

            user = new User({
                name,
                email,
                avatar,
                password
            });
    ```
    
    
- Encrypt password
`const bcrypt = require('bcryptjs');`

We will need to use `salt`

```
            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);
            
            await user.save();
```

Alright!. Now you can use Postman to check our register feature.

- Return jsonwebtoken. We want that in the frontend, when users register, we want them to get logged in rightaway
 You can visit this website for more detail about jsonwebtoken https://jwt.io/
 
 In our case, we want to send user ID to identify user with token
 
 We need to first sign it, and pass our payload, or we send a response back to the client with that token
 
 We also need to create a piece of middleware to verify the token, either allow the user to access if it verifies or send back a response when token is invalid
 ```
             const payload = {
                user:{
                    id: user.id
                }
            };

            jwt.sign(
                payload,
                config.get('jwtSecret'),
                {expiresIn:  360000},
                (err, token)=>{
                    if(err) throw err;
                    res.json({ token});
                }
            );
 ```
 
  At this stage, when you try with Postman, you will receive a token. Try it out with https://jwt.io/
 

### 10. Custome Auth Middleware & JWT Verify
 We will create a middle ware by our own, but when we change to login with Facebook or Twitter, we will need to rewrite these code
 We create a new folder called "middleware" and a file "auth.js"
 
 ```
const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next){
    //Get token from header 
    const token = req.header('x-auth-token');

    // check if not token
    if(!token){
        return res.status(401).json({msg: 'No token, authorization denied'});
    }

    //verify token 
    try{
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        req.user = decoded.user;
        next();
    }catch(err){
        res.status(401).json({ msg: 'Token is invalid'});
    }

};
 ```
 
 We have a little change in routes/api/auth.js
 ```
const express = require('express');
const router = express.Router(); 

const auth = require('../../middleware/auth');

// @route       GET api/auth
// @desc        Test route 
// @access      Public
router.get('/',auth,(req, res) => res.send('Auth route'));

module.exports = router;
 ```
 
 Then you can use Postman, at `http://localhost:5000/api/auth`, with the key 'x-auth-token' and value is token you have received above.
 
 When we want to get data from user except the password, we wanna add this function
 ```
 router.get('/',auth,async(req, res) => {
    try{
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
 ```
 
 So now, if you try the Postman again with the token, you will get back the user's data
 
 
### 11. User authetication/ Login route

 This is quite similar as we had done in the register part. So we will reuse some code from routes/api/users.js
 
 The difference is we need to match email and password
 
 we have routes/api/users.js like that:
 
 ```
 const express = require('express');
const router = express.Router(); 
const {check, validationResult} = require("express-validator");
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');

const auth = require('../../middleware/auth');

const User = require('../../models/User');

// @route       GET api/auth
// @desc        Test route 
// @access      Public
router.get('/',auth,async(req, res) => {
    try{
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route       POST api/auth
// @desc        Authenticate user & get token
// @access      Public
router.post(
    '/',
    [
        check('email','Please include a valid email').isEmail(),
        check(
            'password',
            'Password is required'
            ).exists()
    ],
    async (req, res) => {
        const errors = validationResult(req); 
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }

        const {email, password} = req.body;
        
        try{
            // See if user exists
            let user = await User.findOne({email});
            if(!user){
                return res
                .status(400)
                .json({error:[{msg:'Invalid Credentials'}]});
            }

            // Return jsonwebtoken

            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch){
                return res
                .status(400)
                .json({error:[{msg:'Invalid Credentials'}]}); 
            }

            const payload = {
                user:{
                    id: user.id
                }
            };

            jwt.sign(
                payload,
                config.get('jwtSecret'),
                {expiresIn:  360000},
                (err, token)=>{
                    if(err) throw err;
                    res.json({ token});
                }
            );

        }catch(err){
            console.error(err.message);
            res.status(500).send('Server error');
        }




    }
    );


module.exports = router;
 ```
 
 When we try in Postman with correct email and password , we will receive a token
 

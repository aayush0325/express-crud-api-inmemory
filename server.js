//db.js
let db = [{
    username:"aayush@gmail.com",
    password:"123456",
    admin:"yes"
},{
    username:"bunny@gmail.com",
    password:"sdvsdvwvdmowe",
    admin:"no"
},{
    username:"pranjalbhaiya@iiita.ac.in",
    password:"owmvwe;vwev",
    admin:"no"
}];

//inputValidation.js
const zod = require('zod');

const schema = zod.object({
    username: zod.string().email(),
    password: zod.string().min(6),
    admin: zod.literal("yes").or(zod.literal("no"))
})

const displaySchema = zod.object({
    token: zod.string()
})

//server.js
const express = require('express');
const jwt = require('jsonwebtoken');
const PORT = process.env.PORT || 3000;
const jwtKey = '123';
const app = express();
app.use(express.json());

//landing.js
app.get('/',(req,res) => {
    res.send('you have reached aayush khanna\'s server');
});

//display.js
app.get('/display' ,(req,res) => {
    if(displaySchema.safeParse(req.body).success === true){
        jwt.verify(req.body.token,jwtKey,(err,decoded) => {
            if(err){
                res.send('invalid data' + err);
            }else{
                let response = [];
                if(decoded.admin === "yes"){
                    db.forEach((element) => {
                        response.push(element);
                    })
                    return res.send(response);
                }else{
                    db.forEach((element) => {
                        if(element.username === decoded.username && element.password ===decoded.password){
                            response.push(element);
                            return res.send(response);
                        }
                    })
                    res.send('user not found');
                }
            }
        })
    }else{
        res.status(411).send('invalid input');
    }
}); 

//signin.js
app.post('/signin', (req,res) => {
    if(schema.safeParse(req.body).success){
        db.forEach((element) => {
            if(element.username === req.body.username && element.password === req.body.password){
                return res.json(element);
            }
            res.send('user not found')
        })
    }else{
        res.status(411).send('invalid input');
    }
});

//delete.js
app.delete('/delete', (req,res) => {
        if(displaySchema.safeParse(req.body).success){
            jwt.verify(req.body.token,jwtKey,(err,decoded) => {
                if(err){
                    res.send('invalid data');
                }else{
                    db.forEach((element) => {
                        if(element.username===decoded.username && element.password === decoded.password){
                            const index = db.indexOf(element);
                            if(index==!-1){
                                db.splice(index,1);
                                return res.send('user profile deleted');
                            }
                        }
                    });

                    res.send('user not found');
                }
            })
        }else{
            res.status(411).send('invalid input');
        }
});

//signup.js
app.put('/signup', (req,res) => {
    if(schema.safeParse(req.body).success){
        db.forEach((element) => {
            if(element.username === req.body.username){
                return res.send('user with this username exists');
            }
        });
        const token = jwt.sign(req.body,jwtKey);
        db.push(req.body);
        res.json({
            token
        });
    }else{
        res.status(411).send('invalid input');
    }
});





app.listen(PORT,()=> {
    console.log(`listening to port ${PORT}`);
})

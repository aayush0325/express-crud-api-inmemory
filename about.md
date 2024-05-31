{
    user: string (email)
    password: string minimum 6
    admin: 0 or 1;
}

get '/' just send msg welcome to aayush's page

get '/display' => if admin show all data else show user data only body contains jwt

post '/signin' if valid data(adheres to schema and found in db) return jwt else return invalid input

delete '/delete' body contains username and password, if found delete else say it doesnt exist

put '/signup' if valid data return jwt and add to db


in memory db for now, will add mongoose later




make a logger which shows which type of req has come on which route

global error catching

set the project up with routers,middlewares,auth folders like a real oss one
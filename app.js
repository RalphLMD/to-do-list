//jshint esversion:6

const express = require("express")
const bodyParser = require("body-parser")
const date = require(__dirname + "/date.js")
const app = express()

let items = []

app.use(express.static(__dirname + '/public'))
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function(request, response){
    let day = date.getDate()
    let time = date.getTime()

    response.render('list', {
        kindOfDay: day,
        timeOfDay: time,
        //specificDay: day2
        newListItems: items
    })
})

app.post("/", function(request, response){
    let item = request.body.newItem
    items.push(item)

    response.redirect("/")
    //response.render("list", {newListItem: item})
})

app.listen(3000, function(){
    console.log("Server running!")
})
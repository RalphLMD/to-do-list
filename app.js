//jshint esversion:6

const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const date = require(__dirname + "/date.js")
const _ = require("lodash")

const app = express()


let items = []

app.use(express.static(__dirname + '/public'))
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))

//mongoose.connect("mongodb://localhost:27017/todolistDB")
mongoose.connect("mongodb+srv://ralphlance11:h7M3Ucm0TIJeCWmo@cluster0.ln7cqa9.mongodb.net/?retryWrites=true&w=majority/todolistDB")

const listItemSchema = new mongoose.Schema({
    name: String
})

const listItem = mongoose.model("listItem", listItemSchema)

const item = new listItem({
    name: "Do work"
})

const item2 = new listItem({
    name: "Do more work"
})

const defaultItems = [item, item2]

const listSchema = new mongoose.Schema({
    name: String,
    items: [listItemSchema]
})

const listsItem =  mongoose.model("listsItem", listSchema)

// listItem.insertMany(defaultItems)
// .then(function(){
//     console.log("Items are added in database")
// })
// .catch(function(err){
//     console.log(err)
// })

app.get("/", function(request, response){
    let day = date.getDate()
    let time = date.getTime()

    listItem.find({})
    .then(function(foundItems){
        if (foundItems.length === 0){
            listItem.insertMany(defaultItems)
            .then(function(){
                console.log("Default items are added in database")
            })
            .catch(function(err){
                console.log(err)
            })
        } else {
            response.render('list', {
                kindOfDay: day,
                timeOfDay: time,
                //specificDay: day2
                listTitle: "",
                newListItems: foundItems
            })
        }
    })
    .catch(function(err){
        console.log(err)
    })

})

app.post("/", function(request, response){
    const itemName = request.body.newItem
    const listName = request.body.list
    
    const item = new listItem({
        name: itemName
    })

        if (listName === ""){
            item.save()
            response.redirect("/")
        } else {
            listsItem.findOne({name: listName})
        .then(function(foundList){
            foundList.items.push(item)
            foundList.save()
            response.redirect("/" + listName)
        })
        .catch(function(err){
            console.log(err)
        })
    }
    //response.render("list", {newListItem: item})
})

app.post("/delete", function(request, response){
    const checkedItemId = request.body.checkbox
    const listName = request.body.listName

    if (listName === "") {
        listItem.findByIdAndRemove(checkedItemId)
        .then(function(){
            response.redirect("/")
        }).catch(function(err){
            console.log(err)
        })
    } else {
        listsItem.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItemId}}})
        .then(function(foundList){
            response.redirect("/" + listName)
        })
        .catch(function(err){
            console.log(err)
        })
    }
})

app.get("/:item", function(request, response){
    const itemName = _.capitalize(request.params.item)
    let day = date.getDate()
    let time = date.getTime()


    listsItem.findOne({name: itemName})
    .then(function(foundList){
        if (!foundList) {
            console.log("The list does not exist")

            const list = new listsItem ({
                name: itemName,
                items: defaultItems
            })

            list.save()

            console.log("A new list is created!")

            response.redirect("/" + itemName)
        } else {
            response.render('list', {
                kindOfDay: day,
                timeOfDay: time,
                listTitle: foundList.name,
                newListItems: foundList.items
            })
        }
    })
    .catch(function(err){
        console.log(err)
    })



})

let port = process.env.PORT
if (port == null || port == ""){
    port = 3000
}

app.listen(port)

app.listen(3000, function(){
    console.log("Server is running!")
})
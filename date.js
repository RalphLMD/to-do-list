//jshint esversion:6

exports.getDate = function() {
   //var currentDay = today.getDay()
    // var day = ""
    // var day2 = ""

    // if (currentDay === 6 || currentDay === 0) {
    //     day = "Weekend"
    // } else {
    //     day = "Weekday"
    // }

    // switch(currentDay){
    //     case 0:
    //         day2 = "Sunday"
    //         break
    //     case 1:
    //         day2 = "Monday"
    //         break
    //     case 2:
    //         day2 = "Tuesday"
    //         break
    //     case 3:
    //         day2 = "Wednesday"
    //         break    
    //     case 4:
    //         day2 = "Thursday"
    //         break
    //     case 5:
    //         day2 = "Friday"
    //         break
    //     case 6:
    //         day2 = "Saturday"
    //         break
    //     default:
    //         console.log("Error: Current Day is equal to: " + currentDay)
    // }

    //HTML 

    // <% if (kindOfDay === "Saturday" || kindOfDay === "Sunday"){ %>
    //     <h1>Today is a <%= kindOfDay %> (<%= specificDay %>)</h1>
    // <% } else { %>
    //     <h1>Today is a <%= kindOfDay %> (<%= specificDay %>)</h1>
    // <% } %> 

    // <li><%= newListItem %></li> 

    let today = new Date()

    let options = {
        weekday: 'long',
        day: "numeric",
        month: "long",
    }

    return day = today.toLocaleDateString("en-US", options)

}

exports.getTime = function() {
    let today = new Date()
    //let refresh = 1000

    let time = today.toLocaleTimeString("en-US")
    //setTimeout(getTime, refresh)
    
    return time
}
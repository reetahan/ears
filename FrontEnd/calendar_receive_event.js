function display_event(day) {
    var days=["Sunday","Monday","Tuesday", "Wednesday", "Thursday","Friday", "Saturday"];
    var idx = (day + 1) % 7;
    var element = document.getElementById(day);
    document.getElementById("today").innerHTML = "2020/12/"+day + " " + days[idx];
    document.getElementById("daily_event").innerHTML = "This will display events for 12/"+day+"/2020";
}

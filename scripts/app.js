var important = false;
var serverURL = "https://fsdiapi.azurewebsites.net/";
var tasks = [];
// inv homework: variable scope on JS

function toggleImportant() {
    if (!important) {
        important = true;
        $("#iImportant").removeClass("far").addClass("fas");
    } else {
        important = false;
        $("#iImportant").removeClass("fas").addClass("far");
    }
}

function saveTask() {
    //read values from controls
    let title = $("#txtTitle").val();
    let description = $("#txtDescription").val();
    let category = $("#selCategory").val();
    let location = $("#txtLocation").val();
    let dueDate = $("#selDueDate").val();
    let color = $("#selColor").val();

    let task = new Task(title, important, description, category, location, dueDate, color);
    console.log(task);
    console.log(JSON.stringify(task));
    
    //send obj. to backend server
    $.ajax({
        url: serverURL + "api/tasks/",
        type: 'POST',
        data: JSON.stringify(task),
        contentType: "application/json",
        success: function (res) {
            console.log("server says", res);
        },
        error: function (eDetails) {
            console.error("error saving", eDetails);
        }
    });

    //display task
    displayTask(task);

}

function displayTask(task) {
    let syntax =
        `<div class="task">
        <i class='important fas fa-star'></i> 
        <div class="description">
            <h5>${task.title}</h5>
            <p>${task.description}</p>
        </div>
        <label class="due-date">${task.dueDate}</label>
        <label class="location">${task.location}</label>
    </div>`;

    $("#pendingList").append(syntax);
}

function init() {
    console.log("my task manager");
    //load data
    //hook events
    $("#iImportant").click(toggleImportant);
    $("#btnSave").click(saveTask);
}

window.onload = init;
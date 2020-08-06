let itemStatus = false;
const toDo = {
  start: (item, status) => {
    // start function
    let info = toDo.getToDo();
    if (item) {
      info = item;
    }

    if (info !== "") {
      let taskId = toDo.counter();
      try {
        toDo.structureTab(taskId, info);
      } catch (err) {
        console.error(err);
      } finally {
        if (status === true) toDo.markTask("task" + taskId);
      }
    } else {
      alert("Task cannot be empty");
    }
    toDo.stateUpdate();
  },

  stateUpdate: function () {
    const todosNum = document.getElementsByClassName("toDoClass");
    const todosEl = [];
    

    for(let i=0; i<todosNum.length; i++) {
      const task = document.getElementById("text" + i);
      const box = document.getElementById("box" + i);
      if (task !== null) {
        todosEl.push(task.innerHTML);
        itemStatus = box.classList.contains("end");
      }
    };
    const todos = [];

    todosEl.forEach((todoEl) => {
      todos.push({
        text: todoEl,
        status: itemStatus,
      });
    });
    itemStatus = false;

    localStorage.setItem("todos", JSON.stringify(todos));
  },

  // get data from input
  getToDo: () => {
    let data;
    var getData = (data) => (data = $("#todo-input").val());
    return getData(data);
  },

  base: 0, // base num to counter of tasks

  // couter
  counter: function () {
    var task_id = this.base++;
    return task_id;
  },

  // clear input file from used data
  clearInput: () => {
    let data;
    let goData = (data) => (data = $("#todo-input").val(""));
    goData(data);
  },

  // delete task
  deleteInput: (num) => {
    let number = toDo.taskNum(num);
    if (confirm("Are you sure you want to delete task")) {
      $("#box" + number).remove();
    }
    toDo.stateUpdate();
  },

  //get taskNumber
  taskNum: (information) => {
    let last = information.length - 1;
    return information.charAt(last);
  },

  markTask: function (name) {
    let number = toDo.taskNum(name);
    if (!$("#box" + number).hasClass("end")) {
      $(".confirm-text" + number).text("finished");
      $("#box" + number).addClass("end");
    } else {
      $(".confirm-text" + number).text("unfinished");
      $("#box" + number).removeClass("end");
    }

    toDo.stateUpdate();
  },

  // show checked inputs
  checkAtr: (flow) => {
    var input = $(flow).attr("name");
    let number = toDo.taskNum(input);
    $("#box" + number).css("display", "none");
  },

  // show unchecked inputs
  uncheckAtr: (inflow) => {
    var input = $(inflow).attr("name");
    let number = toDo.taskNum(input);
    $("#box" + number).css("display", "block");
  },

  //get actuall date
  cdate: () => {
    let currnetDate = new Date();
    let month = currnetDate.getMonth();
    let year = currnetDate.getFullYear();
    let day = currnetDate.getDay();
    let hours = currnetDate.getHours();
    let minutes = currnetDate.getMinutes();
    let fullDate;
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    if (hours < 10) hours = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;
    var newDate = (fullDate) =>
      (fullDate =
        hours +
        ":" +
        minutes +
        "&nbsp;&nbsp;&nbsp;" +
        day +
        "/" +
        month +
        "/" +
        year);
    return newDate(fullDate);
  },

  //start edit input
  editInput: (name) => {
    let number = toDo.taskNum(name);
    try {
      if (!$(".area" + number).hasClass("editing")) {
        let content = $(".text" + number).text();
        $(".area" + number).addClass("editing");
        $(".area" + number).css("display", "block");
        $("#confirm" + number).css("display", "block");
        $(".area" + number).val(content);
        $(".text" + number).css("display", "none");
      } else {
        $(".text" + number).css("display", "block");
        $(".area" + number).css("display", "none");
        $("#confirm" + number).css("display", "none");
        $(".area" + number).removeClass("editing");
      }
      localStorage.setItem("todos", JSON.stringify(todos));
    } catch (err) {
      console.log(err.message);
    }
  },

  //finish edit input
  endEdit: (name) => {
    let number = toDo.taskNum(name);
    $(".text" + number).css("display", "block");
    let content = $(".area" + number).val();
    $(".text" + number).text(content);
    $(".area" + number).css("display", "none");
    $("#confirm" + number).css("display", "none");
    $(".area" + number).removeClass("editing");
  },

  // sort inputs by checkbox param
  sortToDo: (param) => {
    switch (param) {
      case "finished":
        $(".status").each(function () {
          if (!$(this).hasClass("end")) {
            toDo.checkAtr(this);
          } else {
            toDo.uncheckAtr(this);
          }
        });
        break;

      case "notFinished":
        $(".status").each(function () {
          if ($(this).hasClass("end")) {
            toDo.checkAtr(this);
          } else {
            toDo.uncheckAtr(this);
          }
        });
        break;

      default:
        $(".status").each(function () {
          toDo.uncheckAtr(this);
        });
    }
  },

  // structure of task
  structureTab: (itemId, content) => {
    let object;
    let setDate = toDo.cdate();
    var structure = (object) =>
      (object =
        `<div class="panel panel-default add-todo-panel status" name="status` +
        itemId +
        `" id="box` +
        itemId +
        `">
                <div class="panel-heading">
                    <div class="todo-title">` +
        content +
        `</div>
                         <div class="todo-icons">
                            <a class="edit" name="edit` +
        itemId +
        `" type="button" id="btn" onclick="toDo.editInput(this.name)">
                                <i class="fas fa-edit"></i>
                            </a>
                            <a class="finished" name="task` +
        itemId +
        `" type="button" id="btn" onclick="toDo.markTask(this.name)">
                                <i class="far fa-check-circle"></i>
                            </a>
                            <a class="delete" type="button" id="btn` +
        itemId +
        `" onclick="toDo.deleteInput(this.id)">
                                <i class="fas fa-trash">&nbsp;</i>
                            </a>
                        </div>
                    </div>
                    <div class="panel-body column">
                         <div id="text` +
        itemId +
        `" class="col-sm-11 text` +
        itemId +
        ` toDoClass">` +
        content +
        `</div>
                        <textarea class="col-sm-11 area` +
        itemId +
        `"></textarea>
                        <input type="submit" id="confirm` +
        itemId +
        `" class="confirm" onclick="toDo.endEdit(this.id)" />
                        <div class="row col-sm-12">
                            <div class="col-sm-6"></div>
                            <div class="col-sm-3 textEdit confirm-text` +
        itemId +
        `">unfinished</div>
                            <div class="col-sm-3 current-date">` +
        setDate +
        `</div>
                        </div>
                    </div>
                </div>
            </div>`);
    $("#todo-list-root").append(structure(object));
    $(".area" + itemId).css("display", "none");
    $("#confirm" + itemId).css("display", "none");
    toDo.clearInput();
  },
};

let itemStatus = false;
const toDo = {
  start: (item, status) => {
    const info = toDo.getToDo();
    if (item) {
      info = item;
    }

    if (info !== "") {
      const taskId = toDo.counter();
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
    const todoNum = document.getElementsByClassName("toDoClass");
    const todoEl = [];

    for (let i = 0; i < todoNum.length; i++) {
      const task = document.getElementById("text" + i);
      const box = document.getElementById("box" + i);
      if (task !== null) {
        todoEl.push(task.innerHTML);
        itemStatus = box.classList.contains("end");
      }
    }
    const todo = [];

    todoEl.forEach((todoEl) => {
      todo.push({
        text: todoEl,
        status: itemStatus,
      });
    });
    itemStatus = false;

    localStorage.setItem("todo", JSON.stringify(todo));
  },

  getToDo: () => {
    const data;
    const getData = (data) => (data = $("#todo-input").val());
    return getData(data);
  },

  base: 0, // base num to counter of tasks

  counter: function () {
    const task_id = this.base++;
    return task_id;
  },

  clearInput: () => {
    const data;
    const goData = (data) => (data = $("#todo-input").val(""));
    goData(data);
  },

  deleteInput: (num) => {
    const number = toDo.taskNum(num);
    if (confirm("Are you sure you want to delete task")) {
      $("#box" + number).remove();
    }
    toDo.stateUpdate();
  },

  taskNum: (information) => {
    const last = information.length - 1;
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

  checkAtr: (flow) => {
    var input = $(flow).attr("name");
    let number = toDo.taskNum(input);
    $("#box" + number).css("display", "none");
  },

  uncheckAtr: (inflow) => {
    var input = $(inflow).attr("name");
    let number = toDo.taskNum(input);
    $("#box" + number).css("display", "block");
  },

  date: () => {
    const currentDate = new Date();
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const day = currentDate.getDay();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const fullDate;
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

  editInput: (name) => {
    const number = toDo.taskNum(name);
    try {
      if (!$(".area" + number).hasClass("editing")) {
        const content = $(".text" + number).text();
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
      localStorage.setItem("todo", JSON.stringify(todo));
    } catch (err) {
      console.log(err.message);
    }
  },

  endEdit: (name) => {
    const number = toDo.taskNum(name);
    $(".text" + number).css("display", "block");
    const content = $(".area" + number).val();
    $(".text" + number).text(content);
    $(".area" + number).css("display", "none");
    $("#confirm" + number).css("display", "none");
    $(".area" + number).removeClass("editing");
  },

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

  structureTab: (itemId, content) => {
    let object;
    const setDate = toDo.date();
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

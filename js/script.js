{
  let tasks = [];
  let hideDoneTasks = false;

  const addNewTask = (newTaskContent) => {
    tasks = [...tasks, { content: newTaskContent }];

    render();
  };

  const removeTask = (taskIndex) => {
    tasks = [...tasks.slice(0, taskIndex), ...tasks.slice(taskIndex + 1)];

    render();
  };

  const toggleTaskDone = (taskIndex) => {
    tasks[taskIndex] = {
      ...tasks[taskIndex],
      done: !tasks[taskIndex].done,
    };

    render();
  };

  const bindRemoveEvents = () => {
    const removeButtons = document.querySelectorAll(".js-remove");

    removeButtons.forEach((removeButtons, index) => {
      removeButtons.addEventListener("click", () => {
        removeTask(index);
      });
    });
  };

  const bindToggleDoneEvents = () => {
    const toggleDoneButtons = document.querySelectorAll(".js-done");

    toggleDoneButtons.forEach((toggleDoneButtons, index) => {
      toggleDoneButtons.addEventListener("click", () => {
        toggleTaskDone(index);
      });
    });
  };

  const toggleAllTasksDone = () => {
    tasks = tasks.map((task) => ({ ...task, done: true }));

    render();
  };

  const toggleHideShowDoneTasks = () => {
    hideDoneTasks = !hideDoneTasks;

    render();
  };

  const focusNewTaskElement = () => {
    const newTaskElement = document.querySelector(".js-newTask");

    newTaskElement.focus();
  };

  const renderTasks = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += 
        `<li class="section__item ${task.done && hideDoneTasks ? "section__item--hidden" : ""}">
          <button class="section__submit js-done">
            <span class="material-symbols-outlined done${!task.done ? " section__symbol--done" : ""}">
              check
            </span>
          </button>
          <span class="section__task${task.done ? " section__task--done" : ""}">
            ${task.content}
          </span>
          <button class="section__submit--remove js-remove">
            <span class="material-symbols-outlined">
              delete
            </span>
          </button>                    
        </li>`;
    }

    document.querySelector(".js-tasks").innerHTML = htmlString;
  };

  const renderButtons = () => {
    let taskSectionButtons = "";

    if (tasks.length !== 0) {
      taskSectionButtons += `
        <button class="header__button js-showOrHideButton">
          ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
        </button>
        <button class="header__button js-doDoneAllButton" ${tasks.every(({ done }) => done) ? "disabled" : ""}>
          Ukończ wszystkie
        </button>`;
    }

    document.querySelector(".js-headerButtons").innerHTML = taskSectionButtons;
  };

  const bindToggleAllDoneEvents = () => {
    const toggleAllDone = document.querySelector(".js-doDoneAllButton");

    if (toggleAllDone) {
      toggleAllDone.addEventListener("click", () => {
        toggleAllTasksDone();
      });
    }
  };
  const bindHideShowDoneTasks = () => {
    const hideShowButtons = document.querySelector(".js-showOrHideButton");

    if (hideShowButtons) {
      hideShowButtons.addEventListener("click", () => {
        toggleHideShowDoneTasks();
      });
    }
  };

  const render = () => {
    renderTasks();
    renderButtons();

    bindRemoveEvents();
    bindToggleDoneEvents();
    bindToggleAllDoneEvents();
    bindHideShowDoneTasks();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskElement = document.querySelector(".js-newTask");
    const newTaskContent = newTaskElement.value.trim();

    if (newTaskContent === "") {
      addNewTask(newTaskContent);
    };

    addNewTask(newTaskContent);
  };

  const init = () => {
    render();

    const form = document.querySelector(".js-form");

    form.addEventListener("submit", onFormSubmit);
    form.addEventListener("submit", focusNewTaskElement);
  };

  init();
}

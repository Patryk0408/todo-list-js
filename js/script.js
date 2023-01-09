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

  const focusOn = () => {
    document.querySelector(".js-newTask").focus();
  };

  const renderTasks = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `<li class="section__item">
          <button class="section__submit js-done">
            <span class="material-symbols-outlined done${
              !task.done ? " section__symbol--done" : ""
            }">
              check
            </span>
          </button>
          <span 
            class="section__task${task.done ? " section__task--done" : ""}"
          >
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
      <button>
        ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
      </button>
      <button ${tasks.every(({ done }) => done) ? "disabled" : ""}>
        Ukończ wszystkie
      </button>`;
    };

    document.querySelector(".js-sectionButtons").innerHTML = 
      taskSectionButtons;
  };

  const bindButtonsEvents = () => {};

  const render = () => {
    renderTasks();
    renderButtons();

    bindRemoveEvents();
    bindToggleDoneEvents();
    bindButtonsEvents();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskContent = document.querySelector(".js-newTask").value.trim();

    if (newTaskContent === "") {
      return;
    }

    addNewTask(newTaskContent);
  };

  const init = () => {
    render();

    const form = document.querySelector(".js-form");

    form.addEventListener("submit", onFormSubmit);
    form.addEventListener("submit", focusOn);
  };

  init();
}

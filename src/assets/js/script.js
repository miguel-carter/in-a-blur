window.addEventListener('load', (e) => {
    init();
});

function init() {
  const elements = {
    notif: document.getElementById('delete'),
    textarea: document.getElementById('textarea'),
    input: document.getElementById('input'),
    clear: document.getElementById('clear'),
    submit: document.getElementById('submit')
  };

  listeners(elements);
}

function listeners(elements) {
  const { notif, input, textarea, clear, submit } = elements;
    
  notif.addEventListener('click', notificationHandler);
  input.addEventListener('keyup', inputHandler(textarea));
  clear.addEventListener('click', clearHandler(textarea));
  // submit.addEventListener('click', submitHandler);
};

function notificationHandler(e) {
  e.path[1].classList.add("is-hidden");
}

function inputHandler(textarea) {
  return function (e) {
    if (e.code !== 'Space') return;
    const inputValue = e.path[0].value;
    if (inputValue === ' ') return e.path[0].value = '';
    textarea.value = `${textarea.value} ${inputValue}`;
    e.path[0].value = '';
  }
}

function clearHandler(textarea) {
  return function (e) {
    textarea.value = '';
  }
}
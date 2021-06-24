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

  const db = function () {
    const localStorage = window.localStorage
    return {
      set: function(key, value) { localStorage.setItem(key, value); },
      get: function(key) { return localStorage.getItem(key) },
      remove: function(key) { localStorage.removeItem(key) },
      clear: function() { localStorage.clear() }
    }
  }();

  listeners(elements, db);
}

function listeners(elements,db) {
  const { notif, input, textarea, clear, submit } = elements;
  notif.addEventListener('click', notificationHandler);
  input.addEventListener('keyup', inputHandler(textarea));
  clear.addEventListener('click', clearHandler(textarea));
  submit.addEventListener('click', submitHandler(textarea, db));
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

function submitHandler(textarea, db) {
  return function (e) {
    db.set(new Date().toLocaleString(), textarea.value);
    textarea.value = '';
  }
}
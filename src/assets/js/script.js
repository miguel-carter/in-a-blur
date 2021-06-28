window.addEventListener('load', (e) => {
    init();
});

function init() {
  const elements = {
    notif: document.getElementById('delete'),
    textarea: document.getElementById('textarea'),
    input: document.getElementById('input'),
    clear: document.getElementById('clear'),
    submit: document.getElementById('submit'),
    card: document.getElementById('card'),
  };

  const db = function () {
    const localStorage = window.localStorage
    return {
      set: function(key, value) { localStorage.setItem(key, value); },
      get: function(key) { return localStorage.getItem(key) },
      remove: function(key) { localStorage.removeItem(key) },
      clear: function() { localStorage.clear() },
      all : localStorage,
    }
  }();

  initialState(elements, db);
  listeners(elements, db);
}

function listeners(elements,db) {
  const { notif, input, textarea, clear, submit, card } = elements;
  notif.addEventListener('click', notificationHandler);
  input.addEventListener('keyup', inputHandler(textarea));
  clear.addEventListener('click', clearHandler(textarea));
  submit.addEventListener('click', submitHandler(textarea, db, card));
};

function notificationHandler(e) {
  e.path[1].classList.add("is-hidden");
}

function inputHandler(textarea) {
  return function (e) {
    if (e.code !== 'Space') return;
    const inputValue = e.path[0].value;
    if (inputValue === ' ') return e.path[0].value = '';
    textarea.value = `${textarea.value}${inputValue}`;
    textarea.classList.add('blur')
    e.path[0].value = '';
  }
}

function clearHandler(textarea) {
  return function () {
    textarea.value = '';
    textarea.classList.remove('blur');
  }
}

function submitHandler(textarea, db, card) {
  return function () {
    if (textarea.value.length < 1) return;
    db.set(new Date().toLocaleString(), textarea.value);
    textarea.value = '';
    textarea.classList.remove('blur');

    const column = card.parentElement;
    const { children } = column;

    for (let i = children.length - 1; i >= 1; --i) {
      children[i].remove();
    }
  
    Object.keys(db.all).forEach(p => {
      const newCard = card.cloneNode(true);
      newCard.classList.remove('is-hidden');
      newCard.children[0].innerText = p;
      newCard.children[1].innerText = db.all[p];
      column.appendChild(newCard);
    });
  }
}

function initialState(elements, db) {
  if (!db.all.length) return;
  const { card } = elements;
  const column = card.parentElement;
  Object.keys(db.all).forEach(p => {
    const newCard = card.cloneNode(true);
    newCard.classList.remove('is-hidden')
    newCard.children[0].innerText = p;
    newCard.children[1].innerText = db.all[p];
    column.appendChild(newCard);
  });
}
  
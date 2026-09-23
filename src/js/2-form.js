const STORAGE_KEY = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
};

let formData = { email: '', message: '' };

formData = loadFromLS(STORAGE_KEY) ?? formData;

for (const key in formData) {
  refs.form.elements[key].value = formData[key];
}

refs.form.addEventListener('input', onFormInput);

function onFormInput(event) {
  formData = Object.fromEntries(new FormData(event.currentTarget));
  saveToLS(STORAGE_KEY, formData);
}

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  const form = event.currentTarget;
  event.preventDefault();
  if (formData.email === '' || formData.message === '') {
    alert('Fill please all fields');
    return;
  }
  console.log(formData);
  form.reset();
  for (const key in formData) {
    formData[key] = '';
  }
  localStorage.removeItem(STORAGE_KEY);
}

function loadFromLS(key) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (err) {
    console.error(`Помилка читання з localStorage ${err.message}`);
    return null;
  }
}

function saveToLS(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error(`Помилка запису в localStorage ${err.message}`);
  }
}

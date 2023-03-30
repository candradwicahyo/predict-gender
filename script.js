window.onload = () => {
  
  const content = document.querySelector('.content');
  const input = document.querySelector('.input');
  const text = document.querySelector('.text');
  const btnSubmit = document.querySelector('.btn-submit');
  btnSubmit.addEventListener('click', getData);
  
  async function getData() {
    try {
      text.textContent = '';
      const value = input.value.trim().toLowerCase();
      if (validate(value) == true) {
        const data = await fetchData(value);
        updateUI(data);
      }
    } catch (error) {
      const result = showError('danger', error.message);
      content.innerHTML = result;
      text.textContent = '';
    }
  }
  
  function validate(value) {
    if (!value) return showMessage('field was empty!');
    if (value.match(/[0-9]/g)) return showMessage('just only contain letters!');
    if (value.match(/\s/g)) return showMessage('please enter first name without whitespace!');
    return true;
  } 
  
  function showMessage(message) {
    content.innerHTML = showError('warning', message);
  }
  
  function showError(type, message) {
    return `
    <div class="alert alert-${type} rounded-0 my-auto" role="alert">
      <h3 class="fw-normal mb-2">Alert</h3>
      <p class="fw-light my-auto">${message}</p>
    </div>
    `;
  }
  
  function fetchData(value) {
    return fetch(`https://api.genderize.io/?name=${value}`)
      .then(response => response.json())
      .then(response => {
        console.log(response);
        if (response.count == 0) throw new Error('please enter valid name!');
        return response;
      })
      .catch(error => {
        throw new Error(error);
      });
  }
  
  function updateUI(data) {
    content.innerHTML = showUI(data);
    text.textContent = `${filter(data.count)} of people use this name`;
  }
  
  function showUI({ gender }) {
    return `
    <div class="wrapper">
      <img 
        src="images/${gender == 'male' ? 'male' : 'female'}.png" 
        class="image">
    </div>
    `;
  }
  
  function filter(param) {
    return (param > 1) ? `${param}'s` : param;
  }
  
}
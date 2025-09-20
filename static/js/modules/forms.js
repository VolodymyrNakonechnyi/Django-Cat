function forms(formsSelector) {
    const forms = document.querySelectorAll(formsSelector);
    const message = {
      loading: '/media/spinner.svg',
      success: 'Дякуємо, ми скоро з вами зв\'яжемось!',
      failure: 'Щось пішло не так...'
    };

    forms.forEach(item => {
      bindPostData(item);
    });
  
    function bindPostData(form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
  
        let statusMessage = document.createElement('img');
        statusMessage.src = message.loading;
        const messageStyle = `
        display: flex;
        margin: 20px auto;
        justify-content: center;
      `;

        statusMessage.style.cssText = messageStyle;
  
        form.append(statusMessage);
  
        const formData = new FormData(form);
        const json = JSON.stringify(Object.fromEntries(formData.entries()));
  
        const xhr = new XMLHttpRequest();
        xhr.open('POST', "/uk-ua/");
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('X-CSRFToken', document.querySelector('[name=csrfmiddlewaretoken]').value)

        xhr.addEventListener('load', () => {
          if (xhr.status === 200) {
            console.log(xhr.response);
            statusMessage.remove();
            statusMessage = document.createElement('div');
            statusMessage.style.cssText = messageStyle;
            statusMessage.textContent = message.success;
            form.append(statusMessage);
            form.reset()

            setTimeout(() => {
              statusMessage.remove()
            }, 5000);


          } else {
            console.log(message.failure);
            statusMessage.remove();
            statusMessage = document.createElement('div');
            statusMessage.style.cssText = messageStyle;
            statusMessage.textContent = message.failure;
            form.append(statusMessage);
            form.reset()

            setTimeout(() => {
              statusMessage.remove()
            }, 5000);

          }
        });
  
        xhr.addEventListener('error', () => {
          console.log(message.failure);
          setTimeout(() => {
            statusMessage.remove()
          }, 5000);
        });
        
        console.log(json)
        xhr.send(json);
      });
    }
  }
  
export default forms;
  
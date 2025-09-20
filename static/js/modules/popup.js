
function popup(overlay, openButton, closeButton) {
    const openModalButtons = document.querySelectorAll(openButton)
    const closeModalButtons = document.querySelectorAll(closeButton)
    const overlay = document.getElementById(overlay)
    
    openModalButtons.forEach(button => {
      button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget)
        openModal(modal)
      })
    })
    
    overlay.addEventListener('click', () => {
      const modals = document.querySelectorAll('.modal.active')
      modals.forEach(modal => {
        closeModal(modal)
      })
    })
    
    closeModalButtons.forEach(button => {
      button.addEventListener('click', () => {
        const modal = button.closest('.modal')
        closeModal(modal)
      })
    })
    
    function openModal(modal) {
      if (modal == null) return
      modal.classList.add('active')
      overlay.classList.add('active')
    }
    
    function closeModal(modal) {
      if (modal == null) return
      modal.classList.remove('active')
      overlay.classList.remove('active')
    }
}


popup('overlay', '[data-modal-target]', '[data-close-button]')
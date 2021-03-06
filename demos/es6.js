'use strict'

;(global => {
  'use strict'

  const links = Array.from(document.querySelectorAll('a[href="#0"]'))

  // Disable link actions onclick
  links.forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault()
    })
  })

  const input = document.querySelector('input')

  input.addEventListener('focus', () => {
    input.setAttribute('placeholder', '')
  })
})(typeof window !== 'undefined' ? window : global)

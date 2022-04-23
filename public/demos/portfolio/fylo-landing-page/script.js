(() => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

    const formError = document.getElementById('form-error')
    const form = document.getElementById('early-access-form')
    const email = document.getElementById('email')

    form.addEventListener('submit', e => {
        if (!emailRegex.test(email.value)) {
            e.preventDefault()
            formError.innerText = 'Please enter a valid email address'
        }
    })
})()
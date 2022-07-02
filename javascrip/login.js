const input = document.querySelector('.login_input')
const img = document.querySelector('.img_login')
let name = '';

const validateInput = ({ target }) => {
    if(target.value.length > 2) {
        img.src = 'images/start-enable.png'
        img.classList.add('enable')
        nameUser = target.value
        localStorage.removeItem('name')
        localStorage.setItem('name', nameUser)
        return
    }

    img.src = 'images/start-disable.png'
    img.classList.remove('enable')

}

const redirect = () => {
    const targetValue = ('' + img.src).substring(41)
    if(targetValue === 'start-enable.png') {
        setTimeout(() => {
            window.location.replace('https://gagriel07.github.io/MemoryGame/pages/game.html')
        }, 500)
    }
}

input.addEventListener('input', validateInput)
img.addEventListener('click', redirect)
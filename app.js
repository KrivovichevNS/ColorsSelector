const cols = document.querySelectorAll('.col')

// Смена цвета при нажатии пробела
document.addEventListener('keydown', event => {
    event.preventDefault()
    if(event.code.toLowerCase() === 'space') {
        setRandomColors()
    }
})

// Открыть/закрыть замочек 
document.addEventListener('click', event => {
    const type = event.target.dataset.type

    if (type === 'lock') {
        const checkTarget = event.target.tagName.toLowerCase() === 'i'
        ? event.target
        : event.target.children[0]

       checkTarget.classList.toggle('fa-lock-open') 
       checkTarget.classList.toggle('fa-lock') 
    } else if (type === 'copy') {
        copyColorCode(event.target.textContent)
    }
})

// функция для генерации рандомного цвета (можно заменить методос chroma.random())
const generateRandomColor = () => {
    const hexCodes = '0123456789ABCDEF'
    let color = ''

    for (let i = 0; i < 6; i++) {
        color += hexCodes[Math.floor(Math.random() * hexCodes.length)]
    }
    return '#' + color
}

// 'Засеивание колонок рандомными цветами' + (если закрыт замочек, цвет не меняется)
const setRandomColors = () => cols.forEach(col => {
    const isLocked = col.querySelector('i').classList.contains('fa-lock')
    const text = col.querySelector('h2')
    const button = col.querySelector('button')
    const color = chroma.random()

    if (isLocked) return

    text.textContent = generateRandomColor()
    col.style.background = color

    setTextColor(text, button, color)
})

const copyColorCode = (text) => {
    return navigator.clipboard.writeText(text)
}

// Изменение цвета шрифа в зависимости от яркости bсg
const setTextColor = (text, button, color) => {
    const luminance = chroma(color).luminance()
    text.style.color = luminance > 0, 5 ? 'black' : 'white'
    button.style.color = luminance > 0, 5 ? 'black' : 'white'
}
setRandomColors()
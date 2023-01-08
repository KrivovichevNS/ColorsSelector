const cols = document.querySelectorAll('.col')

// Смена цвета при нажатии пробела
document.addEventListener('keydown', event => {
    event.preventDefault()
    if (event.code.toLowerCase() === 'space') {
        setRandomColors()
    }
})

// Открыть/закрыть замочек + копирование кода цвета
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
const setRandomColors = (isInitial) => {
    const colors = isInitial ? getColorsFromHash() : []

    cols.forEach((col, i) => {
        const isLocked = col.querySelector('i').classList.contains('fa-lock')
        const text = col.querySelector('h2')
        const button = col.querySelector('button')

        if (isLocked) {
            colors.push(text.textContent)
            return
        }

        const color = isInitial
            ? colors[i]
                ? colors[I]
                : chroma.random()
            : chroma.random()

        if (!isInitial) {
            colors.push(color)
        }

        text.textContent = generateRandomColor()
        col.style.background = color

        setTextColor(text, button, color)
    })
    updateColorsHash(colors)
}

// Функция копирования текста
const copyColorCode = (text) => {
    return navigator.clipboard.writeText(text)
}

// Изменение цвета шрифа в зависимости от яркости bсg
const setTextColor = (text, button, color) => {
    const luminance = chroma(color).luminance()
    text.style.color = luminance > 0, 5 ? 'black' : 'white'
    button.style.color = luminance > 0, 5 ? 'black' : 'white'
}

const updateColorsHash = (colors = []) => {
    document.location.hash = colors.map(col => col.toString().substring(1)).join('-')
}

const getColorsFromHash = () => {
    if (document.location.hash.length > 1) {
        return document.location.hash
            .substring(1)
            .split('-')
            .map(color => '#' + color)
    }
    return []
}

setRandomColors(true)
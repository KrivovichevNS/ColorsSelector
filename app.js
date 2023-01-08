const cols = document.querySelectorAll('.col')

document.addEventListener('keydown', event => {
    event.preventDefault()
    if(event.code.toLowerCase() === 'space') {
        setRandomColors()
    }
})

document.addEventListener('click', event => {
    const type = event.target.dataset.type

    if (type === 'lock') {
        const checkTarget = event.target.tagName.toLowerCase() === 'i'
        ? event.target
        : event.target.children[0]

       checkTarget.classList.toggle('fa-lock-open') 
       checkTarget.classList.toggle('fa-lock') 

    }
})

const generateRandomColor = () => {
    const hexCodes = '0123456789ABCDEF'
    let color = ''

    for (let i = 0; i < 6; i++) {
        color += hexCodes[Math.floor(Math.random() * hexCodes.length)]
    }
    return '#' + color
}

const setRandomColors = () => cols.forEach(col => {
    const text = col.querySelector('h2')
    const button = col.querySelector('button')
    const color = chroma.random()

    text.textContent = generateRandomColor()
    col.style.background = color

    setTextColor(text, button, color)
})

const setTextColor = (text, button, color) => {
    const luminance = chroma(color).luminance()
    text.style.color = luminance > 0, 5 ? 'black' : 'white'
    button.style.color = luminance > 0, 5 ? 'black' : 'white'
}
setRandomColors()
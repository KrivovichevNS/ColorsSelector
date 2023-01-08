const cols = document.querySelectorAll('.col')

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
    
    text.textContent = generateRandomColor()
    col.style.background = generateRandomColor()

})
setRandomColors()
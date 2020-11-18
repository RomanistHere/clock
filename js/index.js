// point-free version
const querySelector = selector => document.querySelector(selector)

const calcAngle = (h, m) => {
    if (h < 0 || m < 0 || h > 24 || m > 60) {
        alert("Wrong input")
        return {}
    }

    m = Number(m)
    h = Number(h)

    if (m === 60) {
        m = 0
        h = h + 1
        console.log('one hour added')

        if (h >= 24) {
            h = h - 24
            console.log('switch to new day')
        }
    }

    // convert to analog clock
    if (h >= 12)
        h = h - 12

    // the hour hand moves 0.5 degrees per minute
    const hourAng = 0.5 * (h * 60 + m)
    // the minute hand moves 6 degrees per minute
    const minuteAng = 6 * m
    // difference between minute and hand moves
    const difBtwAng = Math.abs(hourAng - minuteAng)

    return {
        between: Math.min(360 - difBtwAng, difBtwAng),
        hourAng: hourAng,
        minuteAng: minuteAng,
    }
}

const setTime = (hours, minutes) => {
    const { between, hourAng, minuteAng } = calcAngle(hours, minutes)

    // update the clock
    querySelector('.form__angle').textContent = `angle between hands is ${between}`
    querySelector('.clocks__hour').style.transform = `translateY(-10px) rotate(${hourAng-90}deg)`
    querySelector('.clocks__minutes').style.transform = `translateY(-10px) rotate(${minuteAng-90}deg)`
}


// handle the form
querySelector('.form').addEventListener("submit", (e) => {
    e.preventDefault()

    const hours = querySelector('#hours').value
    const minutes = querySelector('#minutes').value
    setTime(hours, minutes)
})

// on start show current time
const setCurTime = () => {
    const d = new Date()
    const hours = d.getHours()
    const minutes = d.getMinutes()

    setTime(hours, minutes)
}

setCurTime()

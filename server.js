const express = require('express')

const port = 3000
const valueMultiplier = 1000

const app = express()

app.get('/:sleep?', async (req, res) => {
    sleepValue = req.params.sleep || 0
    if(isNaN(sleepValue)) {
        res.sendStatus(400)
        return
    }
    console.log(`Going to sleep for ${sleepValue} second(s)!`)
    setTimeout((sleepValue) => {
        console.log(`Wake up! ${sleepValue} second(s) passed.`)
        res.status(200)
           .send(`Woke up after ${sleepValue} second(s) of sleep!`)
    }, sleepValue * valueMultiplier, sleepValue)
})

app.listen(port, () => {
    console.log(`Sleeping server listening on port ${port}`)
})


const { writeToMongo, generateMessage } = require('./mongoHelper')

const url = 'mongodb://localhost:27017'
const dbName = 'logging';
const logs_collection = 'logs';
const daily_logs_collection = 'dailyLogs_<date>';

// logs event of killing somebody to the local mongodb
function logKillingEvent(id){
    let promiseArr = []
    let msg = generateMessage(id)
    promiseArr.push(writeToMongo(msg, url, dbName, logs_collection))
    promiseArr.push(writeToMongo(msg, url, dbName, daily_logs_collection))
    Promise.all(promiseArr).then(() => console.log(`event of killing id ${id} was logged to both collections`))
    .catch(e => console.log(e))
}

// returns an linked list if size num
function createArrayOfPeople(num) {
    let arr = []
    for (let i = 0; i < num; i++) {
        arr.push({ id: i + 1 })
    }
    return arr
}
// run the killing process until only one person left
function killThemAll(arr) {
    let i = 0
    let toggleKill = false
    while (arr.length > 1) {
        if(!toggleKill){
            i++
            toggleKill = true
        } else {
            let circularIdx = getCircularIdx(i, arr)
            // console.log("killed: ",arr[circularIdx])
            arr.splice(circularIdx, 1)
            logKillingEvent(circularIdx)
            toggleKill = false
        }
    }
    return arr[0].id
}
// returns the index of in the array in a circullar way
function getCircularIdx(idx, arr) {
    return idx % arr.length
}
// returns the last man staning id
function getLastStanding(numOfPersons) {
    let peopleArr = createArrayOfPeople(numOfPersons)
    let lastStand = killThemAll(peopleArr)
    return lastStand
}





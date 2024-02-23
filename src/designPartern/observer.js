
const main = require('../index')

class Observer {
    constructor(name) {
        this.name = name;
    }
    updateStatus(message) {
        this.goToHelp(message)
    }
    goToHelp(message) {

        // main.io.emit('notification', message);
    }
}

class Subject {
    constructor() {
        this.observerList = []
    }
    addObserver(observer) {
        this.observerList.push(observer)
    }
    notify(message) {
        this.observerList.forEach(observer => observer.updateStatus(message))
    }
}
const sj1 = new Subject();

const user1 = new Observer('user1')
const user2 = new Observer('user2')

sj1.addObserver(user1)
sj1.addObserver(user2)
sj1.notify({ long: 1123, lat: 12312 })

module.exports = { Subject, Observer }
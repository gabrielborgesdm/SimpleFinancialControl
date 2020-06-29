const Queue = require("bull")
const redisConfig = require("../configs/redis")

const jobs = require("../jobs/index")

const queues = Object.values(jobs).map((job) => ({
   bull: new Queue(job.key, redisConfig),
   name: job.key,
   options: job.options,
   handle: job.handle
}))

module.exports = {
    queues,
    add: (name, data) => {
        const queue = queues.find(queue => queue.name === name)
        return queue.bull.add(data, queue.options)
    },

    process: () => {
        return queues.forEach(queue => {
            queue.bull.process((job, done) => queue.handle(job.data, done ))

            queue.bull.on('failed', (job, error)=> {
                console.log(queue.key, error)
            })
        })
    }
}

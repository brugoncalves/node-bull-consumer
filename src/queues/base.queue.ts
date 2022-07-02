import * as Bull from 'bull';
import { Queues } from 'src/enums';
import configs from 'src/configs';

export default class BaseQueue {
    
    queue: Bull.Queue;

    constructor(queue: Queues){
        this.queue = new Bull(queue, {
            redis: configs.redis,
            prefix: 'bull',
            settings: {
                retryProcessDelay: 500,
            }
        });

        this.queue.on('fail', this.failed);
        this.queue.on('completed', this.completed);
        this.queue.on('error', (error) => {
            console.error(`Falha nas tasks, verifique suas configurações: ${error}` )
        })
    }

    protected failed(job, err) {
        console.error(`Queue ${job.queue.name} has been failed, ${job.id} - ${job.failedReason}`);
        console.error(err);
    }

    protected completed(job) {
        console.log(`Queue ${job.queue.name} completed, ${job.id}`)
    }

    add(body: any, opts?: Bull.JobOptions){
        return this.queue.add(
            body,
            opts || {
                attempts: 5,
                delay: 2000,
                removeOnFail: false,
                backOff: 5000,
            }
        )
    }
}

import {Queues} from '../enums';
import BaseQueue from './base.queue';

export default class LogQueue extends BaseQueue {

    private static instance: LogQueue;
    public static getInstance(): LogQueue{
        if(!LogQueue.instance) {
            LogQueue.instance = new LogQueue();
        }
        return LogQueue.instance;
    }

    private constructor(){
        super(Queues.log)
        this.queue.process(this.process);
    }

    private process({data}) {
        console.log(data);
    }
}
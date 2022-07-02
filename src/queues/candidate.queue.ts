import { Candidate } from 'src/entity/candidate.entity';
import {Queues} from '../enums';
import BaseQueue from './base.queue';
import Mysql from '../mysql';
import RedisCli from '../redis';
import { socketIo } from 'src/server';


const redis = RedisCli.getInstance();
export default class CandidateQueue extends BaseQueue {

    private static instance: CandidateQueue;
    public static getInstance(): CandidateQueue{
        if(!CandidateQueue.instance) {
            CandidateQueue.instance = new CandidateQueue();
        }
        return CandidateQueue.instance;
    }

    private constructor(){
        super(Queues.candidate)
        this.queue.process((data) => this.process(data));
    }

    private async process({data}) {
        console.log(data);
        const {name, partyNumber, photo} = data;
        await this.createCandidate(name, partyNumber, photo);
    }

    private async createCandidate(
        name: string, 
        partyNumber: number, 
        photo: string,
    ){
        console.log('Criando candidato');
        const candidate = new Candidate();
        candidate.name = name;
        candidate.partyNumber = partyNumber;
        candidate.photo = photo;
        await Mysql.manager.save(candidate);

        console.log(`Candidato ${name} - ${partyNumber} criado com sucesso`);
        const candidates = await Mysql.manager.find(Candidate);

        await redis.setJSON('candidates', candidates);
        this.emitSocket(candidates);
    }

    private emitSocket(candidates) {
        socketIo.emit('candidates', candidates);
        console.log('Candidatos enviados via socket');
    }

}
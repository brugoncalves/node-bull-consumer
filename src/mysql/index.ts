import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { Candidate} from '../entity/candidate.entity';
import { Vote } from '../entity/vote.entity';
import configs from '../configs';

const AppDataSource = new DataSource({
    ...(configs.mysql as any),
    synchronize: true,
    entities: [Candidate, Vote],
    migrate: [],
    subscribers: [],
});

AppDataSource.initialize()
    .then(() => {
        console.log('MYSQL conectado com sucesso :D');
    })
    .catch((error) => {
        console.error('Falha ao conectar ao MYSQL :(');
        console.error(error);
    });

export default AppDataSource    
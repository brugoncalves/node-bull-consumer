import { Candidate } from '../entity/candidate.entity';
import Mysql from '../mysql';

export const candidateRepository = Mysql.getRepository(Candidate);
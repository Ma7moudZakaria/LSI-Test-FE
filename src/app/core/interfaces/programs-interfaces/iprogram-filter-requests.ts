import { period } from './program-day-tasks-interfaces/iprogram-day-task-recitation';

export interface IProgramFilterAdvancedRequest {
  name?: string;
  typeList?: IProgramType[];
  dura?: number;
  isTest?: boolean;
  stuNum?: number;
  techNum?: number;
  skip?: number;
  take?: number;
  arabName?: string;
  engName?: string;
  isPeriodicExam?: boolean
}


export interface IProgramType {
  progTypeId?: String;
}

export interface IProgramFilterByNameRequest {
  name?: string;
  skip?: number;
  take?: number;
}

import { period } from './program-day-tasks-interfaces/iprogram-day-task-recitation';

export interface IProgramFilterAdvancedRequest {
  name?: string;
  programTypes?: IProgramType[];
  duration?: number;
  isAdmissionTest?: boolean;
  stuNum?: number;
  techNum?: number;
  skip?: number;
  take?: number;
  arabName?: string;
  engName?: string;
  isPeriodicExam?: boolean;
  teachersCount?: number;
  studentsCount?: number;
  programTypesFilter?: string;
}


export interface IProgramType {
  progTypeId?: String;
}

export interface IProgramFilterByNameRequest {
  name?: string;
  skip?: number;
  take?: number;
}

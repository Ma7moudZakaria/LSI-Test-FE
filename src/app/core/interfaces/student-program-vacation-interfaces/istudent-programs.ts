import { Time } from "@angular/common";

export interface IStudentPrograms {
  id?: string;
  batId?: string;
  progName?: string;
  arBatName?: string;
  enBatName?: string;
  arProgBatchName?: string;
  enProgBatchName?: string;
  isProgStarted?:boolean;
  isDaysRequested?:boolean;
  remainingTime:Time
}

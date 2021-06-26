import { IAttachment } from "../../attachments-interfaces/iattachment";
export interface IProgramDayTaskReadExplanation {
    isMndatory?: boolean;
    bookAttatchments?: IAttachment[];
    fromPage?: string;
    toPage?: string;
    degree?: number;
    questionToStudent?: string
}


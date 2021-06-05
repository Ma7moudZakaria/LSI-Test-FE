import { IAttachment } from "../../attachments-interfaces/iattachment";

export interface IProgramDayTaskMemorize {
    isMndatory?: boolean;
    bookAttatchments?: IAttachment[];
    frmoPage?: string;
    toPage?: string;
    degree?: number;
    questionToStudent?: string
}


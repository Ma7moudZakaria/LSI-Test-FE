;
import { SettingAnswerTypeEnum } from '../../enums/setting-answerType-enum.enum';
import { ISettingAnswer } from './isetting-answer';

export interface IConditionModel {
    title?: string;
    answerType?: SettingAnswerTypeEnum;
    answerList?: ISettingAnswer[];
    studAnsValues?: ISettingAnswer[];
    studTxtAns?: string;
    studBoolAns?: boolean;
}


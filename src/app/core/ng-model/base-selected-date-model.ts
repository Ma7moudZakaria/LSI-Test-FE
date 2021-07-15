import { DateType } from 'ngx-hijri-gregorian-datepicker';

export class BaseSelectedDateModel {
    selectedDateType : DateType = DateType.Hijri;
    selectedDateValue : string = '';
}

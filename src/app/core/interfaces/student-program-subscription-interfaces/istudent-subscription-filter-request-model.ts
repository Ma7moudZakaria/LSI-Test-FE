export interface IStudentSubscriptionFilterRequestModel {
    usrName?:string;
    progName?:string;
    numberRequest?:Number;
    fromDate?:Date;
    toDate?:Date;
    skip?:Number;
    take?:Number;
    sortField?:string;
    sortOrder?:Number;
    statusNum?:Number;
}

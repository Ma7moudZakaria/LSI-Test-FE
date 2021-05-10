export interface IScientificProblemFilter {
    filterText?: string;
    progId?: string;
    progDay?:string;
    progTask?:string;
    scNo?:string;   
    fromDate?:string;
    toDate?:string;
    sorField?:string;
    ordType?:number;
    skip: number;
    take: number;
}
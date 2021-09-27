export interface IScientificProblemFilter {
    filterText?: string;
    progId?: string;
    progDay?:string;
    progTask?:string;
    scNo?:number;
    scFrom?:string;
    scTo?:string;
    sorField?:string;
    ordType?:number;
    skip: number;
    take: number;
    page:number;
}

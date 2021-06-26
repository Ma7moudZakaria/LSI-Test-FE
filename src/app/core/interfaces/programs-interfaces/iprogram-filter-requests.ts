
export interface IProgramFilterAdvancedRequest {
  name?: string;
  typeList?: string[];
  dura?: number;
  isTest?: boolean;
  skip?: number;
  take?: number;

  arabName?:string;
  engName?:string;
}



export interface IProgramFilterByNameRequest {
  name?: string;
  skip?: number;
  take?: number;
}

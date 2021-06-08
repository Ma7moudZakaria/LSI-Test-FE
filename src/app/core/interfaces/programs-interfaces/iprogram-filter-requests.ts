
export interface IProgramFilterAdvancedRequest {
  name?: string;
  typeList?: string[];
  isTest?: boolean;
  PageNumber?: number;
  PageSize?: number;
}



export interface IProgramFilterByNameRequest {
  name?: string;
  skip?: number;
  take?: number;
}

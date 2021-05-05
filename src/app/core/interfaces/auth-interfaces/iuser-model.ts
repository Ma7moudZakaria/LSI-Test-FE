export interface IUser {
    id?: string;
    token?:string;
    fNameAr?:string;
    mNameAr?:string;
    faNameAr?:string;
    fNameEn?:string;
    mNameEn?:string;
    faNameEn?:string;
    proPic?:string;
    fullNameAr?:string;
    fullNameEn?:string;
    uactive?:boolean;
    uProfileCompleted?:boolean;

    uname?: string;
    uemail?:string;
    upass?:string;
    ucpass?:string;
    usrRoles?:UserAuthRolesAndPermissionsModel;
}

export interface UserAuthRolesAndPermissionsModel{    
    usrId: string,
    usrRoles?:IUserRoles[];
}

export interface IUserRoles {
    id: string,
    roleNo: string,
    arRoleName: string,
    enRoleName: string,
}
export interface RoleManagementFilter {
    roleTextFilter?: string,
    skip?: number,
    take?: number
}
export interface Role {
    id: string,
    arRoleName: string,
    enRoleName: string,
}
export interface RoleUsrs{
    usrAvatarUrl:null,
    usrEmail:string,
    usrId:string,
    usrNameAr:string,
    usrNameEn:string
}
export interface CreateRoleModel{
    arRoleName: string,
    enRoleName: string
}
export interface AssignRoleModel{
    roleId: string,
  perms: []
}
export interface AssignUserModel{
    roleId: string,
    usrs: AssignUserList[]
}
export interface AssignUserList{
    usrId:string
}

export interface UserSreach{
    usrAvatarUrl:null,
    usrEmail:string,
    usrId:string,
    enUsrName:string,
    arUsrName:string
}
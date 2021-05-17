export interface RoleManagementFilter {
    roleTextFilter?: string;
    skip?: number;
    take?: number;
}
export interface Role {
    id: string;
    arRoleName: string;
    enRoleName: string;
}
export interface RoleUsrs {
    usrAvatarUrl: null;
    usrEmail: string;
    usrId: string;
    usrNameAr: string;
    usrNameEn: string;
}
export interface CreateRoleModel {
    arRoleName: string;
    enRoleName: string;
    usrs: AssignUserList[];
}
export interface AssignRoleModel {
    roleId: string;
    perms: [];
}
export interface AssignUserModel {
    roleId: string;
    usrs: AssignUserList[];
}
export interface AssignUserList {
    usrId: string;
}

export interface UserSearch {
    usrAvatarUrl: null;
    usrEmail: string;
    usrId: string;
    enUsrName: string;
    arUsrName: string;
}


export interface SearchItem {
    usrAvatarUrl: null;
    usrEmail: string;
    usrId: string;
    enUsrName: string;
    arUsrName: string;
}


export interface RolesTreeModel {
    children: []
    huffazId: string
    id: string
    nodeDepth: number
    nodeNameAr: string
    nodeNameEn: string
    nodeOrder: number
    nodeParentId: string
}

export interface UsersExceptStudent{
    avatarUrl: string
    id: string
    loginTime: string
    usrFamilyNameAr: string
    usrFamilyNameEn: string
    usrFirstNameAr: string
    usrFirstNameEn: string
    usrFullNameAr: string
    usrFullNameEn: string
    usrMiddleNameAr: string
    usrMiddleNameEn: string
    enUsrName?:string
    arUsrName?:string
    usrAvatarUrl?:string
}

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




export interface SearchItem {
    usrAvatarUrl: string;
    usrEmail: string;
    usrId: string;
    enUsrName: string;
    arUsrName: string;
    createdOn: string;
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

export interface UsersExceptStudent {
    avatarUrl: string
    id: string
    createdOn: string
    usrFamilyNameAr: string
    usrFamilyNameEn: string
    usrFirstNameAr: string
    usrFirstNameEn: string
    usrFullNameAr: string
    usrFullNameEn: string
    usrMiddleNameAr: string
    usrMiddleNameEn: string
    userName: string
}



export interface UserCard {
    usrAvatarUrl: string;
    usrEmail: string;
    usrId: string;
    usrNameAr: string;
    usrNameEn: string;
}

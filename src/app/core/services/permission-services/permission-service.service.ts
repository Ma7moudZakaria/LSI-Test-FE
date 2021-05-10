import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import  jwt_decode, { JwtPayload } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class PermissionServiceService {

  constructor(private http:HttpClient) { }
  localUser?:null;
  getUserScopes(): Array<string> {
    var localUser =localStorage.getItem("user");
    if (localUser) {
      
      var user = JSON.parse(localUser);
      var token = user.token;
      var decoded= jwt_decode<any>(token || '') || null;
      return decoded['scope'].split(" ");
    }
   else
   return [];

    // console.log(decoded);
    // console.log(decoded['scope']);

    // console.log(decoded['scope'].split(" "));
  }

    //// Question Bank Permissions
    canAddQuestionBankCategory() {
      let scopes = this.getUserScopes();
      return scopes.filter(item => item === 'add-qb-catg:catg').length > 0;
    }
    canViewQuestionBankCategoryDetails() {
      let scopes = this.getUserScopes();
      return scopes.filter(item => item === 'view-qb-catg-details:catg').length > 0;
    }
    canEditQuestionBankCategory() {
      let scopes = this.getUserScopes();
      return scopes.filter(item => item === 'edit-qb-catg:catg').length > 0;
    }

    canDeleteQuestionBankCategory() {
      let scopes = this.getUserScopes();
      return scopes.filter(item => item === 'delete-qb-catg:catg').length > 0;
    }
    canViewQuestionBankCategory() {
      let scopes = this.getUserScopes();
      return scopes.filter(item => item === 'view-qb-catg:catg').length > 0;
    }
    canAddQuestionBankQuestion() {
      let scopes = this.getUserScopes();
      return scopes.filter(item => item === 'add-qb-ques:ques').length > 0;
    }
    canViewQuestionBankQuestionDetails() {
      let scopes = this.getUserScopes();
      return scopes.filter(item => item === 'view-qb-ques-details:ques').length > 0;
    }
     canEditQuestionBankQuestion() {
      let scopes = this.getUserScopes();
      return scopes.filter(item => item === 'edit-qb-ques:ques').length > 0;
    }
    canDeleteQuestionBankQuestion() {
      let scopes = this.getUserScopes();
      return scopes.filter(item => item === 'delete-qb-ques:ques').length > 0;
    }

    canViewQuestionBankQuestion() {
      let scopes = this.getUserScopes();
      return scopes.filter(item => item === 'view-qb-ques:ques').length > 0;
    }
    canUpdateQuestionBankQuestionOrder() {
      let scopes = this.getUserScopes();
      return scopes.filter(item => item === 'order-qb-ques:ques').length > 0;
    }

    //Scientific Material
    canAddScientificMaterial() {
      let scopes = this.getUserScopes();
      return scopes.filter(item => item === 'add-scm:scm').length > 0;
    }
    canViewScientificMaterialDetails() {
      let scopes = this.getUserScopes();
      return scopes.filter(item => item === 'view-scm-details:scm').length > 0;
    }
    
    canEditScientificMaterial() {
      let scopes = this.getUserScopes();
      return scopes.filter(item => item === 'edit-scm:scm').length > 0;
    }
    
    canDeleteScientificMaterial() {
      let scopes = this.getUserScopes();
      return scopes.filter(item => item === 'delete-scm:scm').length > 0;
    }
    
    canViewScientificMaterial() {
      let scopes = this.getUserScopes();
      return scopes.filter(item => item === 'view-scm-s:scm').length > 0;
    }
    
    canViewScientificMaterialCategory() {
      let scopes = this.getUserScopes();
      return scopes.filter(item => item === 'view-scm-catg:scm').length > 0;
    }
    canAddScientificProblems() {
      let scopes = this.getUserScopes();
      return scopes.filter(item => item === 'add-scp:scp').length > 0;
    }
    canViewScientificProblems() {
      let scopes = this.getUserScopes();
      return scopes.filter(item => item === 'view-scp-details:scp').length > 0;
    }
    canDeleteScientificProblems() {
      let scopes = this.getUserScopes();
      return scopes.filter(item => item === 'delete-scp:scp').length > 0;
    }
    canAddScientificReply() {
      let scopes = this.getUserScopes();
      return scopes.filter(item => item === 'add-scr:scp').length > 0;
    }

/// Walk Throughs

    canAddWalkThrough() {
      let scopes = this.getUserScopes();
      return scopes.filter(item => item === 'add-wt:wt').length > 0;
    }
    canViewWalkThroughDetails() {
      let scopes = this.getUserScopes();
      return scopes.filter(item => item === 'view-wt-details:wt').length > 0;
    }
    canEditWalkThrough() {
      let scopes = this.getUserScopes();
      return scopes.filter(item => item === 'edit-wt:wt').length > 0;
    }
    canDeleteWalkThrough() {
      let scopes = this.getUserScopes();
      return scopes.filter(item => item === 'delete-wt:wt').length > 0;
    }

    canViewWalkThroughs() {
      let scopes = this.getUserScopes();
      return scopes.filter(item => item === 'view-wt-s:wt').length > 0;
    }
    ///Look up

    canViewLookUps() {
      let scopes = this.getUserScopes();
      return scopes.filter(item => item === 'view-lucs:lucs').length > 0;
    }
    canViewCitiesByCountryId() {
      let scopes = this.getUserScopes();
      return scopes.filter(item => item === 'view-lucs-city:lucs').length > 0;
    }

    //Feeling
    canViewFeelings() {
      let scopes = this.getUserScopes();
      return scopes.filter(item => item === 'view-fels:fels').length > 0;
    }
    canAddFeeling() {
      let scopes = this.getUserScopes();
      return scopes.filter(item => item === 'add-fels:fels').length > 0;
    }
    canAproveFeeling() {
      let scopes = this.getUserScopes();
      return scopes.filter(item => item === 'aprove-fels:fels').length > 0;
    }

    //Content Management System
    canViewContentManagementSystems() {
      let scopes = this.getUserScopes();
      return scopes.filter(item => item === 'view-cms:cms').length > 0;
    }
    canViewContentManagementSystemsDetailsByType() {
      let scopes = this.getUserScopes();
      return scopes.filter(item => item === 'view-cms-by-type:cms').length > 0;
    }
    canViewContentManagementSystemsDetailsById() {
      let scopes = this.getUserScopes();
      return scopes.filter(item => item === 'view-cms-by-id:cms').length > 0;
    }
    canAddContentManagementSystem() {
      let scopes = this.getUserScopes();
      return scopes.filter(item => item === 'add-cms:cms').length > 0;
    }
    canEditContentManagementSystem() {
      let scopes = this.getUserScopes();
      return scopes.filter(item => item === 'edit-cms:cms').length > 0;
    }
    canDeleteContentManagementSystem() {
      let scopes = this.getUserScopes();
      return scopes.filter(item => item === 'delete-cms:cms').length > 0;
    }
    //Attachments
    canUploadAttachments() {
      let scopes = this.getUserScopes();
      return scopes.filter(item => item === 'upload-att:att').length > 0;
    }
    canDownloadAttachments() {
      let scopes = this.getUserScopes();
      return scopes.filter(item => item === 'download-att:att').length > 0;
    }
    canDeleteAttachments() {
      let scopes = this.getUserScopes();
      return scopes.filter(item => item === 'delete-att:att').length > 0;
    }



}



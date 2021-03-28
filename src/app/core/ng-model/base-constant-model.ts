export class BaseConstantModel {
    public static NO_HEADER_ROUTES = [
        '/auth',
        '/auth/(baseRouter:register)', 
        '/auth/(baseRouter:forget-password)', 
        '/auth/(baseRouter:reset-password)', 
        '/auth/(baseRouter:activate-code)']

        public static SUCCESS_TYPE = 'success';
        public static DANGER_TYPE = 'danger';
        public static  Success_Status_Code = 200;
        public static  Failure_Status_Code = 0;
        public static  Bad_Request_Status_Code = 400;

        public static dashboard = '../../../../assets/images/sidebar/Dashboard-icon.png';
}

export class BaseConstantModel {
    public static NO_HEADER_ROUTES = [
        '/auth',
        '/auth/(baseRouter:register)', 
        '/auth/(baseRouter:forget-password)', 
        '/auth/(baseRouter:reset-password)', 
        '/auth/(baseRouter:activate-code)']

        public static SUCCESS_TYPE = 'success'
        public static DANGER_TYPE = 'danger'

        public static dashboard = '../../../../assets/images/sidebar/Dashboard-icon.png';
}

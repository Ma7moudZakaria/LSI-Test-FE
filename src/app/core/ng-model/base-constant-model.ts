export class BaseConstantModel {
    public static NO_HEADER_ROUTES = [
        '/auth',
        '/auth/(baseRouter:register)', 
        '/auth/(baseRouter:forget-password)', 
        '/auth/(baseRouter:reset-password)', 
        '/auth/(baseRouter:activate-code)']
}

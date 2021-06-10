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

    public static arabicWordPattern = "^[\u0621-\u064A\u0660-\u0669 0-9]+$";
    public static englishWordPattern ="^[a-zA-Z0-9' '-'\s]{1,40}$";  
    public static ARABIC_LETTERS_WITH_SPECIAL_CHAR_WITHOUT_EMOJI = "^[\u{1F600}\u{1F6FF}\u0621-\u064A\u0660-\u0669 0-9_@./#&+\\-~؛؟)(÷*/'/!/$]+$";
    public static ENGLISH_LETTERS_WITH_SPECIAL_CHAR_WITHOUT_EMOJI = "^[\u{1F600}\u{1F6FF}A-Za-z 0-9_@./#&+-~؛?)(÷*/'/!/$]*$";
    public static ARABIC_LETTERS_WITH_SPECIAL_CHAR_WITH_EMOJI = "^[\u0621-\u064A\u0660-\u0669 0-9_@./#&+-~؛)(÷*/'/!/$]+$";
    public static ENGLISH_LETTERS_WITH_SPECIAL_CHAR_WITH_EMOJI = "^[ A-Za-z0-9_@./#&+-~؛)(÷*/'/!/$]*$";
    
    // Scientific
    public static engPattern ="^[a-zA-Z ()/\\\\_-]+$";
    public static arabicPattern = "^[\u0621-\u064A\u0660-\u0669 ()/\\\\_-]+$";
    public static Scientific_Material_Arabic_WITHOUT_EMOJI = "^[\u{1F600}\u{1F6FF}\u0621-\u064A\u0660-\u0669 0-9()/\\\\_-]+$";
    public static Scientific_Material_English_WITHOUT_EMOJI = "^[\u{1F600}\u{1F6FF}a-zA-Z 0-9()/\\\\_-]+$";

    public static mobilePattern = "^(05)([0-9]{8})*$|^(\\+\\d{1,3}[- ]?)?\\d{10}";

    public static TEXT_AREA_ARABIC_LETTERS_WITH_SPECIAL_CHAR_WITHOUT_EMOJI = "^[\u{1F600}\u{1F6FF}\u0621-\u064A\u0660-\u0669 \r\n 0-9_@./#&+\\-~؛)(÷*/'/!/$]+$";
    public static  TEXT_AREA_ENGLISH_LETTERS_WITH_SPECIAL_CHAR_WITHOUT_EMOJI = "^[\u{1F600}\u{1F6FF}A-Za-z \r\n 0-9_@./#&+-~؛)(÷*/'/!/$]*$";



   // public static passwordPattern = "/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/";
 // public static passwordPattern = "^(?=.*?[A-Z])(?=(.*){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{6,12}$";
 // public static passwordPattern ="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$";
 public static passwordPattern ="^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=.!(){}<>,.?/~+\\-\\][;|:]).{6,12}$";
 public static numberBiggerThanZero ="^[1-9][0-9]*$" ;
 static newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  
}

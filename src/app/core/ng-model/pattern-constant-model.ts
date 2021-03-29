
export class PatternConstantModel {
    public static arabicWordPattern = "^[\u0621-\u064A\u0660-\u0669 0-9]+$";
    public static englishWordPattern ="^[a-zA-Z0-9' '-'\s]{1,40}$";  
    public static ARABIC_LETTERS_WITH_SPECIAL_CHAR_WITHOUT_EMOJI = "^[\u{1F600}\u{1F6FF}\u0621-\u064A\u0660-\u0669 0-9_@./#&+\\-~؛)(÷*/'/!/$]+$";
    public static ENGLISH_LETTERS_WITH_SPECIAL_CHAR_WITHOUT_EMOJI = "^[\u{1F600}\u{1F6FF}A-Za-z 0-9_@./#&+-~؛)(÷*/'/!/$]*$";
    public static ARABIC_LETTERS_WITH_SPECIAL_CHAR_WITH_EMOJI = "^[\u0621-\u064A\u0660-\u0669 0-9_@./#&+-~؛)(÷*/'/!/$]+$";
    public static ENGLISH_LETTERS_WITH_SPECIAL_CHAR_WITH_EMOJI = "^[ A-Za-z0-9_@./#&+-~؛)(÷*/'/!/$]*$";
}
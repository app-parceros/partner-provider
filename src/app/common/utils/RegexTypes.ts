export class RegexTypes {
    public static LETTERS_NUMBERS400 = '^[a-zA-Z0-9 .ñÑáÁéÉíÍóÓúÚöÖüÜ\\s\-=/]{1,400}$';
    public static LETTERS_NUMBERS150 = '^[a-zA-Z0-9 .ñÑáÁéÉíÍóÓúÚöÖüÜ+\\s\-=/]{1,150}$';
    public static LETTERS_NUMBER_ONLY = '^[a-zA-Z0-9- ]*$';
    public static LETTERS_NUMBER_ONLY_NO_WHITE_SPACE = '^[a-zA-Z0-9-]*$';
    public static STRICT_LETTERS_NUMBER_ONLY_150 = '^[a-zA-Z0-9]{1,150}$';
    public static DOMAIN_LETTERS_NUMBERS150 = '^[a-zA-Z0-9 ñÑáÁéÉíÍóÓúÚöÖüÜ\\s\-/]{1,150}$';
    public static LETTERS150 = '^[a-zA-Z ñÑáÁéÉíÍóÓúÚöÖüÜ\\s\-/]{1,150}$';
    public static LETTERS_NUMBERS7 = '^[a-zA-Z0-9 .ñÑáÁéÉíÍóÓúÚöÖüÜ\\s\-=/]{5,7}$';
    public static LETTERS_NUMBERS5TO150 = '^[a-zA-Z\\d]{5,150}$';
    public static EMAIL = '^[-+.\']\\w+([-+.\']\\w+)[-+.\']@[-+.\']\\w+([-.]\\w+)\\.\\w+([-.]\\w+)*$';
    public static GUID = '^[A-Fa-f0-9]{8}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{12}$';
    public static STRONG_PASSWORD = '^(?=.[A-Z])(?=.[a-z])(?=.\\d)(?=.[!@#\\$%\\^&\\])[A-Za-z\\d!@#\\$%\\^&\\]{13,}$';
    public static FULLURL = '^(?:http(s)?:\\/\\/)?[\\w.-]+(?:\\.[\\w\\.-]+)+[\\w\\-\\._~:/?#[\\]@!\\$&\'\\(\\)\\*\\+,;=.]+$';
    // revisar
    public static NUMBER_ONLY = '^[0-9]*$';
    public static EMAIL2 = '^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$';
}
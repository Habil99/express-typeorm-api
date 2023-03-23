import Validator from "./Validator";

class EmailValidator extends Validator {
    public validate(email: string): boolean {
        const regex = new RegExp(
            "^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@" +
            "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$"
        );
        return regex.test(email);
    }
}

export default EmailValidator;
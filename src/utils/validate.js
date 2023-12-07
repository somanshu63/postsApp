function validateEmail(email) {
  const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return re.test(email);
}
export default function validate(errors, name, value) {
  switch (name) {
    case "username":
      errors.username =
        value.length < 6 ? "length can't be less than 6 characters" : "";
      break;
    case "email":
      errors.email = validateEmail(value) ? "" : "email not valid";
      break;
    case "password":
      errors.password =
        value.length < 6 || !/\d+/.test(value) || !/[a-zA-Z]/.test(value)
          ? "password must contain letter/number & must be greater than 6"
          : "";
      break;
    default:
      return errors;
  }
}

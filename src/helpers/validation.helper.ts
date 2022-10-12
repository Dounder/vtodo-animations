export const validationHelper = {
  global: [(val: string) => !!val || 'Field is required'],
  email: [
    (val: string) =>
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val) ||
      'Email is not valid',
  ],
  password: [
    (val: string) =>
      /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).+$/.test(val) ||
      'Password must be at least 1 upper, 1 lower, 1 digit, 1 special character',
    (val: string) => val.length > 6 || 'Password must be at least 6 long',
  ],
};

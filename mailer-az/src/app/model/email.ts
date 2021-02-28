export class Email {
  constructor(email: string, message: string, date: string) {
    this.email = email;
    this.message = message;
    this.date = date;
  }

  email: string;
  message: string;
  date: string;
}

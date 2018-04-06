export class User{
    firstname: string;
    lastname: string;
    email: string;
    phone: number;
    password: string;
  
    constructor(options: {
        firstname?: string;
        lastname?: string;
        email?: string;
        phone?: number;
        password?: string;
      } = {}) {
      this.firstname = options.firstname;
      this.lastname = options.lastname;
      this.email = options.email;
      this.phone = options.phone;
    }
  }
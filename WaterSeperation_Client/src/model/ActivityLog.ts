import { User } from "./User";
export class ActivityLog {
  constructor() {
    //this.user = new User();
  }
  id: string;
  userId: string;
  //user: User;
  action: string;
  whatTable: string;
  dateTime: string;
  description: string;
}

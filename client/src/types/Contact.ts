export interface Contact {
  id?: number;
  name: string;
  number: string;
  emailAddress: string | null;
  createdAt?: Date;
}

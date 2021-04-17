import { Account } from './account.model';
export interface Owner{
    id: string;
    name: string;
    dateOfBirth: string;
    address: string;

    accounts?: Account[];
}
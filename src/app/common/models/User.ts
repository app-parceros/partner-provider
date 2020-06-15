import {Guid} from './Guid';
import {ILocation} from './Location';

export interface IUser {
    id: Guid;
    userName: string;
    name: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    location: ILocation;
    creationDate?: string;
    notificationToken: string;
    identificationType: string;
    identification: string;
}

export interface IUserAuth extends IUser {
    password: string;
}



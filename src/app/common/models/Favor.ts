// export namespace Common {
import {Guid} from './Guid';
import {ILocation} from './Location';
import {IFavorStep} from './FavorStep';

export interface IFavor {
    id?: Guid;
    name: string;
    description: string;
    location: ILocation;
    reward: number;
    creationDate?: string;
    steps?: IFavorStep[];
}

// }

// export namespace Common {
import {Guid} from './Guid';
import {ILocation, IPosition} from './Location';
import {IFavorStep} from './FavorStep';

export interface IFavor {
    id?: Guid;
    name: string;
    description: string;
    position: ILocation;
    reward: number;
    creationDate?: string;
    steps?: IFavorStep[];
}

// }

// export namespace Common {
import {Guid} from './Guid';
import {ILocation, IPosition} from './Location';

export interface IFavorStep {
    id?: Guid;
    name?: string;
    description?: string;
    position: IPosition;
    attachments?: string[];
}

// }

import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface CatPicture {
  'id' : bigint,
  'url' : string,
  'upvotes' : bigint,
  'downvotes' : bigint,
}
export interface _SERVICE {
  'downvoteCat' : ActorMethod<[bigint], undefined>,
  'getCatPictures' : ActorMethod<[], Array<CatPicture>>,
  'getRating' : ActorMethod<[bigint], number>,
  'init' : ActorMethod<[], undefined>,
  'upvoteCat' : ActorMethod<[bigint], undefined>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];

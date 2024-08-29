export const idlFactory = ({ IDL }) => {
  const CatPicture = IDL.Record({
    'id' : IDL.Nat,
    'url' : IDL.Text,
    'upvotes' : IDL.Nat,
    'downvotes' : IDL.Nat,
  });
  return IDL.Service({
    'downvoteCat' : IDL.Func([IDL.Nat], [], []),
    'getCatPictures' : IDL.Func([], [IDL.Vec(CatPicture)], ['query']),
    'getRating' : IDL.Func([IDL.Nat], [IDL.Float64], ['query']),
    'init' : IDL.Func([], [], []),
    'upvoteCat' : IDL.Func([IDL.Nat], [], []),
  });
};
export const init = ({ IDL }) => { return []; };

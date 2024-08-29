import Bool "mo:base/Bool";
import Int "mo:base/Int";

import Array "mo:base/Array";
import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Float "mo:base/Float";

actor {
  // Define the CatPicture type
  type CatPicture = {
    id: Nat;
    url: Text;
    upvotes: Nat;
    downvotes: Nat;
  };

  // Stable variable to store cat pictures
  stable var catPictures: [CatPicture] = [];

  // Initialize the cat pictures
  public func init() : async () {
    catPictures := Array.tabulate<CatPicture>(100, func(i: Nat) : CatPicture {
      {
        id = i;
        url = "https://loremflickr.com/320/240/cat?lock=" # Nat.toText(i + 1);
        upvotes = 0;
        downvotes = 0;
      }
    });
  };

  // Get all cat pictures
  public query func getCatPictures() : async [CatPicture] {
    catPictures
  };

  // Upvote a cat picture
  public func upvoteCat(id: Nat) : async () {
    catPictures := Array.map<CatPicture, CatPicture>(catPictures, func(cat: CatPicture) : CatPicture {
      if (cat.id == id) {
        {
          id = cat.id;
          url = cat.url;
          upvotes = cat.upvotes + 1;
          downvotes = cat.downvotes;
        }
      } else {
        cat
      }
    });
  };

  // Downvote a cat picture
  public func downvoteCat(id: Nat) : async () {
    catPictures := Array.map<CatPicture, CatPicture>(catPictures, func(cat: CatPicture) : CatPicture {
      if (cat.id == id) {
        {
          id = cat.id;
          url = cat.url;
          upvotes = cat.upvotes;
          downvotes = cat.downvotes + 1;
        }
      } else {
        cat
      }
    });
  };

  // Calculate rating for a cat picture
  public query func getRating(id: Nat) : async Float {
    let cat = Array.find<CatPicture>(catPictures, func(cat: CatPicture) : Bool { cat.id == id });
    switch (cat) {
      case (null) { 0 };
      case (?c) {
        let total = c.upvotes + c.downvotes;
        if (total == 0) { 0 } else {
          Float.fromInt(c.upvotes) / Float.fromInt(total) * 5
        }
      };
    }
  };
}

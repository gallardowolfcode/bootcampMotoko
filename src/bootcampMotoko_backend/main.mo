import Text "mo:base/Text";
import RBTree "mo:base/RBTree";
import Nat "mo:base/Nat";
import Iter "mo:base/Iter";


actor {
  var question: Text = "¿Qué especialidad quieres elegir en la Carrera de Ingeniería en Sistemas Computacionales?";
  var question2: Text = "Ocupación";
  var votes: RBTree.RBTree<Text, Nat> = RBTree.RBTree(Text.compare);
  var votes2: RBTree.RBTree<Text,Nat> = RBTree.RBTree(Text.compare);

  public func getQuestion() : async Text {
  return "¿Qué especialidad quieres elegir en la Carrera de Ingeniería en Sistemas Computacionales?";
};

  public func getQuestion2() : async Text {
  return "Datos";
};

  public query func getVotes() : async [(Text, Nat)] {  
      Iter.toArray(votes.entries())
  };
    
  public func vote(entry: Text) : async [(Text, Nat)] {

    let votes_for_entry :?Nat = votes.get(entry);
    
    let current_votes_for_entry : Nat = switch votes_for_entry {
      case null 0;
      case (?Nat) Nat;
    };

    votes.put(entry, current_votes_for_entry + 1);

    Iter.toArray(votes.entries())
  };

  public query func getVotes2() : async [(Text, Nat)] {  
      Iter.toArray(votes2.entries())
  };

  public func vote2(entry: Text) : async [(Text, Nat)] {

    //Check if the entry already has votes.
    //Note that "votes_for_entry" is of type ?Nat. This is because: 
    // * If the entry is in the RBTree, the RBTree returns a number.
    // * If the entry is not in the RBTree, the RBTree returns `null` for the new entry.
    let votes2_for_entry :?Nat = votes2.get(entry);
    
    //Need to be explicit about what to do when it is null or a number so every case is taken care of
    let current_votes2_for_entry : Nat = switch votes2_for_entry {
      case null 0;
      case (?Nat) Nat;
    };

    //once we have the number of votes, update the votes for the entry
    votes2.put(entry, current_votes2_for_entry + 1);

    //Return the number of votes as an array (so frontend can display it)
    Iter.toArray(votes2.entries())
  };

  //This method resets the vote count for each option and returns the updated hashmap
// Example JSON that the frontend will get using the values above
// [["Motoko","0"],["Python","0"],["Rust","0"],["TypeScript","0"]]
    
  public func resetVotes() : async [(Text, Nat)] {
    votes.put("Ciber Seguridad", 0);
    votes.put("Internet de las Cosas", 0);
    votes.put("Inteligencia Artificial", 0);
    Iter.toArray(votes.entries())
  };

  public func resetVotes2() : async [(Text, Nat)] {
    votes2.put("Maestro", 0);
    votes2.put("Alumno", 0);
    Iter.toArray(votes2.entries())

  };
};



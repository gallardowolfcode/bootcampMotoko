import Text "mo:base/Text";
import RBTree "mo:base/RBTree";
import Nat "mo:base/Nat";
import Iter "mo:base/Iter";


actor {
  var question: Text = "¿Qué especialidad quieres elegir en la Carrera de Ingeniería en Sistemas Computacionales?";
  var question2: Text = "Datos";
  var votes: RBTree.RBTree<Text, Nat> = RBTree.RBTree(Text.compare);
  var alumnos: RBTree.RBTree<Text,Nat> = RBTree.RBTree(Text.compare);

  public func getQuestion1() : async Text {
  return "¿Qué especialidad quieres elegir en la Carrera de Ingeniería en Sistemas Computacionales?";
};

public func getQuestion2() : async Text {
  return "Datos";
};
// query the list of entries and votes for each one
// Example: 
//      * JSON that the frontend will receive using the values above: 
//      * [["Motoko","0"],["Python","0"],["Rust","0"],["TypeScript","0"]]

  public query func getVotes() : async [(Text, Nat)] {
    
      Iter.toArray(votes.entries())
    
  };
//   public query func getAlumnos() : async [(Text, Nat)]{

//       Iter.toArray(alumnos.entiries())
// };

  // This method takes an entry to vote for, updates the data and returns the updated hashmap
// Example input: vote("Motoko")
// Example: 
//      * JSON that the frontend will receive using the values above: 
//      * [["Motoko","1"],["Python","0"],["Rust","0"],["TypeScript","0"]]
    
  public func vote(entry: Text) : async [(Text, Nat)] {

    //Check if the entry already has votes.
    //Note that "votes_for_entry" is of type ?Nat. This is because: 
    // * If the entry is in the RBTree, the RBTree returns a number.
    // * If the entry is not in the RBTree, the RBTree returns `null` for the new entry.
    let votes_for_entry :?Nat = votes.get(entry);
    
    //Need to be explicit about what to do when it is null or a number so every case is taken care of
    let current_votes_for_entry : Nat = switch votes_for_entry {
      case null 0;
      case (?Nat) Nat;
    };

    //once we have the number of votes, update the votes for the entry
    votes.put(entry, current_votes_for_entry + 1);

    //Return the number of votes as an array (so frontend can display it)
    Iter.toArray(votes.entries())
  };

  public func alumno(entry: Text) : async [(Text, Nat)] {

    //Check if the entry already has votes.
    //Note that "votes_for_entry" is of type ?Nat. This is because: 
    // * If the entry is in the RBTree, the RBTree returns a number.
    // * If the entry is not in the RBTree, the RBTree returns `null` for the new entry.
    let alumnos_for_entry :?Nat = alumnos.get(entry);
    
    //Need to be explicit about what to do when it is null or a number so every case is taken care of
    let current_alumnos_for_entry : Nat = switch alumnos_for_entry {
      case null 0;
      case (?Nat) Nat;
    };

    //once we have the number of votes, update the votes for the entry
    alumnos.put(entry, current_alumnos_for_entry + 1);

    //Return the number of votes as an array (so frontend can display it)
    Iter.toArray(alumnos.entries())
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

  public func resetAlumnos() : async [(Text, Nat)] {

    alumnos.put("Ciber Seguridad", 0);
    alumnos.put("Internet de las Cosas", 0);
    alumnos.put("Inteligencia Artificial", 0);
    Iter.toArray(alumnos.entries())

  };
};



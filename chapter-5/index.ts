type Color = "Black" | "White";
type CFile = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H";
type Rank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

// 駒の位置（座標）
class Position {
  constructor(private file: CFile, private rank: Rank) {}

  distanceFrom(position: Position) {
    return {
      rank: Math.abs(position.rank - this.rank),
      file: Math.abs(position.file.charCodeAt(0) - this.file.charCodeAt(0)),
    };
  }
}

// チェスの駒
abstract class Piece {
  protected position: Position;
  constructor(private readonly color: Color, file: CFile, rank: Rank) {
    this.position = new Position(file, rank);
  }
  moveTo(position: Position) {
    this.position = position;
  }
  abstract canMoveTo(position: Position): boolean;
}

// チェスのゲームを表します
class Game {
  private pieces = Game.makePieces();

  private static makePieces() {
    return [
      // キング
      new King("White", "E", 1),
      new King("Black", "E", 8),

      // クイーン
      // new Queen("White", "D", 1),
      // new Queen("Black", "D", 8),
    ];
  }
}
class King extends Piece {
  canMoveTo(position: Position) {
    let distance = this.position.distanceFrom(position);
    return distance.rank < 2 && distance.file < 2;
  }
}

// class Queen extends Piece {} // クイーン
// class Bishop extends Piece {} // ビショップ
// class Knight extends Piece {} // ナイト
// class Rook extends Piece {} // ルーク
// class Pawn extends Piece {} // ポーン

// new Piece("White", "E", 1);

type ClassConstructor<T> = new (...args: any[]) => T;
function withEZDebug<
  C extends ClassConstructor<{
    getDebugValue(): object;
  }>
>(Class: C) {
  return class extends Class {
    constructor(...args: any[]) {
      super(...args);
    }
    debug() {
      let Name = super.constructor.name;
      let value = this.getDebugValue();
      return Name + "(" + JSON.stringify(value) + ")";
    }
  };
}

class HardToDebugUser {
  constructor(
    private id: number,
    private firstName: string,
    private lastName: string
  ) {}
  getDebugValue() {
    return {
      id: this.id,
      name: this.firstName + " " + this.lastName,
    };
  }
}
let User = withEZDebug(HardToDebugUser);
let user = new User(3, "Emma", "Gluzman");
user.debug(); // 'HardToDebugUser({"id": 3, "name": "Emma Gluzman"})' と評価されま

// ファクトリーパターン
type Shoe = {
  // interfaceでもいい
  purpose: string;
};
class BalletFlat implements Shoe {
  purpose = "dancing";
}
class Boot implements Shoe {
  purpose = "woodcutting";
}
class Sneaker implements Shoe {
  purpose = "walking";
}

type ShoeCreator = {
  create(type: "balletFlat"): BalletFlat;
  create(type: "boot"): Boot;
  create(type: "sneaker"): Sneaker;
};

let Shoe: ShoeCreator = {
  create(type: "balletFlat" | "boot" | "sneaker"): Shoe {
    switch (type) {
      case "balletFlat":
        return new BalletFlat();
      case "boot":
        return new Boot();
      case "sneaker":
        return new Sneaker();
    }
  },
};

let boot = Shoe.create("boot");

// ビルダーパターン
class RequestBuilder {
  private data: object | null = null;
  private method: "get" | "post" | null = null;
  private url: string | null = null;
  setMethod(method: "get" | "post"): this {
    this.method = method;
    return this;
  }
  setData(data: object): this {
    this.data = data;
    return this;
  }
  setURL(url: string): this {
    this.url = url;
    return this;
  }
  send() {
    // ...
  }
}

new RequestBuilder()
  .setURL("/users")
  .setMethod("get")
  .setData({ firstName: "Anna" })
  .send();

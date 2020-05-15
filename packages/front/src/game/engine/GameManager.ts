import Game from './Game'

export default class GameManager {
  static _gameInstance: Game
  static getGame(): Game {
    if (this._gameInstance == null) {
      this._gameInstance = new Game()
    }
    return this._gameInstance
  }
}

import Game from './Game'
import GameManager from './GameManager'
export default class UIManager {
  game: Game
  //Log in
  onCreatedRoom: (roomId: string) => void
  constructor(game: Game) {
    this.game = game
    this.onCreatedRoom = () => {}
  }

  /*doFurniRotate(itemId: number) {
    const { currentRoom } = this.game
    if (currentRoom != null) {
      const item = currentRoom.roomItemManager.getItem(itemId)
      if (item != null) {
        item.rotate()
      }
    }
  }*/
  doOpenCreateRoom() {
    //this.onOpenCreateRoom()
    /*const { currentUser } = this.game.userManager
    if (currentUser != null) {
    }*/
  }
}

import React from 'react';
import Map from './Map.js'
import Stats from './Stats.js'

var arr = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 2, 3, 4, 5, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 2, 3, 4, 5, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // map: Array((this.props.gridSize || 15)).fill(Array((this.props.gridSize || 15)).fill(1)),
      map: arr,
      // playerXcoord: Math.floor(Math.random()*(this.props.gridSize || 15)),
      playerXcoord: 4,
      // playerYcoord: Math.floor(Math.random()*(this.props.gridSize || 15)),
      playerYcoord: 4,
      hp: 100,
      maxHp: 200,
      attack: 10,
      level: 1,
      floor: -1,
    }
    this.checkNextTile = this.checkNextTile.bind(this)
    this.decreaseFloor = this.decreaseFloor.bind(this)
    this.handleKeydown = this.handleKeydown.bind(this)
    this.healthPot = this.healthPot.bind(this)
    this.increaseAttack = this.increaseAttack.bind(this)
    this.movePlayer = this.movePlayer.bind(this)
    this.turnTileIntoDungeon = this.turnTileIntoDungeon.bind(this)
  }

  componentWillMount() {
    window.removeEventListener('keydown', this.handleKeydown)
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydown)
    // var arr = this.state.map
    // arr[0] = Array(this.props.gridSize || 15).fill(0)
    // arr[arr.length - 1] = Array(this.props.gridSize || 15).fill(0)
    // arr[1][0] = 0
    // arr[1][arr.length - 1] = 0
    // this.setState({
    // 	map: arr
    // })
  }

  ///////////////////////////////////////////////////////////////////////////////////

  checkNextTile(x, y) {
    var nextTile = this.state.map[this.state.playerXcoord + x][this.state.playerYcoord + y]
    if ((nextTile) === 1) { // dungeon tile
      this.movePlayer(x, y) //changes state
    } else if (nextTile === 2) { // enemy tile

    } else if (nextTile === 3) { // item tile
      this.increaseAttack()
      this.turnTileIntoDungeon(this.state.playerXcoord + x, this.state.playerYcoord + y)
      this.movePlayer(x, y)
    } else if (nextTile === 4) { // health pot tile
      this.healthPot()
      this.turnTileIntoDungeon(this.state.playerXcoord + x, this.state.playerYcoord + y)
      this.movePlayer(x, y)
    } else if (nextTile === 5) { // manhole tile
      this.movePlayer(x, y)
      this.decreaseFloor()
    }
  }

  decreaseFloor() {
    this.setState(function (prevState) {
      return {
        floor: prevState.floor - 1
      }
    })
  }

  handleKeydown(e) {
    switch (e.code) {
      case 'ArrowDown':
        if (this.state.playerXcoord + 1 < this.state.map.length) { // check that nextTile does not exit map
          this.checkNextTile(1, 0)
        }
        break

      case 'ArrowRight':
        if (this.state.playerYcoord + 1 < this.state.map.length) { //verify that player coord + 1 does not exit map
          this.checkNextTile(0, 1)
        }
        break

      case 'ArrowUp':
        if (this.state.playerXcoord - 1 >= 0) { //verify that player coord + 1 does not exit map
          this.checkNextTile(-1, 0)
        }
        break

      case 'ArrowLeft':
        if (this.state.playerYcoord - 1 >= 0) { //verify that player coord + 1 does not exit map
          this.checkNextTile(0, -1)
        }
        break

      default:
      //do nothing
    }
  }

  healthPot() {
    this.setState(function (prevState) {
      var newHealth = prevState.hp + (Math.round(prevState.maxHp * 0.25))
      newHealth = newHealth > prevState.maxHp ? prevState.maxHp : newHealth
      return {
        hp: newHealth
      }
    })
  }

  increaseAttack() {
    this.setState(function (prevState) {
      return {
        attack: prevState.attack + (prevState.floor * (-1) * 10)
      }
    })
  }

  movePlayer(x, y) {
    this.setState(function (prevState) {
      return {
        playerXcoord: prevState.playerXcoord + x,
        playerYcoord: prevState.playerYcoord + y
      }
    })
  }

  turnTileIntoDungeon(x, y) {
    this.setState(function (prevState) {
      var newMap = prevState.map
      newMap[x][y] = 1
      return {
        map: newMap
      }
    })
  }

  render() {
    return (
      <div>
        <Stats
          hp={this.state.hp}
          maxHp={this.state.maxHp}
          attack={this.state.attack}
          level={this.state.level}
          floor={this.state.floor}
        />
        <div className='map'>
          <Map map={this.state.map} playerCoords={[this.state.playerXcoord, this.state.playerYcoord]} />
        </div>
      </div>
    )
  }
}

export default App

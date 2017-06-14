import React from 'react';
import Map from './Map.js'
import Stats from './Stats.js'

class App extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			map: Array((this.props.gridSize || 15)).fill(Array((this.props.gridSize || 15)).fill(1)),
			playerXcoord: Math.floor(Math.random()*(this.props.gridSize || 15)),
			playerYcoord: Math.floor(Math.random()*(this.props.gridSize || 15)),
			hp: 100,
			attack: 10,
			level: 1, 
			floor: -1,
		}
		this.handleKeydown = this.handleKeydown.bind(this)
		this.movePlayer = this.movePlayer.bind(this)
	}

	componentWillMount(){
		window.removeEventListener('keydown', this.handleKeydown)
	}

	componentDidMount(){
		window.addEventListener('keydown', this.handleKeydown)
		var arr = this.state.map
		arr[0] = Array(this.props.gridSize || 15).fill(0)
		arr[arr.length - 1] = Array(this.props.gridSize || 15).fill(0)
		arr[1][0] = 0
		arr[1][arr.length - 1] = 0
		this.setState({
			map: arr
		})
	}

	handleKeydown(e){
		switch(e.code){
			case 'ArrowDown':
				if(this.state.playerXcoord + 1 < this.state.map.length){ //verify that player coord + 1 does not exit map
					if((this.state.map[this.state.playerXcoord + 1][this.state.playerYcoord] || 0) === 1){ //verify that player coord + 1 if a walkable tile
						this.movePlayer(1,0) //changes state
					}else if(this.state.map[this.state.playerXcoord + 1][this.state.playerYcoord] === 2){
						
					}
				}
				break
			case 'ArrowRight':
				if(this.state.playerYcoord + 1 < this.state.map.length){ //verify that player coord + 1 does not exit map
					if((this.state.map[this.state.playerXcoord][this.state.playerYcoord + 1] || 0) === 1){ //verify that player coord + 1 if a walkable tile
						this.movePlayer(0,1) //changes state
					}
				}
				break
			case 'ArrowUp':
				if(this.state.playerXcoord - 1 >= 0){ //verify that player coord + 1 does not exit map
					if((this.state.map[this.state.playerXcoord - 1][this.state.playerYcoord] || 0) === 1){ //verify that player coord + 1 if a walkable tile
						this.movePlayer(-1,0) //changes state
					}
				}
				break
			case 'ArrowLeft':
				if(this.state.playerYcoord - 1 >= 0){ //verify that player coord + 1 does not exit map
					if((this.state.map[this.state.playerXcoord][this.state.playerYcoord - 1] || 0) === 1){ //verify that player coord + 1 if a walkable tile
						this.movePlayer(0,-1) //changes state
					}
				}
				break
			default:
				//do nothing
		}
	}

	movePlayer(x, y){
		this.setState(function(prevState){
			return {
				playerXcoord: prevState.playerXcoord + x,
				playerYcoord: prevState.playerYcoord + y
			}
		})
	}

	render() {
		return (
			<div>
				<Stats 
					hp={this.state.hp} 
					attack={this.state.attack} 
					level={this.state.level} 
					floor={this.state.floor}
					/>
				<div className='map'>
					<Map map={this.state.map} playerCoords={[this.state.playerXcoord, this.state.playerYcoord]}/>
				</div>
			</div>
		)
	}
}

export default App

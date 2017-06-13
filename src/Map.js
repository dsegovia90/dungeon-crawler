import React from 'react';

class Map extends React.Component {
	setClassName(td){
		var className = 'square'
		switch(td){
			case -1:
				className += ' player'
				break;
				
			case 0:
				className += ' wall'
				break;

			case 1:
				className += ' dungeon'
				break;

			default:
				className += ' wall'
		}
		return className
	}
	render(){
		var map = this.props.map
		var setClassName = this.setClassName
		var playerXcoord = this.props.playerCoords[0]
		var playerYcoord = this.props.playerCoords[1]
		return(
			<table>
				<tbody>
					{map.map(function(tr, index){
						return <tr key={index}>
							{map[index].map(function(td, index2){	
								if(playerXcoord === index && playerYcoord === index2){
									td = -1
								}
								return <td key={index2} className={setClassName(td)}></td>
							})}
						</tr>
					})}
				</tbody>
			</table>
		)
	}
}

export default Map

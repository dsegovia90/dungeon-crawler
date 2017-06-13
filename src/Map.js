import React from 'react';

class Map extends React.Component {
	setClassName(td){
		var className = 'square'
		switch(td){
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
		var that = this
		return(
			<table>
				<tbody>
					{map.map(function(tr, index){
						return <tr key={index}>
							{map[index].map(function(td, index2){
								return <td key={index2} className={that.setClassName(td)}></td>
							})}
						</tr>
					})}
				</tbody>
			</table>
		)
	}
}

export default Map

import React from 'react';

class Map extends React.Component {
  setClassName(td) {
    var className = 'square'
    if (td === -1) {
      className += ' player'
    } else if (td === 0) {
      className += ' wall'
    } else if (td === 1) {
      className += ' dungeon'
    } else if (td === 2) {
      className += ' manhole'
    } else if (td === 3) {
      className += ' item'
    } else if (td === 4) {
      className += ' health'
    } else if (td >= 5) {
      className += ' enemy'
    } else {
      className += ' wall'
    }
    return className
  }
  render() {
    var map = this.props.map
    var setClassName = this.setClassName
    var playerXcoord = this.props.playerCoords[0]
    var playerYcoord = this.props.playerCoords[1]
    return (
      <table>
        <tbody>
          {map.map(function (tr, index) {
            return <tr key={index}>
              {map[index].map(function (td, index2) {
                if (playerXcoord === index && playerYcoord === index2) {
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

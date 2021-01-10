import React from 'react';
import './style.scss'

const PlayerCard = (props) => {
  return (
    <div className="player_card_wrapper">
      <div className="player_card_thmb" style={{
        background: `#f2f9ff url(${props.bck})` 
      }} ></div>
      <div className="player_card_nfo">
        <div className="player_card_number">{props.number}</div>
        <div className="player_card_name">
          <span>{props.name}</span>
          <span>{props.lastName}</span>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
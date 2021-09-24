import React from 'react';

function PlayersChoice(props) {
    return (
        <article className="card mt-4">
            <div className="card-body">
                <div>
                    <h5 className="card-title">{props.first_name} {props.last_name}</h5>
                    <p className="card-text">{props.height}</p>
                    <p className="card-text">{props.team_city} {props.team_name}</p>
                    <button className="search-player" onClick={() => props.choose_player(props.id)}>C'est le joueur que je cherche {'>'} </button>
                    <img id="player-head" src={props.img} alt=""/>
                </div>
            </div>
        </article>
    );
}
export default PlayersChoice;
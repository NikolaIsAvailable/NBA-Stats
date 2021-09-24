import React from 'react';

export interface IPlayers {
    id?: number
    first_name: string
    height: string
    weight: string | number
    team_city: string
    team_name: string
    last_name: string
    display_stats:(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    display_table_stats:(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    img: string
}

function Players(props: IPlayers) {
    return (
        <article className="card mt-4">
            <div className="card-body">
                <div>
                    <h5 className="card-title">{props.first_name} {props.last_name}</h5>
                    <p className="card-text">{props.height}</p>
                    <p className="card-text">{props.weight} Kg</p>
                    <p className="card-text">{props.team_city} {props.team_name}</p>
                    <div>
                        <button className="search-player" onClick={props.display_stats}>Stats saison {'>'} </button>
                        <button className="search-player" onClick={props.display_table_stats}>Stats complètes {'>'} </button>
                    </div>
                    <img id="player-head" src={props.img} alt=""/>
                </div>
            </div>
        </article>
    );
}
export default Players;




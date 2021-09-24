import React from 'react';

function PlayersStats(props: any) {

    return (
        <article className="card mt-4 mb-5">
            <div className="card-body">
                <div>
                    <p className="card-text"><strong>{props.games}</strong> gp</p>
                    <p className="card-text"><strong>{props.points}</strong> pts/g</p>
                    <p className="card-text"><strong>{props.assists}</strong> ass/g</p>
                    <p className="card-text"><strong>{props.rebounds}</strong> reb/g</p>
                    <p className="card-text">Field Goal : <strong>{props.field_goal}</strong> %</p>
                    <p className="card-text">3points Field Goal : <strong>{props.threes_field_goal}</strong> %</p>
                </div>
            </div>
        </article>
        
    );
}

export default PlayersStats;

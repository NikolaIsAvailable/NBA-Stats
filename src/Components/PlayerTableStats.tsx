import React from 'react';

function PlayerTableStats(props: any) {
    return (
        <tr>
            <td><strong>{props.season}-{props.season + 1}</strong></td>
            <td><strong>{props.games}</strong></td>
            <td><strong>{props.min}</strong></td>
            <td><strong>{props.points}</strong></td>
            <td><strong>{props.assists}</strong></td>
            <td><strong>{props.rebounds}</strong></td>
            <td><strong>{props.oreb}</strong></td>
            <td><strong>{props.dreb}</strong></td>
            <td><strong>{props.fgm}</strong></td>
            <td><strong>{props.fga}</strong></td>
            <td><strong>{props.field_goal} %</strong></td>
            <td><strong>{props.threes_made}</strong></td>
            <td><strong>{props.threes_attempt}</strong></td>
            <td><strong>{props.threes_field_goal} %</strong></td>
            <td><strong>{props.ft}</strong> %</td>
            <td><strong>{props.stl}</strong></td>
            <td><strong>{props.blk}</strong></td>
            <td><strong>{props.to}</strong></td>
            <td><strong>{props.pf}</strong></td>
        </tr>
    );
}

export default PlayerTableStats;

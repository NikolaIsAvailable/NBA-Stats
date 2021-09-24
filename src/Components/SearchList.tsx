import React from 'react';

function SearchList(props: any) {

    return (
        <li onKeyPress={() => props.search_name(props.first_name, props.last_name)} 
            className="pick-player" 
            onPointerOver={() => props.search_name(props.first_name, props.last_name)}
            onClick={props.on_click_search}
        >{props.first_name} {props.last_name}</li>
    );
}

export default SearchList;
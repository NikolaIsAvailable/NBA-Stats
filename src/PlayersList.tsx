import React, {Component} from 'react';
import Players, {IPlayers} from './Components/Players';
import PlayersStats from './Components/PlayersStats';
import SearchList from './Components/SearchList';
import PlayersChoice from './Components/PlayersChoice';
import PlayerTableStats from './Components/PlayerTableStats';


interface IPlayerApiResponseData {
    first_name: string
    last_name: string
}

interface IPlayerListState {
    seasonNumber : number,
    gpAvg : number,
    minAvg : number,
    ptsAvg : number,
    assAvg : number,
    rebAvg : number,
    orebAvg : number,
    drebAvg : number,
    fgmAvg : number,
    fgaAvg : number,
    fgAvg : number,
    threepmAvg : number,
    threepaAvg : number,
    threepfgAvg : number,
    ftAvg : number,
    stlAvg : number,
    blkAvg : number,
    toAvg : number,
    pfAvg : number,
    playerIdentityById : [],
    dismissWrongPlayerCard : boolean
    showPlayerTables : boolean
    errorLoading : boolean
    errorNoName : boolean
    playedThisSeason : boolean
    playerTablesStats : []
    displayNames : string[]|boolean
    errorVar : boolean
    errorName : boolean|string,
    errorNamePrecision : boolean,
    possibleNames : string[],
    dateArray : string[],
    dateValue : number,
    loading? : boolean|null,
    playerTeam: Record<string, string|number>,
    playerIdentity: [],
    playerStats: [],
    playerId: string,
    playerChoice: [],
    bestScoreurId: string,
    bestScoreurPts: string,
    search : string,
    dislpayPlayerChoice : boolean
    displayTableArrow : boolean
}

const url = "https://www.balldontlie.io/api/v1";

class PlayersList extends Component {

    state: IPlayerListState = {
        seasonNumber : 0,
        gpAvg : 0,
        minAvg : 0,
        ptsAvg : 0,
        assAvg : 0,
        rebAvg : 0,
        orebAvg : 0,
        drebAvg : 0,
        fgmAvg : 0,
        fgaAvg : 0,
        fgAvg : 0,
        threepmAvg : 0,
        threepaAvg : 0,
        threepfgAvg : 0,
        ftAvg : 0,
        stlAvg : 0,
        blkAvg : 0,
        toAvg : 0,
        pfAvg : 0,
        playerIdentityById : [],
        dismissWrongPlayerCard : false,
        errorLoading : false,
        showPlayerTables : false,
        playerTablesStats : [],
        errorNoName : false,
        playedThisSeason : true,
        displayNames : [],
        errorVar : false,
        errorName : false,
        errorNamePrecision : false,
        possibleNames : [],
        dateArray : [],
        dateValue : 2019,
        loading : null,
        playerTeam:{},
        playerIdentity: [],
        playerChoice: [],
        playerStats: [],
        playerId: '',
        bestScoreurId: '',
        bestScoreurPts: '',
        search : '',
        dislpayPlayerChoice : true,
        displayTableArrow : false
    };

    strUcFirst = (a: string) => {
        return (a+'').charAt(0).toUpperCase()+a.substr(1);
    }
    
    onChangeSearchText = (event: React.ChangeEvent<HTMLInputElement>) => {

        this.setState( {errorName : false})

        this.setState( {playedThisSeason : true})

        this.setState( {displayNames : true})

        const playerName = event.target.value;

        window.fetch(url + `/players/?search=${playerName}`)
        .then(function (response)
            {
                return response.json();
            })
        .then( (data) =>
        {

            console.log(data.data);

            // this.setState( {possibleNames : data.data} )

            // for(const possibleName of this.state.possibleNames) {
            //     console.log(possibleName.first_name);
            //     console.log(possibleName.last_name);
            // }

            const possibleNames = data.data.map((data: IPlayerApiResponseData, index: number) => (
                
                 <SearchList
                    key={index ++}
                    search_name={this.setSearch}
                    on_click_search={this.onClickSearch}
                    first_name={data.first_name}
                    last_name={data.last_name}
                />
            ));
            
            // if (possibleNames.length === 1) {
            //     this.setSearch(possibleNames[0].props.first_name, possibleNames[0].props.last_name);

            //     this.onClickSearch();
            // }

            this.setState( {possibleNames : possibleNames} )

        })

        this.setState({search: playerName});

    }

    setSearch = (a: string, b: string) => {
        
        this.setState( { search : a + ' ' + b } )

    }

    onClickSearch = () => {

        this.setState( {playedThisSeason : true} )
        this.setState( {errorNamePrecision : false} )
        this.setState( {loading : true} )
        this.setState( {displayNames : false} )
        this.setState( { showPlayerTables : false } )

        const namePlayer = this.state.search.split(" ").join("_")



        if (namePlayer.length === 0) {
            this.setState( {errorNoName : true} )
            this.setState( {loading : false} )
        }
        
        else {

            window.fetch(url + `/players/?search=${namePlayer}`)
            .then(function (response)
                {
                    return response.json();
                })
            .then( (data) =>
            {                
                if (data.data.length === 0) {
    
                    this.setState( {errorName : true})
    
                    this.setState( {loading : false} )
                    return 
                }
    
                const name : IPlayers[] = data.data; // players

                console.log(name);
                
            
                if (name.length > 1) {
                    
                    this.setState( {errorNamePrecision : true} )
                    this.setState( {loading : false} )
    
                    const playerChoice = name.map((data: any, index: number) => {
    
                        const height_feet = data.height_feet * 30.48;
                        const height_inches = data.height_inches * 2.54;
        
                        return <PlayersChoice
                                    key={index ++}
                                    id={data.id}
                                    choose_player={this.choosePlayerById}
                                    first_name={data.first_name}
                                    last_name={data.last_name}
                                    height={((height_feet + height_inches) / 100).toFixed(2) + " m"}
                                    weight={(data.weight_pounds * 0.453592).toFixed(0)}
                                    team_city={data.team.city}
                                    team_name={data.team.name}
                                    img={`https://nba-players.herokuapp.com/players/${data.last_name}/${data.first_name}`}
                        />;
                    });
        
                    this.setState({playerChoice : playerChoice})
                    this.setState({playerId : name[0].id})
                    this.setState( {search : ''} )
                    this.setState( {loading : false} )
                }
                
                else {
                    const playerIdentity = name.map((data: any, index: number) => {
    
                        const height_feet = data.height_feet * 30.48;
                        const height_inches = data.height_inches * 2.54;
        
                        return <Players
                                    key={index ++}
                                    display_stats={this.getPlayerStats}
                                    display_table_stats={this.getStatsTable}
                                    first_name={data.first_name}
                                    last_name={data.last_name}
                                    height={((height_feet + height_inches) / 100).toFixed(2) + " m"}
                                    weight={(data.weight_pounds * 0.453592).toFixed(0)}
                                    team_city={data.team.city}
                                    team_name={data.team.name}
                                    img={`https://nba-players.herokuapp.com/players/${data.last_name}/${data.first_name}`}
                        />;
                    });
        
                    this.setState({ playerIdentity : playerIdentity})
                    this.setState({ playerId : name[0].id})
                    this.setState( {search : ''} )
                    this.setState( {loading : false} )
                }
            })
        }

    }

    choosePlayerById = (id: number) => {
        window.fetch(url + `/players/${id}`)
        .then(function (response)
            {
                return response.json();
            })
        .then( (data) =>
        {      
            const dataArray = new Array(data)
            
            const playerIdentity = dataArray.map((data: any, index: number) => {

                const height_feet = data.height_feet * 30.48;
                const height_inches = data.height_inches * 2.54;

                return <Players
                            key={index ++}
                            display_stats={this.getPlayerStats}
                            display_table_stats={this.getStatsTable}
                            first_name={data.first_name}
                            last_name={data.last_name}
                            height={((height_feet + height_inches) / 100).toFixed(2) + " m"}
                            weight={(data.weight_pounds * 0.453592).toFixed(0)}
                            team_city={data.team.city}
                            team_name={data.team.name}
                            img={`https://nba-players.herokuapp.com/players/${data.last_name}/${data.first_name}`}
                />;
            });
            
                this.setState({ playerIdentityById : playerIdentity})
                this.setState( {search : ''} )
                this.setState( { dislpayPlayerChoice : false } )
                this.setState( { errorNamePrecision : false } )
                this.setState( {loading : false} )
                this.setState( {dismissWrongPlayerCard : true} )
            
            });
        }

    getPlayerStats = async () => {

        this.setState( { playedThisSeason : true} )
        this.setState( {loading : true} )
        
        try {
            const response = await window.fetch(url + `/season_averages?season=${this.state.dateValue}&player_ids[]=${this.state.playerId}`)
            const data = await response.json()
            const stats = data.data;
    
            if(stats.length === 0) {
                this.setState( { playedThisSeason : false} )
            }

            console.log(stats);
    
            const playerStats = stats.map((data: any, index: number) => {
    
                return <PlayersStats
                            key={index ++}
                            games={data.games_played}
                            points={data.pts}
                            assists={data.ast}
                            rebounds={data.reb}
                            field_goal={(data.fg_pct * 100).toFixed(1)}
                            threes_field_goal={(data.fg3_pct * 100).toFixed(1)}
                            threes_made={data.fg3m}
                            threes_attempt={data.fg3a}
                />;
            });
            //console.log(this.state.playerStats[0]);
            this.setState({ playerStats : playerStats})
            this.setState( {loading : false} )
        } catch (error) {
            this.setState({errorName: true})
        }

    }

    getStatsTable = async () => {

        this.setState( {loading : true} )
        
        this.setState( { seasonNumber : 0 } )
        this.setState( { gpAvg : 0 } )
        this.setState( { minAvg : 0 } )
        this.setState( { ptsAvg : 0 } )
        this.setState( { assAvg : 0 } )
        this.setState( { rebAvg : 0 } )
        this.setState( { orebAvg : 0 } )
        this.setState( { drebAvg : 0 } )
        this.setState( { fgaAvg : 0 } )
        this.setState( { threepmAvg : 0 } )
        this.setState( { threepaAvg : 0 } )
        this.setState( { threepfgAvg : 0 } )
        this.setState( { ftAvg : 0 } )
        this.setState( { stlAvg : 0 } )
        this.setState( { blkAvg : 0 } )
        this.setState( { toAvg : 0 } )
        this.setState( { pfAvg : 0 } )

        // faire try, catch

        try {
            const table : any [] = []
            const requests : Promise<Response>[]=[]
            for (let index = 1979; index < 2020; index++) {

                requests.push(window.fetch(url + `/season_averages?season=${index}&player_ids[]=${this.state.playerId}`))

        }

        const responses = await Promise.all(requests)
        const seasonData = await Promise.all(responses.map(response => response.json()))
        seasonData.forEach(yearlyData => {
            const {data} = yearlyData
            if (data.length > 0) {
                table.push(data[0]);
            }
        })

        this.setState( { seasonNumber : table.length} )

        const playerTableStats = table.map((data: any, index: number) => {

            this.state.gpAvg += parseFloat(data.games_played);
            this.state.minAvg += parseFloat(data.min);
            this.state.ptsAvg += parseFloat(data.pts);
            this.state.assAvg += parseFloat(data.ast);
            this.state.rebAvg += parseFloat(data.reb);
            this.state.orebAvg += parseFloat(data.oreb);
            this.state.drebAvg += parseFloat(data.dreb);
            this.state.fgmAvg += data.fgm * data.games_played;
            this.state.fgaAvg += data.fga * data.games_played;
            this.state.fgAvg += parseFloat(data.fg_pct);
            this.state.threepmAvg += data.fg3m * data.games_played;
            this.state.threepaAvg += data.fg3a * data.games_played;
            this.state.threepfgAvg += parseFloat(data.fg3_pct);
            this.state.ftAvg += parseFloat(data.ft_pct);
            this.state.stlAvg += parseFloat(data.stl);
            this.state.blkAvg += parseFloat(data.blk);
            this.state.toAvg += parseFloat(data.turnover);
            this.state.pfAvg += parseFloat(data.pf);
            
            return <PlayerTableStats
                        key={index ++}
                        season={data.season}
                        games={data.games_played}
                        min={data.min}
                        points={data.pts.toFixed(1)}
                        assists={data.ast.toFixed(1)}
                        rebounds={data.reb.toFixed(1)}
                        oreb={data.oreb.toFixed(1)}
                        dreb={data.dreb.toFixed(1)}
                        fgm={data.fgm.toFixed(1)}
                        fga={data.fga.toFixed(1)}
                        field_goal={(data.fg_pct * 100).toFixed(1)}
                        threes_field_goal={(data.fg3_pct * 100).toFixed(1)}
                        threes_made={data.fg3m.toFixed(1)}
                        threes_attempt={data.fg3a.toFixed(1)}
                        stl={data.stl.toFixed(1)}
                        blk={data.blk.toFixed(1)}
                        to={data.turnover.toFixed(1)}
                        pf={data.pf.toFixed(1)}
                        ft={(data.ft_pct * 100).toFixed(1)}
            />;
        });   

        this.setState( { playerTablesStats : playerTableStats } )
        this.setState( { showPlayerTables : true } )
        this.setState( {loading : false} )
        this.setState( {displayTableArrow : true} )

        // this.setState( { gpAvg : this.state.gpAvg / table.length } )
        // this.setState( { minAvg : this.state.minAvg / table.length } )
        // this.setState( { ptsAvg : this.state.ptsAvg / table.length } )
        // this.setState( { assAvg : this.state.assAvg / table.length } )
        // this.setState( { rebAvg : this.state.rebAvg / table.length } )
        // this.setState( { orebAvg : this.state.orebAvg / table.length } )
        // this.setState( { drebAvg : this.state.drebAvg / table.length } )
        // this.setState( { fgmAvg : this.state.fgmAvg / table.length } )
        // this.setState( { fgaAvg : this.state.fgaAvg / table.length } )
        // this.setState( { threepmAvg : this.state.threepmAvg / table.length } )
        // this.setState( { threepaAvg : this.state.threepaAvg / table.length } )
        // this.setState( { threepfgAvg : this.state.threepfgAvg / table.length } )
        // this.setState( { ftAvg : this.state.ftAvg / table.length } )
        // this.setState( { stlAvg : this.state.stlAvg / table.length } )
        // this.setState( { blkAvg : this.state.blkAvg / table.length } )
        // this.setState( { toAvg : this.state.toAvg / table.length } )
        // this.setState( { pfAvg : this.state.pfAvg / table.length } )
        
        
        } catch (error) {
            this.setState({errorLoading: true})
        }

        // let totalPts = 0;
        // let totalPts = 0;
        // let totalPts = 0;
        
        // for (let index = 0; index < this.state.ptsTotal.length; index++) {
        //     totalPts += this.state.ptsTotal[index]
        // }

        // let avgPts = totalPts / ptsTotal.length     
        
    }


    // Peut être à faire en base de donnée
    getBestScoreur = () => {
        
        for (let index = 0; index < 100; index++) {

            window.fetch(url + `/season_averages?season=${this.state.dateValue}&player_ids[]=${index}`)
            .then(function (response)
                {
                    return response.json();
                })
            .then( (data) =>
            {
                if (data.data[0] !== undefined) {
                    if (data.data[0].pts > this.state.bestScoreurPts) {
                        this.setState( { bestScoreurPts: data.data[0].pts })
                        this.setState( { bestScoreurId: index })

                        console.log(data.data[0].pts);
                    }
                }
            })
        }

        console.log(this.state.bestScoreurId);

        window.fetch(`https://www.balldontlie.io/api/v1/players/${this.state.bestScoreurId}`)
                .then(function (response)
                    {
                        return response.json();
                    })
                .then( (data) =>
                {
                    console.log(data);
                })
        
    }

    displayDate = (a: number, b: number) => {
        for (let i = a; i < b; i++) {

            if(this.state.dateArray.length > (b-1) - a) {
                return this.state.dateArray;
            }

            else {
                // @ts-ignore
                this.state.dateArray.push(<option key={i+Math.random()} value={i}>{i}-{i+1}</option>)
            }

        }

        return this.state.dateArray

    }

    selectDate = (event: any) => {
        this.setState( {dateValue : event.target.value})
    }

    dismissTableArrow = () => {
        this.setState({ displayTableArrow : false })
    }

    render() {

        return (
            <main>
                <p>{this.state.bestScoreurId} {this.state.bestScoreurPts} </p>
                <section className="container row mx-auto mt-3">
                    <div className="container row justify-content-center">
                       <h5 className="mt-2 mr-1">Saison</h5> 
                        <select value={this.state.dateValue} onChange={this.selectDate} name="season" id="select-season">
                            {this.displayDate(1979, 2020)}
                        </select>
                    </div>
                </section>
                <div className="error">
                    { this.state.errorName ? <p>{this.strUcFirst(this.state.search) + ' n\'est pas présent dans la base de donnée ou alors il est mal orthographié' }</p> : ''}
                    { this.state.errorNamePrecision ? <p>Il faut être plus précis</p> : ''}
                    { this.state.errorNoName ? <p>Il faut écrire un nom frère</p> : ''}
                    { this.state.errorLoading ? <p>Le chargement a échoué, veuillez recharger la page</p> : ''}
                </div>
                <div id="search-box">
                    <input type="text" className="put-player my-3" value={this.state.search} placeholder="Chercher joueur" onChange={this.onChangeSearchText}></input>
                    <button className="search-player rounded-circle ml-1" type="button" id="search" onClick={this.onClickSearch}>
                        <i className="fas fa-search"></i>
                    </button>
                    <div id="search-proposition">

                        { this.state.displayNames === true

                        ?
                        <ul className="custom-select"  id="possible-names" >
                            {this.state.possibleNames}
                        </ul>

                        : ''
                        }
                        
                    </div>
                </div>

                <section className="player-card card-list container mx-auto">

                    { this.state.loading 
                    
                    ? 
                    <div className="vr">
                        <div className="hoop mx-auto my-5">
                            <span className="ball"></span>
                            <span className="basket"></span>
                            <span className="rim"></span>   
                            <span className="net"></span>
                        </div> 
                    </div>

                    : ''
                    }

                    {this.state.playerIdentity }

                    { this.state.dismissWrongPlayerCard === true
                    
                    ? this.state.playerIdentity 

                    :  ''
                    
                    }

                    {this.state.playerIdentityById}

                    { this.state.dislpayPlayerChoice === false

                    ?
                    ''

                    :
                    this.state.playerChoice}

                    { this.state.playedThisSeason === true
                    
                    ? this.state.playerStats

                    : <div className="error" ><p>Se joueur n'a pas joué lors de cette saison</p></div>

                    }
                    { this.state.displayTableArrow === true

                    ? <div className="mt-2" id="arrow-table">
                        <a onClick={this.dismissTableArrow} className="arrow-down rounded-circle" href="#header-fixed"><i className="fas fa-arrow-down"></i></a>
                      </div>
                    
                    :''

                    }
                </section>

                { this.state.showPlayerTables === true

                ? <div className="mt-5 mb-3 mx-3">
                    <div className="row table-stats">
                        <table id="header-fixed" className="table">
                            <thead>
                                <tr>
                                    <th scope="col">SAISON</th>
                                    <th scope="col">GP</th>
                                    <th scope="col">MIN</th>
                                    <th scope="col">PTS/G</th>
                                    <th scope="col">ASS/G</th>
                                    <th scope="col">REB/G</th>
                                    <th scope="col">OREB/G</th>
                                    <th scope="col">DREB/G</th>
                                    <th scope="col">FGM</th>
                                    <th scope="col">FGA</th>
                                    <th className="px-4"scope="col">FG%</th>
                                    <th scope="col">3PM</th>
                                    <th scope="col">3PA</th>
                                    <th scope="col">3PFG%</th>
                                    <th className="px-4" scope="col">FT%</th>
                                    <th scope="col">STL</th>
                                    <th scope="col">BLK</th>
                                    <th scope="col">TO</th>
                                    <th scope="col">PF</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {this.state.playerTablesStats}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td>{this.state.seasonNumber}</td>  
                                    <td>{this.state.gpAvg}</td>  
                                    <td>{(this.state.minAvg / this.state.seasonNumber).toFixed(1)}</td>
                                    <td>{(this.state.ptsAvg / this.state.seasonNumber).toFixed(1)}</td>
                                    <td>{(this.state.assAvg / this.state.seasonNumber).toFixed(1)}</td>
                                    <td>{(this.state.rebAvg / this.state.seasonNumber).toFixed(1)}</td>
                                    <td>{(this.state.orebAvg / this.state.seasonNumber).toFixed(1)}</td>
                                    <td>{(this.state.drebAvg / this.state.seasonNumber).toFixed(1)}</td>
                                    <td>{this.state.fgmAvg.toFixed(0)}</td>
                                    <td>{this.state.fgaAvg.toFixed(0)}</td>
                                    <td>{((this.state.fgmAvg / this.state.fgaAvg) * 100).toFixed(1)} %</td>
                                    <td>{this.state.threepmAvg.toFixed(0)}</td>
                                    <td>{this.state.threepaAvg.toFixed(0)}</td>
                                    <td>{((this.state.threepmAvg / this.state.threepaAvg) * 100).toFixed(1)} %</td>
                                    <td>{((this.state.ftAvg / this.state.seasonNumber) * 100).toFixed(1)} %</td>
                                    <td>{(this.state.stlAvg / this.state.seasonNumber).toFixed(1)}</td>
                                    <td>{(this.state.blkAvg / this.state.seasonNumber).toFixed(1)}</td>
                                    <td>{(this.state.toAvg / this.state.seasonNumber).toFixed(1)}</td>
                                    <td>{(this.state.pfAvg / this.state.seasonNumber).toFixed(1)}</td>
                                </tr>
                            </tfoot>
                        </table>    
                    </div>
                </div>
                
                : ''

                }
                


                


{/* <div className="mx-1" id="table-wrapper">
                    <div id="table-scroll">
                        <table className="table bg-light">
                            <thead>
                                <tr>
                                    <th>SAISON</th>
                                    <th>GP</th>
                                    <th>MIN</th>
                                    <th>PTS/G</th>
                                    <th>ASS/G</th>
                                    <th>REB/G</th>
                                    <th>OREB/G</th>
                                    <th>DREB/G</th>
                                    <th>FGM</th>
                                    <th>FGA</th>
                                    <th>FG%</th>
                                    <th>3PM</th>
                                    <th>3PA</th>
                                    <th>3PFG%</th>
                                    <th>FT%</th>
                                    <th>STL</th>
                                    <th>BLK</th>
                                    <th>TO</th>
                                    <th>PF</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.playerTablesStats}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td>{this.state.seasonNumber}</td>  
                                    <td>{this.state.gpAvg}</td>  
                                    <td>{(this.state.minAvg / this.state.seasonNumber).toFixed(1)}</td>
                                    <td>{(this.state.ptsAvg / this.state.seasonNumber).toFixed(1)}</td>
                                    <td>{(this.state.assAvg / this.state.seasonNumber).toFixed(1)}</td>
                                    <td>{(this.state.rebAvg / this.state.seasonNumber).toFixed(1)}</td>
                                    <td>{(this.state.orebAvg / this.state.seasonNumber).toFixed(1)}</td>
                                    <td>{(this.state.drebAvg / this.state.seasonNumber).toFixed(1)}</td>
                                    <td>{this.state.fgmAvg.toFixed(0)}</td>
                                    <td>{this.state.fgaAvg.toFixed(0)}</td>
                                    <td>{((this.state.fgmAvg / this.state.fgaAvg) * 100).toFixed(1)} %</td>
                                    <td>{this.state.threepmAvg.toFixed(0)}</td>
                                    <td>{this.state.threepaAvg.toFixed(0)}</td>
                                    <td>{((this.state.threepmAvg / this.state.threepaAvg) * 100).toFixed(1)} %</td>
                                    <td>{((this.state.ftAvg / this.state.seasonNumber) * 100).toFixed(1)} %</td>
                                    <td>{(this.state.stlAvg / this.state.seasonNumber).toFixed(1)}</td>
                                    <td>{(this.state.blkAvg / this.state.seasonNumber).toFixed(1)}</td>
                                    <td>{(this.state.toAvg / this.state.seasonNumber).toFixed(1)}</td>
                                    <td>{(this.state.pfAvg / this.state.seasonNumber).toFixed(1)}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div> */}
                </main>
        )
    }
}

export default PlayersList
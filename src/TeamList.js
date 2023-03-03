import { Component } from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import { Link } from 'react-router-dom'
import TeamCard from './TeamCard'

class TeamList extends Component {
    state = {
        teams: [],
        statusCode: 0,
    }

    componentDidMount() {
        this.fetchTeams()
    }

    fetchTeams = async () => {


        const response = await fetch('https://apis.ccbp.in/ipl')
        const data = await response.json()
        const updatedData = data.teams.map(eachTeam => ({
            id: eachTeam.id,
            name: eachTeam.name,
            teamImageUrl: eachTeam.team_image_url,
        }))
        this.setState({ teams: updatedData, statusCode: response.status })
    }

    renderTeamsList = () => {
        const { teams } = this.state
        return (

            <div className="team-list">
                {teams.map(eachTeam => (
                    <Link key={eachTeam.id} to={`/team-matches/${eachTeam.id}`} className="team-item">
                        <div >
                            <img
                                src={eachTeam.teamImageUrl}
                                alt={eachTeam.name}
                                className="team-logo"
                            />
                            <p className="team-name">{eachTeam.name}</p>
                        </div>
                    </Link>
                ))}
            </div>

        )
    }

    renderLoader = () => (
        <div className="loader">
            <Loader className="Loader" type="TailSpin" color="white" />
        </div>
    )
    render() {
        const { statusCode } = this.state
        console.log(statusCode)
        if (statusCode !== 200 && statusCode !== 0) {
            return <div><button onClick={this.fetchTeams}></button></div>
        }
        return (
            <div className="team-list-container">
                <h1 className="heading">IPL Dashboard</h1>
                {statusCode === 0 ? this.renderLoader() : this.renderTeamsList()}
            </div>
        )
    }
}

export default TeamList;
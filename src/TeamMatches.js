import { Component } from "react";
import Loader from 'react-loader-spinner'
import { useParams } from 'react-router-dom';

const withRouter = WrappedComponent => props => {
    const params = useParams();
    // ...other hooks

    return (
        <WrappedComponent
            {...props}
            {...{ params, }}
        />
    );
};




class TeamMatches extends Component {

    state = { LatestMatchDetails: {}, LastMatchesDetails: [], statusCode: 0 }
    componentDidMount() {
        this.fetchLastMatchDetails()
    }
    fetchLastMatchDetails = async () => {
        const { id } = this.props.params;

        console.log(id)
        const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
        const data = await response.json()
        // console.log(data)

        const LastMatchDetails = data
        const updatedData = {
            id: LastMatchDetails.latest_match_details.id,
            competingTeam: LastMatchDetails.latest_match_details.competing_team,
            teamBannerUrl: LastMatchDetails.team_banner_url,
            competingTeamLogo: LastMatchDetails.latest_match_details.competing_team_logo,
            date: LastMatchDetails.latest_match_details.date,
            firstInnings: LastMatchDetails.latest_match_details.first_innings,
            secondInnings: LastMatchDetails.latest_match_details.second_innings,
            manOfTheMatch: LastMatchDetails.latest_match_details.man_of_the_match,
            matchStatus: LastMatchDetails.latest_match_details.match_status,
            result: LastMatchDetails.latest_match_details.result,
            secondInnings: LastMatchDetails.latest_match_details.second_innings,
            umpires: LastMatchDetails.latest_match_details.umpires,
            venue: LastMatchDetails.latest_match_details.venue,

        }

        const LastMatchesDetails = LastMatchDetails.recent_matches

        this.setState({ LastMatchesDetails: LastMatchesDetails, LatestMatchDetails: updatedData, statusCode: response.statusCode })
        console.log(this.state.LatestMatchDetails)
    }
    renderLoader = () => (
        <div className="loader">
            <Loader className="Loader" type="TailSpin" color="white" />
        </div>
    )

    renderLatestMatchDetails = () => {
        const { LatestMatchDetails } = this.state
        return (

            <div className="latest-match-details">
                <div className="latest-match-card">
                    <div className="latest-match-card-text">
                        <h1>{LatestMatchDetails.competingTeam}</h1>
                        <p>{LatestMatchDetails.date}</p>
                        <p>{LatestMatchDetails.venue}</p>
                        <p>{LatestMatchDetails.result}</p>

                    </div>

                </div>
                <img src={LatestMatchDetails.competingTeamLogo} />
                <div className="latest-match-innings-details">
                    <p>First Innings</p>
                    <p>{LatestMatchDetails.firstInnings}</p>
                    <p>Second Innings</p>
                    <p>{LatestMatchDetails.secondInnings}</p>
                    <p>Man of the Match</p>
                    <p>{LatestMatchDetails.manOfTheMatch}</p>
                    <p>Umpires</p>
                    <p>{LatestMatchDetails.umpires}</p>

                </div>
            </div>
        )
    }
    renderLastMatchesDetails = () => {
        const { LastMatchesDetails } = this.state;

        return (

            <div className="last-matches">

                {LastMatchesDetails.map(eachMatch => (

                    <div className="last-match-item" key={eachMatch.id}>
                        <div className="last-match-card">
                            <img src={eachMatch.competing_team_logo} />
                            <div className="last-match-card-text">

                                <p>{eachMatch.result}</p>{eachMatch.match_status == 'Won' ?
                                    <p className="Won">{eachMatch.match_status}</p> : <p className="Lost">{eachMatch.match_status}</p>}
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        )
    }
    render() {
        const { LatestMatchDetails, statusCode } = this.state
        if (statusCode == 0) {
            return this.renderLoader()
        }

        if (statusCode != 200) {
            <button onClick={this.fetchLastMatchDetails}>  <p>Page Not Found</p></button >
        }

        return (
            <div className="latest-match-container">

                <img className="team-banner" src={LatestMatchDetails.teamBannerUrl} />
                <div className="LatestMatch"><p>Latest Match</p></div>
                {this.renderLatestMatchDetails()}
                {this.renderLastMatchesDetails()}
            </div>
        )
    }
}
export default withRouter(TeamMatches);
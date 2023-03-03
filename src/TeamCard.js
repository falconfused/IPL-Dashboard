import { Component } from "react";
import { Link } from "react-router-dom";

class TeamCard extends Component {
    render() {
        const { id } = this.props;

        const { teamImageUrl, name } = this.props;
        return (
            <Link className="team-item" to={`/team-matches/${id}`}>
                <li >
                    <img src={teamImageUrl} alt={name} className="team-logo" />
                    <p className="team-name">{name}</p>
                </li>
            </Link>

        );
    }
}
export default TeamCard;
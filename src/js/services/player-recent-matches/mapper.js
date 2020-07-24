import PlayerRecentMatches from './entity.js';

export default function mapearPlayerRecentMatches(playerRecentMatchesAPI) {
    return new PlayerRecentMatches(playerRecentMatchesAPI);
}
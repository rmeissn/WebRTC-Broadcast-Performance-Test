import React from 'react';
import DeckListItem from './DeckListItem';

class PublicUserDecks extends React.Component {
    componentDidMount() {}

    componentDidUpdate() {}

    render() {
        let content = {
            picture: 'https://cdn1.iconfinder.com/data/icons/iconnice-vector-icon/31/Vector-icons_23-256.png',
            title: 'Deck 53: Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat',
            description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
            updated: '53 mins',
            deckID: 53,
        };
        content.title = content.title.slice(0,90);
        content.description = content.description.slice(0,110);
        return (
            <div className="ui segments">
                <div className="ui secondary segment">
                    <strong>Popular Decks</strong>
                </div>
                <div className="ui segment">
                    <div className="ui relaxed divided list">
                        <DeckListItem content={content}/>
                        <DeckListItem content={content}/>
                        <DeckListItem content={content}/>
                        <DeckListItem content={content}/>
                        <DeckListItem content={content}/>
                        <DeckListItem content={content}/>
                    </div>
                </div>
            </div>
        );
    }
}

PublicUserDecks.contextTypes = {
    executeAction: React.PropTypes.func.isRequired
};

export default PublicUserDecks;

import React from 'react';
import classNames from 'classnames/bind';
import {connectToStores} from 'fluxible-addons-react';
import DeckListStore from '../../stores/DeckListStore';
import CustomDate from '../Deck/util/CustomDate';


class AttachDeckList extends React.Component {

    render() {
        let result = this.props.scope === 'featured' ? 'No featured decks available' : 'No recent decks available';
        let decks_to_show = this.props.scope === 'featured' ? this.props.DeckListStore.featured : this.props.DeckListStore.recent;
        if (decks_to_show.length){
            result =
                decks_to_show.map((deck, index) => {
                    let deckCreatorid = deck.user;
                    let deckCreator = deck.username;
                    let deckIdAndrevision = deck._id; //not used for now
                    if (deck.revision_to_show) deckIdAndrevision+= '-' + deck.revision_to_show; //not used for now
                    let deckDate = CustomDate.format(deck.timestamp, 'Do MMMM YYYY');
                    let deckLanguageCode = deck.language === undefined ? 'en' : deck.language;
                    let deckLanguage = deckLanguageCode === undefined ? '' : ISO6391.getName(deckLanguageCode);
                    // default English
                    deckLanguage = (deckLanguage === '' ? 'English' : deckLanguage);
                    //let countryFlag = deckLanguageCode === 'en' ? 'gb' : deckLanguageCode;
                    let deckTheme = deck.theme === undefined ? 'Simple' : deck.theme;

                    return (
                        <div className="ui vertical segment " key={'deck_meta' + deck._id}>
                            <div className="ui two column stackable grid">
                                <div className="column">
                                    <h3 className="ui header"><a href={'./deck/' + deck._id}>{deck.title}</a></h3>
                                    <div className="meta">Creator: <a href={'./user/' + deckCreatorid}>{deckCreator}</a></div>
                                    <div className="meta">Date: {deckDate}</div>
                                </div>
                                <div className="column right aligned">
                                        <div className="ui large label" >
                                        <i className="ui comments outline icon"></i>
                                            {/*<i className={countryFlag + ' flag'} aria-label="Language"></i>*/}{deckLanguage}</div>
                                        {/*<div className="ui large label" tabIndex="0" >
                                            <i className="block layout icon" aria-label="Number of slides"></i>{totalSlides}</div>*/}
                                       <div className="ui large label" tabIndex="0" >
                                            <i className="fork icon" aria-label="Number of versions"></i>{deck.countRevisions}</div>
                                </div>
                            </div>
                        </div>
                    );
                });
        }

        return (
            <div ref="DeckListpanel" className="ui segment" key = "Deckspanel">
                {result}
            </div>
        );
    }
}
/*
AttachDeckList = connectToStores(DeckList, [DeckListStore], (context, props) => {
    return {
        DeckListStore: context.getStore(DeckListStore).getState()
    };
});*/
export default AttachDeckList;

import React from 'react';
import Immutable from 'immutable';
import classNames from 'classnames/bind';
import {NavLink} from 'fluxible-router';
import TreeUtil from './util/TreeUtil';

class TreeNode extends React.Component {
    //do not re-render in case of same props wihtout selector and if mode has not changed
    shouldComponentUpdate(nextProps, nextState) {
        return ! (Immutable.is(nextProps.item, this.props.item) &&  nextProps === this.props.mode);
    }
    componentDidMount(){
        this.activateDropDown();
    }
    componentDidUpdate(){
        //activate drop down
        //todo: apply it only when it is selected
        this.activateDropDown();
    }
    activateDropDown() {
        let currentComp = this.refs[this.props.item.get('path')];
        $(currentComp).find('.ui.dropdown').dropdown();
    }
    handleExpandIconClick(selector, e){
        this.props.onToggleNode(selector);
        e.stopPropagation();
    }
    handleAddClick(selector){
        this.props.onAddNode(selector);
    }
    handleDeleteClick(selector){
        this.props.onDeleteNode(selector);
    }
    handleMenuClick(e){
        e.stopPropagation();
    }
    render() {
        let self = this;
        //adapt URLs based on the current page
        let nodeSelector = {id: this.props.rootNode.id, stype: this.props.item.get('type'), sid: this.props.item.get('id'), spath: this.props.item.get('path')};
        let nodeURL = TreeUtil.makeNodeURL(nodeSelector, this.props.page, this.props.mode);
        let childNodes = '';
        let  childNodesDIV = '';
        let childNodesClass = '';
        if(this.props.item.get('type') === 'deck'){
            childNodes = this.props.item.get('children').map((node, index) => {
                return (
                    <TreeNode onToggleNode={self.props.onToggleNode} onAddNode={self.props.onAddNode} onDeleteNode={self.props.onDeleteNode} item={node} rootNode={self.props.rootNode} key={index} page={self.props.page} mode={self.props.mode}/>
                );
            });
            //show/hide sub nodes based on the expanded state
            childNodesClass = classNames({
                'list': true,
                'hide-element': !self.props.item.get('expanded')
            });
            childNodesDIV = <div className={childNodesClass}> {childNodes} </div>;
        }
        //change the node title style if it is selected
        let nodeTitle = this.props.item.get('title');
        let actionBtns = '';
        if(this.props.item.get('selected')){
            nodeTitle = <strong> {nodeTitle} </strong>;
            actionBtns = (
                <div className="ui floating combo top right pointing dropdown icon right floated" onClick={this.handleMenuClick.bind(this)}>
                  <i className="ellipsis horizontal tiny icon"></i>
                  <div className="small menu">
                        <div className="item" onClick={this.handleAddClick.bind(this, nodeSelector)}>
                            <i className="add circle icon"></i> New Slide
                        </div>
                        <div className="item">
                            <i className="add circle icon"></i> Existing Slide
                        </div>
                        <div className="item">
                            <i className="add circle icon"></i> New Deck
                        </div>
                        <div className="item" onClick={this.handleAddClick.bind(this, nodeSelector)}>
                            <i className="add circle icon"></i> Existing Deck
                        </div>
                        <div className="item">
                            <i className="copy icon"></i> Duplicate
                        </div>
                        <div className="divider"></div>
                        <div className="item">
                            <i className="blue edit icon"></i> Rename
                        </div>
                        <div className="divider"></div>
                        <div className="item" onClick={this.handleDeleteClick.bind(this, nodeSelector)}>
                            <i className="red trash circle icon"></i> Delete
                        </div>
                    </div>
                </div>
            );
        }
        //change the node icon based on the type of node and its expanded state
        let iconClass = classNames({
            'ui icon': true,
            'grey file text': (this.props.item.get('type') === 'slide'),
            'yellow folder link': (this.props.item.get('type') === 'deck'),
            'open': this.props.item.get('expanded')
        });
        return (
            <div className="item" ref={this.props.item.get('path')}>
                <div>
                    <i onClick={this.handleExpandIconClick.bind(this, nodeSelector)} className={iconClass}></i>
                    <NavLink href={nodeURL} >
                        {nodeTitle}
                    </NavLink>
                    {actionBtns}
                </div>
                {childNodesDIV}
            </div>
        );
    }
}

export default TreeNode;
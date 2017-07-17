import {BaseStore} from 'fluxible/addons';

class TagsStore extends BaseStore {
    constructor(dispatcher) {
        super(dispatcher);
        this.tags = [];
        this.isEditMode = false;
        this.showAllTags = false;
        this.selectedIndex = -1;
        this.contentOwner = 0;
        this.selector = {};
        this.oldTags = [];
        this.tagsHaveChanged = false;
        this.isLoading = false;
    }
    loadTagsSlide(payload) {
        this.tags = [];
        let lastRevision = payload.slide.revisions[payload.slide.revisions.length-1];
        this.tags = lastRevision.tags? lastRevision.tags: [];
        this.oldTags = JSON.parse(JSON.stringify(this.tags));
        this.tagsHaveChanged = false;
        this.selector = payload.selector;
        this.selectedIndex = -1;
        this.contentOwner = payload.owner;
        this.isLoading = false;
        this.emitChange();
    }
    loadTagsDeck(payload) {
        this.tags = [];
        let lastRevision = payload.deckData.revisions[payload.deckData.revisions.length - 1];
        this.tags = lastRevision.tags? lastRevision.tags: [];
        this.oldTags = JSON.parse(JSON.stringify(this.tags));
        this.tagsHaveChanged = false;
        this.selector = {
            'id': payload.deckData._id,
            'stype': 'deck'
        };
        this.selectedIndex = -1;
        this.contentOwner = payload.owner;
        this.isLoading = false;
        this.emitChange();
    }
    loadTagsFail(err) {
        this.tagError = err? err: 'Cannot load tags';
        this.tagsHaveChanged = false;
        this.isLoading = false;
        this.emitChange();
    }
    updateTags(payload) {
        this.tags = payload.tags;
        this.selectedIndex = -1;
        this.tagsHaveChanged = false;
        this.isLoading = false;
        this.emitChange();
    }
    newTag(payload) {
        this.tags.push({tagName: payload.tag});
        this.tagsHaveChanged = this.doHaveTagsChanged();
        this.emitChange();
    }
    removeTag(payload) {
        this.tags = this.tags.filter((item) => item.tagName !== payload.tag.tagName);
        this.tagsHaveChanged = this.doHaveTagsChanged();
        this.emitChange();
    }
    cancelEditTag() {
        this.selectedIndex = -1;
        this.emitChange();
    }
    handleShowAllTags() {
        this.showAllTags = true;
        this.emitChange();
    }
    handleShowLessTags(){
        this.showAllTags = false;
        this.emitChange();
    }
    changeMode(payload) {
        this.isEditMode = !this.isEditMode;
        this.emitChange();
    }
    tagSavingPending() {
        this.isLoading = true;
        this.emitChange();
    }

    doHaveTagsChanged() {
        if (this.tags.length !== this.oldTags.length)
            return true;
        for (let key in this.tags) {
            const tag = this.tags[key];
            const found = this.oldTags.findIndex((e) => {return e.tagName === tag.tagName;}) !== -1;
            if (!found)
                return true;
        }

        return false;
    }
    getState() {
        return {
            tags: this.tags,
            showAllTags: this.showAllTags,
            tag: this.tag,
            selectedIndex: this.selectedIndex,
            contentOwner: this.contentOwner,
            selector: this.selector,
            isEditMode: this.isEditMode,
            oldTags: this.oldTags,
            tagsHaveChanged: this.tagsHaveChanged,
            isLoading: this.isLoading
        };
    }
    dehydrate() {
        return this.getState();
    }
    rehydrate(state) {
        this.tags = state.tags;
        this.showAllTags = state.showAllTags;
        this.selectedIndex = state.selectedIndex;
        this.contentOwner = state.contentOwner;
        this.selector = state.selector;
        this.isEditMode = state.isEditMode;
        this.oldTags = state.oldTags;
        this.tagsHaveChanged = state.tagsHaveChanged;
        this.isLoading = state.isLoading;
    }
}

TagsStore.storeName = 'TagsStore';
TagsStore.handlers = {
    'LOAD_TAGS_FAILURE': 'loadTagsFail',
    'NEW_TAG': 'newTag',
    'LOAD_SLIDE_CONTENT_SUCCESS': 'loadTagsSlide',
    'LOAD_DECK_CONTENT_SUCCESS': 'loadTagsDeck',
    'SHOW_ALL_TAGS': 'handleShowAllTags',
    'SHOW_LESS_TAGS': 'handleShowLessTags',
    'UPDATE_TAGS_SUCCESS': 'updateTags',
    'CANCEL_EDIT_TAGS': 'cancelEditTag',
    'CHANGE_EDIT_MODE': 'changeMode',
    'REMOVE_TAG': 'removeTag',
    'TAGSAVING_PENDING': 'tagSavingPending'
};

export default TagsStore;

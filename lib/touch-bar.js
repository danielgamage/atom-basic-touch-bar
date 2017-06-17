'use babel';

import TouchBarView from './touch-bar-view';
import { CompositeDisposable } from 'atom';

export default {

  touchBarView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.touchBarView = new TouchBarView(state.touchBarViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.touchBarView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'touch-bar:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.touchBarView.destroy();
  },

  serialize() {
    return {
      touchBarViewState: this.touchBarView.serialize()
    };
  },

  toggle() {
    console.log('TouchBar was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};

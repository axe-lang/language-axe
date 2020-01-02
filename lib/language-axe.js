'use babel';

import LanguageAxeView from './language-axe-view';
import { CompositeDisposable } from 'atom';

export default {

  languageAxeView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.languageAxeView = new LanguageAxeView(state.languageAxeViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.languageAxeView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'language-axe:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.languageAxeView.destroy();
  },

  serialize() {
    return {
      languageAxeViewState: this.languageAxeView.serialize()
    };
  },

  toggle() {
    console.log('LanguageAxe was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};

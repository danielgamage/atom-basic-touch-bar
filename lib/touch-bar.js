'use babel'

import path from 'path'
import { CompositeDisposable } from 'atom'
import { remote, nativeImage } from 'electron'

const { TouchBar, BrowserWindow } = remote

console.log(path)

const {
  TouchBarButton,
  TouchBarColorPicker,
  TouchBarGroup,
  TouchBarLabel,
  TouchBarPopover,
  TouchBarScrubber,
  TouchBarSegmentedControl,
  TouchBarSlider,
  TouchBarSpacer,
} = TouchBar

export default {
  subscriptions: null,

  resolve (dir) {
    return path.join(__dirname, '..', dir)
  },

  fetchImage (filename) {
    const path = this.resolve(`images/${filename}`)
    return path
  },

  activate (state) {
    console.log('activated')
    console.log(atom.commands)

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable()

    const editor = atom.workspace.getActiveTextEditor()
    const view = atom.views.getView(editor)

    const touchy = new TouchBar([
      new TouchBarButton({
        icon: this.fetchImage('comment.png'),
        iconPosition: 'overlay',
        click: () => {
          atom.commands.dispatch(view, 'editor:toggle-line-comments')
        }
      }),

      new TouchBarSpacer({
        size: 'flexible',
      }),

      new TouchBarSegmentedControl({
        mode: 'buttons',
        segmentStyle: 'rounded',
        segments: [
          {
            label: 'git',
            icon: this.fetchImage('git.png'),
          },
          {
            label: 'github',
            icon: this.fetchImage('github.png'),
          },
        ],
        selectedIndex: 0,
        change: (selectedIndex, isSelected) => {
          console.log('changed', selectedIndex, isSelected)
          if (selectedIndex === 0) {
            atom.commands.dispatch(view, 'github:toggle-git-tab')
          } else {
            atom.commands.dispatch(view, 'github:toggle-github-tab')
          }
        }
      }),

      new TouchBarButton({
        icon: this.fetchImage('command.png'),
        iconPosition: 'overlay',
        click: () => {
          atom.commands.dispatch(view, 'command-palette:toggle')
        }
      }),
    ])

    const window = BrowserWindow.getFocusedWindow()
    window.setTouchBar(touchy)

    console.log(touchy)


    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'touch-bar:reload': () => { this.addTouchBar() }
    }))
  },

  addTouchBar () {
    console.log('relooooad')
  },

  deactivate () {
    this.subscriptions.dispose()
  },
}

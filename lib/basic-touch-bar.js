'use babel'

import path from 'path'
import { remote, nativeImage } from 'electron'

const { TouchBar, BrowserWindow } = remote

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

  fetchImage (filename) {
    return path.join(__dirname, '..', `images/${filename}`)
  },

  fetchView () {
    const editor = atom.workspace.getActiveTextEditor()
    return atom.views.getView(editor)
  },

  doAction (action) {
    atom.commands.dispatch(this.fetchView(), action)
  },

  activate (state) {
    const basicTouchBar = new TouchBar([
      new TouchBarButton({
        icon: this.fetchImage('comment.png'),
        iconPosition: 'overlay',
        click: () => {
          this.doAction('editor:toggle-line-comments')
        }
      }),

      new TouchBarSpacer({
        size: 'flexible',
      }),

      new TouchBarGroup({
        items: [
          new TouchBarButton({
            icon: this.fetchImage('git.png'),
            iconPosition: 'overlay',
            click: () => {
              this.doAction('github:toggle-git-tab')
            }
          }),
          new TouchBarButton({
            icon: this.fetchImage('github.png'),
            iconPosition: 'overlay',
            click: () => {
              this.doAction('github:toggle-github-tab')
            }
          }),
        ],
      }),

      new TouchBarButton({
        icon: this.fetchImage('command.png'),
        iconPosition: 'overlay',
        click: () => {
          this.doAction('command-palette:toggle')
        }
      }),
    ])

    const windows = BrowserWindow.getAllWindows()
    windows.map(window => {
      window.setTouchBar(basicTouchBar)
    })
  },

  deactivate () {
    //
  },
}

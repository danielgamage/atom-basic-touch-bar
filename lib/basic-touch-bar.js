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

  activate (state) {
    const editor = atom.workspace.getActiveTextEditor()
    const view = atom.views.getView(editor)

    const basicTouchBar = new TouchBar([
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

      new TouchBarGroup({
        items: [
          new TouchBarButton({
            icon: this.fetchImage('git.png'),
            iconPosition: 'overlay',
            click: () => {
              atom.commands.dispatch(view, 'github:toggle-git-tab')
            }
          }),
          new TouchBarButton({
            icon: this.fetchImage('github.png'),
            iconPosition: 'overlay',
            click: () => {
              atom.commands.dispatch(view, 'github:toggle-github-tab')
            }
          }),
        ],
      }),

      new TouchBarButton({
        icon: this.fetchImage('command.png'),
        iconPosition: 'overlay',
        click: () => {
          atom.commands.dispatch(view, 'command-palette:toggle')
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

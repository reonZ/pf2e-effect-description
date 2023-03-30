import { setModuleID } from '@utils/module'
import { registerSetting } from '@utils/foundry/settings'
import { renderEffectsPanel } from './effects'

setModuleID('pf2e-effect-description')

Hooks.once('init', () => {
    registerSetting({
        name: 'remove',
        type: Boolean,
        default: true,
        scope: 'client',
        config: true,
        onChange: refreshEffectsPanel,
    })

    registerSetting({
        name: 'sheet',
        type: Boolean,
        default: true,
        scope: 'client',
        config: true,
        onChange: refreshEffectsPanel,
    })
})

Hooks.on('renderEffectsPanel', renderEffectsPanel)

function refreshEffectsPanel() {
    game.pf2e.effectPanel?.render()
}

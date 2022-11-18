import { addInstructions, setEvents } from './effect.js'
import { registerSetting } from './utils/foundry.js'

function refreshEffectsPanel() {
    const g = /** @type {GamePF2e} */ (game)
    g.pf2e.effectPanel?.render()
}

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

    registerSetting({
        name: 'chat',
        type: Boolean,
        default: true,
        scope: 'client',
        config: true,
        onChange: refreshEffectsPanel,
    })
})

Hooks.on('renderEffectsPanel', (/** @type {EffectsPanel} */ panel, /** @type {JQuery} */ $html) => {
    addInstructions($html)
    setEvents(panel, $html)
})

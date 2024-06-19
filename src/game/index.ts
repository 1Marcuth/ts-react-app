import { ModifierKeys } from "gamx/dist/util/keyboard-listener"
import { ResourceItem } from "gamx/dist/util/resource-loader"
import MarcuthCraftCore from "marcuthcraft-core"
import Gamx from "gamx"

import configHelper from "../helpers/config.helper"
import defaultResources from "./defaults/resources.default"

export type MarcuthCraftOptions = {
    document: Document
    rootQuery: string
}

export type MarcuthCraftState = {
    mainResources: ResourceItem[]
    logoIntroResource?: ResourceItem
    secondBackgorundLayerOffsetX: number
    [key: string]: any
}

class MarcuthCraftGame extends Gamx<MarcuthCraftState> {
    public core: MarcuthCraftCore

    public constructor({ document, rootQuery }: MarcuthCraftOptions) {
        super({
            document: document,
            rootQuery: rootQuery,
            screenSize: configHelper.gameUi.screenSize,
            defaultBackgroundColor: configHelper.gameUi.defaultBackgroundColor,
            state: configHelper.gameUi.defaultState
        })

        this.core = MarcuthCraftCore.createDefault()
    }

    public handleKeyboardListener(keyPressed: string, modifierKeys: ModifierKeys): void {
        console.log(keyPressed, modifierKeys)
    }

    public handleResourceLoader(event: string, data: any): void {
        const ctx = this.screen.canvas.getContext("2d")!
    }

    public handleRenderer(event: string, data: any): void {
        
    }

    public handleScreen(event: string, data: any): void {
        switch (event) {
            case "createdCanvas":
                console.log("The game canvas has been created!")
                break

            default:
                throw new Error(`An unexpected event was passed to the screen event handler: [${event}]`)
        }
    }

    public handleWidgetManager(event: string, data: any): void {
        switch (event) {
            case "widgetAdded":
                break

            case "widgetRemoved":
                break

            case "allWidgetsRemoved":
                break

            default:
                throw new Error(`An unexpected event was passed to the widget manager handler: [${event}]`)
        }
    }

    public setup(): void {
        this.keyboardListener.subscribe(this.handleKeyboardListener.bind(this))
        this.resourceLoader.subscribe(this.handleResourceLoader.bind(this))
        this.renderer.subscribe(this.handleRenderer.bind(this))
        this.screen.subscribe(this.handleScreen.bind(this))
        this.screen.widgetManager.subscribe(this.handleWidgetManager.bind(this))
        console.time("Loaded main resources in")
        this.resourceLoader.addToQueue("defaultResources", defaultResources)
    }
}

const createGame = (document: Document): Gamx => {
    const game = new MarcuthCraftGame({
        document: document,
        rootQuery: configHelper.gameUi.rootQuery
    })

    return game
}

export default createGame
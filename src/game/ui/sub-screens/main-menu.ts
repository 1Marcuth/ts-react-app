import { ResourceItem } from "gamx/dist/util/resource-loader"
import WidgetManager from "gamx/dist/ui/widget-manager"
import { ui } from "gamx"

import MainMenuSecondLayer from "../components/main-menu-second-layer"
import MainMenuFirstLayer from "../components/main-menu-first-layer"
import MainMenuThridLayer from "../components/main-menu-thrid-layer"
import MainMenuLogoTitle from "../components/main-menu-logo-title"
import MainMenuButton from "../components/main-menu-button"
import { MarcuthCraftState } from "../.."

type SetupProps = {
    widgetManager: WidgetManager
    canvasWidth: number
}

class MainMenuSubScreen extends ui.SubScreen<MarcuthCraftState, SetupProps> {
    public setup(setupProps: SetupProps): void {
        const secondBackgroundLayerResource = this.gameState.mainResources.find(resource => resource.id === "secondBackgroundLayer") as ResourceItem
        const backgroundBlurResource = this.gameState.mainResources.find(resource => resource.id === "backgroundBlur") as ResourceItem
        const logoTitleResource = this.gameState.mainResources.find(resource => resource.id === "logo") as ResourceItem

        const firstLayer = new MainMenuFirstLayer()

        const secondLayer = new MainMenuSecondLayer({
            image: secondBackgroundLayerResource.object as HTMLImageElement,
            gameState: this.gameState
        })

        const thridLayer = new MainMenuThridLayer({ image: backgroundBlurResource.object as HTMLImageElement })

        const logoTitle = new MainMenuLogoTitle({ image: logoTitleResource.object as HTMLImageElement })

        // const singlePlayerButton = new MainMenuButton({
        //     widgetManager: setupProps.widgetManager,
        //     buttonObservers: [],
        //     coordinates: {
        //         x: (setupProps.canvasWidth - MainMenuButton.buttonSize.width) / 2,
        //         y: 329
        //     },
        //     image: 
        // })

        this.components.push(
            firstLayer,
            secondLayer,
            thridLayer,
            logoTitle
        )
    }
}

export default MainMenuSubScreen
import WidgetManager from "gamx/dist/ui/widget-manager"
import { Observer } from "gamx/dist/common/observable"
import { Coordinates } from "gamx/dist/common/types"
import { ui } from "gamx"

type Props = {
    image: HTMLImageElement
    imageMouseOver: HTMLImageElement
    coordinates: Coordinates
    buttonObservers: Observer[],
    widgetManager: WidgetManager
}

class MainMenuButton extends ui.Component<Props> {
    public static buttonSize = {
        width: 545,
        height: Math.round(545 / 10)
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        const buttonSize = MainMenuButton.buttonSize

        const button = new ui.Button({
            ctx: ctx,
            coordinates: this.props.coordinates,
            width: buttonSize.width,
            height: buttonSize.height,
            image: this.props.image,
            imageMouseOver: this.props.imageMouseOver
        })

        button.draw()
    }
}

export default MainMenuButton
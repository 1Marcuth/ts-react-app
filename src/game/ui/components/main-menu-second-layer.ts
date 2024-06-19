import { ui } from "gamx"

import { MarcuthCraftState } from "../.."

type Props = {
    image: HTMLImageElement
    gameState: MarcuthCraftState
}

class MainMenuSecondLayer extends ui.Component<Props> {
    public draw(ctx: CanvasRenderingContext2D): void {                
        const image = this.props.image
        const offsetX = this.props.gameState.secondBackgorundLayerOffsetX

        let x = Math.round(((ctx.canvas.width - image.width) / 2) + offsetX)
        const y = (ctx.canvas.height - image.height) / 2

        x -= Math.floor(offsetX / image.width) * image.width

        ctx.drawImage(
            image,
            x,
            y
        )

        if (x > 0) {
            ctx.drawImage(
                image,
                x - image.width,
                y
            )
        }
    }
}

export default MainMenuSecondLayer
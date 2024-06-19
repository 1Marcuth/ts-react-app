import { ui } from "gamx"

type Props = {
    image: HTMLImageElement
}

class MainMenuThridLayer extends ui.Component<Props> {
    public draw(ctx: CanvasRenderingContext2D): void {
        const image = this.props.image

        const x = (ctx.canvas.width - image.width) / 2
        const y = (ctx.canvas.height - image.height) / 2

        ctx.drawImage(
            image,
            x,
            y
        )  
    }
}

export default MainMenuThridLayer
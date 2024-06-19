import { ui } from "gamx"

type Props = {
    image: HTMLImageElement
}

class MainMenuLogoTitle extends ui.Component<Props> {
    public draw(ctx: CanvasRenderingContext2D): void {
        const image = this.props.image

        const x = (ctx.canvas.width - image.width) / 2
        const y = 80

        ctx.drawImage(
            image,
            x,
            y
        )
    }
}

export default MainMenuLogoTitle
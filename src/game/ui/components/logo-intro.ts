import { ui } from "gamx"

type Props = {
    image: HTMLImageElement
}

class LogoIntro extends ui.Component<Props> {
    public draw(ctx: CanvasRenderingContext2D): void {
        const x = 0
        const y = 0
        const width = ctx.canvas.width
        const height = ctx.canvas.height

        ctx.drawImage(
            this.props.image,
            x,
            y,
            width,
            height
        )
    }
}

export default LogoIntro
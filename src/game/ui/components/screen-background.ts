import { ui } from "gamx"

type Props = {
    color: string
}

class ScreenBackground extends ui.Component<Props> {
    public draw(ctx: CanvasRenderingContext2D) {
        const x = 0
        const y = 0
        const width = ctx.canvas.width
        const height = ctx.canvas.height

        ctx.fillStyle = this.props.color

        ctx.fillRect(
            x,
            y,
            width,
            height
        )
    }
}

export default ScreenBackground
import { ui } from "gamx"

class MainMenuFirstLayer extends ui.Component {
    public draw(ctx: CanvasRenderingContext2D): void {
        const width = ctx.canvas.width
        const height = ctx.canvas.height
        const x = 0
        const y = 0

        const gradient = ctx.createLinearGradient(x, y, width, height)

        gradient.addColorStop(0, "#4B97FF")
        gradient.addColorStop(1, "#519DFF")

        ctx.fillStyle = gradient

        ctx.fillRect(
            x,
            y,
            width,
            height
        )
    }
}

export default MainMenuFirstLayer
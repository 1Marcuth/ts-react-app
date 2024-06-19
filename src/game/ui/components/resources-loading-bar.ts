import { ui } from "gamx"

export type Props = {
    resourcesLoadedCount: number
    amountOfResources: number
}

class ResourcesLoadingBar extends ui.Component<Props> {
    private x?: number
    private y?: number

    private drawExternalFrame(
        ctx: CanvasRenderingContext2D,
        externalFrameWidth: number,
        externalFrameHeight: number
    ): void {
        const externalFrameX = this.x as number
        const externalFrameY = this.y as number

        ctx.fillStyle = "#fff"

        ctx.fillRect(
            externalFrameX,
            externalFrameY,
            externalFrameWidth,
            externalFrameHeight
        )
    }

    private drawInnerFrame(
        ctx: CanvasRenderingContext2D,
        maxProgressBarWidth: number,
        progressBarHeight: number
    ): void {
        const innerFrameX = (this.x as number) + 3
        const innerFrameY = (this.y as number) + 3
        const innerFrameWidth = maxProgressBarWidth + 6
        const innerFrameHeight = progressBarHeight + 6

        ctx.fillStyle = "#ff2e3c"
    
        ctx.fillRect(
            innerFrameX,
            innerFrameY,
            innerFrameWidth,
            innerFrameHeight
        )
    }

    public drawProgressBar(
        ctx: CanvasRenderingContext2D,
        progress: number,
        maxProgressBarWidth: number,
        progressBarHeight: number
    ): void {
        const progressBarFrameX = (this.x as number) + 6
        const progressBarFrameY = (this.y as number) + 6
        const progressBarWidth = (progress / 100) * maxProgressBarWidth

        ctx.fillStyle = "#fff"

        ctx.fillRect(
            progressBarFrameX,
            progressBarFrameY,
            progressBarWidth,
            progressBarHeight
        )
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        const resourcesLoaded = this.props.resourcesLoadedCount
        const progress = (resourcesLoaded / this.props.amountOfResources) * 100
        const maxProgressBarWidth = 600
        const progressBarHeight = 15
        const externalFrameWidth = maxProgressBarWidth + 12
        const externalFrameHeight = progressBarHeight + 12

        this.x = (ctx.canvas.width - externalFrameWidth) / 2
        this.y = ctx.canvas.height - 150

        this.drawExternalFrame(ctx, externalFrameWidth, externalFrameHeight)
        this.drawInnerFrame(ctx, maxProgressBarWidth, progressBarHeight)
        this.drawProgressBar(ctx, progress, maxProgressBarWidth, progressBarHeight)
    }
}

export default ResourcesLoadingBar
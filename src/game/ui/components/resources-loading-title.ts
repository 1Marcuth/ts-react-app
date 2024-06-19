import { ResourceItem } from "gamx/dist/util/resource-loader"
import { ui } from "gamx"

type Props = {
    resourcesLoadedCount: number
    amountOfResources: number
    currentResource: ResourceItem
}

class ResourcesLoadingTitle extends ui.Component<Props> {
    public draw(ctx: CanvasRenderingContext2D & { [key: string]: any }): void {
        const lastLoadedResourceName = this.props.currentResource.source
        const maxResourceNameLength = 30

        const slicedLastResourceName = (lastLoadedResourceName.length > maxResourceNameLength ?
            lastLoadedResourceName.slice(0, maxResourceNameLength) + "..." :
            lastLoadedResourceName
        )

        const title = `[${this.props.resourcesLoadedCount}/${this.props.amountOfResources}] Carregando recursos: "${slicedLastResourceName}"`

        const x = ctx.canvas.width / 2
        const y = ctx.canvas.height - 165

        ctx.fillStyle = "#fff"
        ctx.textAlign = "center"
        ctx.letterSpacing = "2px"
        ctx.font = "15px Minecraft"

        ctx.fillText(
            title,
            x,
            y
        )
    }
}

export default ResourcesLoadingTitle
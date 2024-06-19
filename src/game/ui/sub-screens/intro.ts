import { ResourceItem } from "gamx/dist/util/resource-loader"
import { ui } from "gamx"

import ResourcesLoadingTitle from "../components/resources-loading-title"
import ResourcesLoadingBar from "../components/resources-loading-bar"
import ScreenBackground from "../components/screen-background"
import LogoIntro from "../components/logo-intro"
import { MarcuthCraftState } from "../.."

type SetupProps = {
    logoIntroResource: ResourceItem
    amountOfResources: number
    resourcesLoadedCount: number
    currentResource: ResourceItem
}

class IntroSubScreen extends ui.SubScreen<MarcuthCraftState, SetupProps> {
    protected setup(setupProps: SetupProps): void {
        const logoIntroResource = setupProps.logoIntroResource

        const background = new ScreenBackground({ color: "#ff2e3c" })

        this.components.push(background)

        if (logoIntroResource) {
            const logoIntro = new LogoIntro({ image: logoIntroResource.object as HTMLImageElement })
            this.components.push(logoIntro)
        }
        
        const resourcesLoadingBar = new ResourcesLoadingBar({
            amountOfResources: setupProps.amountOfResources,
            resourcesLoadedCount: setupProps.resourcesLoadedCount
        })

        const resourcesLoadingTitle = new ResourcesLoadingTitle({
            amountOfResources: setupProps.amountOfResources,
            resourcesLoadedCount: setupProps.resourcesLoadedCount,
            currentResource: setupProps.currentResource
        })

        this.components.push(resourcesLoadingBar, resourcesLoadingTitle)
    }
}

export default IntroSubScreen
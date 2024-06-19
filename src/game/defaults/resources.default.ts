import { ResourceItem } from "gamx/dist/util/resource-loader"

const defaultResources: ResourceItem[] = [
    {
        object: new Image(),
        source: require("../assets/images/logo-intro.png"),
        id: "logoIntro"
    },
    {
        object: new Image(),
        source: require("../assets/images/sprites.png"),
        id: "textureSprites"
    },
    {
        loadEventName: "loadeddata",
        object: new Audio(),
        source: require("../assets/audios/soundtrack.mp3"),
        id: "music1"
    },
    {
        object: new Image(),
        source: require("../assets/images/skins/steve.png"),
        id: "playerSkin"
    },
    {
        object: new Image(),
        source: require("../assets/images/logo.png"),
        id: "logo"
    },
    {
        object: new Image(),
        source: require("../assets/images/main-menu-background-layers/2.png"),
        id: "secondBackgroundLayer"
    },
    {
        object: new Image(),
        source: require("../assets/images/widgets.png"),
        id: "widgets"
    },
    {
        object: new Image(),
        source: require("../assets/images/main-menu-background-layers/blur.png"),
        id: "backgroundBlur"
    },
    {
        object: new Image(),
        source: require("../assets/images/options-background.png"),
        id: "optionsBackground"
    }
]

export default defaultResources
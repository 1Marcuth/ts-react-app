import { FC, useRef } from "react"
import Gamx from "gamx"
import createGame from "../../game"

export type ScreenSize = {
    width: number
    height: number
}

type Props = {
    screenSize: ScreenSize
}

const GameScreen: FC<Props> = () => {
    const game = useRef<Gamx>(createGame(document))

    return (
        <div id="root"/>
    )
}

export default GameScreen
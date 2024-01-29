import { BrowserRouter, Routes, Route } from "react-router-dom"
import { FC } from "react"

import HomePage from "./pages/home"

import "./global.scss"

const App: FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
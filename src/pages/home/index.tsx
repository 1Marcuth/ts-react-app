import { FC } from "react"

import Header from "../../components/header"

import styles from "./style.module.scss"

const HomePage: FC = () => {
    return (
        <div className={styles["home-page"]}>
            <Header/>
            <h1>Home Page</h1>
        </div>
    )
}

export default HomePage
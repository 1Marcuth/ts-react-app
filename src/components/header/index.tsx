import { FC } from "react"

import styles from "./style.module.scss"

const Header: FC = () => {
    return (
        <header className={styles["header"]}>
            <h1>Header</h1>
        </header>
    )
}

export default Header
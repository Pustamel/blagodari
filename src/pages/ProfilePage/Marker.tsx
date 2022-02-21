import styles from "./ProfilePage.module.scss"
import React from "react"

interface propsMarker {
  lat?: number
  lng?: number
}

export const Marker = ({lat, lng}: propsMarker) => {
  return <div className={styles.marker}>
    <img src="https://i.pinimg.com/564x/67/d8/01/67d801622b2daad05d8b50d6370d0dcf.jpg" alt="" />
  </div>;
}

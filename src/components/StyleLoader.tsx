import { createContext } from "preact"
import { useContext, useEffect, useState } from "preact/hooks"

type ColorScheme = "system" | "dark" | "light"
type PreferredContrast = "system" | "reduced" | "default" | "more"
type PreferredMotion = "system" | "reduced" | "default"


const SomeContext = createContext("Hello World")

function validateColorScheme(scheme: string): ColorScheme | null {
    switch(scheme.toLocaleLowerCase()) {
        case "system":
            return "system"
        case "dark":
            return "dark"
        case "light":
            return "light"
        default:
            return null
    }
}
function validateContrast(contrast: string): PreferredContrast | null {
    switch(contrast.toLocaleLowerCase()) {
        case "system":
            return "system"
        case "reduced":
            return "reduced"
        case "default":
            return "default"
        case "more":
            return "more"
        default:
            return null
    }
}
function validateMotion(contrast: string): PreferredMotion | null {
    switch(contrast.toLocaleLowerCase()) {
        case "system":
            return "system"
        case "reduced":
            return "reduced"
        case "default":
            return "default"
        default:
            return null
    }
}

function getFromStorage() {
    return {
        color_scheme: validateColorScheme(localStorage.getItem("customization_color_scheme") ?? "system") ?? "system",
        contrast: validateContrast(localStorage.getItem("customization_contrast") ?? "system") ?? "system",
        motion: validateMotion(localStorage.getItem("customization_contrast") ?? "system") ?? "system",
    }
}

export default function StyleLoader() {
    const [styles, setStyles] = useState(getFromStorage())
    
    window.addEventListener("storage", (_e)=>{
        setStyles(getFromStorage())
        //TODO: optimize to only load when relevant keys have changed
    })

    useEffect(()=>{
        const root = document.getElementsByTagName("html")[0]!
        
        switch(styles.color_scheme) {
            case "system":
                root.classList.remove("dark")
                root.classList.remove("light")
                break;
            case "dark":
                root.classList.add("dark")
                root.classList.remove("light")
                break;
            case "light":
                root.classList.remove("dark")
                root.classList.add("light")
                break;
        }
        switch(styles.contrast) {
            case "system":
                root.classList.remove("more_contrast")
                root.classList.remove("less_contrast")
                root.classList.remove("default_contrast")
                break;
            case "more":
                root.classList.add("more_contrast")
                root.classList.remove("less_contrast")
                root.classList.remove("default_contrast")
                break;
            case "reduced":
                root.classList.remove("more_contrast")
                root.classList.add("less_contrast")
                root.classList.remove("default_contrast")
                break;
            case "default":
                root.classList.remove("more_contrast")
                root.classList.remove("less_contrast")
                root.classList.add("default_contrast")
                break;
        }
        switch(styles.motion) {
            case "system":
                root.classList.remove("less_motion")
                root.classList.remove("default_motion")
                break;
            case "reduced":
                root.classList.add("less_motion")
                root.classList.remove("default_motion")
                break;
            case "default":
                root.classList.remove("less_motion")
                root.classList.add("default_motion")
                break;
        }
        console.log("Updated customization classes", styles);        
    }, [styles])

    return <></>
}
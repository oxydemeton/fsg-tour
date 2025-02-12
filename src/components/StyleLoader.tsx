import { useEffect, useState } from "preact/hooks"

export type ColorScheme = "system" | "dark" | "light"
export type PreferredContrast = "system" | "reduced" | "default" | "more"
export type PreferredMotion = "system" | "reduced" | "default"
export type PreferredTransparency = "system" | "reduced" | "default"
export type FontSize = "system" | number

export function validateColorScheme(scheme: string): ColorScheme | null {
    switch(scheme.toLocaleLowerCase()) {
        case "system":
            return "system"
        case "dark":
            return "dark"
        case "light":
            return "light"
        default:
            console.debug("Invalid contrast color_scheme: ", scheme)
            return null
    }
}
export function validateContrast(contrast: string): PreferredContrast | null {
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
            console.debug("Invalid contrast mode: ", contrast)
            return null
    }
}
export function validateMotion(preference: string): PreferredMotion | null {
    switch(preference.toLocaleLowerCase()) {
        case "system":
            return "system"
        case "reduced":
            return "reduced"
        case "default":
            return "default"
        default:
            console.debug("Invalid contrast motion preference: ", preference)
            return null
    }
}
export function validateTransparency(preference: string): PreferredTransparency | null {
    switch(preference.toLocaleLowerCase()) {
        case "system":
            return "system"
        case "reduced":
            return "reduced"
        case "default":
            return "default"
        default:
            console.debug("Invalid transparency preference: ", preference)
            return null
    }
}

export function validateFontSize(preference: string): FontSize | null {
    const number = parseInt(preference, 10)
    if (!Number.isNaN(number)) {
        return number
    }
    if (preference.toLocaleLowerCase() === "system") {
        return "system"
    }
    return null
}

function getFromStorage() {
    return {
        color_scheme: validateColorScheme(localStorage.getItem("customization_color_scheme") ?? "system") ?? "system",
        contrast: validateContrast(localStorage.getItem("customization_contrast") ?? "system") ?? "system",
        motion: validateMotion(localStorage.getItem("customization_motion") ?? "system") ?? "system",
        transparency: validateTransparency(localStorage.getItem("customization_transparency") ?? "system") ?? "system",
        font_size: validateFontSize(localStorage.getItem("customization_font_size") ?? "system") ?? "system",
    }
}

let broadCastChannel: BroadcastChannel | undefined = undefined
export default function StyleLoader() {
    const [styles, setStyles] = useState(getFromStorage())
    

    useEffect(()=>{
        const abort = new AbortController()
        broadCastChannel ||= new BroadcastChannel("storage_update")
        
        broadCastChannel.addEventListener("message", ()=>{
            console.log("Recived event");
            setTimeout(()=>{
                setStyles(getFromStorage())
                console.log(broadCastChannel);
            }, 100)
        }, {
            signal: abort.signal
        })
        console.log(broadCastChannel);

        document.addEventListener("storage_update", (_e)=>{            
            setStyles(getFromStorage())
            //TODO: optimize to only load when relevant keys have changed
        }, {
            signal: abort.signal
        })
        console.info("Setup event listeners for user style changes");
        return ()=>{
            abort.abort()
            broadCastChannel?.close()
            broadCastChannel = undefined
            console.info("Removed event listeners for user style changes")
        }
    }, [])
    

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
        switch(styles.transparency) {
            case "system":
                root.classList.remove("less_transparency")
                root.classList.remove("default_transparency")
                break;
            case "reduced":
                root.classList.add("less_transparency")
                root.classList.remove("default_transparency")
                break;
            case "default":
                root.classList.remove("less_transparency")
                root.classList.add("default_transparency")
                break;
        }

        if (styles.font_size === "system") {
            root.style.fontSize = "100%"
        } else {
            root.style.fontSize = `${styles.font_size}px`
        }

        console.log("Updated customization classes", styles);        
    }, [styles])

    return <></>
}
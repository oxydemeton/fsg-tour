import { useState } from "preact/hooks"
import { type ColorScheme, type PreferredContrast, type PreferredMotion, validateColorScheme, validateContrast, validateMotion  } from "./StyleLoader";

export default function StyleSettings() {
    const [colorScheme, setColorSchemeState] = useState<ColorScheme>(validateColorScheme(localStorage.getItem("customization_color_scheme") ?? "system") ?? "system")
    const [preferredContrast, setPreferredContrastState] = useState<PreferredContrast>(validateContrast(localStorage.getItem("customization_contrast") ?? "system") ?? "system")
    const [preferredMotion, setPreferredMotionState] = useState<PreferredMotion>(validateMotion(localStorage.getItem("customization_motion") ?? "system") ?? "system")

    function updateColorScheme(new_scheme: ColorScheme) {
        if (new_scheme === colorScheme) {
            return
        }
        setColorSchemeState(new_scheme)
        switch (new_scheme) {
            case "dark":
                localStorage.setItem("customization_color_scheme", "dark")
                break;
            case "light":
                localStorage.setItem("customization_color_scheme", "light")
                break;
            case "system":
                localStorage.setItem("customization_color_scheme", "system")
                break;
        }
        document.dispatchEvent(new Event("storage_update"))
    }
    function updateContrast(new_contrast: PreferredContrast) {
        if (new_contrast === preferredContrast) {
            return
        }
        setPreferredContrastState(new_contrast)
        console.log(new_contrast);
        switch (new_contrast) {
            case "default":
                localStorage.setItem("customization_contrast", "default")
                break;
            case "more":
                localStorage.setItem("customization_contrast", "more")
                break;
            case "reduced":
                localStorage.setItem("customization_contrast", "reduced")
                break;
            case "system":
                localStorage.setItem("customization_contrast", "system")
                break;
        }
        document.dispatchEvent(new Event("storage_update"))
    }

    function updateMotion(new_motion: PreferredMotion) {
        if (new_motion === preferredMotion) {
            return
        }
        setPreferredMotionState(new_motion)
        
        switch (new_motion) {
            case "default":
                localStorage.setItem("customization_motion", "default")
                break;
            case "reduced":
                localStorage.setItem("customization_motion", "reduced")
                break;
            case "system":
                localStorage.setItem("customization_motion", "system")
                break;
        }
        document.dispatchEvent(new Event("storage_update"))
    }


    return <section role="form">
        <h2>Einstellungen</h2>
        <fieldset>
            <legend>Farbschema</legend>
            <input type="radio" name="color-scheme" id="color-scheme-system" checked={colorScheme === "system"} onInput={()=>updateColorScheme("system")}/><label htmlFor="color-scheme-system">Systemeinstellung</label>
            <input type="radio" name="color-scheme" id="color-scheme-dark" checked={colorScheme === "dark"} onInput={()=>updateColorScheme("dark")}/><label htmlFor="color-scheme-dark">dunkel</label>
            <input type="radio" name="color-scheme" id="color-scheme-light" checked={colorScheme === "light"} onInput={()=>updateColorScheme("light")}/><label htmlFor="color-scheme-light">hell</label>
        </fieldset>
        <fieldset>
            <legend>Kontrast</legend>
            <input type="radio" name="contrast" id="contrast-system" checked={preferredContrast === "system"} onInput={()=>updateContrast("system")}/><label htmlFor="contrast-system">Systemeinstellung</label>
            <input type="radio" name="contrast" id="contrast-default" checked={preferredContrast === "default"} onInput={()=>updateContrast("default")}/><label htmlFor="contrast-default">standard Kontrast</label>
            <input type="radio" name="contrast" id="contrast-more" checked={preferredContrast === "more"} onInput={()=>updateContrast("more")}/><label htmlFor="contrast-more">mehr Kontrast</label>
            <input type="radio" name="contrast" id="contrast-reduced" checked={preferredContrast === "reduced"} onInput={()=>updateContrast("reduced")}/><label htmlFor="contrast-reduced">weniger Kontrast</label>
        </fieldset>
        <fieldset>
            <legend>Verringertebewegung</legend>
            <input type="radio" name="motion" id="motion-system" checked={preferredMotion === "system"} onInput={()=>updateMotion("system")}/><label htmlFor="motion-system">Systemeinstellung</label>
            <input type="radio" name="motion" id="motion-reduced" checked={preferredMotion === "reduced"} onInput={()=>updateMotion("reduced")}/><label htmlFor="motion-reduced">weniger Bewegungen</label>
            <input type="radio" name="motion" id="motion-default" checked={preferredMotion === "default"} onInput={()=>updateMotion("default")}/><label htmlFor="motion-default">alle Bewegungen</label>
        </fieldset>
        
    </section>
}
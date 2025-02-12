import { useEffect, useState } from "preact/hooks"
import { type ColorScheme, type FontSize, type PreferredContrast, type PreferredMotion, type PreferredTransparency, validateColorScheme, validateContrast, validateFontSize, validateMotion, validateTransparency  } from "./StyleLoader";

let broadCastChannel: BroadcastChannel | undefined = undefined
export default function StyleSettings() {
    const [colorScheme, setColorSchemeState] = useState<ColorScheme>(validateColorScheme(localStorage.getItem("customization_color_scheme") ?? "system") ?? "system")
    const [preferredContrast, setPreferredContrastState] = useState<PreferredContrast>(validateContrast(localStorage.getItem("customization_contrast") ?? "system") ?? "system")
    const [preferredMotion, setPreferredMotionState] = useState<PreferredMotion>(validateMotion(localStorage.getItem("customization_motion") ?? "system") ?? "system")
    const [preferredTransparency, setPreferredTransparencyState] = useState<PreferredTransparency>(validateTransparency(localStorage.getItem("customization_transparency") ?? "system") ?? "system")
    const [fontSize, setFontSizeState] = useState<FontSize>(validateFontSize(localStorage.getItem("customization_font_size") ?? "system") ?? "system",)
    
    useEffect(()=>{
        broadCastChannel ||= new BroadcastChannel("storage_update")

        return ()=>{
            broadCastChannel?.close()
        }
    }, [])

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
        broadCastChannel?.postMessage("update")
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
        broadCastChannel?.postMessage("update")
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
        broadCastChannel?.postMessage("update")
    }
    function updateTransparency(new_transparency: PreferredTransparency) {
        if (new_transparency === preferredTransparency) {
            return
        }
        setPreferredTransparencyState(new_transparency)
        
        switch (new_transparency) {
            case "default":
                localStorage.setItem("customization_transparency", "default")
                break;
            case "reduced":
                localStorage.setItem("customization_transparency", "reduced")
                break;
            case "system":
                localStorage.setItem("customization_transparency", "system")
                break;
        }
        document.dispatchEvent(new Event("storage_update"))
        broadCastChannel?.postMessage("update")
    }

    function updateFontSize(newFontSize: FontSize) {
        if (newFontSize === fontSize) {
            return
        }
        setFontSizeState(newFontSize)
        localStorage.setItem("customization_font_size", newFontSize.toString(10))
        document.dispatchEvent(new Event("storage_update"))
        broadCastChannel?.postMessage("update")
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
            <legend>Verringerte Bewegungen</legend>
            <input type="radio" name="motion" id="motion-system" checked={preferredMotion === "system"} onInput={()=>updateMotion("system")}/><label htmlFor="motion-system">Systemeinstellung</label>
            <input type="radio" name="motion" id="motion-reduced" checked={preferredMotion === "reduced"} onInput={()=>updateMotion("reduced")}/><label htmlFor="motion-reduced">weniger Bewegungen</label>
            <input type="radio" name="motion" id="motion-default" checked={preferredMotion === "default"} onInput={()=>updateMotion("default")}/><label htmlFor="motion-default">alle Bewegungen</label>
        </fieldset>
        <fieldset>
            <legend>Verringerte Transparenzen</legend>
            <input type="radio" name="transparency" id="transparency-system" checked={preferredTransparency === "system"} onInput={()=>updateTransparency("system")}/><label htmlFor="transparency-system">Systemeinstellung</label>
            <input type="radio" name="transparency" id="transparency-reduced" checked={preferredTransparency === "reduced"} onInput={()=>updateTransparency("reduced")}/><label htmlFor="transparency-reduced">weniger Transparenzen</label>
            <input type="radio" name="transparency" id="transparency-default" checked={preferredTransparency === "default"} onInput={()=>updateTransparency("default")}/><label htmlFor="transparency-default">alle Transparenzen</label>
        </fieldset>
        <fieldset>
            <legend>Schriftgröße</legend>
            <input type="number" name="fontSize" id="font-size" class="outline outline-current p-0.5 rounded-md mx-1" 
                pattern="/^-?\d+\.?\d*$/" min={10} max={36}
                value={(fontSize === "system")? "" : fontSize}
                onInput={(e)=>{
                    if (e.currentTarget.value.trim().length <= 0) {
                        updateFontSize("system")
                    } else {
                        const num = parseInt(e.currentTarget.value, 10)
                        if (!isNaN(num)) {
                            updateFontSize(Math.max(10, Math.min(num, 36)))
                        } else {
                            return false
                        }
                    }
                }}
                />
                <label htmlFor="font-size">Schriftgröße in px (kein Wert -&gt; Gerätestandard)</label>
        </fieldset>
    </section>
}
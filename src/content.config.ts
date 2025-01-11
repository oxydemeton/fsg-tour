import { defineCollection, reference, z } from 'astro:content';
import { file, } from 'astro/loaders';
import { parseAll } from "@std/yaml";


const room2 = defineCollection({
    loader: file("./src/data/rooms.yaml", {parser: (txt)=>{
        const fixedTxt = txt.split("\n").map(line=>{
            if (line.trim().startsWith("- name:")) {
                return "  " + line.trim()
            } else if(line.trim().startsWith("verbindung:")) {
                return "    "  + line.trim()
            } else {
                return line.trim()
            }
        }).join("\n")
        const parsed = parseAll(fixedTxt, {onWarning: (err)=>console.error(err)}) as Record<string, unknown>[]
        
        const withId = parsed.map((raw, index)=>{
            return {
                ...raw,
                slug: raw.nummer,
                index,
                bilder: raw.bilder as {name: string, verbindung?: string}[]
            }
        })
        let imageCounter = 0

        const withImage = withId.map(room => {
            return {
                ...room,
                bilder: room.bilder.map(b=>{
                    return {
                        ...b,
                        image: `./images/${imageCounter++}.png`
                    }
                })
            }
        })

        //console.log(withImage);
        return withImage
    }}),
    schema: ({image})=> z.object({
        name: z.string(),
        slug: z.string(),
        index: z.number(),
        bilder: z.array(z.object({
            name: z.string(),
            image: image(),
            verbindung: z.optional(z.string())
        }))
    }),
})

export const collections = {room2}
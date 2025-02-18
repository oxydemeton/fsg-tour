import type { APIRoute } from 'astro';
import { getCollection } from "astro:content"
const baseUrl = import.meta.env.BASE_URL


const headers = new Headers({
    "Content-Type": "application/json; charset=utf-8"
})

export const GET: APIRoute = async ({ url }) => {
    const roomsCollected = await getCollection('rooms')
    const rooms = roomsCollected.map(r=>({
        name: r.data.name,
        id: r.data.slug,
        url: `${url.origin}${baseUrl}/${r.data.slug}/${r.data.bilder[0].name}`,
        images: r.data.bilder.map(i=>i.image.src.split("/").at(-1))
    }))    
    
    
    return new Response(JSON.stringify(rooms), {status: 200, headers})
}
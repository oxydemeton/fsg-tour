import { defineCollection, reference, z } from 'astro:content';

import { glob, file, } from 'astro/loaders';

const rooms = defineCollection({
    loader: glob({pattern: "**/*.json", base: "./src/data/rooms"}),
    schema: ({image}) => z.object({
        images: z.array(
            z.object({
                img: image(),
                connection: z.optional(z.object({
                    room: reference("rooms"),
                    imageIndex: z.number()
                }))
            })
        ),
        circle: z.boolean(),
    })
});

export const collections = {rooms}
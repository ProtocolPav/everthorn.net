import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Everthorn.net - Spawn Village'
export const size = {
    width: 1200,
    height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
    try {
        // Load your images
        const spawnVillageImage = await fetch(
            new URL('../../public/screenshots/spawn_village.png', import.meta.url)
        ).then((res) => res.arrayBuffer())

        const everthornLogo = await fetch(
            new URL('../../public/everthorn.png', import.meta.url)
        ).then((res) => res.arrayBuffer())

        return new ImageResponse(
            (
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        position: 'relative',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {/* Background image */}
                    <img
                        // @ts-ignore
                        src={spawnVillageImage}
                        alt="Spawn Village"
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        }}
                    />

                    {/* Overlay for better logo visibility */}
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background: 'rgba(0, 0, 0, 0.3)',
                        }}
                    />

                    {/* Centered logo */}
                    <img
                        // @ts-ignore
                        src={everthornLogo}
                        alt="Everthorn Logo"
                        style={{
                            position: 'relative',
                            maxWidth: '300px',
                            maxHeight: '300px',
                            zIndex: 1,
                        }}
                    />
                </div>
            ),
            {
                ...size,
            }
        )
    } catch (e: any) {
        console.log(`Failed to generate the image: ${e.message}`)
        return new Response(`Failed to generate the image`, {
            status: 500,
        })
    }
}

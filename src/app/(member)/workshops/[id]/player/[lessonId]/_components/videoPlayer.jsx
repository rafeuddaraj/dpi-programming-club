"use client"

import ReactPlayer from "react-player";


export default function VideoPlayer({ videoUrl }) {
    return (
        <>
            <ReactPlayer
                url={videoUrl}
                playing={true}  // Automatically start playing
                controls={true} // Enable controls (play, pause, volume, etc.)
                width="100%"
                height="100%"
                config={{
                    youtube: {
                        playerVars: {
                            modestbranding: 1,  // Remove YouTube logo
                            rel: 0,             // Disable related videos at the end
                            showinfo: 0,        // Hide video info
                            fs: 1,              // Enable fullscreen button
                        },
                    },
                }}
                className="rounded-lg"
            />
        </>
    );
}
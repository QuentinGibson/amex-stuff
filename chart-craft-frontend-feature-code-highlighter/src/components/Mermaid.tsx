"use client"
import mermaid from "mermaid"
import { useEffect } from "react"


export function Mermaid({script}: {script: string}): JSX.Element {
  useEffect(() => {
    mermaid.initialize({ startOnLoad: true });
    mermaid.contentLoaded()
  }, [])

    return (
        <><pre className="mermaid">{script}</pre> </>
    )
}
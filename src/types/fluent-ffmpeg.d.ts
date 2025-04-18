declare module "fluent-ffmpeg" {
  interface FfmpegCommand {
    toFormat(format: string): this
    save(outputPath: string): this
    audioFilters(filters: string[] | string): this
    audioFrequency(frequency: number): this
    audioBitrate(bitrate: number | string): this
    outputOptions(options: string[] | string): this
    on(event: "end", callback: () => void): this
    on(event: "error", callback: (err: Error) => void): this
  }

  namespace ffmpeg {
    function setFfmpegPath(path: string): void
  }

  function ffmpeg(input?: string): FfmpegCommand
  export = ffmpeg
}

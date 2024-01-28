export interface NavMetadata {
    to:string,
    txt:string
}

export interface BlogRoutes {
    base: NavMetadata[],
    alterBaseRouteDepth: (level: string) => NavMetadata[]
}
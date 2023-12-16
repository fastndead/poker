declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>
  export default content
}

declare module '*.css' {
  const content: Record<string, string>
  export default content
}

/// <reference types="vite/client" />
/// <reference types="vite/client" />

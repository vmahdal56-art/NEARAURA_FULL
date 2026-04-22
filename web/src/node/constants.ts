
// images
declare module '*.apng' {
  const src: string
  export default src
}
declare module '*.bmp' {
  const src: string
  export default src
}
declare module '*.png' {
  const src: string
  export default src
}
declare module '*.jpg' {
  const src: string
  export default src
}
declare module '*.jpeg' {
  const src: string
  export default src
}
declare module '*.jfif' {
  const src: string
  export default src
}
declare module '*.pjpeg' {
  const src: string
  export default src
}
declare module '*.pjp' {
  const src: string
  export default src
}
declare module '*.gif' {
  const src: string
  export default src
}
declare module '*.svg' {
  const src: string
  export default src
}
declare module '*.ico' {
  const src: string
  export default src
}
declare module '*.webp' {
  const src: string
  export default src
}
declare module '*.avif' {
  const src: string
  export default src
}
declare module '*.cur' {
  const src: string
  export default src
}
declare module '*.jxl' {
  const src: string
  export default src
}

// media
declare module '*.mp4' {
  const src: string
  export default src
}
declare module '*.webm' {
  const src: string
  export default src
}
declare module '*.ogg' {
  const src: string
  export default src
}
declare module '*.mp3' {
  const src: string
  export default src
}
declare module '*.wav' {
  const src: string
  export default src
}
declare module '*.flac' {
  const src: string
  export default src
}
declare module '*.aac' {
  const src: string
  export default src
}
declare module '*.opus' {
  const src: string
  export default src
}
declare module '*.mov' {
  const src: string
  export default src
}
declare module '*.m4a' {
  const src: string
  export default src
}
declare module '*.vtt' {
  const src: string
  export default src
}

// fonts
declare module '*.woff' {
  const src: string
  export default src
}
declare module '*.woff2' {
  const src: string
  export default src
}
declare module '*.eot' {
  const src: string
  export default src
}
declare module '*.ttf' {
  const src: string
  export default src
}
declare module '*.otf' {
  const src: string
  export default src
}

// other
declare module '*.webmanifest' {
  const src: string
  export default src
}
declare module '*.pdf' {
  const src: string
  export default src
}
declare module '*.txt' {
  const src: string
  export default src
}

// wasm?init
declare module '*.wasm?init' {
  const initWasm: (
    options?: WebAssembly.Imports,
  ) => Promise<WebAssembly.Instance>
  export default initWasm
}

// web worker
declare module '*?worker' {
  const workerConstructor: {
    new (options?: { name?: string }): Worker
  }
  export default workerConstructor
}

declare module '*?worker&inline' {
  const workerConstructor: {
    new (options?: { name?: string }): Worker
  }
  export default workerConstructor
}

declare module '*?worker&url' {
  const src: string
  export default src
}

declare module '*?sharedworker' {
  const sharedWorkerConstructor: {
    new (options?: { name?: string }): SharedWorker
  }
  export default sharedWorkerConstructor
}

declare module '*?sharedworker&inline' {
  const sharedWorkerConstructor: {
    new (options?: { name?: string }): SharedWorker
  }
  export default sharedWorkerConstructor
}

declare module '*?sharedworker&url' {
  const src: string
  export default src
}

declare module '*?raw' {
  const src: string
  export default src
}

declare module '*?url' {
  const src: string
  export default src
}

declare module '*?inline' {
  const src: string
  export default src
}

declare module '*?no-inline' {
  const src: string
  export default src
}

declare module '*?url&inline' {
  const src: string
  export default src
}

declare module '*?url&no-inline' {
  const src: string
  export default src
}

declare interface VitePreloadErrorEvent extends Event {
  payload: Error
}

declare interface WindowEventMap {
  'vite:preloadError': VitePreloadErrorEvent
}
web/node_modules/vite/types/internal/lightningcssOptions.d.ts
/* eslint-disable @typescript-eslint/ban-ts-comment */

// @ts-ignore `lightningcss` may not be installed
import type Lightningcss from 'lightningcss'

/* eslint-enable @typescript-eslint/ban-ts-comment */

export type LightningCSSOptions = Omit<
  Lightningcss.BundleAsyncOptions<Lightningcss.CustomAtRules>,
  | 'filename'
  | 'resolver'
  | 'minify'
  | 'sourceMap'
  | 'analyzeDependencies'
  // properties not overridden by Vite, but does not make sense to set by end users
  | 'inputSourceMap'
  | 'projectRoot'
>
web/node_modules/vite/types/internal/terserOptions.d.ts
/* eslint-disable @typescript-eslint/ban-ts-comment */

// @ts-ignore `terser` may not be installed
export type * as Terser from 'terser'
// @ts-ignore `terser` may not be installed
import type * as Terser from 'terser'

/* eslint-enable @typescript-eslint/ban-ts-comment */

export type TerserMinifyOptions = Terser.MinifyOptions
export type TerserMinifyOutput = Terser.MinifyOutput
web/node_modules/vite/types/internal/cssPreprocessorOptions.d.ts
/* eslint-disable @typescript-eslint/ban-ts-comment */

// @ts-ignore `sass` may not be installed
import type DartSass from 'sass'
// @ts-ignore `sass-embedded` may not be installed
import type SassEmbedded from 'sass-embedded'
// @ts-ignore `less` may not be installed
import type Less from 'less'
// @ts-ignore `stylus` may not be installed
import type Stylus from 'stylus'

/* eslint-enable @typescript-eslint/ban-ts-comment */

// https://github.com/type-challenges/type-challenges/issues/29285
type IsAny<T> = boolean extends (T extends never ? true : false) ? true : false

type DartSassStringOptionsAsync = DartSass.StringOptions<'async'>
type SassEmbeddedStringOptionsAsync = SassEmbedded.StringOptions<'async'>
type SassStringOptionsAsync =
  IsAny<SassEmbeddedStringOptionsAsync> extends false
    ? SassEmbeddedStringOptionsAsync
    : DartSassStringOptionsAsync

export type SassModernPreprocessBaseOptions = Omit<
  SassStringOptionsAsync,
  'url' | 'sourceMap'
>

export type LessPreprocessorBaseOptions = Omit<
  Less.Options,
  'sourceMap' | 'filename'
>

export type StylusPreprocessorBaseOptions = Omit<
  Stylus.RenderOptions,
  'filename'
> & { define?: Record<string, any> }

declare global {
  // LESS' types somewhat references this which doesn't make sense in Node,
  // so we have to shim it
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface HTMLLinkElement {}
}
web/node_modules/vite/types/customEvent.d.ts
import type {
  ErrorPayload,
  FullReloadPayload,
  PrunePayload,
  UpdatePayload,
} from './hmrPayload'

export interface CustomEventMap {
  // client events
  'vite:beforeUpdate': UpdatePayload
  'vite:afterUpdate': UpdatePayload
  'vite:beforePrune': PrunePayload
  'vite:beforeFullReload': FullReloadPayload
  'vite:error': ErrorPayload
  'vite:invalidate': InvalidatePayload
  'vite:ws:connect': WebSocketConnectionPayload
  'vite:ws:disconnect': WebSocketConnectionPayload

  // server events
  'vite:client:connect': undefined
  'vite:client:disconnect': undefined
}

export interface WebSocketConnectionPayload {
  /**
   * @experimental
   * We expose this instance experimentally to see potential usage.
   * This might be removed in the future if we didn't find reasonable use cases.
   * If you find this useful, please open an issue with details so we can discuss and make it stable API.
   */
  // eslint-disable-next-line n/no-unsupported-features/node-builtins
  webSocket: WebSocket
}

export interface InvalidatePayload {
  path: string
  message: string | undefined
  firstInvalidatedBy: string
}

/**
 * provides types for payloads of built-in Vite events
 */
export type InferCustomEventPayload<T extends string> =
  T extends keyof CustomEventMap ? CustomEventMap[T] : any

/**
 * provides types for names of built-in Vite events
 */
export type CustomEventName = keyof CustomEventMap | (string & {})
web/node_modules/vite/types/import-meta.d.ts
/// <reference path="./importMeta.d.ts" />

// https://github.com/microsoft/TypeScript/issues/45096
// TypeScript has a bug that makes <reference types="vite/types/importMeta" />
// not possible in userland. This file provides a workaround for now.
web/node_modules/vite/types/metadata.d.ts
export interface ChunkMetadata {
  importedAssets: Set<string>
  importedCss: Set<string>
}

export interface CustomPluginOptionsVite {
  /**
   * If this is a CSS Rollup module, you can scope to its importer's exports
   * so that if those exports are treeshaken away, the CSS module will also
   * be treeshaken.
   *
   * The "importerId" must import the CSS Rollup module statically.
   *
   * Example config if the CSS id is `/src/App.vue?vue&type=style&lang.css`:
   * ```js
   * cssScopeTo: ['/src/App.vue', 'default']
   * ```
   */
  cssScopeTo?: readonly [importerId: string, exportName: string | undefined]

  /** @deprecated no-op since Vite 6.1 */
  lang?: string
}

declare module 'rollup' {
  export interface RenderedChunk {
    viteMetadata?: ChunkMetadata
  }

  export interface CustomPluginOptions {
    vite?: CustomPluginOptionsVite
  }
}
web/node_modules/vite/types/hot.d.ts
import type { CustomEventName, InferCustomEventPayload } from './customEvent'

export type ModuleNamespace = Record<string, any> & {
  [Symbol.toStringTag]: 'Module'
}

export interface ViteHotContext {
  readonly data: any

  accept(): void
  accept(cb: (mod: ModuleNamespace | undefined) => void): void
  accept(dep: string, cb: (mod: ModuleNamespace | undefined) => void): void
  accept(
    deps: readonly string[],
    cb: (mods: Array<ModuleNamespace | undefined>) => void,
  ): void

  acceptExports(
    exportNames: string | readonly string[],
    cb?: (mod: ModuleNamespace | undefined) => void,
  ): void

  dispose(cb: (data: any) => void): void
  prune(cb: (data: any) => void): void
  invalidate(message?: string): void

  on<T extends CustomEventName>(
    event: T,
    cb: (payload: InferCustomEventPayload<T>) => void,
  ): void
  off<T extends CustomEventName>(
    event: T,
    cb: (payload: InferCustomEventPayload<T>) => void,
  ): void
  send<T extends CustomEventName>(
    event: T,
    data?: InferCustomEventPayload<T>,
  ): void
}
web/node_modules/vite/types/hmrPayload.d.ts
/** @deprecated use HotPayload */
export type HMRPayload = HotPayload
export type HotPayload =
  | ConnectedPayload
  | PingPayload
  | UpdatePayload
  | FullReloadPayload
  | CustomPayload
  | ErrorPayload
  | PrunePayload

export interface ConnectedPayload {
  type: 'connected'
}

export interface PingPayload {
  type: 'ping'
}

export interface UpdatePayload {
  type: 'update'
  updates: Update[]
}

export interface Update {
  type: 'js-update' | 'css-update'
  path: string
  acceptedPath: string
  timestamp: number
  /** @internal */
  explicitImportRequired?: boolean
  /** @internal */
  isWithinCircularImport?: boolean
  /** @internal */
  firstInvalidatedBy?: string
  /** @internal */
  invalidates?: string[]
}

export interface PrunePayload {
  type: 'prune'
  paths: string[]
}

export interface FullReloadPayload {
  type: 'full-reload'
  path?: string
  /** @internal */
  triggeredBy?: string
}

export interface CustomPayload {
  type: 'custom'
  event: string
  data?: any
}

export interface ErrorPayload {
  type: 'error'
  err: {
    [name: string]: any
    message: string
    stack: string
    id?: string
    frame?: string
    plugin?: string
    pluginCode?: string
    loc?: {
      file?: string
      line: number
      column: number
    }
  }
}
web/node_modules/vite/types/importGlob.d.ts
export interface ImportGlobOptions<
  Eager extends boolean,
  AsType extends string,
> {
  /**
   * Import type for the import url.
   *
   * @deprecated Use `query` instead, e.g. `as: 'url'` -> `query: '?url', import: 'default'`
   */
  as?: AsType
  /**
   * Import as static or dynamic
   *
   * @default false
   */
  eager?: Eager
  /**
   * Import only the specific named export. Set to `default` to import the default export.
   */
  import?: string
  /**
   * Custom queries
   */
  query?: string | Record<string, string | number | boolean>
  /**
   * Search files also inside `node_modules/` and hidden directories (e.g. `.git/`). This might have impact on performance.
   *
   * @default false
   */
  exhaustive?: boolean
  /**
   * Base path to resolve relative paths.
   */
  base?: string
}

export type GeneralImportGlobOptions = ImportGlobOptions<boolean, string>

/**
 * Declare Worker in case DOM is not added to the tsconfig lib causing
 * Worker interface is not defined. For developers with DOM lib added,
 * the Worker interface will be merged correctly.
 */
declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface Worker {}
}

export interface KnownAsTypeMap {
  raw: string
  url: string
  worker: Worker
}

export interface ImportGlobFunction {
  /**
   * Import a list of files with a glob pattern.
   *
   * Overload 1: No generic provided, infer the type from `eager` and `as`
   */
  <
    Eager extends boolean,
    As extends string,
    T = As extends keyof KnownAsTypeMap ? KnownAsTypeMap[As] : unknown,
  >(
    glob: string | string[],
    options?: ImportGlobOptions<Eager, As>,
  ): (Eager extends true ? true : false) extends true
    ? Record<string, T>
    : Record<string, () => Promise<T>>
  /**
   * Import a list of files with a glob pattern.
   *
   * Overload 2: Module generic provided, infer the type from `eager: false`
   */
  <M>(
    glob: string | string[],
    options?: ImportGlobOptions<false, string>,
  ): Record<string, () => Promise<M>>
  /**
   * Import a list of files with a glob pattern.
   *
   * Overload 3: Module generic provided, infer the type from `eager: true`
   */
  <M>(
    glob: string | string[],
    options: ImportGlobOptions<true, string>,
  ): Record<string, M>
}
web/node_modules/vite/types/importMeta.d.ts
// This file is an augmentation to the built-in ImportMeta interface
// Thus cannot contain any top-level imports
// <https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation>

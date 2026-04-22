// eslint-disable-next-line @typescript-eslint/no-empty-object-type -- to allow extending by users
interface ViteTypeOptions {
  // strictImportMetaEnv: unknown
}

type ImportMetaEnvFallbackKey =
  'strictImportMetaEnv' extends keyof ViteTypeOptions ? never : string

interface ImportMetaEnv extends Record<ImportMetaEnvFallbackKey, any> {
  BASE_URL: string
  MODE: string
  DEV: boolean
  PROD: boolean
  SSR: boolean
}

interface ImportMeta {
  url: string

  readonly hot?: import('./hot').ViteHotContext

  readonly env: ImportMetaEnv

  glob: import('./importGlob').ImportGlobFunction
}
web/node_modules/vite/dist/node/chunks/moduleRunnerTransport.d.ts
import { HotPayload } from "#types/hmrPayload";

//#region src/shared/invokeMethods.d.ts
interface FetchFunctionOptions {
  cached?: boolean;
  startOffset?: number;
}
type FetchResult = CachedFetchResult | ExternalFetchResult | ViteFetchResult;
interface CachedFetchResult {
  /**
  * If module cached in the runner, we can just confirm
  * it wasn't invalidated on the server side.
  */
  cache: true;
}
interface ExternalFetchResult {
  /**
  * The path to the externalized module starting with file://,
  * by default this will be imported via a dynamic "import"
  * instead of being transformed by vite and loaded with vite runner
  */
  externalize: string;
  /**
  * Type of the module. Will be used to determine if import statement is correct.
  * For example, if Vite needs to throw an error if variable is not actually exported
  */
  type: "module" | "commonjs" | "builtin" | "network";
}
interface ViteFetchResult {
  /**
  * Code that will be evaluated by vite runner
  * by default this will be wrapped in an async function
  */
  code: string;
  /**
  * File path of the module on disk.
  * This will be resolved as import.meta.url/filename
  * Will be equal to `null` for virtual modules
  */
  file: string | null;
  /**
  * Module ID in the server module graph.
  */
  id: string;
  /**
  * Module URL used in the import.
  */
  url: string;
  /**
  * Invalidate module on the client side.
  */
  invalidate: boolean;
}
type InvokeMethods = {
  fetchModule: (id: string, importer?: string, options?: FetchFunctionOptions) => Promise<FetchResult>;
  getBuiltins: () => Promise<Array<{
    type: "string";
    value: string;
  } | {
    type: "RegExp";
    source: string;
    flags: string;
  }>>;
};
//#endregion
//#region src/shared/moduleRunnerTransport.d.ts
type ModuleRunnerTransportHandlers = {
  onMessage: (data: HotPayload) => void;
  onDisconnection: () => void;
};
/**
* "send and connect" or "invoke" must be implemented
*/
interface ModuleRunnerTransport {
  connect?(handlers: ModuleRunnerTransportHandlers): Promise<void> | void;
  disconnect?(): Promise<void> | void;
  send?(data: HotPayload): Promise<void> | void;
  invoke?(data: HotPayload): Promise<{
    result: any;
  } | {
    error: any;
  }>;
  timeout?: number;
}
interface NormalizedModuleRunnerTransport {
  connect?(onMessage?: (data: HotPayload) => void): Promise<void> | void;
  disconnect?(): Promise<void> | void;
  send(data: HotPayload): Promise<void>;
  invoke<T extends keyof InvokeMethods>(name: T, data: Parameters<InvokeMethods[T]>): Promise<ReturnType<Awaited<InvokeMethods[T]>>>;
}
declare const createWebSocketModuleRunnerTransport: (options: {
  createConnection: () => WebSocket;
  pingInterval?: number;
}) => Required<Pick<ModuleRunnerTransport, "connect" | "disconnect" | "send">>;
//#endregion
export { ExternalFetchResult as a, ViteFetchResult as c, createWebSocketModuleRunnerTransport as i, ModuleRunnerTransportHandlers as n, FetchFunctionOptions as o, NormalizedModuleRunnerTransport as r, FetchResult as s, ModuleRunnerTransport as t };web/node_modules/vite/dist/node/module-runner.d.ts
import { a as ExternalFetchResult, c as ViteFetchResult, i as createWebSocketModuleRunnerTransport, n as ModuleRunnerTransportHandlers, o as FetchFunctionOptions, r as NormalizedModuleRunnerTransport, s as FetchResult, t as ModuleRunnerTransport } from "./chunks/moduleRunnerTransport.js";
import { ModuleNamespace, ViteHotContext } from "#types/hot";
import { HotPayload, Update } from "#types/hmrPayload";
import { InferCustomEventPayload } from "#types/customEvent";

//#region src/module-runner/sourcemap/decoder.d.ts
interface SourceMapLike {
  version: number;
  mappings?: string;
  names?: string[];
  sources?: string[];
  sourcesContent?: string[];
}
declare class DecodedMap {
  map: SourceMapLike;
  _encoded: string;
  _decoded: undefined | number[][][];
  _decodedMemo: Stats;
  url: string;
  file: string;
  version: number;
  names: string[];
  resolvedSources: string[];
  constructor(map: SourceMapLike, from: string);
}
interface Stats {
  lastKey: number;
  lastNeedle: number;
  lastIndex: number;
}
//#endregion
//#region src/shared/hmr.d.ts
type CustomListenersMap = Map<string, ((data: any) => void)[]>;
interface HotModule {
  id: string;
  callbacks: HotCallback[];
}
interface HotCallback {
  deps: string[];
  fn: (modules: Array<ModuleNamespace | undefined>) => void;
}
interface HMRLogger {
  error(msg: string | Error): void;
  debug(...msg: unknown[]): void;
}
declare class HMRClient {
  logger: HMRLogger;
  private transport;
  private importUpdatedModule;
  hotModulesMap: Map<string, HotModule>;
  disposeMap: Map<string, (data: any) => void | Promise<void>>;
  pruneMap: Map<string, (data: any) => void | Promise<void>>;
  dataMap: Map<string, any>;
  customListenersMap: CustomListenersMap;
  ctxToListenersMap: Map<string, CustomListenersMap>;
  currentFirstInvalidatedBy: string | undefined;
  constructor(logger: HMRLogger, transport: NormalizedModuleRunnerTransport, importUpdatedModule: (update: Update) => Promise<ModuleNamespace>);
  notifyListeners<T extends string>(event: T, data: InferCustomEventPayload<T>): Promise<void>;
  send(payload: HotPayload): void;
  clear(): void;
  prunePaths(paths: string[]): Promise<void>;
  protected warnFailedUpdate(err: Error, path: string | string[]): void;
  private updateQueue;
  private pendingUpdateQueue;
  /**
  * buffer multiple hot updates triggered by the same src change
  * so that they are invoked in the same order they were sent.
  * (otherwise the order may be inconsistent because of the http request round trip)
  */
  queueUpdate(payload: Update): Promise<void>;
  private fetchUpdate;
}
//#endregion
//#region src/shared/ssrTransform.d.ts
interface DefineImportMetadata {
  /**
  * Imported names before being transformed to `ssrImportKey`
  *
  * import foo, { bar as baz, qux } from 'hello'
  * => ['default', 'bar', 'qux']
  *
  * import * as namespace from 'world
  * => undefined
  */
  importedNames?: string[];
}
interface SSRImportMetadata extends DefineImportMetadata {
  isDynamicImport?: boolean;
}
//#endregion
//#region src/module-runner/constants.d.ts
declare const ssrModuleExportsKey = "__vite_ssr_exports__";
declare const ssrImportKey = "__vite_ssr_import__";
declare const ssrDynamicImportKey = "__vite_ssr_dynamic_import__";
declare const ssrExportAllKey = "__vite_ssr_exportAll__";
declare const ssrExportNameKey = "__vite_ssr_exportName__";
declare const ssrImportMetaKey = "__vite_ssr_import_meta__";
//#endregion
//#region src/module-runner/runner.d.ts
interface ModuleRunnerDebugger {
  (formatter: unknown, ...args: unknown[]): void;
}
declare class ModuleRunner {
  options: ModuleRunnerOptions;
  evaluator: ModuleEvaluator;
  private debug?;
  evaluatedModules: EvaluatedModules;
  hmrClient?: HMRClient;
  private readonly transport;
  private readonly resetSourceMapSupport?;
  private readonly concurrentModuleNodePromises;
  private isBuiltin?;
  private builtinsPromise?;
  private closed;
  constructor(options: ModuleRunnerOptions, evaluator?: ModuleEvaluator, debug?: ModuleRunnerDebugger | undefined);
  /**
  * URL to execute. Accepts file path, server path or id relative to the root.
  */
  import<T = any>(url: string): Promise<T>;
  /**
  * Clear all caches including HMR listeners.
  */
  clearCache(): void;
  /**
  * Clears all caches, removes all HMR listeners, and resets source map support.
  * This method doesn't stop the HMR connection.
  */
  close(): Promise<void>;
  /**
  * Returns `true` if the runtime has been closed by calling `close()` method.
  */
  isClosed(): boolean;
  private processImport;
  private isCircularModule;
  private isCircularImport;
  private cachedRequest;
  private cachedModule;
  private ensureBuiltins;
  private getModuleInformation;
  protected directRequest(url: string, mod: EvaluatedModuleNode, _callstack: string[]): Promise<any>;
}
//#endregion
//#region src/module-runner/sourcemap/interceptor.d.ts
interface RetrieveFileHandler {
  (path: string): string | null | undefined | false;
}
interface RetrieveSourceMapHandler {
  (path: string): null | {
    url: string;
    map: any;
  };
}
interface InterceptorOptions {
  retrieveFile?: RetrieveFileHandler;
  retrieveSourceMap?: RetrieveSourceMapHandler;
}
//#endregion
//#region src/module-runner/types.d.ts
interface ModuleRunnerImportMeta extends ImportMeta {
  url: string;
  env: ImportMetaEnv;
  hot?: ViteHotContext;
  [key: string]: any;
}
interface ModuleRunnerContext {
  [ssrModuleExportsKey]: Record<string, any>;
  [ssrImportKey]: (id: string, metadata?: DefineImportMetadata) => Promise<any>;
  [ssrDynamicImportKey]: (id: string, options?: ImportCallOptions) => Promise<any>;
  [ssrExportAllKey]: (obj: any) => void;
  [ssrExportNameKey]: (name: string, getter: () => unknown) => void;
  [ssrImportMetaKey]: ModuleRunnerImportMeta;
}
interface ModuleEvaluator {
  /**
  * Number of prefixed lines in the transformed code.
  */
  startOffset?: number;
  /**
  * Run code that was transformed by Vite.
  * @param context Function context
  * @param code Transformed code
  * @param module The module node
  */
  runInlinedModule(context: ModuleRunnerContext, code: string, module: Readonly<EvaluatedModuleNode>): Promise<any>;
  /**
  * Run externalized module.
  * @param file File URL to the external module
  */
  runExternalModule(file: string): Promise<any>;
}
type ResolvedResult = (ExternalFetchResult | ViteFetchResult) & {
  url: string;
  id: string;
};
type FetchFunction = (id: string, importer?: string, options?: FetchFunctionOptions) => Promise<FetchResult>;
interface ModuleRunnerHmr {
  /**
  * Configure HMR logger.
  */
  logger?: false | HMRLogger;
}
interface ModuleRunnerOptions {
  /**
  * A set of methods to communicate with the server.
  */
  transport: ModuleRunnerTransport;
  /**
  * Configure how source maps are resolved. Prefers `node` if `process.setSourceMapsEnabled` is available.
  * Otherwise it will use `prepareStackTrace` by default which overrides `Error.prepareStackTrace` method.
  * You can provide an object to configure how file contents and source maps are resolved for files that were not processed by Vite.
  */
  sourcemapInterceptor?: false | "node" | "prepareStackTrace" | InterceptorOptions;
  /**
  * Disable HMR or configure HMR options.
  *
  * @default true
  */
  hmr?: boolean | ModuleRunnerHmr;
  /**
  * Create import.meta object for the module.
  *
  * @default createDefaultImportMeta
  */
  createImportMeta?: (modulePath: string) => ModuleRunnerImportMeta | Promise<ModuleRunnerImportMeta>;
  /**
  * Custom module cache. If not provided, creates a separate module cache for each ModuleRunner instance.
  */
  evaluatedModules?: EvaluatedModules;
}
interface ImportMetaEnv {
  [key: string]: any;
  BASE_URL: string;
  MODE: string;
  DEV: boolean;
  PROD: boolean;
  SSR: boolean;
}
//#endregion
//#region src/module-runner/evaluatedModules.d.ts
declare class EvaluatedModuleNode {
  id: string;
  url: string;
  importers: Set<string>;
  imports: Set<string>;
  evaluated: boolean;
  meta: ResolvedResult | undefined;
  promise: Promise<any> | undefined;
  exports: any | undefined;
  file: string;
  map: DecodedMap | undefined;
  constructor(id: string, url: string);
}
declare class EvaluatedModules {
  readonly idToModuleMap: Map<string, EvaluatedModuleNode>;
  readonly fileToModulesMap: Map<string, Set<EvaluatedModuleNode>>;
  readonly urlToIdModuleMap: Map<string, EvaluatedModuleNode>;
  /**
  * Returns the module node by the resolved module ID. Usually, module ID is
  * the file system path with query and/or hash. It can also be a virtual module.
  *
  * Module runner graph will have 1 to 1 mapping with the server module graph.
  * @param id Resolved module ID
  */
  getModuleById(id: string): EvaluatedModuleNode | undefined;
  /**
  * Returns all modules related to the file system path. Different modules
  * might have different query parameters or hash, so it's possible to have
  * multiple modules for the same file.
  * @param file The file system path of the module
  */
  getModulesByFile(file: string): Set<EvaluatedModuleNode> | undefined;
  /**
  * Returns the module node by the URL that was used in the import statement.
  * Unlike module graph on the server, the URL is not resolved and is used as is.
  * @param url Server URL that was used in the import statement
  */
  getModuleByUrl(url: string): EvaluatedModuleNode | undefined;
  /**
  * Ensure that module is in the graph. If the module is already in the graph,
  * it will return the existing module node. Otherwise, it will create a new
  * module node and add it to the graph.
  * @param id Resolved module ID
  * @param url URL that was used in the import statement
  */
  ensureModule(id: string, url: string): EvaluatedModuleNode;
  invalidateModule(node: EvaluatedModuleNode): void;
  /**
  * Extracts the inlined source map from the module code and returns the decoded
  * source map. If the source map is not inlined, it will return null.
  * @param id Resolved module ID
  */
  getModuleSourceMapById(id: string): DecodedMap | null;
  clear(): void;
}
declare function normalizeModuleId(file: string): string;
//#endregion
//#region src/module-runner/esmEvaluator.d.ts
declare class ESModulesEvaluator implements ModuleEvaluator {
  readonly startOffset: number;
  runInlinedModule(context: ModuleRunnerContext, code: string): Promise<any>;
  runExternalModule(filepath: string): Promise<any>;
}
//#endregion
//#region src/module-runner/createImportMeta.d.ts
declare function createDefaultImportMeta(modulePath: string): ModuleRunnerImportMeta;
/**
* Create import.meta object for Node.js.
*/
declare function createNodeImportMeta(modulePath: string): Promise<ModuleRunnerImportMeta>;
//#endregion
export { ESModulesEvaluator, type EvaluatedModuleNode, EvaluatedModules, type FetchFunction, type FetchFunctionOptions, type FetchResult, type HMRLogger, type InterceptorOptions, type ModuleEvaluator, ModuleRunner, type ModuleRunnerContext, type ModuleRunnerHmr, type ModuleRunnerImportMeta, type ModuleRunnerOptions, type ModuleRunnerTransport, type ModuleRunnerTransportHandlers, type ResolvedResult, type SSRImportMetadata, createDefaultImportMeta, createNodeImportMeta, createWebSocketModuleRunnerTransport, normalizeModuleId, ssrDynamicImportKey, ssrExportAllKey, ssrExportNameKey, ssrImportKey, ssrImportMetaKey, ssrModuleExportsKey };web/node_modules/vite/dist/node/index.d.ts
/// <reference types="node" />
import { t as ModuleRunnerTransport } from "./chunks/moduleRunnerTransport.js";
import { ConnectedPayload, CustomPayload, CustomPayload as hmrPayload_CustomPayload, ErrorPayload, FullReloadPayload, HMRPayload, HotPayload, HotPayload as hmrPayload_HotPayload, PrunePayload, Update, UpdatePayload } from "#types/hmrPayload";
import { CustomEventMap, InferCustomEventPayload, InferCustomEventPayload as hmrPayload_InferCustomEventPayload, InvalidatePayload } from "#types/customEvent";
import * as Rollup from "rollup";
import { CustomPluginOptions, ExistingRawSourceMap, InputOption, InputOptions, LoadResult, MinimalPluginContext, ModuleFormat, ModuleInfo, ObjectHook, OutputBundle, OutputChunk, PartialResolvedId, PluginContext, PluginContextMeta, PluginHooks, ResolveIdResult, RollupError, RollupLog, RollupOptions, RollupOutput, RollupWatcher, SourceDescription, SourceMap, SourceMapInput, TransformPluginContext, WatcherOptions } from "rollup";
import { parseAst, parseAstAsync } from "rollup/parseAst";
import * as http from "node:http";
import { Agent, ClientRequest, ClientRequestArgs, OutgoingHttpHeaders, ServerResponse } from "node:http";
import { Http2SecureServer } from "node:http2";
import * as fs from "node:fs";
import { EventEmitter } from "node:events";
import { Server as HttpsServer, ServerOptions as HttpsServerOptions } from "node:https";
import * as net from "node:net";
import { Duplex, DuplexOptions, Stream } from "node:stream";
import { FetchFunction, FetchFunctionOptions, FetchResult, FetchResult as moduleRunner_FetchResult, ModuleEvaluator, ModuleRunner, ModuleRunnerHmr, ModuleRunnerOptions } from "vite/module-runner";
import { BuildOptions as esbuild_BuildOptions, TransformOptions as EsbuildTransformOptions, TransformOptions as esbuild_TransformOptions, TransformResult as esbuild_TransformResult, version as esbuildVersion } from "esbuild";
import { SecureContextOptions } from "node:tls";
import { URL as url_URL } from "node:url";
import { ZlibOptions } from "node:zlib";
import { Terser, TerserMinifyOptions } from "#types/internal/terserOptions";
import * as PostCSS from "postcss";
import { LessPreprocessorBaseOptions, SassModernPreprocessBaseOptions, StylusPreprocessorBaseOptions } from "#types/internal/cssPreprocessorOptions";
import { LightningCSSOptions, LightningCSSOptions as lightningcssOptions_LightningCSSOptions } from "#types/internal/lightningcssOptions";
import { GeneralImportGlobOptions, ImportGlobFunction, ImportGlobOptions, KnownAsTypeMap } from "#types/importGlob";
import { ChunkMetadata, CustomPluginOptionsVite } from "#types/metadata";

//#region rolldown:runtime

//#endregion
//#region src/types/alias.d.ts
interface Alias {
  find: string | RegExp;
  replacement: string;
  /**
   * Instructs the plugin to use an alternative resolving algorithm,
   * rather than the Rollup's resolver.
   * @default null
   */
  customResolver?: ResolverFunction | ResolverObject | null;
}
type MapToFunction<T$1> = T$1 extends Function ? T$1 : never;
type ResolverFunction = MapToFunction<PluginHooks['resolveId']>;
interface ResolverObject {
  buildStart?: PluginHooks['buildStart'];
  resolveId: ResolverFunction;
}
/**
 * Specifies an `Object`, or an `Array` of `Object`,
 * which defines aliases used to replace values in `import` or `require` statements.
 * With either format, the order of the entries is important,
 * in that the first defined rules are applied first.
 *
 * This is passed to \@rollup/plugin-alias as the "entries" field
 * https://github.com/rollup/plugins/tree/master/packages/alias#entries
 */
type AliasOptions = readonly Alias[] | {
  [find: string]: string;
};
//#endregion
//#region src/types/anymatch.d.ts
type AnymatchFn = (testString: string) => boolean;
type AnymatchPattern = string | RegExp | AnymatchFn;
type AnymatchMatcher = AnymatchPattern | AnymatchPattern[];
//#endregion
//#region src/types/chokidar.d.ts
declare class FSWatcher extends EventEmitter implements fs.FSWatcher {
  options: WatchOptions;

  /**
   * Constructs a new FSWatcher instance with optional WatchOptions parameter.
   */
  constructor(options?: WatchOptions);

  /**
   * When called, requests that the Node.js event loop not exit so long as the fs.FSWatcher is active.
   * Calling watcher.ref() multiple times will have no effect.
   */
  ref(): this;

  /**
   * When called, the active fs.FSWatcher object will not require the Node.js event loop to remain active.
   * If there is no other activity keeping the event loop running, the process may exit before the fs.FSWatcher object's callback is invoked.
   * Calling watcher.unref() multiple times will have no effect.
   */
  unref(): this;

  /**
   * Add files, directories, or glob patterns for tracking. Takes an array of strings or just one
   * string.
   */
  add(paths: string | ReadonlyArray<string>): this;

  /**
   * Stop watching files, directories, or glob patterns. Takes an array of strings or just one
   * string.
   */
  unwatch(paths: string | ReadonlyArray<string>): this;

  /**
   * Returns an object representing all the paths on the file system being watched by this
   * `FSWatcher` instance. The object's keys are all the directories (using absolute paths unless
   * the `cwd` option was used), and the values are arrays of the names of the items contained in
   * each directory.
   */
  getWatched(): {
    [directory: string]: string[];
  };

  /**
   * Removes all listeners from watched files.
   */
  close(): Promise<void>;
  on(event: 'add' | 'addDir' | 'change', listener: (path: string, stats?: fs.Stats) => void): this;
  on(event: 'all', listener: (eventName: 'add' | 'addDir' | 'change' | 'unlink' | 'unlinkDir', path: string, stats?: fs.Stats) => void): this;

  /**
   * Error occurred
   */
  on(event: 'error', listener: (error: Error) => void): this;

  /**
   * Exposes the native Node `fs.FSWatcher events`
   */
  on(event: 'raw', listener: (eventName: string, path: string, details: any) => void): this;

  /**
   * Fires when the initial scan is complete
   */
  on(event: 'ready', listener: () => void): this;
  on(event: 'unlink' | 'unlinkDir', listener: (path: string) => void): this;
  on(event: string, listener: (...args: any[]) => void): this;
}
interface WatchOptions {
  /**
   * Indicates whether the process should continue to run as long as files are being watched. If
   * set to `false` when using `fsevents` to watch, no more events will be emitted after `ready`,
   * even if the process continues to run.
   */
  persistent?: boolean;

  /**
   * ([anymatch](https://github.com/micromatch/anymatch)-compatible definition) Defines files/paths to
   * be ignored. The whole relative or absolute path is tested, not just filename. If a function
   * with two arguments is provided, it gets called twice per path - once with a single argument
   * (the path), second time with two arguments (the path and the
   * [`fs.Stats`](https://nodejs.org/api/fs.html#fs_class_fs_stats) object of that path).
   */
  ignored?: AnymatchMatcher;

  /**
   * If set to `false` then `add`/`addDir` events are also emitted for matching paths while
   * instantiating the watching as chokidar discovers these file paths (before the `ready` event).
   */
  ignoreInitial?: boolean;

  /**
   * When `false`, only the symlinks themselves will be watched for changes instead of following
   * the link references and bubbling events through the link's path.
   */
  followSymlinks?: boolean;

  /**
   * The base directory from which watch `paths` are to be derived. Paths emitted with events will
   * be relative to this.
   */
  cwd?: string;

  /**
   * If set to true then the strings passed to .watch() and .add() are treated as literal path
   * names, even if they look like globs.
   *
   * @default false
   */
  disableGlobbing?: boolean;

  /**
   * Whether to use fs.watchFile (backed by polling), or fs.watch. If polling leads to high CPU
   * utilization, consider setting this to `false`. It is typically necessary to **set this to
   * `true` to successfully watch files over a network**, and it may be necessary to successfully
   * watch files in other non-standard situations. Setting to `true` explicitly on OS X overrides
   * the `useFsEvents` default.
   */
  usePolling?: boolean;

  /**
   * Whether to use the `fsevents` watching interface if available. When set to `true` explicitly
   * and `fsevents` is available this supersedes the `usePolling` setting. When set to `false` on
   * OS X, `usePolling: true` becomes the default.
   */
  useFsEvents?: boolean;

  /**
   * If relying upon the [`fs.Stats`](https://nodejs.org/api/fs.html#fs_class_fs_stats) object that
   * may get passed with `add`, `addDir`, and `change` events, set this to `true` to ensure it is
   * provided even in cases where it wasn't already available from the underlying watch events.
   */
  alwaysStat?: boolean;

  /**
   * If set, limits how many levels of subdirectories will be traversed.
   */
  depth?: number;

  /**
   * Interval of file system polling.
   */
  interval?: number;

  /**
   * Interval of file system polling for binary files. ([see list of binary extensions](https://gi
   * thub.com/sindresorhus/binary-extensions/blob/master/binary-extensions.json))
   */
  binaryInterval?: number;

  /**
   *  Indicates whether to watch files that don't have read permissions if possible. If watching
   *  fails due to `EPERM` or `EACCES` with this set to `true`, the errors will be suppressed
   *  silently.
   */
  ignorePermissionErrors?: boolean;

  /**
   * `true` if `useFsEvents` and `usePolling` are `false`. Automatically filters out artifacts
   * that occur when using editors that use "atomic writes" instead of writing directly to the
   * source file. If a file is re-added within 100 ms of being deleted, Chokidar emits a `change`
   * event rather than `unlink` then `add`. If the default of 100 ms does not work well for you,
   * you can override it by setting `atomic` to a custom value, in milliseconds.
   */
  atomic?: boolean | number;

  /**
   * can be set to an object in order to adjust timing params:
   */
  awaitWriteFinish?: AwaitWriteFinishOptions | boolean;
}
interface AwaitWriteFinishOptions {
  /**
   * Amount of time in milliseconds for a file size to remain constant before emitting its event.
   */
  stabilityThreshold?: number;

  /**
   * File size polling interval.
   */
  pollInterval?: number;
}
//#endregion
//#region src/types/connect.d.ts
declare namespace Connect {
  export type ServerHandle = HandleFunction | http.Server;
  export class IncomingMessage extends http.IncomingMessage {
    originalUrl?: http.IncomingMessage['url'] | undefined;
  }
  export type NextFunction = (err?: any) => void;
  export type SimpleHandleFunction = (req: IncomingMessage, res: http.ServerResponse) => void;
  export type NextHandleFunction = (req: IncomingMessage, res: http.ServerResponse, next: NextFunction) => void;
  export type ErrorHandleFunction = (err: any, req: IncomingMessage, res: http.ServerResponse, next: NextFunction) => void;
  export type HandleFunction = SimpleHandleFunction | NextHandleFunction | ErrorHandleFunction;
  export interface ServerStackItem {
    route: string;
    handle: ServerHandle;
  }
  export interface Server extends NodeJS.EventEmitter {
    (req: http.IncomingMessage, res: http.ServerResponse, next?: Function): void;
    route: string;
    stack: ServerStackItem[];

    /**
     * Utilize the given middleware `handle` to the given `route`,
     * defaulting to _/_. This "route" is the mount-point for the
     * middleware, when given a value other than _/_ the middleware
     * is only effective when that segment is present in the request's
     * pathname.
     *
     * For example if we were to mount a function at _/admin_, it would
     * be invoked on _/admin_, and _/admin/settings_, however it would
     * not be invoked for _/_, or _/posts_.
     */
    use(fn: NextHandleFunction): Server;
    use(fn: HandleFunction): Server;
    use(route: string, fn: NextHandleFunction): Server;
    use(route: string, fn: HandleFunction): Server;

    /**
     * Handle server requests, punting them down
     * the middleware stack.
     */
    handle(req: http.IncomingMessage, res: http.ServerResponse, next: Function): void;

    /**
     * Listen for connections.
     *
     * This method takes the same arguments
     * as node's `http.Server#listen()`.
     *
     * HTTP and HTTPS:
     *
     * If you run your application both as HTTP
     * and HTTPS you may wrap them individually,
     * since your Connect "server" is really just
     * a JavaScript `Function`.
     *
     *      var connect = require('connect')
     *        , http = require('http')
     *        , https = require('https');
     *
     *      var app = connect();
     *
     *      http.createServer(app).listen(80);
     *      https.createServer(options, app).listen(443);
     */
    listen(port: number, hostname?: string, backlog?: number, callback?: Function): http.Server;
    listen(port: number, hostname?: string, callback?: Function): http.Server;
    listen(path: string, callback?: Function): http.Server;
    listen(handle: any, listeningListener?: Function): http.Server;
  }
}
//#endregion
//#region ../../node_modules/.pnpm/http-proxy-3@1.22.0_patch_hash=d89dff5a0afc2cb277080ad056a3baf7feeeeac19144878abc17f4c91ad89095_ms@2.1.3/node_modules/http-proxy-3/dist/lib/http-proxy/index.d.ts
interface ProxyTargetDetailed {
  host: string;
  port: number;
  protocol?: string;
  hostname?: string;
  socketPath?: string;
  key?: string;
  passphrase?: string;
  pfx?: Buffer | string;
  cert?: string;
  ca?: string;
  ciphers?: string;
  secureProtocol?: string;
}
type ProxyType = "ws" | "web";
type ProxyTarget = ProxyTargetUrl | ProxyTargetDetailed;
type ProxyTargetUrl = URL | string | {
  port: number;
  host: string;
  protocol?: string;
};
type NormalizeProxyTarget<T$1 extends ProxyTargetUrl> = Exclude<T$1, string> | URL;
interface ServerOptions$3 {
  /** URL string to be parsed with the url module. */
  target?: ProxyTarget;
  /** URL string to be parsed with the url module or a URL object. */
  forward?: ProxyTargetUrl;
  /** Object to be passed to http(s).request. */
  agent?: any;
  /** Object to be passed to https.createServer(). */
  ssl?: any;
  /** If you want to proxy websockets. */
  ws?: boolean;
  /** Adds x- forward headers. */
  xfwd?: boolean;
  /** Verify SSL certificate. */
  secure?: boolean;
  /** Explicitly specify if we are proxying to another proxy. */
  toProxy?: boolean;
  /** Specify whether you want to prepend the target's path to the proxy path. */
  prependPath?: boolean;
  /** Specify whether you want to ignore the proxy path of the incoming request. */
  ignorePath?: boolean;
  /** Local interface string to bind for outgoing connections. */
  localAddress?: string;
  /** Changes the origin of the host header to the target URL. */
  changeOrigin?: boolean;
  /** specify whether you want to keep letter case of response header key */
  preserveHeaderKeyCase?: boolean;
  /** Basic authentication i.e. 'user:password' to compute an Authorization header. */
  auth?: string;
  /** Rewrites the location hostname on (301 / 302 / 307 / 308) redirects, Default: null. */
  hostRewrite?: string;
  /** Rewrites the location host/ port on (301 / 302 / 307 / 308) redirects based on requested host/ port.Default: false. */
  autoRewrite?: boolean;
  /** Rewrites the location protocol on (301 / 302 / 307 / 308) redirects to 'http' or 'https'.Default: null. */
  protocolRewrite?: string;
  /** rewrites domain of set-cookie headers. */
  cookieDomainRewrite?: false | string | {
    [oldDomain: string]: string;
  };
  /** rewrites path of set-cookie headers. Default: false */
  cookiePathRewrite?: false | string | {
    [oldPath: string]: string;
  };
  /** object with extra headers to be added to target requests. */
  headers?: {
    [header: string]: string | string[] | undefined;
  };
  /** Timeout (in milliseconds) when proxy receives no response from target. Default: 120000 (2 minutes) */
  proxyTimeout?: number;
  /** Timeout (in milliseconds) for incoming requests */
  timeout?: number;
  /** Specify whether you want to follow redirects. Default: false */
  followRedirects?: boolean;
  /** If set to true, none of the webOutgoing passes are called and it's your responsibility to appropriately return the response by listening and acting on the proxyRes event */
  selfHandleResponse?: boolean;
  /** Buffer */
  buffer?: Stream;
  /** Explicitly set the method type of the ProxyReq */
  method?: string;
  /**
   * Optionally override the trusted CA certificates.
   * This is passed to https.request.
   */
  ca?: string;
}
interface NormalizedServerOptions extends ServerOptions$3 {
  target?: NormalizeProxyTarget<ProxyTarget>;
  forward?: NormalizeProxyTarget<ProxyTargetUrl>;
}
type ErrorCallback<TIncomingMessage extends typeof http.IncomingMessage = typeof http.IncomingMessage, TServerResponse extends typeof http.ServerResponse = typeof http.ServerResponse, TError = Error> = (err: TError, req: InstanceType<TIncomingMessage>, res: InstanceType<TServerResponse> | net.Socket, target?: ProxyTargetUrl) => void;
type ProxyServerEventMap<TIncomingMessage extends typeof http.IncomingMessage = typeof http.IncomingMessage, TServerResponse extends typeof http.ServerResponse = typeof http.ServerResponse, TError = Error> = {
  error: Parameters<ErrorCallback<TIncomingMessage, TServerResponse, TError>>;
  start: [req: InstanceType<TIncomingMessage>, res: InstanceType<TServerResponse>, target: ProxyTargetUrl];
  open: [socket: net.Socket];
  proxyReq: [proxyReq: http.ClientRequest, req: InstanceType<TIncomingMessage>, res: InstanceType<TServerResponse>, options: ServerOptions$3, socket: net.Socket];
  proxyRes: [proxyRes: InstanceType<TIncomingMessage>, req: InstanceType<TIncomingMessage>, res: InstanceType<TServerResponse>];
  proxyReqWs: [proxyReq: http.ClientRequest, req: InstanceType<TIncomingMessage>, socket: net.Socket, options: ServerOptions$3, head: any];
  econnreset: [err: Error, req: InstanceType<TIncomingMessage>, res: InstanceType<TServerResponse>, target: ProxyTargetUrl];
  end: [req: InstanceType<TIncomingMessage>, res: InstanceType<TServerResponse>, proxyRes: InstanceType<TIncomingMessage>];
  close: [proxyRes: InstanceType<TIncomingMessage>, proxySocket: net.Socket, proxyHead: any];
};
type ProxyMethodArgs<TIncomingMessage extends typeof http.IncomingMessage = typeof http.IncomingMessage, TServerResponse extends typeof http.ServerResponse = typeof http.ServerResponse, TError = Error> = {
  ws: [req: InstanceType<TIncomingMessage>, socket: any, head: any, ...args: [options?: ServerOptions$3, callback?: ErrorCallback<TIncomingMessage, TServerResponse, TError>] | [callback?: ErrorCallback<TIncomingMessage, TServerResponse, TError>]];
  web: [req: InstanceType<TIncomingMessage>, res: InstanceType<TServerResponse>, ...args: [options: ServerOptions$3, callback?: ErrorCallback<TIncomingMessage, TServerResponse, TError>] | [callback?: ErrorCallback<TIncomingMessage, TServerResponse, TError>]];
};
type PassFunctions<TIncomingMessage extends typeof http.IncomingMessage = typeof http.IncomingMessage, TServerResponse extends typeof http.ServerResponse = typeof http.ServerResponse, TError = Error> = {
  ws: (req: InstanceType<TIncomingMessage>, socket: net.Socket, options: NormalizedServerOptions, head: Buffer | undefined, server: ProxyServer<TIncomingMessage, TServerResponse, TError>, cb?: ErrorCallback<TIncomingMessage, TServerResponse, TError>) => unknown;
  web: (req: InstanceType<TIncomingMessage>, res: InstanceType<TServerResponse>, options: NormalizedServerOptions, head: Buffer | undefined, server: ProxyServer<TIncomingMessage, TServerResponse, TError>, cb?: ErrorCallback<TIncomingMessage, TServerResponse, TError>) => unknown;
};
declare class ProxyServer<TIncomingMessage extends typeof http.IncomingMessage = typeof http.IncomingMessage, TServerResponse extends typeof http.ServerResponse = typeof http.ServerResponse, TError = Error> extends EventEmitter<ProxyServerEventMap<TIncomingMessage, TServerResponse, TError>> {
  /**
   * Used for proxying WS(S) requests
   * @param req - Client request.
   * @param socket - Client socket.
   * @param head - Client head.
   * @param options - Additional options.
   */
  readonly ws: (...args: ProxyMethodArgs<TIncomingMessage, TServerResponse, TError>["ws"]) => void;
  /**
   * Used for proxying regular HTTP(S) requests
   * @param req - Client request.
   * @param res - Client response.
   * @param options - Additional options.
   */
  readonly web: (...args: ProxyMethodArgs<TIncomingMessage, TServerResponse, TError>["web"]) => void;
  private options;
  private webPasses;
  private wsPasses;
  private _server?;
  /**
   * Creates the proxy server with specified options.
   * @param options - Config object passed to the proxy
   */
  constructor(options?: ServerOptions$3);
  /**
   * Creates the proxy server with specified options.
   * @param options Config object passed to the proxy
   * @returns Proxy object with handlers for `ws` and `web` requests
   */
  static createProxyServer<TIncomingMessage extends typeof http.IncomingMessage, TServerResponse extends typeof http.ServerResponse, TError = Error>(options?: ServerOptions$3): ProxyServer<TIncomingMessage, TServerResponse, TError>;
  /**
   * Creates the proxy server with specified options.
   * @param options Config object passed to the proxy
   * @returns Proxy object with handlers for `ws` and `web` requests
   */
  static createServer<TIncomingMessage extends typeof http.IncomingMessage, TServerResponse extends typeof http.ServerResponse, TError = Error>(options?: ServerOptions$3): ProxyServer<TIncomingMessage, TServerResponse, TError>;
  /**
   * Creates the proxy server with specified options.
   * @param options Config object passed to the proxy
   * @returns Proxy object with handlers for `ws` and `web` requests
   */
  static createProxy<TIncomingMessage extends typeof http.IncomingMessage, TServerResponse extends typeof http.ServerResponse, TError = Error>(options?: ServerOptions$3): ProxyServer<TIncomingMessage, TServerResponse, TError>;
  createRightProxy: <PT extends ProxyType>(type: PT) => Function;
  onError: (err: TError) => void;
  /**
   * A function that wraps the object in a webserver, for your convenience
   * @param port - Port to listen on
   * @param hostname - The hostname to listen on
   */
  listen: (port: number, hostname?: string) => this;
  address: () => string | net.AddressInfo | null | undefined;
  /**
   * A function that closes the inner webserver and stops listening on given port
   */
  close: (cb?: Function) => void;
  before: <PT extends ProxyType>(type: PT, passName: string, cb: PassFunctions<TIncomingMessage, TServerResponse, TError>[PT]) => void;
  after: <PT extends ProxyType>(type: PT, passName: string, cb: PassFunctions<TIncomingMessage, TServerResponse, TError>[PT]) => void;
}
//#endregion
//#region ../../node_modules/.pnpm/http-proxy-3@1.22.0_patch_hash=d89dff5a0afc2cb277080ad056a3baf7feeeeac19144878abc17f4c91ad89095_ms@2.1.3/node_modules/http-proxy-3/dist/lib/http-proxy/passes/ws-incoming.d.ts
declare function numOpenSockets(): number;
declare namespace index_d_exports {
  export { ErrorCallback, ProxyServer, ProxyTarget, ProxyTargetUrl, ServerOptions$3 as ServerOptions, createProxyServer as createProxy, createProxyServer, createProxyServer as createServer, ProxyServer as default, numOpenSockets };
}
/**
 * Creates the proxy server.
 *
 * Examples:
 *
 *    httpProxy.createProxyServer({ .. }, 8000)
 *    // => '{ web: [Function], ws: [Function] ... }'
 *
 * @param {Object} Options Config object passed to the proxy
 *
 * @return {Object} Proxy Proxy object with handlers for `ws` and `web` requests
 *
 * @api public
 */
declare function createProxyServer<TIncomingMessage extends typeof http.IncomingMessage = typeof http.IncomingMessage, TServerResponse extends typeof http.ServerResponse = typeof http.ServerResponse, TError = Error>(options?: ServerOptions$3): ProxyServer<TIncomingMessage, TServerResponse, TError>;
//#endregion
//#region src/node/server/middlewares/proxy.d.ts
interface ProxyOptions extends ServerOptions$3 {
  /**
  * rewrite path
  */
  rewrite?: (path: string) => string;
  /**
  * configure the proxy server (e.g. listen to events)
  */
  configure?: (proxy: ProxyServer, options: ProxyOptions) => void;
  /**
  * webpack-dev-server style bypass function
  */
  bypass?: (req: http.IncomingMessage, res: http.ServerResponse | undefined, options: ProxyOptions) => void | null | undefined | false | string | Promise<void | null | undefined | boolean | string>;
  /**
  * rewrite the Origin header of a WebSocket request to match the target
  *
  * **Exercise caution as rewriting the Origin can leave the proxying open to [CSRF attacks](https://owasp.org/www-community/attacks/csrf).**
  */
  rewriteWsOrigin?: boolean | undefined;
}
//#endregion
//#region src/node/logger.d.ts
type LogType = "error" | "warn" | "info";
type LogLevel = LogType | "silent";
interface Logger {
  info(msg: string, options?: LogOptions): void;
  warn(msg: string, options?: LogOptions): void;
  warnOnce(msg: string, options?: LogOptions): void;
  error(msg: string, options?: LogErrorOptions): void;
  clearScreen(type: LogType): void;
  hasErrorLogged(error: Error | RollupError): boolean;
  hasWarned: boolean;
}
interface LogOptions {
  clear?: boolean;
  timestamp?: boolean;
  environment?: string;
}
interface LogErrorOptions extends LogOptions {
  error?: Error | RollupError | null;
}
interface LoggerOptions {
  prefix?: string;
  allowClearScreen?: boolean;
  customLogger?: Logger;
  console?: Console;
}
declare function createLogger(level?: LogLevel, options?: LoggerOptions): Logger;
//#endregion
//#region src/node/http.d.ts
interface CommonServerOptions {
  /**
  * Specify server port. Note if the port is already being used, Vite will
  * automatically try the next available port so this may not be the actual
  * port the server ends up listening on.
  */
  port?: number;
  /**
  * If enabled, vite will exit if specified port is already in use
  */
  strictPort?: boolean;
  /**
  * Specify which IP addresses the server should listen on.
  * Set to 0.0.0.0 to listen on all addresses, including LAN and public addresses.
  */
  host?: string | boolean;
  /**
  * The hostnames that Vite is allowed to respond to.
  * `localhost` and subdomains under `.localhost` and all IP addresses are allowed by default.
  * When using HTTPS, this check is skipped.
  *
  * If a string starts with `.`, it will allow that hostname without the `.` and all subdomains under the hostname.
  * For example, `.example.com` will allow `example.com`, `foo.example.com`, and `foo.bar.example.com`.
  *
  * If set to `true`, the server is allowed to respond to requests for any hosts.
  * This is not recommended as it will be vulnerable to DNS rebinding attacks.
  */
  allowedHosts?: string[] | true;
  /**
  * Enable TLS + HTTP/2.
  * Note: this downgrades to TLS only when the proxy option is also used.
  */
  https?: HttpsServerOptions;
  /**
  * Open browser window on startup
  */
  open?: boolean | string;
  /**
  * Configure custom proxy rules for the dev server. Expects an object
  * of `{ key: options }` pairs.
  * Uses [`http-proxy-3`](https://github.com/sagemathinc/http-proxy-3).
  * Full options [here](https://github.com/sagemathinc/http-proxy-3#options).
  *
  * Example `vite.config.js`:
  * ``` js
  * module.exports = {
  *   proxy: {
  *     // string shorthand: /foo -> http://localhost:4567/foo
  *     '/foo': 'http://localhost:4567',
  *     // with options
  *     '/api': {
  *       target: 'http://jsonplaceholder.typicode.com',
  *       changeOrigin: true,
  *       rewrite: path => path.replace(/^\/api/, '')
  *     }
  *   }
  * }
  * ```
  */
  proxy?: Record<string, string | ProxyOptions>;
  /**
  * Configure CORS for the dev server.
  * Uses https://github.com/expressjs/cors.
  *
  * When enabling this option, **we recommend setting a specific value
  * rather than `true`** to avoid exposing the source code to untrusted origins.
  *
  * Set to `true` to allow all methods from any origin, or configure separately
  * using an object.
  *
  * @default false
  */
  cors?: CorsOptions | boolean;
  /**
  * Specify server response headers.
  */
  headers?: OutgoingHttpHeaders;
}
/**
* https://github.com/expressjs/cors#configuration-options
*/
interface CorsOptions {
  /**
  * Configures the Access-Control-Allow-Origin CORS header.
  *
  * **We recommend setting a specific value rather than
  * `true`** to avoid exposing the source code to untrusted origins.
  */
  origin?: CorsOrigin | ((origin: string | undefined, cb: (err: Error, origins: CorsOrigin) => void) => void);
  methods?: string | string[];
  allowedHeaders?: string | string[];
  exposedHeaders?: string | string[];
  credentials?: boolean;
  maxAge?: number;
  preflightContinue?: boolean;
  optionsSuccessStatus?: number;
}
type CorsOrigin = boolean | string | RegExp | (string | RegExp)[];
//#endregion
//#region src/node/typeUtils.d.ts
type RequiredExceptFor<T$1, K$1 extends keyof T$1> = Pick<T$1, K$1> & Required<Omit<T$1, K$1>>;
//#endregion
//#region src/node/preview.d.ts
interface PreviewOptions extends CommonServerOptions {}
interface ResolvedPreviewOptions extends RequiredExceptFor<PreviewOptions, "host" | "https" | "proxy"> {}
interface PreviewServer {
  /**
  * The resolved vite config object
  */
  config: ResolvedConfig;
  /**
  * Stop the server.
  */
  close(): Promise<void>;
  /**
  * A connect app instance.
  * - Can be used to attach custom middlewares to the preview server.
  * - Can also be used as the handler function of a custom http server
  *   or as a middleware in any connect-style Node.js frameworks
  *
  * https://github.com/senchalabs/connect#use-middleware
  */
  middlewares: Connect.Server;
  /**
  * native Node http server instance
  */
  httpServer: HttpServer;
  /**
  * The resolved urls Vite prints on the CLI (URL-encoded). Returns `null`
  * if the server is not listening on any port.
  */
  resolvedUrls: ResolvedServerUrls | null;
  /**
  * Print server urls
  */
  printUrls(): void;
  /**
  * Bind CLI shortcuts
  */
  bindCLIShortcuts(options?: BindCLIShortcutsOptions<PreviewServer>): void;
}
type PreviewServerHook = (this: MinimalPluginContextWithoutEnvironment, server: PreviewServer) => (() => void) | void | Promise<(() => void) | void>;
/**
* Starts the Vite server in preview mode, to simulate a production deployment
*/
declare function preview(inlineConfig?: InlineConfig): Promise<PreviewServer>;
//#endregion
//#region src/node/shortcuts.d.ts
type BindCLIShortcutsOptions<Server$3 = ViteDevServer | PreviewServer> = {
  /**
  * Print a one-line shortcuts "help" hint to the terminal
  */
  print?: boolean;
  /**
  * Custom shortcuts to run when a key is pressed. These shortcuts take priority
  * over the default shortcuts if they have the same keys (except the `h` key).
  * To disable a default shortcut, define the same key but with `action: undefined`.
  */
  customShortcuts?: CLIShortcut<Server$3>[];
};
type CLIShortcut<Server$3 = ViteDevServer | PreviewServer> = {
  key: string;
  description: string;
  action?(server: Server$3): void | Promise<void>;
};
//#endregion
//#region src/node/baseEnvironment.d.ts
declare class PartialEnvironment {
  name: string;
  getTopLevelConfig(): ResolvedConfig;
  config: ResolvedConfig & ResolvedEnvironmentOptions;
  logger: Logger;
  constructor(name: string, topLevelConfig: ResolvedConfig, options?: ResolvedEnvironmentOptions);
}
declare class BaseEnvironment extends PartialEnvironment {
  get plugins(): readonly Plugin[];
  constructor(name: string, config: ResolvedConfig, options?: ResolvedEnvironmentOptions);
}
/**
* This class discourages users from inversely checking the `mode`
* to determine the type of environment, e.g.
*
* ```js
* const isDev = environment.mode !== 'build' // bad
* const isDev = environment.mode === 'dev'   // good
* ```
*
* You should also not check against `"unknown"` specifically. It's
* a placeholder for more possible environment types.
*/
declare class UnknownEnvironment extends BaseEnvironment {
  mode: "unknown";
}
//#endregion
//#region src/node/optimizer/scan.d.ts
declare class ScanEnvironment extends BaseEnvironment {
  mode: "scan";
  get pluginContainer(): EnvironmentPluginContainer;
  init(): Promise<void>;
}
//#endregion
//#region src/node/optimizer/index.d.ts
type ExportsData = {
  hasModuleSyntax: boolean;
  exports: readonly string[];
  jsxLoader?: boolean;
};
interface DepsOptimizer {
  init: () => Promise<void>;
  metadata: DepOptimizationMetadata;
  scanProcessing?: Promise<void>;
  registerMissingImport: (id: string, resolved: string) => OptimizedDepInfo;
  run: () => void;
  isOptimizedDepFile: (id: string) => boolean;
  isOptimizedDepUrl: (url: string) => boolean;
  getOptimizedDepId: (depInfo: OptimizedDepInfo) => string;
  close: () => Promise<void>;
  options: DepOptimizationOptions;
}
interface DepOptimizationConfig {
  /**
  * Force optimize listed dependencies (must be resolvable import paths,
  * cannot be globs).
  */
  include?: string[];
  /**
  * Do not optimize these dependencies (must be resolvable import paths,
  * cannot be globs).
  */
  exclude?: string[];
  /**
  * Forces ESM interop when importing these dependencies. Some legacy
  * packages advertise themselves as ESM but use `require` internally
  * @experimental
  */
  needsInterop?: string[];
  /**
  * Options to pass to esbuild during the dep scanning and optimization
  *
  * Certain options are omitted since changing them would not be compatible
  * with Vite's dep optimization.
  *
  * - `external` is also omitted, use Vite's `optimizeDeps.exclude` option
  * - `plugins` are merged with Vite's dep plugin
  *
  * https://esbuild.github.io/api
  */
  esbuildOptions?: Omit<esbuild_BuildOptions, "bundle" | "entryPoints" | "external" | "write" | "watch" | "outdir" | "outfile" | "outbase" | "outExtension" | "metafile">;
  /**
  * List of file extensions that can be optimized. A corresponding esbuild
  * plugin must exist to handle the specific extension.
  *
  * By default, Vite can optimize `.mjs`, `.js`, `.ts`, and `.mts` files. This option
  * allows specifying additional extensions.
  *
  * @experimental
  */
  extensions?: string[];
  /**
  * Deps optimization during build was removed in Vite 5.1. This option is
  * now redundant and will be removed in a future version. Switch to using
  * `optimizeDeps.noDiscovery` and an empty or undefined `optimizeDeps.include`.
  * true or 'dev' disables the optimizer, false or 'build' leaves it enabled.
  * @default 'build'
  * @deprecated
  * @experimental
  */
  disabled?: boolean | "build" | "dev";
  /**
  * Automatic dependency discovery. When `noDiscovery` is true, only dependencies
  * listed in `include` will be optimized. The scanner isn't run for cold start
  * in this case. CJS-only dependencies must be present in `include` during dev.
  * @default false
  */
  noDiscovery?: boolean;
  /**
  * When enabled, it will hold the first optimized deps results until all static
  * imports are crawled on cold start. This avoids the need for full-page reloads
  * when new dependencies are discovered and they trigger the generation of new
  * common chunks. If all dependencies are found by the scanner plus the explicitly
  * defined ones in `include`, it is better to disable this option to let the
  * browser process more requests in parallel.
  * @default true
  * @experimental
  */
  holdUntilCrawlEnd?: boolean;
}
type DepOptimizationOptions = DepOptimizationConfig & {
  /**
  * By default, Vite will crawl your `index.html` to detect dependencies that
  * need to be pre-bundled. If `build.rollupOptions.input` is specified, Vite
  * will crawl those entry points instead.
  *
  * If neither of these fit your needs, you can specify custom entries using
  * this option - the value should be a tinyglobby pattern or array of patterns
  * (https://github.com/SuperchupuDev/tinyglobby) that are relative from
  * vite project root. This will overwrite default entries inference.
  */
  entries?: string | string[];
  /**
  * Force dep pre-optimization regardless of whether deps have changed.
  * @experimental
  */
  force?: boolean;
};
interface OptimizedDepInfo {
  id: string;
  file: string;
  src?: string;
  needsInterop?: boolean;
  browserHash?: string;
  fileHash?: string;
  /**
  * During optimization, ids can still be resolved to their final location
  * but the bundles may not yet be saved to disk
  */
  processing?: Promise<void>;
  /**
  * ExportData cache, discovered deps will parse the src entry to get exports
  * data used both to define if interop is needed and when pre-bundling
  */
  exportsData?: Promise<ExportsData>;
}
interface DepOptimizationMetadata {
  /**
  * The main hash is determined by user config and dependency lockfiles.
  * This is checked on server startup to avoid unnecessary re-bundles.
  */
  hash: string;
  /**
  * This hash is determined by dependency lockfiles.
  * This is checked on server startup to avoid unnecessary re-bundles.
  */
  lockfileHash: string;
  /**
  * This hash is determined by user config.
  * This is checked on server startup to avoid unnecessary re-bundles.
  */
  configHash: string;
  /**
  * The browser hash is determined by the main hash plus additional dependencies
  * discovered at runtime. This is used to invalidate browser requests to
  * optimized deps.
  */
  browserHash: string;
  /**
  * Metadata for each already optimized dependency
  */
  optimized: Record<string, OptimizedDepInfo>;
  /**
  * Metadata for non-entry optimized chunks and dynamic imports
  */
  chunks: Record<string, OptimizedDepInfo>;
  /**
  * Metadata for each newly discovered dependency after processing
  */
  discovered: Record<string, OptimizedDepInfo>;
  /**
  * OptimizedDepInfo list
  */
  depInfoList: OptimizedDepInfo[];
}
/**
* Scan and optimize dependencies within a project.
* Used by Vite CLI when running `vite optimize`.
*
* @deprecated the optimization process runs automatically and does not need to be called
*/
declare function optimizeDeps(config: ResolvedConfig, force?: boolean | undefined, asCommand?: boolean): Promise<DepOptimizationMetadata>;
//#endregion
//#region src/node/server/transformRequest.d.ts
interface TransformResult {
  code: string;
  map: SourceMap | {
    mappings: "";
  } | null;
  ssr?: boolean;
  etag?: string;
  deps?: string[];
  dynamicDeps?: string[];
}
interface TransformOptions {
  /**
  * @deprecated inferred from environment
  */
  ssr?: boolean;
}
interface TransformOptionsInternal {}
//#endregion
//#region src/node/server/moduleGraph.d.ts
declare class EnvironmentModuleNode {
  environment: string;
  /**
  * Public served url path, starts with /
  */
  url: string;
  /**
  * Resolved file system path + query
  */
  id: string | null;
  file: string | null;
  type: "js" | "css" | "asset";
  info?: ModuleInfo;
  meta?: Record<string, any>;
  importers: Set<EnvironmentModuleNode>;
  importedModules: Set<EnvironmentModuleNode>;
  acceptedHmrDeps: Set<EnvironmentModuleNode>;
  acceptedHmrExports: Set<string> | null;
  importedBindings: Map<string, Set<string>> | null;
  isSelfAccepting?: boolean;
  transformResult: TransformResult | null;
  ssrModule: Record<string, any> | null;
  ssrError: Error | null;
  lastHMRTimestamp: number;
  lastInvalidationTimestamp: number;
  /**
  * @param setIsSelfAccepting - set `false` to set `isSelfAccepting` later. e.g. #7870
  */
  constructor(url: string, environment: string, setIsSelfAccepting?: boolean);
}
type ResolvedUrl = [url: string, resolvedId: string, meta: object | null | undefined];
declare class EnvironmentModuleGraph {
  environment: string;
  urlToModuleMap: Map<string, EnvironmentModuleNode>;
  idToModuleMap: Map<string, EnvironmentModuleNode>;
  etagToModuleMap: Map<string, EnvironmentModuleNode>;
  fileToModulesMap: Map<string, Set<EnvironmentModuleNode>>;
  constructor(environment: string, resolveId: (url: string) => Promise<PartialResolvedId | null>);
  getModuleByUrl(rawUrl: string): Promise<EnvironmentModuleNode | undefined>;
  getModuleById(id: string): EnvironmentModuleNode | undefined;
  getModulesByFile(file: string): Set<EnvironmentModuleNode> | undefined;
  onFileChange(file: string): void;
  onFileDelete(file: string): void;
  invalidateModule(mod: EnvironmentModuleNode, seen?: Set<EnvironmentModuleNode>, timestamp?: number, isHmr?: boolean, softInvalidate?: boolean): void;
  invalidateAll(): void;
  /**
  * Update the module graph based on a module's updated imports information
  * If there are dependencies that no longer have any importers, they are
  * returned as a Set.
  *
  * @param staticImportedUrls Subset of `importedModules` where they're statically imported in code.
  *   This is only used for soft invalidations so `undefined` is fine but may cause more runtime processing.
  */
  updateModuleInfo(mod: EnvironmentModuleNode, importedModules: Set<string | EnvironmentModuleNode>, importedBindings: Map<string, Set<string>> | null, acceptedModules: Set<string | EnvironmentModuleNode>, acceptedExports: Set<string> | null, isSelfAccepting: boolean, staticImportedUrls?: Set<string>): Promise<Set<EnvironmentModuleNode> | undefined>;
  ensureEntryFromUrl(rawUrl: string, setIsSelfAccepting?: boolean): Promise<EnvironmentModuleNode>;
  createFileOnlyEntry(file: string): EnvironmentModuleNode;
  resolveUrl(url: string): Promise<ResolvedUrl>;
  updateModuleTransformResult(mod: EnvironmentModuleNode, result: TransformResult | null): void;
  getModuleByEtag(etag: string): EnvironmentModuleNode | undefined;
}
//#endregion
//#region src/node/server/mixedModuleGraph.d.ts
declare class ModuleNode {
  _moduleGraph: ModuleGraph;
  _clientModule: EnvironmentModuleNode | undefined;
  _ssrModule: EnvironmentModuleNode | undefined;
  constructor(moduleGraph: ModuleGraph, clientModule?: EnvironmentModuleNode, ssrModule?: EnvironmentModuleNode);
  _get<T$1 extends keyof EnvironmentModuleNode>(prop: T$1): EnvironmentModuleNode[T$1];
  _set<T$1 extends keyof EnvironmentModuleNode>(prop: T$1, value: EnvironmentModuleNode[T$1]): void;
  _wrapModuleSet(prop: ModuleSetNames, module: EnvironmentModuleNode | undefined): Set<ModuleNode>;
  _getModuleSetUnion(prop: "importedModules" | "importers"): Set<ModuleNode>;
  _getModuleInfoUnion(prop: "info"): ModuleInfo | undefined;
  _getModuleObjectUnion(prop: "meta"): Record<string, any> | undefined;
  get url(): string;
  set url(value: string);
  get id(): string | null;
  set id(value: string | null);
  get file(): string | null;
  set file(value: string | null);
  get type(): "js" | "css" | "asset";
  get info(): ModuleInfo | undefined;
  get meta(): Record<string, any> | undefined;
  get importers(): Set<ModuleNode>;
  get clientImportedModules(): Set<ModuleNode>;
  get ssrImportedModules(): Set<ModuleNode>;
  get importedModules(): Set<ModuleNode>;
  get acceptedHmrDeps(): Set<ModuleNode>;
  get acceptedHmrExports(): Set<string> | null;
  get importedBindings(): Map<string, Set<string>> | null;
  get isSelfAccepting(): boolean | undefined;
  get transformResult(): TransformResult | null;
  set transformResult(value: TransformResult | null);
  get ssrTransformResult(): TransformResult | null;
  set ssrTransformResult(value: TransformResult | null);
  get ssrModule(): Record<string, any> | null;
  get ssrError(): Error | null;
  get lastHMRTimestamp(): number;
  set lastHMRTimestamp(value: number);
  get lastInvalidationTimestamp(): number;
  get invalidationState(): TransformResult | "HARD_INVALIDATED" | undefined;
  get ssrInvalidationState(): TransformResult | "HARD_INVALIDATED" | undefined;
}
declare class ModuleGraph {
  urlToModuleMap: Map<string, ModuleNode>;
  idToModuleMap: Map<string, ModuleNode>;
  etagToModuleMap: Map<string, ModuleNode>;
  fileToModulesMap: Map<string, Set<ModuleNode>>;
  private moduleNodeCache;
  constructor(moduleGraphs: {
    client: () => EnvironmentModuleGraph;
    ssr: () => EnvironmentModuleGraph;
  });
  getModuleById(id: string): ModuleNode | undefined;
  getModuleByUrl(url: string, _ssr?: boolean): Promise<ModuleNode | undefined>;
  getModulesByFile(file: string): Set<ModuleNode> | undefined;
  onFileChange(file: string): void;
  onFileDelete(file: string): void;
  invalidateModule(mod: ModuleNode, seen?: Set<ModuleNode>, timestamp?: number, isHmr?: boolean, softInvalidate?: boolean): void;
  invalidateAll(): void;
  ensureEntryFromUrl(rawUrl: string, ssr?: boolean, setIsSelfAccepting?: boolean): Promise<ModuleNode>;
  createFileOnlyEntry(file: string): ModuleNode;
  resolveUrl(url: string, ssr?: boolean): Promise<ResolvedUrl>;
  updateModuleTransformResult(mod: ModuleNode, result: TransformResult | null, ssr?: boolean): void;
  getModuleByEtag(etag: string): ModuleNode | undefined;
  getBackwardCompatibleBrowserModuleNode(clientModule: EnvironmentModuleNode): ModuleNode;
  getBackwardCompatibleServerModuleNode(ssrModule: EnvironmentModuleNode): ModuleNode;
  getBackwardCompatibleModuleNode(mod: EnvironmentModuleNode): ModuleNode;
  getBackwardCompatibleModuleNodeDual(clientModule?: EnvironmentModuleNode, ssrModule?: EnvironmentModuleNode): ModuleNode;
}
type ModuleSetNames = "acceptedHmrDeps" | "importedModules";
//#endregion
//#region src/node/server/hmr.d.ts
interface HmrOptions {
  protocol?: string;
  host?: string;
  port?: number;
  clientPort?: number;
  path?: string;
  timeout?: number;
  overlay?: boolean;
  server?: HttpServer;
}
interface HotUpdateOptions {
  type: "create" | "update" | "delete";
  file: string;
  timestamp: number;
  modules: Array<EnvironmentModuleNode>;
  read: () => string | Promise<string>;
  server: ViteDevServer;
}
interface HmrContext {
  file: string;
  timestamp: number;
  modules: Array<ModuleNode>;
  read: () => string | Promise<string>;
  server: ViteDevServer;
}
interface HotChannelClient {
  send(payload: hmrPayload_HotPayload): void;
}
type HotChannelListener<T$1 extends string = string> = (data: InferCustomEventPayload<T$1>, client: HotChannelClient) => void;
interface HotChannel<Api = any> {
  /**
  * Broadcast events to all clients
  */
  send?(payload: hmrPayload_HotPayload): void;
  /**
  * Handle custom event emitted by `import.meta.hot.send`
  */
  on?<T$1 extends string>(event: T$1, listener: HotChannelListener<T$1>): void;
  on?(event: "connection", listener: () => void): void;
  /**
  * Unregister event listener
  */
  off?(event: string, listener: Function): void;
  /**
  * Start listening for messages
  */
  listen?(): void;
  /**
  * Disconnect all clients, called when server is closed or restarted.
  */
  close?(): Promise<unknown> | void;
  api?: Api;
}
interface NormalizedHotChannelClient {
  /**
  * Send event to the client
  */
  send(payload: hmrPayload_HotPayload): void;
  /**
  * Send custom event
  */
  send(event: string, payload?: hmrPayload_CustomPayload["data"]): void;
}
interface NormalizedHotChannel<Api = any> {
  /**
  * Broadcast events to all clients
  */
  send(payload: hmrPayload_HotPayload): void;
  /**
  * Send custom event
  */
  send<T$1 extends string>(event: T$1, payload?: InferCustomEventPayload<T$1>): void;
  /**
  * Handle custom event emitted by `import.meta.hot.send`
  */
  on<T$1 extends string>(event: T$1, listener: (data: InferCustomEventPayload<T$1>, client: NormalizedHotChannelClient) => void): void;
  /**
  * @deprecated use `vite:client:connect` event instead
  */
  on(event: "connection", listener: () => void): void;
  /**
  * Unregister event listener
  */
  off(event: string, listener: Function): void;
  handleInvoke(payload: hmrPayload_HotPayload): Promise<{
    result: any;
  } | {
    error: any;
  }>;
  /**
  * Start listening for messages
  */
  listen(): void;
  /**
  * Disconnect all clients, called when server is closed or restarted.
  */
  close(): Promise<unknown> | void;
  api?: Api;
}
type ServerHotChannelApi = {
  innerEmitter: EventEmitter;
  outsideEmitter: EventEmitter;
};
type ServerHotChannel = HotChannel<ServerHotChannelApi>;
type NormalizedServerHotChannel = NormalizedHotChannel<ServerHotChannelApi>;
declare function createServerHotChannel(): ServerHotChannel;
//#endregion
//#region src/types/ws.d.ts
// WebSocket socket.
declare class WebSocket extends EventEmitter {
  /** The connection is not yet open. */
  static readonly CONNECTING: 0;
  /** The connection is open and ready to communicate. */
  static readonly OPEN: 1;
  /** The connection is in the process of closing. */
  static readonly CLOSING: 2;
  /** The connection is closed. */
  static readonly CLOSED: 3;
  binaryType: 'nodebuffer' | 'arraybuffer' | 'fragments';
  readonly bufferedAmount: number;
  readonly extensions: string;
  /** Indicates whether the websocket is paused */
  readonly isPaused: boolean;
  readonly protocol: string;
  /** The current state of the connection */
  readonly readyState: typeof WebSocket.CONNECTING | typeof WebSocket.OPEN | typeof WebSocket.CLOSING | typeof WebSocket.CLOSED;
  readonly url: string;

  /** The connection is not yet open. */
  readonly CONNECTING: 0;
  /** The connection is open and ready to communicate. */
  readonly OPEN: 1;
  /** The connection is in the process of closing. */
  readonly CLOSING: 2;
  /** The connection is closed. */
  readonly CLOSED: 3;
  onopen: ((event: WebSocket.Event) => void) | null;
  onerror: ((event: WebSocket.ErrorEvent) => void) | null;
  onclose: ((event: WebSocket.CloseEvent) => void) | null;
  onmessage: ((event: WebSocket.MessageEvent) => void) | null;
  constructor(address: null);
  constructor(address: string | url_URL, options?: WebSocket.ClientOptions | ClientRequestArgs);
  constructor(address: string | url_URL, protocols?: string | string[], options?: WebSocket.ClientOptions | ClientRequestArgs);
  close(code?: number, data?: string | Buffer): void;
  ping(data?: any, mask?: boolean, cb?: (err: Error) => void): void;
  pong(data?: any, mask?: boolean, cb?: (err: Error) => void): void;
  send(data: any, cb?: (err?: Error) => void): void;
  send(data: any, options: {
    mask?: boolean | undefined;
    binary?: boolean | undefined;
    compress?: boolean | undefined;
    fin?: boolean | undefined;
  }, cb?: (err?: Error) => void): void;
  terminate(): void;

  /**
   * Pause the websocket causing it to stop emitting events. Some events can still be
   * emitted after this is called, until all buffered data is consumed. This method
   * is a noop if the ready state is `CONNECTING` or `CLOSED`.
   */
  pause(): void;
  /**
   * Make a paused socket resume emitting events. This method is a noop if the ready
   * state is `CONNECTING` or `CLOSED`.
   */
  resume(): void;

  // HTML5 WebSocket events
  addEventListener(method: 'message', cb: (event: WebSocket.MessageEvent) => void, options?: WebSocket.EventListenerOptions): void;
  addEventListener(method: 'close', cb: (event: WebSocket.CloseEvent) => void, options?: WebSocket.EventListenerOptions): void;
  addEventListener(method: 'error', cb: (event: WebSocket.ErrorEvent) => void, options?: WebSocket.EventListenerOptions): void;
  addEventListener(method: 'open', cb: (event: WebSocket.Event) => void, options?: WebSocket.EventListenerOptions): void;
  removeEventListener(method: 'message', cb: (event: WebSocket.MessageEvent) => void): void;
  removeEventListener(method: 'close', cb: (event: WebSocket.CloseEvent) => void): void;
  removeEventListener(method: 'error', cb: (event: WebSocket.ErrorEvent) => void): void;
  removeEventListener(method: 'open', cb: (event: WebSocket.Event) => void): void;

  // Events
  on(event: 'close', listener: (this: WebSocket, code: number, reason: Buffer) => void): this;
  on(event: 'error', listener: (this: WebSocket, err: Error) => void): this;
  on(event: 'upgrade', listener: (this: WebSocket, request: http.IncomingMessage) => void): this;
  on(event: 'message', listener: (this: WebSocket, data: WebSocket.RawData, isBinary: boolean) => void): this;
  on(event: 'open', listener: (this: WebSocket) => void): this;
  on(event: 'ping' | 'pong', listener: (this: WebSocket, data: Buffer) => void): this;
  on(event: 'unexpected-response', listener: (this: WebSocket, request: ClientRequest, response: http.IncomingMessage) => void): this;
  on(event: string | symbol, listener: (this: WebSocket, ...args: any[]) => void): this;
  once(event: 'close', listener: (this: WebSocket, code: number, reason: Buffer) => void): this;
  once(event: 'error', listener: (this: WebSocket, err: Error) => void): this;
  once(event: 'upgrade', listener: (this: WebSocket, request: http.IncomingMessage) => void): this;
  once(event: 'message', listener: (this: WebSocket, data: WebSocket.RawData, isBinary: boolean) => void): this;
  once(event: 'open', listener: (this: WebSocket) => void): this;
  once(event: 'ping' | 'pong', listener: (this: WebSocket, data: Buffer) => void): this;
  once(event: 'unexpected-response', listener: (this: WebSocket, request: ClientRequest, response: http.IncomingMessage) => void): this;
  once(event: string | symbol, listener: (this: WebSocket, ...args: any[]) => void): this;
  off(event: 'close', listener: (this: WebSocket, code: number, reason: Buffer) => void): this;
  off(event: 'error', listener: (this: WebSocket, err: Error) => void): this;
  off(event: 'upgrade', listener: (this: WebSocket, request: http.IncomingMessage) => void): this;
  off(event: 'message', listener: (this: WebSocket, data: WebSocket.RawData, isBinary: boolean) => void): this;
  off(event: 'open', listener: (this: WebSocket) => void): this;
  off(event: 'ping' | 'pong', listener: (this: WebSocket, data: Buffer) => void): this;
  off(event: 'unexpected-response', listener: (this: WebSocket, request: ClientRequest, response: http.IncomingMessage) => void): this;
  off(event: string | symbol, listener: (this: WebSocket, ...args: any[]) => void): this;
  addListener(event: 'close', listener: (code: number, reason: Buffer) => void): this;
  addListener(event: 'error', listener: (err: Error) => void): this;
  addListener(event: 'upgrade', listener: (request: http.IncomingMessage) => void): this;
  addListener(event: 'message', listener: (data: WebSocket.RawData, isBinary: boolean) => void): this;
  addListener(event: 'open', listener: () => void): this;
  addListener(event: 'ping' | 'pong', listener: (data: Buffer) => void): this;
  addListener(event: 'unexpected-response', listener: (request: ClientRequest, response: http.IncomingMessage) => void): this;
  addListener(event: string | symbol, listener: (...args: any[]) => void): this;
  removeListener(event: 'close', listener: (code: number, reason: Buffer) => void): this;
  removeListener(event: 'error', listener: (err: Error) => void): this;
  removeListener(event: 'upgrade', listener: (request: http.IncomingMessage) => void): this;
  removeListener(event: 'message', listener: (data: WebSocket.RawData, isBinary: boolean) => void): this;
  removeListener(event: 'open', listener: () => void): this;
  removeListener(event: 'ping' | 'pong', listener: (data: Buffer) => void): this;
  removeListener(event: 'unexpected-response', listener: (request: ClientRequest, response: http.IncomingMessage) => void): this;
  removeListener(event: string | symbol, listener: (...args: any[]) => void): this;
}
declare const WebSocketAlias: typeof WebSocket;
interface WebSocketAlias extends WebSocket {}
declare namespace WebSocket {
  /**
   * Data represents the raw message payload received over the WebSocket.
   */
  type RawData = Buffer | ArrayBuffer | Buffer[];

  /**
   * Data represents the message payload received over the WebSocket.
   */
  type Data = string | Buffer | ArrayBuffer | Buffer[];

  /**
   * CertMeta represents the accepted types for certificate & key data.
   */
  type CertMeta = string | string[] | Buffer | Buffer[];

  /**
   * VerifyClientCallbackSync is a synchronous callback used to inspect the
   * incoming message. The return value (boolean) of the function determines
   * whether or not to accept the handshake.
   */
  type VerifyClientCallbackSync = (info: {
    origin: string;
    secure: boolean;
    req: http.IncomingMessage;
  }) => boolean;

  /**
   * VerifyClientCallbackAsync is an asynchronous callback used to inspect the
   * incoming message. The return value (boolean) of the function determines
   * whether or not to accept the handshake.
   */
  type VerifyClientCallbackAsync = (info: {
    origin: string;
    secure: boolean;
    req: http.IncomingMessage;
  }, callback: (res: boolean, code?: number, message?: string, headers?: OutgoingHttpHeaders) => void) => void;
  interface ClientOptions extends SecureContextOptions {
    protocol?: string | undefined;
    followRedirects?: boolean | undefined;
    generateMask?(mask: Buffer): void;
    handshakeTimeout?: number | undefined;
    maxRedirects?: number | undefined;
    perMessageDeflate?: boolean | PerMessageDeflateOptions | undefined;
    localAddress?: string | undefined;
    protocolVersion?: number | undefined;
    headers?: {
      [key: string]: string;
    } | undefined;
    origin?: string | undefined;
    agent?: Agent | undefined;
    host?: string | undefined;
    family?: number | undefined;
    checkServerIdentity?(servername: string, cert: CertMeta): boolean;
    rejectUnauthorized?: boolean | undefined;
    maxPayload?: number | undefined;
    skipUTF8Validation?: boolean | undefined;
  }
  interface PerMessageDeflateOptions {
    serverNoContextTakeover?: boolean | undefined;
    clientNoContextTakeover?: boolean | undefined;
    serverMaxWindowBits?: number | undefined;
    clientMaxWindowBits?: number | undefined;
    zlibDeflateOptions?: {
      flush?: number | undefined;
      finishFlush?: number | undefined;
      chunkSize?: number | undefined;
      windowBits?: number | undefined;
      level?: number | undefined;
      memLevel?: number | undefined;
      strategy?: number | undefined;
      dictionary?: Buffer | Buffer[] | DataView | undefined;
      info?: boolean | undefined;
    } | undefined;
    zlibInflateOptions?: ZlibOptions | undefined;
    threshold?: number | undefined;
    concurrencyLimit?: number | undefined;
  }
  interface Event {
    type: string;
    target: WebSocket;
  }
  interface ErrorEvent {
    error: any;
    message: string;
    type: string;
    target: WebSocket;
  }
  interface CloseEvent {
    wasClean: boolean;
    code: number;
    reason: string;
    type: string;
    target: WebSocket;
  }
  interface MessageEvent {
    data: Data;
    type: string;
    target: WebSocket;
  }
  interface EventListenerOptions {
    once?: boolean | undefined;
  }
  interface ServerOptions {
    host?: string | undefined;
    port?: number | undefined;
    backlog?: number | undefined;
    server?: http.Server | HttpsServer | undefined;
    verifyClient?: VerifyClientCallbackAsync | VerifyClientCallbackSync | undefined;
    handleProtocols?: (protocols: Set<string>, request: http.IncomingMessage) => string | false;
    path?: string | undefined;
    noServer?: boolean | undefined;
    clientTracking?: boolean | undefined;
    perMessageDeflate?: boolean | PerMessageDeflateOptions | undefined;
    maxPayload?: number | undefined;
    skipUTF8Validation?: boolean | undefined;
    WebSocket?: typeof WebSocket.WebSocket | undefined;
  }
  interface AddressInfo {
    address: string;
    family: string;
    port: number;
  }

  // WebSocket Server
  class Server<T$1 extends WebSocket = WebSocket> extends EventEmitter {
    options: ServerOptions;
    path: string;
    clients: Set<T$1>;
    constructor(options?: ServerOptions, callback?: () => void);
    address(): AddressInfo | string;
    close(cb?: (err?: Error) => void): void;
    handleUpgrade(request: http.IncomingMessage, socket: Duplex, upgradeHead: Buffer, callback: (client: T$1, request: http.IncomingMessage) => void): void;
    shouldHandle(request: http.IncomingMessage): boolean | Promise<boolean>;

    // Events
    on(event: 'connection', cb: (this: Server<T$1>, socket: T$1, request: http.IncomingMessage) => void): this;
    on(event: 'error', cb: (this: Server<T$1>, error: Error) => void): this;
    on(event: 'headers', cb: (this: Server<T$1>, headers: string[], request: http.IncomingMessage) => void): this;
    on(event: 'close' | 'listening', cb: (this: Server<T$1>) => void): this;
    on(event: string | symbol, listener: (this: Server<T$1>, ...args: any[]) => void): this;
    once(event: 'connection', cb: (this: Server<T$1>, socket: T$1, request: http.IncomingMessage) => void): this;
    once(event: 'error', cb: (this: Server<T$1>, error: Error) => void): this;
    once(event: 'headers', cb: (this: Server<T$1>, headers: string[], request: http.IncomingMessage) => void): this;
    once(event: 'close' | 'listening', cb: (this: Server<T$1>) => void): this;
    once(event: string | symbol, listener: (this: Server<T$1>, ...args: any[]) => void): this;
    off(event: 'connection', cb: (this: Server<T$1>, socket: T$1, request: http.IncomingMessage) => void): this;
    off(event: 'error', cb: (this: Server<T$1>, error: Error) => void): this;
    off(event: 'headers', cb: (this: Server<T$1>, headers: string[], request: http.IncomingMessage) => void): this;
    off(event: 'close' | 'listening', cb: (this: Server<T$1>) => void): this;
    off(event: string | symbol, listener: (this: Server<T$1>, ...args: any[]) => void): this;
    addListener(event: 'connection', cb: (client: T$1, request: http.IncomingMessage) => void): this;
    addListener(event: 'error', cb: (err: Error) => void): this;
    addListener(event: 'headers', cb: (headers: string[], request: http.IncomingMessage) => void): this;
    addListener(event: 'close' | 'listening', cb: () => void): this;
    addListener(event: string | symbol, listener: (...args: any[]) => void): this;
    removeListener(event: 'connection', cb: (client: T$1) => void): this;
    removeListener(event: 'error', cb: (err: Error) => void): this;
    removeListener(event: 'headers', cb: (headers: string[], request: http.IncomingMessage) => void): this;
    removeListener(event: 'close' | 'listening', cb: () => void): this;
    removeListener(event: string | symbol, listener: (...args: any[]) => void): this;
  }
  const WebSocketServer: typeof Server;
  interface WebSocketServer extends Server {}
  const WebSocket: typeof WebSocketAlias;
  interface WebSocket extends WebSocketAlias {}

  // WebSocket stream
  function createWebSocketStream(websocket: WebSocket, options?: DuplexOptions): Duplex;
}

// export = WebSocket
//#endregion
//#region src/node/server/ws.d.ts
type WebSocketCustomListener<T$1> = (data: T$1, client: WebSocketClient) => void;
declare const isWebSocketServer: unique symbol;
interface WebSocketServer extends NormalizedHotChannel {
  /**
  * Handle custom event emitted by `import.meta.hot.send`
  */
  on: WebSocket.Server["on"] & {
    <T$1 extends string>(event: T$1, listener: WebSocketCustomListener<hmrPayload_InferCustomEventPayload<T$1>>): void;
  };
  /**
  * Unregister event listener.
  */
  off: WebSocket.Server["off"] & {
    (event: string, listener: Function): void;
  };
  /**
  * Listen on port and host
  */
  listen(): void;
  /**
  * Disconnect all clients and terminate the server.
  */
  close(): Promise<void>;
  [isWebSocketServer]: true;
  /**
  * Get all connected clients.
  */
  clients: Set<WebSocketClient>;
}
interface WebSocketClient extends NormalizedHotChannelClient {
  /**
  * The raw WebSocket instance
  * @advanced
  */
  socket: WebSocket;
}
//#endregion
//#region src/node/server/environment.d.ts
interface DevEnvironmentContext {
  hot: boolean;
  transport?: HotChannel | WebSocketServer;
  options?: EnvironmentOptions;
  remoteRunner?: {
    inlineSourceMap?: boolean;
  };
  depsOptimizer?: DepsOptimizer;
}
declare class DevEnvironment extends BaseEnvironment {
  mode: "dev";
  moduleGraph: EnvironmentModuleGraph;
  depsOptimizer?: DepsOptimizer;
  get pluginContainer(): EnvironmentPluginContainer<DevEnvironment>;
  /**
  * Hot channel for this environment. If not provided or disabled,
  * it will be a noop channel that does nothing.
  *
  * @example
  * environment.hot.send({ type: 'full-reload' })
  */
  hot: NormalizedHotChannel;
  constructor(name: string, config: ResolvedConfig, context: DevEnvironmentContext);
  init(options?: {
    watcher?: FSWatcher;
    /**
    * the previous instance used for the environment with the same name
    *
    * when using, the consumer should check if it's an instance generated from the same class or factory function
    */
    previousInstance?: DevEnvironment;
  }): Promise<void>;
  /**
  * When the dev server is restarted, the methods are called in the following order:
  * - new instance `init`
  * - previous instance `close`
  * - new instance `listen`
  */
  listen(server: ViteDevServer): Promise<void>;
  fetchModule(id: string, importer?: string, options?: FetchFunctionOptions): Promise<moduleRunner_FetchResult>;
  reloadModule(module: EnvironmentModuleNode): Promise<void>;
  transformRequest(url: string, options?: TransformOptionsInternal): Promise<TransformResult | null>;
  warmupRequest(url: string): Promise<void>;
  close(): Promise<void>;
  /**
  * Calling `await environment.waitForRequestsIdle(id)` will wait until all static imports
  * are processed after the first transformRequest call. If called from a load or transform
  * plugin hook, the id needs to be passed as a parameter to avoid deadlocks.
  * Calling this function after the first static imports section of the module graph has been
  * processed will resolve immediately.
  * @experimental
  */
  waitForRequestsIdle(ignoredId?: string): Promise<void>;
}
//#endregion
//#region src/types/commonjs.d.ts

interface RollupCommonJSOptions {
  /**
   * A minimatch pattern, or array of patterns, which specifies the files in
   * the build the plugin should operate on. By default, all files with
   * extension `".cjs"` or those in `extensions` are included, but you can
   * narrow this list by only including specific files. These files will be
   * analyzed and transpiled if either the analysis does not find ES module
   * specific statements or `transformMixedEsModules` is `true`.
   * @default undefined
   */
  include?: string | RegExp | readonly (string | RegExp)[];
  /**
   * A minimatch pattern, or array of patterns, which specifies the files in
   * the build the plugin should _ignore_. By default, all files with
   * extensions other than those in `extensions` or `".cjs"` are ignored, but you
   * can exclude additional files. See also the `include` option.
   * @default undefined
   */
  exclude?: string | RegExp | readonly (string | RegExp)[];
  /**
   * For extensionless imports, search for extensions other than .js in the
   * order specified. Note that you need to make sure that non-JavaScript files
   * are transpiled by another plugin first.
   * @default [ '.js' ]
   */
  extensions?: ReadonlyArray<string>;
  /**
   * If true then uses of `global` won't be dealt with by this plugin
   * @default false
   */
  ignoreGlobal?: boolean;
  /**
   * If false, skips source map generation for CommonJS modules. This will
   * improve performance.
   * @default true
   */
  sourceMap?: boolean;
  /**
   * Some `require` calls cannot be resolved statically to be translated to
   * imports.
   * When this option is set to `false`, the generated code will either
   * directly throw an error when such a call is encountered or, when
   * `dynamicRequireTargets` is used, when such a call cannot be resolved with a
   * configured dynamic require target.
   * Setting this option to `true` will instead leave the `require` call in the
   * code or use it as a fallback for `dynamicRequireTargets`.
   * @default false
   */
  ignoreDynamicRequires?: boolean;
  /**
   * Instructs the plugin whether to enable mixed module transformations. This
   * is useful in scenarios with modules that contain a mix of ES `import`
   * statements and CommonJS `require` expressions. Set to `true` if `require`
   * calls should be transformed to imports in mixed modules, or `false` if the
   * `require` expressions should survive the transformation. The latter can be
   * important if the code contains environment detection, or you are coding
   * for an environment with special treatment for `require` calls such as
   * ElectronJS. See also the `ignore` option.
   * @default false
   */
  transformMixedEsModules?: boolean;
  /**
   * By default, this plugin will try to hoist `require` statements as imports
   * to the top of each file. While this works well for many code bases and
   * allows for very efficient ESM output, it does not perfectly capture
   * CommonJS semantics as the order of side effects like log statements may
   * change. But it is especially problematic when there are circular `require`
   * calls between CommonJS modules as those often rely on the lazy execution of
   * nested `require` calls.
   *
   * Setting this option to `true` will wrap all CommonJS files in functions
   * which are executed when they are required for the first time, preserving
   * NodeJS semantics. Note that this can have an impact on the size and
   * performance of the generated code.
   *
   * The default value of `"auto"` will only wrap CommonJS files when they are
   * part of a CommonJS dependency cycle, e.g. an index file that is required by
   * many of its dependencies. All other CommonJS files are hoisted. This is the
   * recommended setting for most code bases.
   *
   * `false` will entirely prevent wrapping and hoist all files. This may still
   * work depending on the nature of cyclic dependencies but will often cause
   * problems.
   *
   * You can also provide a minimatch pattern, or array of patterns, to only
   * specify a subset of files which should be wrapped in functions for proper
   * `require` semantics.
   *
   * `"debug"` works like `"auto"` but after bundling, it will display a warning
   * containing a list of ids that have been wrapped which can be used as
   * minimatch pattern for fine-tuning.
   * @default "auto"
   */
  strictRequires?: boolean | string | RegExp | readonly (string | RegExp)[];
  /**
   * Sometimes you have to leave require statements unconverted. Pass an array
   * containing the IDs or a `id => boolean` function.
   * @default []
   */
  ignore?: ReadonlyArray<string> | ((id: string) => boolean);
  /**
   * In most cases, where `require` calls are inside a `try-catch` clause,
   * they should be left unconverted as it requires an optional dependency
   * that may or may not be installed beside the rolled up package.
   * Due to the conversion of `require` to a static `import` - the call is
   * hoisted to the top of the file, outside the `try-catch` clause.
   *
   * - `true`: Default. All `require` calls inside a `try` will be left unconverted.
   * - `false`: All `require` calls inside a `try` will be converted as if the
   *   `try-catch` clause is not there.
   * - `remove`: Remove all `require` calls from inside any `try` block.
   * - `string[]`: Pass an array containing the IDs to left unconverted.
   * - `((id: string) => boolean|'remove')`: Pass a function that controls
   *   individual IDs.
   *
   * @default true
   */
  ignoreTryCatch?: boolean | 'remove' | ReadonlyArray<string> | ((id: string) => boolean | 'remove');
  /**
   * Controls how to render imports from external dependencies. By default,
   * this plugin assumes that all external dependencies are CommonJS. This
   * means they are rendered as default imports to be compatible with e.g.
   * NodeJS where ES modules can only import a default export from a CommonJS
   * dependency.
   *
   * If you set `esmExternals` to `true`, this plugin assumes that all
   * external dependencies are ES modules and respect the
   * `requireReturnsDefault` option. If that option is not set, they will be
   * rendered as namespace imports.
   *
   * You can also supply an array of ids to be treated as ES modules, or a
   * function that will be passed each external id to determine whether it is
   * an ES module.
   * @default false
   */
  esmExternals?: boolean | ReadonlyArray<string> | ((id: string) => boolean);
  /**
   * Controls what is returned when requiring an ES module from a CommonJS file.
   * When using the `esmExternals` option, this will also apply to external
   * modules. By default, this plugin will render those imports as namespace
   * imports i.e.
   *
   * ```js
   * // input
   * const foo = require('foo');
   *
   * // output
   * import * as foo from 'foo';
   * ```
   *
   * However, there are some situations where this may not be desired.
   * For these situations, you can change Rollup's behaviour either globally or
   * per module. To change it globally, set the `requireReturnsDefault` option
   * to one of the following values:
   *
   * - `false`: This is the default, requiring an ES module returns its
   *   namespace. This is the only option that will also add a marker
   *   `__esModule: true` to the namespace to support interop patterns in
   *   CommonJS modules that are transpiled ES modules.
   * - `"namespace"`: Like `false`, requiring an ES module returns its
   *   namespace, but the plugin does not add the `__esModule` marker and thus
   *   creates more efficient code. For external dependencies when using
   *   `esmExternals: true`, no additional interop code is generated.
   * - `"auto"`: This is complementary to how `output.exports: "auto"` works in
   *   Rollup: If a module has a default export and no named exports, requiring
   *   that module returns the default export. In all other cases, the namespace
   *   is returned. For external dependencies when using `esmExternals: true`, a
   *   corresponding interop helper is added.
   * - `"preferred"`: If a module has a default export, requiring that module
   *   always returns the default export, no matter whether additional named
   *   exports exist. This is similar to how previous versions of this plugin
   *   worked. Again for external dependencies when using `esmExternals: true`,
   *   an interop helper is added.
   * - `true`: This will always try to return the default export on require
   *   without checking if it actually exists. This can throw at build time if
   *   there is no default export. This is how external dependencies are handled
   *   when `esmExternals` is not used. The advantage over the other options is
   *   that, like `false`, this does not add an interop helper for external
   *   dependencies, keeping the code lean.
   *
   * To change this for individual modules, you can supply a function for
   * `requireReturnsDefault` instead. This function will then be called once for
   * each required ES module or external dependency with the corresponding id
   * and allows you to return different values for different modules.
   * @default false
   */
  requireReturnsDefault?: boolean | 'auto' | 'preferred' | 'namespace' | ((id: string) => boolean | 'auto' | 'preferred' | 'namespace');

  /**
   * @default "auto"
   */
  defaultIsModuleExports?: boolean | 'auto' | ((id: string) => boolean | 'auto');
  /**
   * Some modules contain dynamic `require` calls, or require modules that
   * contain circular dependencies, which are not handled well by static
   * imports. Including those modules as `dynamicRequireTargets` will simulate a
   * CommonJS (NodeJS-like) environment for them with support for dynamic
   * dependencies. It also enables `strictRequires` for those modules.
   *
   * Note: In extreme cases, this feature may result in some paths being
   * rendered as absolute in the final bundle. The plugin tries to avoid
   * exposing paths from the local machine, but if you are `dynamicRequirePaths`
   * with paths that are far away from your project's folder, that may require
   * replacing strings like `"/Users/John/Desktop/foo-project/"` -\> `"/"`.
   */
  dynamicRequireTargets?: string | ReadonlyArray<string>;
  /**
   * To avoid long paths when using the `dynamicRequireTargets` option, you can use this option to specify a directory
   * that is a common parent for all files that use dynamic require statements. Using a directory higher up such as `/`
   * may lead to unnecessarily long paths in the generated code and may expose directory names on your machine like your
   * home directory name. By default, it uses the current working directory.
   */
  dynamicRequireRoot?: string;
}
//#endregion
//#region src/types/dynamicImportVars.d.ts
interface RollupDynamicImportVarsOptions {
  /**
   * Files to include in this plugin (default all).
   * @default []
   */
  include?: string | RegExp | (string | RegExp)[];
  /**
   * Files to exclude in this plugin (default none).
   * @default []
   */
  exclude?: string | RegExp | (string | RegExp)[];
  /**
   * By default, the plugin quits the build process when it encounters an error. If you set this option to true, it will throw a warning instead and leave the code untouched.
   * @default false
   */
  warnOnError?: boolean;
}
//#endregion
//#region src/node/plugins/terser.d.ts
interface TerserOptions extends TerserMinifyOptions {
  /**
  * Vite-specific option to specify the max number of workers to spawn
  * when minifying files with terser.
  *
  * @default number of CPUs minus 1
  */
  maxWorkers?: number;
}
//#endregion
//#region src/node/plugins/resolve.d.ts
interface EnvironmentResolveOptions {
  /**
  * @default ['browser', 'module', 'jsnext:main', 'jsnext']
  */
  mainFields?: string[];
  conditions?: string[];
  externalConditions?: string[];
  /**
  * @default ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json']
  */
  extensions?: string[];
  dedupe?: string[];
  /**
  * Prevent listed dependencies from being externalized and will get bundled in build.
  * Only works in server environments for now. Previously this was `ssr.noExternal`.
  * @experimental
  */
  noExternal?: string | RegExp | (string | RegExp)[] | true;
  /**
  * Externalize the given dependencies and their transitive dependencies.
  * Only works in server environments for now. Previously this was `ssr.external`.
  * @experimental
  */
  external?: string[] | true;
  /**
  * Array of strings or regular expressions that indicate what modules are builtin for the environment.
  */
  builtins?: (string | RegExp)[];
}
interface ResolveOptions extends EnvironmentResolveOptions {
  /**
  * @default false
  */
  preserveSymlinks?: boolean;
}
interface ResolvePluginOptions {
  root: string;
  isBuild: boolean;
  isProduction: boolean;
  packageCache?: PackageCache;
  /**
  * src code mode also attempts the following:
  * - resolving /xxx as URLs
  * - resolving bare imports from optimized deps
  */
  asSrc?: boolean;
  tryIndex?: boolean;
  tryPrefix?: string;
  preferRelative?: boolean;
  isRequire?: boolean;
  scan?: boolean;
}
interface InternalResolveOptions extends Required<ResolveOptions>, ResolvePluginOptions {}
//#endregion
//#region src/node/packages.d.ts
/** Cache for package.json resolution and package.json contents */
type PackageCache = Map<string, PackageData>;
interface PackageData {
  dir: string;
  hasSideEffects: (id: string) => boolean | "no-treeshake" | null;
  setResolvedCache: (key: string, entry: string, options: InternalResolveOptions) => void;
  getResolvedCache: (key: string, options: InternalResolveOptions) => string | undefined;
  data: {
    [field: string]: any;
    name: string;
    type: string;
    version: string;
    main: string;
    module: string;
    browser: string | Record<string, string | false>;
    exports: string | Record<string, any> | string[];
    imports: Record<string, any>;
    dependencies: Record<string, string>;
  };
}
//#endregion
//#region src/node/plugins/license.d.ts
interface LicenseOptions {
  /**
  * The output file name of the license file relative to the output directory.
  * Specify a path that ends with `.json` to output the raw JSON metadata.
  *
  * @default '.vite/license.md'
  */
  fileName: string;
}
//#endregion
//#region src/node/build.d.ts
interface BuildEnvironmentOptions {
  /**
  * Compatibility transform target. The transform is performed with esbuild
  * and the lowest supported target is es2015. Note this only handles
  * syntax transformation and does not cover polyfills
  *
  * Default: 'baseline-widely-available' - transpile targeting browsers that
  * are included in the Baseline Widely Available on 2025-05-01.
  * (Chrome 107+, Edge 107+, Firefox 104+, Safari 16+).
  *
  * Another special value is 'esnext' - which only performs minimal transpiling
  * (for minification compat).
  *
  * For custom targets, see https://esbuild.github.io/api/#target and
  * https://esbuild.github.io/content-types/#javascript for more details.
  * @default 'baseline-widely-available'
  */
  target?: "baseline-widely-available" | esbuild_TransformOptions["target"] | false;
  /**
  * whether to inject module preload polyfill.
  * Note: does not apply to library mode.
  * @default true
  * @deprecated use `modulePreload.polyfill` instead
  */
  polyfillModulePreload?: boolean;
  /**
  * Configure module preload
  * Note: does not apply to library mode.
  * @default true
  */
  modulePreload?: boolean | ModulePreloadOptions;
  /**
  * Directory relative from `root` where build output will be placed. If the
  * directory exists, it will be removed before the build.
  * @default 'dist'
  */
  outDir?: string;
  /**
  * Directory relative from `outDir` where the built js/css/image assets will
  * be placed.
  * @default 'assets'
  */
  assetsDir?: string;
  /**
  * Static asset files smaller than this number (in bytes) will be inlined as
  * base64 strings. If a callback is passed, a boolean can be returned to opt-in
  * or opt-out of inlining. If nothing is returned the default logic applies.
  *
  * Default limit is `4096` (4 KiB). Set to `0` to disable.
  * @default 4096
  */
  assetsInlineLimit?: number | ((filePath: string, content: Buffer) => boolean | undefined);
  /**
  * Whether to code-split CSS. When enabled, CSS in async chunks will be
  * inlined as strings in the chunk and inserted via dynamically created
  * style tags when the chunk is loaded.
  * @default true
  */
  cssCodeSplit?: boolean;
  /**
  * An optional separate target for CSS minification.
  * As esbuild only supports configuring targets to mainstream
  * browsers, users may need this option when they are targeting
  * a niche browser that comes with most modern JavaScript features
  * but has poor CSS support, e.g. Android WeChat WebView, which
  * doesn't support the #RGBA syntax.
  * @default target
  */
  cssTarget?: esbuild_TransformOptions["target"] | false;
  /**
  * Override CSS minification specifically instead of defaulting to `build.minify`,
  * so you can configure minification for JS and CSS separately.
  * @default 'esbuild'
  */
  cssMinify?: boolean | "esbuild" | "lightningcss";
  /**
  * If `true`, a separate sourcemap file will be created. If 'inline', the
  * sourcemap will be appended to the resulting output file as data URI.
  * 'hidden' works like `true` except that the corresponding sourcemap
  * comments in the bundled files are suppressed.
  * @default false
  */
  sourcemap?: boolean | "inline" | "hidden";
  /**
  * Set to `false` to disable minification, or specify the minifier to use.
  * Available options are 'terser' or 'esbuild'.
  * @default 'esbuild'
  */
  minify?: boolean | "terser" | "esbuild";
  /**
  * Options for terser
  * https://terser.org/docs/api-reference#minify-options
  *
  * In addition, you can also pass a `maxWorkers: number` option to specify the
  * max number of workers to spawn. Defaults to the number of CPUs minus 1.
  */
  terserOptions?: TerserOptions;
  /**
  * Will be merged with internal rollup options.
  * https://rollupjs.org/configuration-options/
  */
  rollupOptions?: RollupOptions;
  /**
  * Options to pass on to `@rollup/plugin-commonjs`
  */
  commonjsOptions?: RollupCommonJSOptions;
  /**
  * Options to pass on to `@rollup/plugin-dynamic-import-vars`
  */
  dynamicImportVarsOptions?: RollupDynamicImportVarsOptions;
  /**
  * Whether to write bundle to disk
  * @default true
  */
  write?: boolean;
  /**
  * Empty outDir on write.
  * @default true when outDir is a sub directory of project root
  */
  emptyOutDir?: boolean | null;
  /**
  * Copy the public directory to outDir on write.
  * @default true
  */
  copyPublicDir?: boolean;
  /**
  * Whether to emit a `.vite/license.md` file that includes all bundled dependencies'
  * licenses. Pass an object to customize the output file name.
  * @default false
  */
  license?: boolean | LicenseOptions;
  /**
  * Whether to emit a .vite/manifest.json in the output dir to map hash-less filenames
  * to their hashed versions. Useful when you want to generate your own HTML
  * instead of using the one generated by Vite.
  *
  * Example:
  *
  * ```json
  * {
  *   "main.js": {
  *     "file": "main.68fe3fad.js",
  *     "css": "main.e6b63442.css",
  *     "imports": [...],
  *     "dynamicImports": [...]
  *   }
  * }
  * ```
  * @default false
  */
  manifest?: boolean | string;
  /**
  * Build in library mode. The value should be the global name of the lib in
  * UMD mode. This will produce esm + cjs + umd bundle formats with default
  * configurations that are suitable for distributing libraries.
  * @default false
  */
  lib?: LibraryOptions | false;
  /**
  * Produce SSR oriented build. Note this requires specifying SSR entry via
  * `rollupOptions.input`.
  * @default false
  */
  ssr?: boolean | string;
  /**
  * Generate SSR manifest for determining style links and asset preload
  * directives in production.
  * @default false
  */
  ssrManifest?: boolean | string;
  /**
  * Emit assets during SSR.
  * @default false
  */
  ssrEmitAssets?: boolean;
  /**
  * Emit assets during build. Frameworks can set environments.ssr.build.emitAssets
  * By default, it is true for the client and false for other environments.
  */
  emitAssets?: boolean;
  /**
  * Set to false to disable reporting compressed chunk sizes.
  * Can slightly improve build speed.
  * @default true
  */
  reportCompressedSize?: boolean;
  /**
  * Adjust chunk size warning limit (in kB).
  * @default 500
  */
  chunkSizeWarningLimit?: number;
  /**
  * Rollup watch options
  * https://rollupjs.org/configuration-options/#watch
  * @default null
  */
  watch?: WatcherOptions | null;
  /**
  * create the Build Environment instance
  */
  createEnvironment?: (name: string, config: ResolvedConfig) => Promise<BuildEnvironment> | BuildEnvironment;
}
type BuildOptions = BuildEnvironmentOptions;
interface LibraryOptions {
  /**
  * Path of library entry
  */
  entry: InputOption;
  /**
  * The name of the exposed global variable. Required when the `formats` option includes
  * `umd` or `iife`
  */
  name?: string;
  /**
  * Output bundle formats
  * @default ['es', 'umd']
  */
  formats?: LibraryFormats[];
  /**
  * The name of the package file output. The default file name is the name option
  * of the project package.json. It can also be defined as a function taking the
  * format as an argument.
  */
  fileName?: string | ((format: ModuleFormat, entryName: string) => string);
  /**
  * The name of the CSS file output if the library imports CSS. Defaults to the
  * same value as `build.lib.fileName` if it's set a string, otherwise it falls
  * back to the name option of the project package.json.
  */
  cssFileName?: string;
}
type LibraryFormats = "es" | "cjs" | "umd" | "iife" | "system";
interface ModulePreloadOptions {
  /**
  * Whether to inject a module preload polyfill.
  * Note: does not apply to library mode.
  * @default true
  */
  polyfill?: boolean;
  /**
  * Resolve the list of dependencies to preload for a given dynamic import
  * @experimental
  */
  resolveDependencies?: ResolveModulePreloadDependenciesFn;
}
interface ResolvedModulePreloadOptions {
  polyfill: boolean;
  resolveDependencies?: ResolveModulePreloadDependenciesFn;
}
type ResolveModulePreloadDependenciesFn = (filename: string, deps: string[], context: {
  hostId: string;
  hostType: "html" | "js";
}) => string[];
interface ResolvedBuildEnvironmentOptions extends Required<Omit<BuildEnvironmentOptions, "polyfillModulePreload">> {
  modulePreload: false | ResolvedModulePreloadOptions;
}
interface ResolvedBuildOptions extends Required<Omit<BuildOptions, "polyfillModulePreload">> {
  modulePreload: false | ResolvedModulePreloadOptions;
}
/**
* Bundles a single environment for production.
* Returns a Promise containing the build result.
*/
declare function build(inlineConfig?: InlineConfig): Promise<RollupOutput | RollupOutput[] | RollupWatcher>;
type RenderBuiltAssetUrl = (filename: string, type: {
  type: "asset" | "public";
  hostId: string;
  hostType: "js" | "css" | "html";
  ssr: boolean;
}) => string | {
  relative?: boolean;
  runtime?: string;
} | undefined;
declare class BuildEnvironment extends BaseEnvironment {
  mode: "build";
  isBuilt: boolean;
  constructor(name: string, config: ResolvedConfig, setup?: {
    options?: EnvironmentOptions;
  });
  init(): Promise<void>;
}
interface ViteBuilder {
  environments: Record<string, BuildEnvironment>;
  config: ResolvedConfig;
  buildApp(): Promise<void>;
  build(environment: BuildEnvironment): Promise<RollupOutput | RollupOutput[] | RollupWatcher>;
}
interface BuilderOptions {
  /**
  * Whether to share the config instance among environments to align with the behavior of dev server.
  *
  * @default false
  * @experimental
  */
  sharedConfigBuild?: boolean;
  /**
  * Whether to share the plugin instances among environments to align with the behavior of dev server.
  *
  * @default false
  * @experimental
  */
  sharedPlugins?: boolean;
  buildApp?: (builder: ViteBuilder) => Promise<void>;
}
type ResolvedBuilderOptions = Required<BuilderOptions>;
/**
* Creates a ViteBuilder to orchestrate building multiple environments.
* @experimental
*/
declare function createBuilder(inlineConfig?: InlineConfig, useLegacyBuilder?: null | boolean): Promise<ViteBuilder>;
type BuildAppHook = (this: MinimalPluginContextWithoutEnvironment, builder: ViteBuilder) => Promise<void>;
//#endregion
//#region src/node/environment.d.ts
type Environment = DevEnvironment | BuildEnvironment | ScanEnvironment | UnknownEnvironment;
/**
* Creates a function that hides the complexities of a WeakMap with an initial value
* to implement object metadata. Used by plugins to implement cross hooks per
* environment metadata
*
* @experimental
*/
declare function perEnvironmentState<State>(initial: (environment: Environment) => State): (context: PluginContext) => State;
//#endregion
//#region src/node/server/pluginContainer.d.ts
type SkipInformation = {
  id: string;
  importer: string | undefined;
  plugin: Plugin;
  called?: boolean;
};
declare class EnvironmentPluginContainer<Env extends Environment = Environment> {
  private _pluginContextMap;
  private _resolvedRollupOptions?;
  private _processesing;
  private _seenResolves;
  private _moduleNodeToLoadAddedImports;
  getSortedPluginHooks: PluginHookUtils["getSortedPluginHooks"];
  getSortedPlugins: PluginHookUtils["getSortedPlugins"];
  moduleGraph: EnvironmentModuleGraph | undefined;
  watchFiles: Set<string>;
  minimalContext: MinimalPluginContext$1<Env>;
  private _started;
  private _buildStartPromise;
  private _closed;
  private _updateModuleLoadAddedImports;
  private _getAddedImports;
  getModuleInfo(id: string): ModuleInfo | null;
  private handleHookPromise;
  get options(): InputOptions;
  resolveRollupOptions(): Promise<InputOptions>;
  private _getPluginContext;
  private hookParallel;
  buildStart(_options?: InputOptions): Promise<void>;
  resolveId(rawId: string, importer?: string | undefined, options?: {
    attributes?: Record<string, string>;
    custom?: CustomPluginOptions;
    /** @deprecated use `skipCalls` instead */
    skip?: Set<Plugin>;
    skipCalls?: readonly SkipInformation[];
    
    isEntry?: boolean;
  }): Promise<PartialResolvedId | null>;
  load(id: string): Promise<LoadResult | null>;
  transform(code: string, id: string, options?: {
    inMap?: SourceDescription["map"];
  }): Promise<{
    code: string;
    map: SourceMap | {
      mappings: "";
    } | null;
  }>;
  watchChange(id: string, change: {
    event: "create" | "update" | "delete";
  }): Promise<void>;
  close(): Promise<void>;
}
declare class BasicMinimalPluginContext<Meta = PluginContextMeta> {
  meta: Meta;
  private _logger;
  constructor(meta: Meta, _logger: Logger);
  debug(rawLog: string | RollupLog | (() => string | RollupLog)): void;
  info(rawLog: string | RollupLog | (() => string | RollupLog)): void;
  warn(rawLog: string | RollupLog | (() => string | RollupLog)): void;
  error(e: string | RollupError): never;
  private _normalizeRawLog;
}
declare class MinimalPluginContext$1<T$1 extends Environment = Environment> extends BasicMinimalPluginContext implements MinimalPluginContext {
  environment: T$1;
  constructor(meta: PluginContextMeta, environment: T$1);
}
declare class PluginContainer {
  private environments;
  constructor(environments: Record<string, Environment>);
  private _getEnvironment;
  private _getPluginContainer;
  getModuleInfo(id: string): ModuleInfo | null;
  get options(): InputOptions;
  buildStart(_options?: InputOptions): Promise<void>;
  watchChange(id: string, change: {
    event: "create" | "update" | "delete";
  }): Promise<void>;
  resolveId(rawId: string, importer?: string, options?: {
    attributes?: Record<string, string>;
    custom?: CustomPluginOptions;
    /** @deprecated use `skipCalls` instead */
    skip?: Set<Plugin>;
    skipCalls?: readonly SkipInformation[];
    ssr?: boolean;
    
    isEntry?: boolean;
  }): Promise<PartialResolvedId | null>;
  load(id: string, options?: {
    ssr?: boolean;
  }): Promise<LoadResult | null>;
  transform(code: string, id: string, options?: {
    ssr?: boolean;
    environment?: Environment;
    inMap?: SourceDescription["map"];
  }): Promise<{
    code: string;
    map: SourceMap | {
      mappings: "";
    } | null;
  }>;
  close(): Promise<void>;
}
/**
* server.pluginContainer compatibility
*
* The default environment is in buildStart, buildEnd, watchChange, and closeBundle hooks,
* which are called once for all environments, or when no environment is passed in other hooks.
* The ssrEnvironment is needed for backward compatibility when the ssr flag is passed without
* an environment. The defaultEnvironment in the main pluginContainer in the server should be
* the client environment for backward compatibility.
**/
//#endregion
//#region src/node/server/index.d.ts
interface ServerOptions$1 extends CommonServerOptions {
  /**
  * Configure HMR-specific options (port, host, path & protocol)
  */
  hmr?: HmrOptions | boolean;
  /**
  * Do not start the websocket connection.
  * @experimental
  */
  ws?: false;
  /**
  * Warm-up files to transform and cache the results in advance. This improves the
  * initial page load during server starts and prevents transform waterfalls.
  */
  warmup?: {
    /**
    * The files to be transformed and used on the client-side. Supports glob patterns.
    */
    clientFiles?: string[];
    /**
    * The files to be transformed and used in SSR. Supports glob patterns.
    */
    ssrFiles?: string[];
  };
  /**
  * chokidar watch options or null to disable FS watching
  * https://github.com/paulmillr/chokidar/tree/3.6.0#api
  */
  watch?: WatchOptions | null;
  /**
  * Create Vite dev server to be used as a middleware in an existing server
  * @default false
  */
  middlewareMode?: boolean | {
    /**
    * Parent server instance to attach to
    *
    * This is needed to proxy WebSocket connections to the parent server.
    */
    server: HttpServer;
  };
  /**
  * Options for files served via '/\@fs/'.
  */
  fs?: FileSystemServeOptions;
  /**
  * Origin for the generated asset URLs.
  *
  * @example `http://127.0.0.1:8080`
  */
  origin?: string;
  /**
  * Pre-transform known direct imports
  * @default true
  */
  preTransformRequests?: boolean;
  /**
  * Whether or not to ignore-list source files in the dev server sourcemap, used to populate
  * the [`x_google_ignoreList` source map extension](https://developer.chrome.com/blog/devtools-better-angular-debugging/#the-x_google_ignorelist-source-map-extension).
  *
  * By default, it excludes all paths containing `node_modules`. You can pass `false` to
  * disable this behavior, or, for full control, a function that takes the source path and
  * sourcemap path and returns whether to ignore the source path.
  */
  sourcemapIgnoreList?: false | ((sourcePath: string, sourcemapPath: string) => boolean);
  /**
  * Backward compatibility. The buildStart and buildEnd hooks were called only once for
  * the client environment. This option enables per-environment buildStart and buildEnd hooks.
  * @default false
  * @experimental
  */
  perEnvironmentStartEndDuringDev?: boolean;
  /**
  * Backward compatibility. The watchChange hook was called only once for the client environment.
  * This option enables per-environment watchChange hooks.
  * @default false
  * @experimental
  */
  perEnvironmentWatchChangeDuringDev?: boolean;
  /**
  * Run HMR tasks, by default the HMR propagation is done in parallel for all environments
  * @experimental
  */
  hotUpdateEnvironments?: (server: ViteDevServer, hmr: (environment: DevEnvironment) => Promise<void>) => Promise<void>;
}
interface ResolvedServerOptions extends Omit<RequiredExceptFor<ServerOptions$1, "host" | "https" | "proxy" | "hmr" | "ws" | "watch" | "origin" | "hotUpdateEnvironments">, "fs" | "middlewareMode" | "sourcemapIgnoreList"> {
  fs: Required<FileSystemServeOptions>;
  middlewareMode: NonNullable<ServerOptions$1["middlewareMode"]>;
  sourcemapIgnoreList: Exclude<ServerOptions$1["sourcemapIgnoreList"], false | undefined>;
}
interface FileSystemServeOptions {
  /**
  * Strictly restrict file accessing outside of allowing paths.
  *
  * Set to `false` to disable the warning
  *
  * @default true
  */
  strict?: boolean;
  /**
  * Restrict accessing files outside the allowed directories.
  *
  * Accepts absolute path or a path relative to project root.
  * Will try to search up for workspace root by default.
  */
  allow?: string[];
  /**
  * Restrict accessing files that matches the patterns.
  *
  * This will have higher priority than `allow`.
  * picomatch patterns are supported.
  *
  * @default ['.env', '.env.*', '*.{crt,pem}', '**\/.git/**']
  */
  deny?: string[];
}
type ServerHook = (this: MinimalPluginContextWithoutEnvironment, server: ViteDevServer) => (() => void) | void | Promise<(() => void) | void>;
type HttpServer = http.Server | Http2SecureServer;
interface ViteDevServer {
  /**
  * The resolved vite config object
  */
  config: ResolvedConfig;
  /**
  * A connect app instance.
  * - Can be used to attach custom middlewares to the dev server.
  * - Can also be used as the handler function of a custom http server
  *   or as a middleware in any connect-style Node.js frameworks
  *
  * https://github.com/senchalabs/connect#use-middleware
  */
  middlewares: Connect.Server;
  /**
  * native Node http server instance
  * will be null in middleware mode
  */
  httpServer: HttpServer | null;
  /**
  * Chokidar watcher instance. If `config.server.watch` is set to `null`,
  * it will not watch any files and calling `add` or `unwatch` will have no effect.
  * https://github.com/paulmillr/chokidar/tree/3.6.0#api
  */
  watcher: FSWatcher;
  /**
  * WebSocket server with `send(payload)` method
  */
  ws: WebSocketServer;
  /**
  * An alias to `server.environments.client.hot`.
  * If you want to interact with all environments, loop over `server.environments`.
  */
  hot: NormalizedHotChannel;
  /**
  * Rollup plugin container that can run plugin hooks on a given file
  */
  pluginContainer: PluginContainer;
  /**
  * Module execution environments attached to the Vite server.
  */
  environments: Record<"client" | "ssr" | (string & {}), DevEnvironment>;
  /**
  * Module graph that tracks the import relationships, url to file mapping
  * and hmr state.
  */
  moduleGraph: ModuleGraph;
  /**
  * The resolved urls Vite prints on the CLI (URL-encoded). Returns `null`
  * in middleware mode or if the server is not listening on any port.
  */
  resolvedUrls: ResolvedServerUrls | null;
  /**
  * Programmatically resolve, load and transform a URL and get the result
  * without going through the http request pipeline.
  */
  transformRequest(url: string, options?: TransformOptions): Promise<TransformResult | null>;
  /**
  * Same as `transformRequest` but only warm up the URLs so the next request
  * will already be cached. The function will never throw as it handles and
  * reports errors internally.
  */
  warmupRequest(url: string, options?: TransformOptions): Promise<void>;
  /**
  * Apply vite built-in HTML transforms and any plugin HTML transforms.
  */
  transformIndexHtml(url: string, html: string, originalUrl?: string): Promise<string>;
  /**
  * Transform module code into SSR format.
  */
  ssrTransform(code: string, inMap: SourceMap | {
    mappings: "";
  } | null, url: string, originalCode?: string): Promise<TransformResult | null>;
  /**
  * Load a given URL as an instantiated module for SSR.
  */
  ssrLoadModule(url: string, opts?: {
    fixStacktrace?: boolean;
  }): Promise<Record<string, any>>;
  /**
  * Returns a fixed version of the given stack
  */
  ssrRewriteStacktrace(stack: string): string;
  /**
  * Mutates the given SSR error by rewriting the stacktrace
  */
  ssrFixStacktrace(e: Error): void;
  /**
  * Triggers HMR for a module in the module graph. You can use the `server.moduleGraph`
  * API to retrieve the module to be reloaded. If `hmr` is false, this is a no-op.
  */
  reloadModule(module: ModuleNode): Promise<void>;
  /**
  * Start the server.
  */
  listen(port?: number, isRestart?: boolean): Promise<ViteDevServer>;
  /**
  * Stop the server.
  */
  close(): Promise<void>;
  /**
  * Print server urls
  */
  printUrls(): void;
  /**
  * Bind CLI shortcuts
  */
  bindCLIShortcuts(options?: BindCLIShortcutsOptions<ViteDevServer>): void;
  /**
  * Restart the server.
  *
  * @param forceOptimize - force the optimizer to re-bundle, same as --force cli flag
  */
  restart(forceOptimize?: boolean): Promise<void>;
  /**
  * Open browser
  */
  openBrowser(): void;
  /**
  * Calling `await server.waitForRequestsIdle(id)` will wait until all static imports
  * are processed. If called from a load or transform plugin hook, the id needs to be
  * passed as a parameter to avoid deadlocks. Calling this function after the first
  * static imports section of the module graph has been processed will resolve immediately.
  */
  waitForRequestsIdle: (ignoredId?: string) => Promise<void>;
}
interface ResolvedServerUrls {
  local: string[];
  network: string[];
}
declare function createServer(inlineConfig?: InlineConfig | ResolvedConfig): Promise<ViteDevServer>;
//#endregion
//#region src/node/plugins/html.d.ts
interface HtmlTagDescriptor {
  tag: string;
  /**
  * attribute values will be escaped automatically if needed
  */
  attrs?: Record<string, string | boolean | undefined>;
  children?: string | HtmlTagDescriptor[];
  /**
  * default: 'head-prepend'
  */
  injectTo?: "head" | "body" | "head-prepend" | "body-prepend";
}
type IndexHtmlTransformResult = string | HtmlTagDescriptor[] | {
  html: string;
  tags: HtmlTagDescriptor[];
};
interface IndexHtmlTransformContext {
  /**
  * public path when served
  */
  path: string;
  /**
  * filename on disk
  */
  filename: string;
  server?: ViteDevServer;
  bundle?: OutputBundle;
  chunk?: OutputChunk;
  originalUrl?: string;
}
type IndexHtmlTransformHook = (this: MinimalPluginContextWithoutEnvironment, html: string, ctx: IndexHtmlTransformContext) => IndexHtmlTransformResult | void | Promise<IndexHtmlTransformResult | void>;
type IndexHtmlTransform = IndexHtmlTransformHook | {
  order?: "pre" | "post" | null;
  handler: IndexHtmlTransformHook;
};
//#endregion
//#region src/node/plugins/pluginFilter.d.ts
type StringFilter<Value = string | RegExp> = Value | Array<Value> | {
  include?: Value | Array<Value>;
  exclude?: Value | Array<Value>;
};
//#endregion
//#region src/node/plugin.d.ts
/**
* Vite plugins extends the Rollup plugin interface with a few extra
* vite-specific options. A valid vite plugin is also a valid Rollup plugin.
* On the contrary, a Rollup plugin may or may NOT be a valid vite universal
* plugin, since some Rollup features do not make sense in an unbundled
* dev server context. That said, as long as a rollup plugin doesn't have strong
* coupling between its bundle phase and output phase hooks then it should
* just work (that means, most of them).
*
* By default, the plugins are run during both serve and build. When a plugin
* is applied during serve, it will only run **non output plugin hooks** (see
* rollup type definition of {@link rollup#PluginHooks}). You can think of the
* dev server as only running `const bundle = rollup.rollup()` but never calling
* `bundle.generate()`.
*
* A plugin that expects to have different behavior depending on serve/build can
* export a factory function that receives the command being run via options.
*
* If a plugin should be applied only for server or build, a function format
* config file can be used to conditional determine the plugins to use.
*
* The current environment can be accessed from the context for the all non-global
* hooks (it is not available in config, configResolved, configureServer, etc).
* It can be a dev, build, or scan environment.
* Plugins can use this.environment.mode === 'dev' to guard for dev specific APIs.
*/
interface PluginContextExtension {
  /**
  * Vite-specific environment instance
  */
  environment: Environment;
}
interface PluginContextMetaExtension {
  viteVersion: string;
}
interface ConfigPluginContext extends Omit<MinimalPluginContext, "meta" | "environment"> {
  meta: Omit<PluginContextMeta, "watchMode">;
}
interface MinimalPluginContextWithoutEnvironment extends Omit<MinimalPluginContext, "environment"> {}
declare module "rollup" {
  interface MinimalPluginContext extends PluginContextExtension {}
  interface PluginContextMeta extends PluginContextMetaExtension {}
}
/**
* There are two types of plugins in Vite. App plugins and environment plugins.
* Environment Plugins are defined by a constructor function that will be called
* once per each environment allowing users to have completely different plugins
* for each of them. The constructor gets the resolved environment after the server
* and builder has already been created simplifying config access and cache
* management for for environment specific plugins.
* Environment Plugins are closer to regular rollup plugins. They can't define
* app level hooks (like config, configResolved, configureServer, etc).
*/
interface Plugin<A = any> extends Rollup.Plugin<A> {
  /**
  * Perform custom handling of HMR updates.
  * The handler receives an options containing changed filename, timestamp, a
  * list of modules affected by the file change, and the dev server instance.
  *
  * - The hook can return a filtered list of modules to narrow down the update.
  *   e.g. for a Vue SFC, we can narrow down the part to update by comparing
  *   the descriptors.
  *
  * - The hook can also return an empty array and then perform custom updates
  *   by sending a custom hmr payload via environment.hot.send().
  *
  * - If the hook doesn't return a value, the hmr update will be performed as
  *   normal.
  */
  hotUpdate?: ObjectHook<(this: MinimalPluginContext & {
    environment: DevEnvironment;
  }, options: HotUpdateOptions) => Array<EnvironmentModuleNode> | void | Promise<Array<EnvironmentModuleNode> | void>>;
  /**
  * extend hooks with ssr flag
  */
  resolveId?: ObjectHook<(this: PluginContext, source: string, importer: string | undefined, options: {
    attributes: Record<string, string>;
    custom?: CustomPluginOptions;
    ssr?: boolean | undefined;
    
    isEntry: boolean;
  }) => Promise<ResolveIdResult> | ResolveIdResult, {
    filter?: {
      id?: StringFilter<RegExp>;
    };
  }>;
  load?: ObjectHook<(this: PluginContext, id: string, options?: {
    ssr?: boolean | undefined;
  }) => Promise<LoadResult> | LoadResult, {
    filter?: {
      id?: StringFilter;
    };
  }>;
  transform?: ObjectHook<(this: TransformPluginContext, code: string, id: string, options?: {
    ssr?: boolean | undefined;
  }) => Promise<Rollup.TransformResult> | Rollup.TransformResult, {
    filter?: {
      id?: StringFilter;
      code?: StringFilter;
    };
  }>;
  /**
  * Opt-in this plugin into the shared plugins pipeline.
  * For backward-compatibility, plugins are re-recreated for each environment
  * during `vite build --app`
  * We have an opt-in per plugin, and a general `builder.sharedPlugins`
  * In a future major, we'll flip the default to be shared by default
  * @experimental
  */
  sharedDuringBuild?: boolean;
  /**
  * Opt-in this plugin into per-environment buildStart and buildEnd during dev.
  * For backward-compatibility, the buildStart hook is called only once during
  * dev, for the client environment. Plugins can opt-in to be called
  * per-environment, aligning with the build hook behavior.
  * @experimental
  */
  perEnvironmentStartEndDuringDev?: boolean;
  /**
  * Opt-in this plugin into per-environment watchChange during dev.
  * For backward-compatibility, the watchChange hook is called only once during
  * dev, for the client environment. Plugins can opt-in to be called
  * per-environment, aligning with the watchChange hook behavior.
  * @experimental
  */
  perEnvironmentWatchChangeDuringDev?: boolean;
  /**
  * Enforce plugin invocation tier similar to webpack loaders. Hooks ordering
  * is still subject to the `order` property in the hook object.
  *
  * Plugin invocation order:
  * - alias resolution
  * - `enforce: 'pre'` plugins
  * - vite core plugins
  * - normal plugins
  * - vite build plugins
  * - `enforce: 'post'` plugins
  * - vite build post plugins
  */
  enforce?: "pre" | "post";
  /**
  * Apply the plugin only for serve or build, or on certain conditions.
  */
  apply?: "serve" | "build" | ((this: void, config: UserConfig, env: ConfigEnv) => boolean);
  /**
  * Define environments where this plugin should be active
  * By default, the plugin is active in all environments
  * @experimental
  */
  applyToEnvironment?: (environment: PartialEnvironment) => boolean | Promise<boolean> | PluginOption;
  /**
  * Modify vite config before it's resolved. The hook can either mutate the
  * passed-in config directly, or return a partial config object that will be
  * deeply merged into existing config.
  *
  * Note: User plugins are resolved before running this hook so injecting other
  * plugins inside  the `config` hook will have no effect.
  */
  config?: ObjectHook<(this: ConfigPluginContext, config: UserConfig, env: ConfigEnv) => Omit<UserConfig, "plugins"> | null | void | Promise<Omit<UserConfig, "plugins"> | null | void>>;
  /**
  * Modify environment configs before it's resolved. The hook can either mutate the
  * passed-in environment config directly, or return a partial config object that will be
  * deeply merged into existing config.
  * This hook is called for each environment with a partially resolved environment config
  * that already accounts for the default environment config values set at the root level.
  * If plugins need to modify the config of a given environment, they should do it in this
  * hook instead of the config hook. Leaving the config hook only for modifying the root
  * default environment config.
  */
  configEnvironment?: ObjectHook<(this: ConfigPluginContext, name: string, config: EnvironmentOptions, env: ConfigEnv & {
    /**
    * Whether this environment is SSR environment and `ssr.target` is set to `'webworker'`.
    * Only intended to be used for backward compatibility.
    */
    isSsrTargetWebworker?: boolean;
  }) => EnvironmentOptions | null | void | Promise<EnvironmentOptions | null | void>>;
  /**
  * Use this hook to read and store the final resolved vite config.
  */
  configResolved?: ObjectHook<(this: MinimalPluginContextWithoutEnvironment, config: ResolvedConfig) => void | Promise<void>>;
  /**
  * Configure the vite server. The hook receives the {@link ViteDevServer}
  * instance. This can also be used to store a reference to the server
  * for use in other hooks.
  *
  * The hooks will be called before internal middlewares are applied. A hook
  * can return a post hook that will be called after internal middlewares
  * are applied. Hook can be async functions and will be called in series.
  */
  configureServer?: ObjectHook<ServerHook>;
  /**
  * Configure the preview server. The hook receives the {@link PreviewServer}
  * instance. This can also be used to store a reference to the server
  * for use in other hooks.
  *
  * The hooks are called before other middlewares are applied. A hook can
  * return a post hook that will be called after other middlewares are
  * applied. Hooks can be async functions and will be called in series.
  */
  configurePreviewServer?: ObjectHook<PreviewServerHook>;
  /**
  * Transform index.html.
  * The hook receives the following arguments:
  *
  * - html: string
  * - ctx: IndexHtmlTransformContext, which contains:
  *    - path: public path when served
  *    - filename: filename on disk
  *    - server?: ViteDevServer (only present during serve)
  *    - bundle?: rollup.OutputBundle (only present during build)
  *    - chunk?: rollup.OutputChunk
  *    - originalUrl?: string
  *
  * It can either return a transformed string, or a list of html tag
  * descriptors that will be injected into the `<head>` or `<body>`.
  *
  * By default the transform is applied **after** vite's internal html
  * transform. If you need to apply the transform before vite, use an object:
  * `{ order: 'pre', handler: hook }`
  */
  transformIndexHtml?: IndexHtmlTransform;
  /**
  * Build Environments
  *
  * @experimental
  */
  buildApp?: ObjectHook<BuildAppHook>;
  /**
  * Perform custom handling of HMR updates.
  * The handler receives a context containing changed filename, timestamp, a
  * list of modules affected by the file change, and the dev server instance.
  *
  * - The hook can return a filtered list of modules to narrow down the update.
  *   e.g. for a Vue SFC, we can narrow down the part to update by comparing
  *   the descriptors.
  *
  * - The hook can also return an empty array and then perform custom updates
  *   by sending a custom hmr payload via server.ws.send().
  *
  * - If the hook doesn't return a value, the hmr update will be performed as
  *   normal.
  */
  handleHotUpdate?: ObjectHook<(this: MinimalPluginContextWithoutEnvironment, ctx: HmrContext) => Array<ModuleNode> | void | Promise<Array<ModuleNode> | void>>;
}
type HookHandler<T$1> = T$1 extends ObjectHook<infer H> ? H : T$1;
type PluginWithRequiredHook<K$1 extends keyof Plugin> = Plugin & { [P in K$1]: NonNullable<Plugin[P]> };
type Thenable<T$1> = T$1 | Promise<T$1>;
type FalsyPlugin = false | null | undefined;
type PluginOption = Thenable<Plugin | FalsyPlugin | PluginOption[]>;
/**
* @experimental
*/
declare function perEnvironmentPlugin(name: string, applyToEnvironment: (environment: PartialEnvironment) => boolean | Promise<boolean> | PluginOption): Plugin;
//#endregion
//#region src/node/plugins/css.d.ts
interface CSSOptions {
  /**
  * Using lightningcss is an experimental option to handle CSS modules,
  * assets and imports via Lightning CSS. It requires to install it as a
  * peer dependency.
  *
  * @default 'postcss'
  * @experimental
  */
  transformer?: "postcss" | "lightningcss";
  /**
  * https://github.com/css-modules/postcss-modules
  */
  modules?: CSSModulesOptions | false;
  /**
  * Options for preprocessors.
  *
  * In addition to options specific to each processors, Vite supports `additionalData` option.
  * The `additionalData` option can be used to inject extra code for each style content.
  */
  preprocessorOptions?: {
    scss?: SassPreprocessorOptions;
    sass?: SassPreprocessorOptions;
    less?: LessPreprocessorOptions;
    styl?: StylusPreprocessorOptions;
    stylus?: StylusPreprocessorOptions;
  };
  /**
  * If this option is set, preprocessors will run in workers when possible.
  * `true` means the number of CPUs minus 1.
  *
  * @default true
  */
  preprocessorMaxWorkers?: number | true;
  postcss?: string | (PostCSS.ProcessOptions & {
    plugins?: PostCSS.AcceptedPlugin[];
  });
  /**
  * Enables css sourcemaps during dev
  * @default false
  * @experimental
  */
  devSourcemap?: boolean;
  /**
  * @experimental
  */
  lightningcss?: lightningcssOptions_LightningCSSOptions;
}
interface CSSModulesOptions {
  getJSON?: (cssFileName: string, json: Record<string, string>, outputFileName: string) => void;
  scopeBehaviour?: "global" | "local";
  globalModulePaths?: RegExp[];
  exportGlobals?: boolean;
  generateScopedName?: string | ((name: string, filename: string, css: string) => string);
  hashPrefix?: string;
  /**
  * default: undefined
  */
  localsConvention?: "camelCase" | "camelCaseOnly" | "dashes" | "dashesOnly" | ((originalClassName: string, generatedClassName: string, inputFile: string) => string);
}
type ResolvedCSSOptions = Omit<CSSOptions, "lightningcss"> & Required<Pick<CSSOptions, "transformer" | "devSourcemap">> & {
  lightningcss?: lightningcssOptions_LightningCSSOptions;
};
interface PreprocessCSSResult {
  code: string;
  map?: SourceMapInput;
  modules?: Record<string, string>;
  deps?: Set<string>;
}
/**
* @experimental
*/
declare function preprocessCSS(code: string, filename: string, config: ResolvedConfig): Promise<PreprocessCSSResult>;
declare function formatPostcssSourceMap(rawMap: ExistingRawSourceMap, file: string): Promise<ExistingRawSourceMap>;
type PreprocessorAdditionalDataResult = string | {
  content: string;
  map?: ExistingRawSourceMap;
};
type PreprocessorAdditionalData = string | ((source: string, filename: string) => PreprocessorAdditionalDataResult | Promise<PreprocessorAdditionalDataResult>);
type SassPreprocessorOptions = {
  additionalData?: PreprocessorAdditionalData;
} & SassModernPreprocessBaseOptions;
type LessPreprocessorOptions = {
  additionalData?: PreprocessorAdditionalData;
} & LessPreprocessorBaseOptions;
type StylusPreprocessorOptions = {
  additionalData?: PreprocessorAdditionalData;
} & StylusPreprocessorBaseOptions;
//#endregion
//#region src/node/plugins/esbuild.d.ts
interface ESBuildOptions extends esbuild_TransformOptions {
  include?: string | RegExp | ReadonlyArray<string | RegExp>;
  exclude?: string | RegExp | ReadonlyArray<string | RegExp>;
  jsxInject?: string;
  /**
  * This option is not respected. Use `build.minify` instead.
  */
  minify?: never;
}
type ESBuildTransformResult = Omit<esbuild_TransformResult, "map"> & {
  map: SourceMap;
};
declare function transformWithEsbuild(code: string, filename: string, options?: esbuild_TransformOptions, inMap?: object, config?: ResolvedConfig, watcher?: FSWatcher): Promise<ESBuildTransformResult>;
//#endregion
//#region src/node/plugins/json.d.ts
interface JsonOptions {
  /**
  * Generate a named export for every property of the JSON object
  * @default true
  */
  namedExports?: boolean;
  /**
  * Generate performant output as JSON.parse("stringified").
  *
  * When set to 'auto', the data will be stringified only if the data is bigger than 10kB.
  * @default 'auto'
  */
  stringify?: boolean | "auto";
}
//#endregion
//#region src/node/ssr/index.d.ts
type SSRTarget = "node" | "webworker";
type SsrDepOptimizationConfig = DepOptimizationConfig;
interface SSROptions {
  noExternal?: string | RegExp | (string | RegExp)[] | true;
  external?: string[] | true;
  /**
  * Define the target for the ssr build. The browser field in package.json
  * is ignored for node but used if webworker is the target
  * This option will be removed in a future major version
  * @default 'node'
  */
  target?: SSRTarget;
  /**
  * Control over which dependencies are optimized during SSR and esbuild options
  * During build:
  *   no external CJS dependencies are optimized by default
  * During dev:
  *   explicit no external CJS dependencies are optimized by default
  * @experimental
  */
  optimizeDeps?: SsrDepOptimizationConfig;
  resolve?: {
    /**
    * Conditions that are used in the plugin pipeline. The default value is the root config's `resolve.conditions`.
    *
    * Use this to override the default ssr conditions for the ssr build.
    *
    * @default rootConfig.resolve.conditions
    */
    conditions?: string[];
    /**
    * Conditions that are used during ssr import (including `ssrLoadModule`) of externalized dependencies.
    *
    * @default ['node', 'module-sync']
    */
    externalConditions?: string[];
    mainFields?: string[];
  };
}
interface ResolvedSSROptions extends SSROptions {
  target: SSRTarget;
  optimizeDeps: SsrDepOptimizationConfig;
}
//#endregion
//#region src/node/config.d.ts
interface ConfigEnv {
  /**
  * 'serve': during dev (`vite` command)
  * 'build': when building for production (`vite build` command)
  */
  command: "build" | "serve";
  mode: string;
  isSsrBuild?: boolean;
  isPreview?: boolean;
}
/**
* spa: include SPA fallback middleware and configure sirv with `single: true` in preview
*
* mpa: only include non-SPA HTML middlewares
*
* custom: don't include HTML middlewares
*/
type AppType = "spa" | "mpa" | "custom";
type UserConfigFnObject = (env: ConfigEnv) => UserConfig;
type UserConfigFnPromise = (env: ConfigEnv) => Promise<UserConfig>;
type UserConfigFn = (env: ConfigEnv) => UserConfig | Promise<UserConfig>;
type UserConfigExport = UserConfig | Promise<UserConfig> | UserConfigFnObject | UserConfigFnPromise | UserConfigFn;
/**
* Type helper to make it easier to use vite.config.ts
* accepts a direct {@link UserConfig} object, or a function that returns it.
* The function receives a {@link ConfigEnv} object.
*/
declare function defineConfig(config: UserConfig): UserConfig;
declare function defineConfig(config: Promise<UserConfig>): Promise<UserConfig>;
declare function defineConfig(config: UserConfigFnObject): UserConfigFnObject;
declare function defineConfig(config: UserConfigFnPromise): UserConfigFnPromise;
declare function defineConfig(config: UserConfigFn): UserConfigFn;
declare function defineConfig(config: UserConfigExport): UserConfigExport;
interface CreateDevEnvironmentContext {
  ws: WebSocketServer;
}
interface DevEnvironmentOptions {
  /**
  * Files to be pre-transformed. Supports glob patterns.
  */
  warmup?: string[];
  /**
  * Pre-transform known direct imports
  * defaults to true for the client environment, false for the rest
  */
  preTransformRequests?: boolean;
  /**
  * Enables sourcemaps during dev
  * @default { js: true }
  * @experimental
  */
  sourcemap?: boolean | {
    js?: boolean;
    css?: boolean;
  };
  /**
  * Whether or not to ignore-list source files in the dev server sourcemap, used to populate
  * the [`x_google_ignoreList` source map extension](https://developer.chrome.com/blog/devtools-better-angular-debugging/#the-x_google_ignorelist-source-map-extension).
  *
  * By default, it excludes all paths containing `node_modules`. You can pass `false` to
  * disable this behavior, or, for full control, a function that takes the source path and
  * sourcemap path and returns whether to ignore the source path.
  */
  sourcemapIgnoreList?: false | ((sourcePath: string, sourcemapPath: string) => boolean);
  /**
  * create the Dev Environment instance
  */
  createEnvironment?: (name: string, config: ResolvedConfig, context: CreateDevEnvironmentContext) => Promise<DevEnvironment> | DevEnvironment;
  /**
  * For environments that support a full-reload, like the client, we can short-circuit when
  * restarting the server throwing early to stop processing current files. We avoided this for
  * SSR requests. Maybe this is no longer needed.
  * @experimental
  */
  recoverable?: boolean;
  /**
  * For environments associated with a module runner.
  * By default, it is false for the client environment and true for non-client environments.
  * This option can also be used instead of the removed config.experimental.skipSsrTransform.
  */
  moduleRunnerTransform?: boolean;
}
type ResolvedDevEnvironmentOptions = Omit<Required<DevEnvironmentOptions>, "sourcemapIgnoreList"> & {
  sourcemapIgnoreList: Exclude<DevEnvironmentOptions["sourcemapIgnoreList"], false | undefined>;
};
type AllResolveOptions = ResolveOptions & {
  alias?: AliasOptions;
};
interface SharedEnvironmentOptions {
  /**
  * Define global variable replacements.
  * Entries will be defined on `window` during dev and replaced during build.
  */
  define?: Record<string, any>;
  /**
  * Configure resolver
  */
  resolve?: EnvironmentResolveOptions;
  /**
  * Define if this environment is used for Server-Side Rendering
  * @default 'server' if it isn't the client environment
  */
  consumer?: "client" | "server";
  /**
  * If true, `process.env` referenced in code will be preserved as-is and evaluated in runtime.
  * Otherwise, it is statically replaced as an empty object.
  */
  keepProcessEnv?: boolean;
  /**
  * Optimize deps config
  */
  optimizeDeps?: DepOptimizationOptions;
}
interface EnvironmentOptions extends SharedEnvironmentOptions {
  /**
  * Dev specific options
  */
  dev?: DevEnvironmentOptions;
  /**
  * Build specific options
  */
  build?: BuildEnvironmentOptions;
}
type ResolvedResolveOptions = Required<ResolveOptions>;
type ResolvedEnvironmentOptions = {
  define?: Record<string, any>;
  resolve: ResolvedResolveOptions;
  consumer: "client" | "server";
  keepProcessEnv?: boolean;
  optimizeDeps: DepOptimizationOptions;
  dev: ResolvedDevEnvironmentOptions;
  build: ResolvedBuildEnvironmentOptions;
  plugins: readonly Plugin[];
};
type DefaultEnvironmentOptions = Omit<EnvironmentOptions, "consumer" | "resolve" | "keepProcessEnv"> & {
  resolve?: AllResolveOptions;
};
interface UserConfig extends DefaultEnvironmentOptions {
  /**
  * Project root directory. Can be an absolute path, or a path relative from
  * the location of the config file itself.
  * @default process.cwd()
  */
  root?: string;
  /**
  * Base public path when served in development or production.
  * @default '/'
  */
  base?: string;
  /**
  * Directory to serve as plain static assets. Files in this directory are
  * served and copied to build dist dir as-is without transform. The value
  * can be either an absolute file system path or a path relative to project root.
  *
  * Set to `false` or an empty string to disable copied static assets to build dist dir.
  * @default 'public'
  */
  publicDir?: string | false;
  /**
  * Directory to save cache files. Files in this directory are pre-bundled
  * deps or some other cache files that generated by vite, which can improve
  * the performance. You can use `--force` flag or manually delete the directory
  * to regenerate the cache files. The value can be either an absolute file
  * system path or a path relative to project root.
  * Default to `.vite` when no `package.json` is detected.
  * @default 'node_modules/.vite'
  */
  cacheDir?: string;
  /**
  * Explicitly set a mode to run in. This will override the default mode for
  * each command, and can be overridden by the command line --mode option.
  */
  mode?: string;
  /**
  * Array of vite plugins to use.
  */
  plugins?: PluginOption[];
  /**
  * HTML related options
  */
  html?: HTMLOptions;
  /**
  * CSS related options (preprocessors and CSS modules)
  */
  css?: CSSOptions;
  /**
  * JSON loading options
  */
  json?: JsonOptions;
  /**
  * Transform options to pass to esbuild.
  * Or set to `false` to disable esbuild.
  */
  esbuild?: ESBuildOptions | false;
  /**
  * Specify additional picomatch patterns to be treated as static assets.
  */
  assetsInclude?: string | RegExp | (string | RegExp)[];
  /**
  * Builder specific options
  * @experimental
  */
  builder?: BuilderOptions;
  /**
  * Server specific options, e.g. host, port, https...
  */
  server?: ServerOptions$1;
  /**
  * Preview specific options, e.g. host, port, https...
  */
  preview?: PreviewOptions;
  /**
  * Experimental features
  *
  * Features under this field could change in the future and might NOT follow semver.
  * Please be careful and always pin Vite's version when using them.
  * @experimental
  */
  experimental?: ExperimentalOptions;
  /**
  * Options to opt-in to future behavior
  */
  future?: FutureOptions | "warn";
  /**
  * Legacy options
  *
  * Features under this field only follow semver for patches, they could be removed in a
  * future minor version. Please always pin Vite's version to a minor when using them.
  */
  legacy?: LegacyOptions;
  /**
  * Log level.
  * @default 'info'
  */
  logLevel?: LogLevel;
  /**
  * Custom logger.
  */
  customLogger?: Logger;
  /**
  * @default true
  */
  clearScreen?: boolean;
  /**
  * Environment files directory. Can be an absolute path, or a path relative from
  * root.
  * @default root
  */
  envDir?: string | false;
  /**
  * Env variables starts with `envPrefix` will be exposed to your client source code via import.meta.env.
  * @default 'VITE_'
  */
  envPrefix?: string | string[];
  /**
  * Worker bundle options
  */
  worker?: {
    /**
    * Output format for worker bundle
    * @default 'iife'
    */
    format?: "es" | "iife";
    /**
    * Vite plugins that apply to worker bundle. The plugins returned by this function
    * should be new instances every time it is called, because they are used for each
    * rollup worker bundling process.
    */
    plugins?: () => PluginOption[];
    /**
    * Rollup options to build worker bundle
    */
    rollupOptions?: Omit<RollupOptions, "plugins" | "input" | "onwarn" | "preserveEntrySignatures">;
  };
  /**
  * Dep optimization options
  */
  optimizeDeps?: DepOptimizationOptions;
  /**
  * SSR specific options
  * We could make SSROptions be a EnvironmentOptions if we can abstract
  * external/noExternal for environments in general.
  */
  ssr?: SSROptions;
  /**
  * Environment overrides
  */
  environments?: Record<string, EnvironmentOptions>;
  /**
  * Whether your application is a Single Page Application (SPA),
  * a Multi-Page Application (MPA), or Custom Application (SSR
  * and frameworks with custom HTML handling)
  * @default 'spa'
  */
  appType?: AppType;
}
interface HTMLOptions {
  /**
  * A nonce value placeholder that will be used when generating script/style tags.
  *
  * Make sure that this placeholder will be replaced with a unique value for each request by the server.
  */
  cspNonce?: string;
}
interface FutureOptions {
  removePluginHookHandleHotUpdate?: "warn";
  removePluginHookSsrArgument?: "warn";
  removeServerModuleGraph?: "warn";
  removeServerReloadModule?: "warn";
  removeServerPluginContainer?: "warn";
  removeServerHot?: "warn";
  removeServerTransformRequest?: "warn";
  removeServerWarmupRequest?: "warn";
  removeSsrLoadModule?: "warn";
}
interface ExperimentalOptions {
  /**
  * Append fake `&lang.(ext)` when queries are specified, to preserve the file extension for following plugins to process.
  *
  * @experimental
  * @default false
  */
  importGlobRestoreExtension?: boolean;
  /**
  * Allow finegrain control over assets and public files paths
  *
  * @experimental
  */
  renderBuiltUrl?: RenderBuiltAssetUrl;
  /**
  * Enables support of HMR partial accept via `import.meta.hot.acceptExports`.
  *
  * @experimental
  * @default false
  */
  hmrPartialAccept?: boolean;
}
interface LegacyOptions {
  /**
  * In Vite 6.0.8 and below, WebSocket server was able to connect from any web pages. However,
  * that could be exploited by a malicious web page.
  *
  * In Vite 6.0.9+, the WebSocket server now requires a token to connect from a web page.
  * But this may break some plugins and frameworks that connects to the WebSocket server
  * on their own. Enabling this option will make Vite skip the token check.
  *
  * **We do not recommend enabling this option unless you are sure that you are fine with
  * that security weakness.**
  */
  skipWebSocketTokenCheck?: boolean;
}
interface ResolvedWorkerOptions {
  format: "es" | "iife";
  plugins: (bundleChain: string[]) => Promise<ResolvedConfig>;
  rollupOptions: RollupOptions;
}
interface InlineConfig extends UserConfig {
  configFile?: string | false;
  /** @experimental */
  configLoader?: "bundle" | "runner" | "native";
  /** @deprecated */
  envFile?: false;
  forceOptimizeDeps?: boolean;
}
interface ResolvedConfig extends Readonly<Omit<UserConfig, "plugins" | "css" | "json" | "assetsInclude" | "optimizeDeps" | "worker" | "build" | "dev" | "environments" | "experimental" | "future" | "server" | "preview"> & {
  configFile: string | undefined;
  configFileDependencies: string[];
  inlineConfig: InlineConfig;
  root: string;
  base: string;
  publicDir: string;
  cacheDir: string;
  command: "build" | "serve";
  mode: string;
  isWorker: boolean;
  isProduction: boolean;
  envDir: string | false;
  env: Record<string, any>;
  resolve: Required<ResolveOptions> & {
    alias: Alias[];
  };
  plugins: readonly Plugin[];
  css: ResolvedCSSOptions;
  json: Required<JsonOptions>;
  esbuild: ESBuildOptions | false;
  server: ResolvedServerOptions;
  dev: ResolvedDevEnvironmentOptions;
  /** @experimental */
  builder: ResolvedBuilderOptions | undefined;
  build: ResolvedBuildOptions;
  preview: ResolvedPreviewOptions;
  ssr: ResolvedSSROptions;
  assetsInclude: (file: string) => boolean;
  logger: Logger;
  /**
  * Create an internal resolver to be used in special scenarios, e.g.
  * optimizer & handling css `@imports`.
  *
  * This API is deprecated. It only works for the client and ssr
  * environments. The `aliasOnly` option is also not being used anymore.
  * Plugins should move to `createIdResolver(environment.config)` instead.
  *
  * @deprecated Use `createIdResolver` from `vite` instead.
  */
  createResolver: (options?: Partial<InternalResolveOptions>) => ResolveFn;
  optimizeDeps: DepOptimizationOptions;
  worker: ResolvedWorkerOptions;
  appType: AppType;
  experimental: RequiredExceptFor<ExperimentalOptions, "renderBuiltUrl">;
  future: FutureOptions | undefined;
  environments: Record<string, ResolvedEnvironmentOptions>;
  /**
  * The token to connect to the WebSocket server from browsers.
  *
  * We recommend using `import.meta.hot` rather than connecting
  * to the WebSocket server directly.
  * If you have a usecase that requires connecting to the WebSocket
  * server, please create an issue so that we can discuss.
  *
  * @deprecated
  */
  webSocketToken: string;
} & PluginHookUtils> {}
interface PluginHookUtils {
  getSortedPlugins: <K$1 extends keyof Plugin>(hookName: K$1) => PluginWithRequiredHook<K$1>[];
  getSortedPluginHooks: <K$1 extends keyof Plugin>(hookName: K$1) => NonNullable<HookHandler<Plugin[K$1]>>[];
}
type ResolveFn = (id: string, importer?: string, aliasOnly?: boolean, ssr?: boolean) => Promise<string | undefined>;
declare function resolveConfig(inlineConfig: InlineConfig, command: "build" | "serve", defaultMode?: string, defaultNodeEnv?: string, isPreview?: boolean, patchConfig?: ((config: ResolvedConfig) => void) | undefined, patchPlugins?: ((resolvedPlugins: Plugin[]) => void) | undefined): Promise<ResolvedConfig>;
declare function sortUserPlugins(plugins: (Plugin | Plugin[])[] | undefined): [Plugin[], Plugin[], Plugin[]];
declare function loadConfigFromFile(configEnv: ConfigEnv, configFile?: string, configRoot?: string, logLevel?: LogLevel, customLogger?: Logger, configLoader?: "bundle" | "runner" | "native"): Promise<{
  path: string;
  config: UserConfig;
  dependencies: string[];
} | null>;
//#endregion
//#region src/node/idResolver.d.ts
type ResolveIdFn = (environment: PartialEnvironment, id: string, importer?: string, aliasOnly?: boolean) => Promise<string | undefined>;
/**
* Create an internal resolver to be used in special scenarios, e.g.
* optimizer and handling css @imports
*/
declare function createIdResolver(config: ResolvedConfig, options?: Partial<InternalResolveOptions>): ResolveIdFn;
//#endregion
//#region src/node/server/middlewares/error.d.ts
declare function buildErrorMessage(err: RollupError, args?: string[], includeStack?: boolean): string;
//#endregion
//#region src/node/ssr/runtime/serverModuleRunner.d.ts
/**
* @experimental
*/
interface ServerModuleRunnerOptions extends Omit<ModuleRunnerOptions, "root" | "fetchModule" | "hmr" | "transport"> {
  /**
  * Disable HMR or configure HMR logger.
  */
  hmr?: false | {
    logger?: ModuleRunnerHmr["logger"];
  };
  /**
  * Provide a custom module evaluator. This controls how the code is executed.
  */
  evaluator?: ModuleEvaluator;
}
declare const createServerModuleRunnerTransport: (options: {
  channel: NormalizedServerHotChannel;
}) => ModuleRunnerTransport;
/**
* Create an instance of the Vite SSR runtime that support HMR.
* @experimental
*/
declare function createServerModuleRunner(environment: DevEnvironment, options?: ServerModuleRunnerOptions): ModuleRunner;
//#endregion
//#region src/node/server/environments/runnableEnvironment.d.ts
declare function createRunnableDevEnvironment(name: string, config: ResolvedConfig, context?: RunnableDevEnvironmentContext): RunnableDevEnvironment;
interface RunnableDevEnvironmentContext extends Omit<DevEnvironmentContext, "hot"> {
  runner?: (environment: RunnableDevEnvironment, options?: ServerModuleRunnerOptions) => ModuleRunner;
  runnerOptions?: ServerModuleRunnerOptions;
  hot?: boolean;
}
declare function isRunnableDevEnvironment(environment: Environment): environment is RunnableDevEnvironment;
declare class RunnableDevEnvironment extends DevEnvironment {
  private _runner;
  private _runnerFactory;
  private _runnerOptions;
  constructor(name: string, config: ResolvedConfig, context: RunnableDevEnvironmentContext);
  get runner(): ModuleRunner;
  close(): Promise<void>;
}
//#endregion
//#region src/node/server/environments/fetchableEnvironments.d.ts
interface FetchableDevEnvironmentContext extends DevEnvironmentContext {
  handleRequest(request: Request): Promise<Response> | Response;
}
declare function createFetchableDevEnvironment(name: string, config: ResolvedConfig, context: FetchableDevEnvironmentContext): FetchableDevEnvironment;
declare function isFetchableDevEnvironment(environment: Environment): environment is FetchableDevEnvironment;
declare class FetchableDevEnvironment extends DevEnvironment {
  private _handleRequest;
  constructor(name: string, config: ResolvedConfig, context: FetchableDevEnvironmentContext);
  dispatchFetch(request: Request): Promise<Response>;
}
//#endregion
//#region src/node/ssr/runnerImport.d.ts
interface RunnerImportResult<T$1> {
  module: T$1;
  dependencies: string[];
}
/**
* Import any file using the default Vite environment.
* @experimental
*/
declare function runnerImport<T$1>(moduleId: string, inlineConfig?: InlineConfig): Promise<RunnerImportResult<T$1>>;
//#endregion
//#region src/node/ssr/fetchModule.d.ts
interface FetchModuleOptions {
  cached?: boolean;
  inlineSourceMap?: boolean;
  startOffset?: number;
}
/**
* Fetch module information for Vite runner.
* @experimental
*/
declare function fetchModule(environment: DevEnvironment, url: string, importer?: string, options?: FetchModuleOptions): Promise<moduleRunner_FetchResult>;
//#endregion
//#region src/node/ssr/ssrTransform.d.ts
interface ModuleRunnerTransformOptions {
  json?: {
    stringify?: boolean;
  };
}
declare function ssrTransform(code: string, inMap: SourceMap | {
  mappings: "";
} | null, url: string, originalCode: string, options?: ModuleRunnerTransformOptions): Promise<TransformResult | null>;
//#endregion
//#region src/node/constants.d.ts
declare const VERSION: string;
declare const DEFAULT_CLIENT_MAIN_FIELDS: readonly string[];
declare const DEFAULT_SERVER_MAIN_FIELDS: readonly string[];
declare const DEFAULT_CLIENT_CONDITIONS: readonly string[];
declare const DEFAULT_SERVER_CONDITIONS: readonly string[];
declare const DEFAULT_EXTERNAL_CONDITIONS: readonly string[];
declare const defaultAllowedOrigins: RegExp;
//#endregion
//#region src/node/utils.d.ts
/**
* Inlined to keep `@rollup/pluginutils` in devDependencies
*/
type FilterPattern = ReadonlyArray<string | RegExp> | string | RegExp | null;
declare const createFilter: (include?: FilterPattern, exclude?: FilterPattern, options?: {
  resolve?: string | false | null;
}) => (id: string | unknown) => boolean;
declare const rollupVersion: string;
declare function normalizePath(id: string): string;
declare const isCSSRequest: (request: string) => boolean;
declare function mergeConfig<D extends Record<string, any>, O extends Record<string, any>>(defaults: D extends Function ? never : D, overrides: O extends Function ? never : O, isRoot?: boolean): Record<string, any>;
declare function mergeAlias(a?: AliasOptions, b?: AliasOptions): AliasOptions | undefined;
//#endregion
//#region src/node/server/send.d.ts
interface SendOptions {
  etag?: string;
  cacheControl?: string;
  headers?: OutgoingHttpHeaders;
  map?: SourceMap | {
    mappings: "";
  } | null;
}
declare function send(req: http.IncomingMessage, res: ServerResponse, content: string | Buffer, type: string, options: SendOptions): void;
//#endregion
//#region src/node/server/searchRoot.d.ts
/**
* Search up for the nearest workspace root
*/
declare function searchForWorkspaceRoot(current: string, root?: string): string;
//#endregion
//#region src/node/server/middlewares/static.d.ts
/**
* Check if the url is allowed to be served, via the `server.fs` config.
* @deprecated Use the `isFileLoadingAllowed` function instead.
*/
declare function isFileServingAllowed(config: ResolvedConfig, url: string): boolean;
declare function isFileServingAllowed(url: string, server: ViteDevServer): boolean;
/**
* Warning: parameters are not validated, only works with normalized absolute paths
*/
declare function isFileLoadingAllowed(config: ResolvedConfig, filePath: string): boolean;
//#endregion
//#region src/node/env.d.ts
declare function loadEnv(mode: string, envDir: string | false, prefixes?: string | string[]): Record<string, string>;
declare function resolveEnvPrefix({
  envPrefix
}: UserConfig): string[];
//#endregion
//#region src/node/plugins/manifest.d.ts
type Manifest = Record<string, ManifestChunk>;
interface ManifestChunk {
  /**
  * The input file name of this chunk / asset if known
  */
  src?: string;
  /**
  * The output file name of this chunk / asset
  */
  file: string;
  /**
  * The list of CSS files imported by this chunk
  *
  * This field is only present in JS chunks.
  */
  css?: string[];
  /**
  * The list of asset files imported by this chunk, excluding CSS files
  *
  * This field is only present in JS chunks.
  */
  assets?: string[];
  /**
  * Whether this chunk or asset is an entry point
  */
  isEntry?: boolean;
  /**
  * The name of this chunk / asset if known
  */
  name?: string;
  /**
  * Whether this chunk is a dynamic entry point
  *
  * This field is only present in JS chunks.
  */
  isDynamicEntry?: boolean;
  /**
  * The list of statically imported chunks by this chunk
  *
  * The values are the keys of the manifest. This field is only present in JS chunks.
  */
  imports?: string[];
  /**
  * The list of dynamically imported chunks by this chunk
  *
  * The values are the keys of the manifest. This field is only present in JS chunks.
  */
  dynamicImports?: string[];
}
//#endregion
export { type Alias, type AliasOptions, type AnymatchFn, type AnymatchPattern, type AppType, type BindCLIShortcutsOptions, type BuildAppHook, BuildEnvironment, type BuildEnvironmentOptions, type BuildOptions, type BuilderOptions, type CLIShortcut, type CSSModulesOptions, type CSSOptions, type ChunkMetadata, type CommonServerOptions, type ConfigEnv, type ConfigPluginContext, type Connect, type ConnectedPayload, type CorsOptions, type CorsOrigin, type CustomEventMap, type CustomPayload, type CustomPluginOptionsVite, type DepOptimizationConfig, type DepOptimizationMetadata, type DepOptimizationOptions, DevEnvironment, type DevEnvironmentContext, type DevEnvironmentOptions, type ESBuildOptions, type ESBuildTransformResult, type Environment, type EnvironmentModuleGraph, type EnvironmentModuleNode, type EnvironmentOptions, type ErrorPayload, type EsbuildTransformOptions, type ExperimentalOptions, type ExportsData, type FSWatcher, type FetchFunction, type FetchModuleOptions, type FetchResult, type FetchableDevEnvironment, type FetchableDevEnvironmentContext, type FileSystemServeOptions, type FilterPattern, type FullReloadPayload, type GeneralImportGlobOptions, type HMRPayload, type HTMLOptions, type HmrContext, type HmrOptions, type HookHandler, type HotChannel, type HotChannelClient, type HotChannelListener, type HotPayload, type HotUpdateOptions, type HtmlTagDescriptor, type index_d_exports as HttpProxy, type HttpServer, type ImportGlobFunction, type ImportGlobOptions, type IndexHtmlTransform, type IndexHtmlTransformContext, type IndexHtmlTransformHook, type IndexHtmlTransformResult, type InferCustomEventPayload, type InlineConfig, type InternalResolveOptions, type InvalidatePayload, type JsonOptions, type KnownAsTypeMap, type LegacyOptions, type LessPreprocessorOptions, type LibraryFormats, type LibraryOptions, type LightningCSSOptions, type LogErrorOptions, type LogLevel, type LogOptions, type LogType, type Logger, type LoggerOptions, type Manifest, type ManifestChunk, type MapToFunction, type AnymatchMatcher as Matcher, type MinimalPluginContextWithoutEnvironment, type ModuleGraph, type ModuleNode, type ModulePreloadOptions, type ModuleRunnerTransformOptions, type NormalizedHotChannel, type NormalizedHotChannelClient, type NormalizedServerHotChannel, type OptimizedDepInfo, type Plugin, type PluginContainer, type PluginHookUtils, type PluginOption, type PreprocessCSSResult, type PreviewOptions, type PreviewServer, type PreviewServerHook, type ProxyOptions, type PrunePayload, type RenderBuiltAssetUrl, type ResolveFn, type ResolveModulePreloadDependenciesFn, type ResolveOptions, type ResolvedBuildEnvironmentOptions, type ResolvedBuildOptions, type ResolvedCSSOptions, type ResolvedConfig, type ResolvedDevEnvironmentOptions, type ResolvedModulePreloadOptions, type ResolvedPreviewOptions, type ResolvedSSROptions, type ResolvedServerOptions, type ResolvedServerUrls, type ResolvedUrl, type ResolvedWorkerOptions, type ResolverFunction, type ResolverObject, type Rollup, type RollupCommonJSOptions, type RollupDynamicImportVarsOptions, type RunnableDevEnvironment, type RunnableDevEnvironmentContext, type SSROptions, type SSRTarget, type SassPreprocessorOptions, type SendOptions, type ServerHook, type ServerHotChannel, type ServerModuleRunnerOptions, type ServerOptions$1 as ServerOptions, type SkipInformation, type SsrDepOptimizationConfig, type StylusPreprocessorOptions, type Terser, type TerserOptions, type TransformOptions, type TransformResult, type Update, type UpdatePayload, type UserConfig, type UserConfigExport, type UserConfigFn, type UserConfigFnObject, type UserConfigFnPromise, type ViteBuilder, type ViteDevServer, type WatchOptions, type WebSocket, type WebSocketAlias, type WebSocketClient, type WebSocketCustomListener, type WebSocketServer, build, buildErrorMessage, createBuilder, createFetchableDevEnvironment, createFilter, createIdResolver, createLogger, createRunnableDevEnvironment, createServer, createServerHotChannel, createServerModuleRunner, createServerModuleRunnerTransport, defaultAllowedOrigins, DEFAULT_CLIENT_CONDITIONS as defaultClientConditions, DEFAULT_CLIENT_MAIN_FIELDS as defaultClientMainFields, DEFAULT_EXTERNAL_CONDITIONS as defaultExternalConditions, DEFAULT_SERVER_CONDITIONS as defaultServerConditions, DEFAULT_SERVER_MAIN_FIELDS as defaultServerMainFields, defineConfig, esbuildVersion, fetchModule, formatPostcssSourceMap, isCSSRequest, isFetchableDevEnvironment, isFileLoadingAllowed, isFileServingAllowed, isRunnableDevEnvironment, loadConfigFromFile, loadEnv, mergeAlias, mergeConfig, ssrTransform as moduleRunnerTransform, normalizePath, optimizeDeps, parseAst, parseAstAsync, perEnvironmentPlugin, perEnvironmentState, preprocessCSS, preview, resolveConfig, resolveEnvPrefix, rollupVersion, runnerImport, searchForWorkspaceRoot, send, sortUserPlugins, transformWithEsbuild, VERSION as version };web/node_modules/long/types.d.ts
// Common type definitions for both the ESM and UMD variants. The ESM variant
// reexports the Long class as its default export, whereas the UMD variant makes
// the Long class a whole-module export with a global variable fallback.

type LongLike =
  | Long
  | number
  | bigint
  | string
  | { low: number; high: number; unsigned: boolean };

export declare class Long {
  /**
   * Constructs a 64 bit two's-complement integer, given its low and high 32 bit values as signed integers. See the from* functions below for more convenient ways of constructing Longs.
   */
  constructor(low: number, high?: number, unsigned?: boolean);

  /**
   * Maximum unsigned value.
   */
  static MAX_UNSIGNED_VALUE: Long;

  /**
   * Maximum signed value.
   */
  static MAX_VALUE: Long;

  /**
   * Minimum signed value.
   */
  static MIN_VALUE: Long;

  /**
   * Signed negative one.
   */
  static NEG_ONE: Long;

  /**
   * Signed one.
   */
  static ONE: Long;

  /**
   * Unsigned one.
   */
  static UONE: Long;

  /**
   * Unsigned zero.
   */
  static UZERO: Long;

  /**
   * Signed zero
   */
  static ZERO: Long;

  /**
   * The high 32 bits as a signed value.
   */
  high: number;

  /**
   * The low 32 bits as a signed value.
   */
  low: number;

  /**
   * Whether unsigned or not.
   */
  unsigned: boolean;

  /**
   * Returns a Long representing the 64 bit integer that comes by concatenating the given low and high bits. Each is assumed to use 32 bits.
   */
  static fromBits(lowBits: number, highBits: number, unsigned?: boolean): Long;

  /**
   * Returns a Long representing the given 32 bit integer value.
   */
  static fromInt(value: number, unsigned?: boolean): Long;

  /**
   * Returns a Long representing the given value, provided that it is a finite number. Otherwise, zero is returned.
   */
  static fromNumber(value: number, unsigned?: boolean): Long;

  /**
   * Returns a Long representing the given big integer value.
   */
  static fromBigInt(value: bigint, unsigned?: boolean): Long;

  /**
   * Returns a Long representation of the given string, written using the specified radix.
   */
  static fromString(
    str: string,
    unsigned?: boolean | number,
    radix?: number,
  ): Long;

  /**
   * Creates a Long from its byte representation.
   */
  static fromBytes(bytes: number[], unsigned?: boolean, le?: boolean): Long;

  /**
   * Creates a Long from its little endian byte representation.
   */
  static fromBytesLE(bytes: number[], unsigned?: boolean): Long;

  /**
   * Creates a Long from its big endian byte representation.
   */
  static fromBytesBE(bytes: number[], unsigned?: boolean): Long;

  /**
   * Tests if the specified object is a Long.
   */
  static isLong(obj: any): obj is Long;

  /**
   * Converts the specified value to a Long.
   */
  static fromValue(val: LongLike, unsigned?: boolean): Long;

  /**
   * Returns the sum of this and the specified Long.
   */
  add(addend: LongLike): Long;

  /**
   * Returns the bitwise AND of this Long and the specified.
   */
  and(other: LongLike): Long;

  /**
   * Compares this Long's value with the specified's.
   */
  compare(other: LongLike): number;

  /**
   * Compares this Long's value with the specified's.
   */
  comp(other: LongLike): number;

  /**
   * Returns this Long divided by the specified.
   */
  divide(divisor: LongLike): Long;

  /**
   * Returns this Long divided by the specified.
   */
  div(divisor: LongLike): Long;

  /**
   * Tests if this Long's value equals the specified's.
   */
  equals(other: LongLike): boolean;

  /**
   * Tests if this Long's value equals the specified's.
   */
  eq(other: LongLike): boolean;

  /**
   * Gets the high 32 bits as a signed integer.
   */
  getHighBits(): number;

  /**
   * Gets the high 32 bits as an unsigned integer.
   */
  getHighBitsUnsigned(): number;

  /**
   * Gets the low 32 bits as a signed integer.
   */
  getLowBits(): number;

  /**
   * Gets the low 32 bits as an unsigned integer.
   */
  getLowBitsUnsigned(): number;

  /**
   * Gets the number of bits needed to represent the absolute value of this Long.
   */
  getNumBitsAbs(): number;

  /**
   * Tests if this Long's value is greater than the specified's.
   */
  greaterThan(other: LongLike): boolean;

  /**
   * Tests if this Long's value is greater than the specified's.
   */
  gt(other: LongLike): boolean;

  /**
   * Tests if this Long's value is greater than or equal the specified's.
   */
  greaterThanOrEqual(other: LongLike): boolean;

  /**
   * Tests if this Long's value is greater than or equal the specified's.
   */
  gte(other: LongLike): boolean;

  /**
   * Tests if this Long's value is greater than or equal the specified's.
   */
  ge(other: LongLike): boolean;

  /**
   * Tests if this Long's value is even.
   */
  isEven(): boolean;

  /**
   * Tests if this Long's value is negative.
   */
  isNegative(): boolean;

  /**
   * Tests if this Long's value is odd.
   */
  isOdd(): boolean;

  /**
   * Tests if this Long's value is positive or zero.
   */
  isPositive(): boolean;

  /**
   * Tests if this Long can be safely represented as a JavaScript number.
   */
  isSafeInteger(): boolean;

  /**
   * Tests if this Long's value equals zero.
   */
  isZero(): boolean;

  /**
   * Tests if this Long's value equals zero.
   */
  eqz(): boolean;

  /**
   * Tests if this Long's value is less than the specified's.
   */
  lessThan(other: LongLike): boolean;

  /**
   * Tests if this Long's value is less than the specified's.
   */
  lt(other: LongLike): boolean;

  /**
   * Tests if this Long's value is less than or equal the specified's.
   */
  lessThanOrEqual(other: LongLike): boolean;

  /**
   * Tests if this Long's value is less than or equal the specified's.
   */
  lte(other: LongLike): boolean;

  /**
   * Tests if this Long's value is less than or equal the specified's.
   */
  le(other: LongLike): boolean;

  /**
   * Returns this Long modulo the specified.
   */
  modulo(other: LongLike): Long;

  /**
   * Returns this Long modulo the specified.
   */
  mod(other: LongLike): Long;

  /**
   * Returns this Long modulo the specified.
   */
  rem(other: LongLike): Long;

  /**
   * Returns the product of this and the specified Long.
   */
  multiply(multiplier: LongLike): Long;

  /**
   * Returns the product of this and the specified Long.
   */
  mul(multiplier: LongLike): Long;

  /**
   * Negates this Long's value.
   */
  negate(): Long;

  /**
   * Negates this Long's value.
   */
  neg(): Long;

  /**
   * Returns the bitwise NOT of this Long.
   */
  not(): Long;

  /**
   * Returns count leading zeros of this Long.
   */
  countLeadingZeros(): number;

  /**
   * Returns count leading zeros of this Long.
   */
  clz(): number;

  /**
   * Returns count trailing zeros of this Long.
   */
  countTrailingZeros(): number;

  /**
   * Returns count trailing zeros of this Long.
   */
  ctz(): number;

  /**
   * Tests if this Long's value differs from the specified's.
   */
  notEquals(other: LongLike): boolean;

  /**
   * Tests if this Long's value differs from the specified's.
   */
  neq(other: LongLike): boolean;

  /**
   * Tests if this Long's value differs from the specified's.
   */
  ne(other: LongLike): boolean;

  /**
   * Returns the bitwise OR of this Long and the specified.
   */
  or(other: LongLike): Long;

  /**
   * Returns this Long with bits shifted to the left by the given amount.
   */
  shiftLeft(numBits: number | Long): Long;

  /**
   * Returns this Long with bits shifted to the left by the given amount.
   */
  shl(numBits: number | Long): Long;

  /**
   * Returns this Long with bits arithmetically shifted to the right by the given amount.
   */
  shiftRight(numBits: number | Long): Long;

  /**
   * Returns this Long with bits arithmetically shifted to the right by the given amount.
   */
  shr(numBits: number | Long): Long;

  /**
   * Returns this Long with bits logically shifted to the right by the given amount.
   */
  shiftRightUnsigned(numBits: number | Long): Long;

  /**
   * Returns this Long with bits logically shifted to the right by the given amount.
   */
  shru(numBits: number | Long): Long;

  /**
   * Returns this Long with bits logically shifted to the right by the given amount.
   */
  shr_u(numBits: number | Long): Long;

  /**
   * Returns this Long with bits rotated to the left by the given amount.
   */
  rotateLeft(numBits: number | Long): Long;

  /**
   * Returns this Long with bits rotated to the left by the given amount.
   */
  rotl(numBits: number | Long): Long;

  /**
   * Returns this Long with bits rotated to the right by the given amount.
   */
  rotateRight(numBits: number | Long): Long;

  /**
   * Returns this Long with bits rotated to the right by the given amount.
   */
  rotr(numBits: number | Long): Long;

  /**
   * Returns the difference of this and the specified Long.
   */
  subtract(subtrahend: LongLike): Long;

  /**
   * Returns the difference of this and the specified Long.
   */
  sub(subtrahend: LongLike): Long;

  /**
   * Converts the Long to a big integer.
   */
  toBigInt(): bigint;

  /**
   * Converts the Long to a 32 bit integer, assuming it is a 32 bit integer.
   */
  toInt(): number;

  /**
   * Converts the Long to a the nearest floating-point representation of this value (double, 53 bit mantissa).
   */
  toNumber(): number;

  /**
   * Converts this Long to its byte representation.
   */

  toBytes(le?: boolean): number[];

  /**
   * Converts this Long to its little endian byte representation.
   */

  toBytesLE(): number[];

  /**
   * Converts this Long to its big endian byte representation.
   */

  toBytesBE(): number[];

  /**
   * Converts this Long to signed.
   */
  toSigned(): Long;

  /**
   * Converts the Long to a string written in the specified radix.
   */
  toString(radix?: number): string;

  /**
   * Converts this Long to unsigned.
   */
  toUnsigned(): Long;

  /**
   * Returns the bitwise XOR of this Long and the given one.
   */
  xor(other: LongLike): Long;
}
web/node_modules/long/index.d.ts
import { Long } from "./types.js";
export default Long;
web/node_modules/long/umd/types.d.ts
// Common type definitions for both the ESM and UMD variants. The ESM variant
// reexports the Long class as its default export, whereas the UMD variant makes
// the Long class a whole-module export with a global variable fallback.

type LongLike =
  | Long
  | number
  | bigint
  | string
  | { low: number; high: number; unsigned: boolean };

export declare class Long {
  /**
   * Constructs a 64 bit two's-complement integer, given its low and high 32 bit values as signed integers. See the from* functions below for more convenient ways of constructing Longs.
   */
  constructor(low: number, high?: number, unsigned?: boolean);

  /**
   * Maximum unsigned value.
   */
  static MAX_UNSIGNED_VALUE: Long;

  /**
   * Maximum signed value.
   */
  static MAX_VALUE: Long;

  /**
   * Minimum signed value.
   */
  static MIN_VALUE: Long;

  /**
   * Signed negative one.
   */
  static NEG_ONE: Long;

  /**
   * Signed one.
   */
  static ONE: Long;

  /**
   * Unsigned one.
   */
  static UONE: Long;

  /**
   * Unsigned zero.
   */
  static UZERO: Long;

  /**
   * Signed zero
   */
  static ZERO: Long;

  /**
   * The high 32 bits as a signed value.
   */
  high: number;

  /**
   * The low 32 bits as a signed value.
   */
  low: number;

  /**
   * Whether unsigned or not.
   */
  unsigned: boolean;

  /**
   * Returns a Long representing the 64 bit integer that comes by concatenating the given low and high bits. Each is assumed to use 32 bits.
   */
  static fromBits(lowBits: number, highBits: number, unsigned?: boolean): Long;

  /**
   * Returns a Long representing the given 32 bit integer value.
   */
  static fromInt(value: number, unsigned?: boolean): Long;

  /**
   * Returns a Long representing the given value, provided that it is a finite number. Otherwise, zero is returned.
   */
  static fromNumber(value: number, unsigned?: boolean): Long;

  /**
   * Returns a Long representing the given big integer value.
   */
  static fromBigInt(value: bigint, unsigned?: boolean): Long;

  /**
   * Returns a Long representation of the given string, written using the specified radix.
   */
  static fromString(
    str: string,
    unsigned?: boolean | number,
    radix?: number,
  ): Long;

  /**
   * Creates a Long from its byte representation.
   */
  static fromBytes(bytes: number[], unsigned?: boolean, le?: boolean): Long;

  /**
   * Creates a Long from its little endian byte representation.
   */
  static fromBytesLE(bytes: number[], unsigned?: boolean): Long;

  /**
   * Creates a Long from its big endian byte representation.
   */
  static fromBytesBE(bytes: number[], unsigned?: boolean): Long;

  /**
   * Tests if the specified object is a Long.
   */
  static isLong(obj: any): obj is Long;

  /**
   * Converts the specified value to a Long.
   */
  static fromValue(val: LongLike, unsigned?: boolean): Long;

  /**
   * Returns the sum of this and the specified Long.
   */
  add(addend: LongLike): Long;

  /**
   * Returns the bitwise AND of this Long and the specified.
   */
  and(other: LongLike): Long;

  /**
   * Compares this Long's value with the specified's.
   */
  compare(other: LongLike): number;

  /**
   * Compares this Long's value with the specified's.
   */
  comp(other: LongLike): number;

  /**
   * Returns this Long divided by the specified.
   */
  divide(divisor: LongLike): Long;

  /**
   * Returns this Long divided by the specified.
   */
  div(divisor: LongLike): Long;

  /**
   * Tests if this Long's value equals the specified's.
   */
  equals(other: LongLike): boolean;

  /**
   * Tests if this Long's value equals the specified's.
   */
  eq(other: LongLike): boolean;

  /**
   * Gets the high 32 bits as a signed integer.
   */
  getHighBits(): number;

  /**
   * Gets the high 32 bits as an unsigned integer.
   */
  getHighBitsUnsigned(): number;

  /**
   * Gets the low 32 bits as a signed integer.
   */
  getLowBits(): number;

  /**
   * Gets the low 32 bits as an unsigned integer.
   */
  getLowBitsUnsigned(): number;

  /**
   * Gets the number of bits needed to represent the absolute value of this Long.
   */
  getNumBitsAbs(): number;

  /**
   * Tests if this Long's value is greater than the specified's.
   */
  greaterThan(other: LongLike): boolean;

  /**
   * Tests if this Long's value is greater than the specified's.
   */
  gt(other: LongLike): boolean;

  /**
   * Tests if this Long's value is greater than or equal the specified's.
   */
  greaterThanOrEqual(other: LongLike): boolean;

  /**
   * Tests if this Long's value is greater than or equal the specified's.
   */
  gte(other: LongLike): boolean;

  /**
   * Tests if this Long's value is greater than or equal the specified's.
   */
  ge(other: LongLike): boolean;

  /**
   * Tests if this Long's value is even.
   */
  isEven(): boolean;

  /**
   * Tests if this Long's value is negative.
   */
  isNegative(): boolean;

  /**
   * Tests if this Long's value is odd.
   */
  isOdd(): boolean;

  /**
   * Tests if this Long's value is positive or zero.
   */
  isPositive(): boolean;

  /**
   * Tests if this Long can be safely represented as a JavaScript number.
   */
  isSafeInteger(): boolean;

  /**
   * Tests if this Long's value equals zero.
   */
  isZero(): boolean;

  /**
   * Tests if this Long's value equals zero.
   */
  eqz(): boolean;

  /**
   * Tests if this Long's value is less than the specified's.
   */
  lessThan(other: LongLike): boolean;

  /**
   * Tests if this Long's value is less than the specified's.
   */
  lt(other: LongLike): boolean;

  /**
   * Tests if this Long's value is less than or equal the specified's.
   */
  lessThanOrEqual(other: LongLike): boolean;

  /**
   * Tests if this Long's value is less than or equal the specified's.
   */
  lte(other: LongLike): boolean;

  /**
   * Tests if this Long's value is less than or equal the specified's.
   */
  le(other: LongLike): boolean;

  /**
   * Returns this Long modulo the specified.
   */
  modulo(other: LongLike): Long;

  /**
   * Returns this Long modulo the specified.
   */
  mod(other: LongLike): Long;

  /**
   * Returns this Long modulo the specified.
   */
  rem(other: LongLike): Long;

  /**
   * Returns the product of this and the specified Long.
   */
  multiply(multiplier: LongLike): Long;

  /**
   * Returns the product of this and the specified Long.
   */
  mul(multiplier: LongLike): Long;

  /**
   * Negates this Long's value.
   */
  negate(): Long;

  /**
   * Negates this Long's value.
   */
  neg(): Long;

  /**
   * Returns the bitwise NOT of this Long.
   */
  not(): Long;

  /**
   * Returns count leading zeros of this Long.
   */
  countLeadingZeros(): number;

  /**
   * Returns count leading zeros of this Long.
   */
  clz(): number;

  /**
   * Returns count trailing zeros of this Long.
   */
  countTrailingZeros(): number;

  /**
   * Returns count trailing zeros of this Long.
   */
  ctz(): number;

  /**
   * Tests if this Long's value differs from the specified's.
   */
  notEquals(other: LongLike): boolean;

  /**
   * Tests if this Long's value differs from the specified's.
   */
  neq(other: LongLike): boolean;

  /**
   * Tests if this Long's value differs from the specified's.
   */
  ne(other: LongLike): boolean;

  /**
   * Returns the bitwise OR of this Long and the specified.
   */
  or(other: LongLike): Long;

  /**
   * Returns this Long with bits shifted to the left by the given amount.
   */
  shiftLeft(numBits: number | Long): Long;

  /**
   * Returns this Long with bits shifted to the left by the given amount.
   */
  shl(numBits: number | Long): Long;

  /**
   * Returns this Long with bits arithmetically shifted to the right by the given amount.
   */
  shiftRight(numBits: number | Long): Long;

  /**
   * Returns this Long with bits arithmetically shifted to the right by the given amount.
   */
  shr(numBits: number | Long): Long;

  /**
   * Returns this Long with bits logically shifted to the right by the given amount.
   */
  shiftRightUnsigned(numBits: number | Long): Long;

  /**
   * Returns this Long with bits logically shifted to the right by the given amount.
   */
  shru(numBits: number | Long): Long;

  /**
   * Returns this Long with bits logically shifted to the right by the given amount.
   */
  shr_u(numBits: number | Long): Long;

  /**
   * Returns this Long with bits rotated to the left by the given amount.
   */
  rotateLeft(numBits: number | Long): Long;

  /**
   * Returns this Long with bits rotated to the left by the given amount.
   */
  rotl(numBits: number | Long): Long;

  /**
   * Returns this Long with bits rotated to the right by the given amount.
   */
  rotateRight(numBits: number | Long): Long;

  /**
   * Returns this Long with bits rotated to the right by the given amount.
   */
  rotr(numBits: number | Long): Long;

  /**
   * Returns the difference of this and the specified Long.
   */
  subtract(subtrahend: LongLike): Long;

  /**
   * Returns the difference of this and the specified Long.
   */
  sub(subtrahend: LongLike): Long;

  /**
   * Converts the Long to a big integer.
   */
  toBigInt(): bigint;

  /**
   * Converts the Long to a 32 bit integer, assuming it is a 32 bit integer.
   */
  toInt(): number;

  /**
   * Converts the Long to a the nearest floating-point representation of this value (double, 53 bit mantissa).
   */
  toNumber(): number;

  /**
   * Converts this Long to its byte representation.
   */

  toBytes(le?: boolean): number[];

  /**
   * Converts this Long to its little endian byte representation.
   */

  toBytesLE(): number[];

  /**
   * Converts this Long to its big endian byte representation.
   */

  toBytesBE(): number[];

  /**
   * Converts this Long to signed.
   */
  toSigned(): Long;

  /**
   * Converts the Long to a string written in the specified radix.
   */
  toString(radix?: number): string;

  /**
   * Converts this Long to unsigned.
   */
  toUnsigned(): Long;

  /**
   * Returns the bitwise XOR of this Long and the given one.
   */
  xor(other: LongLike): Long;
}
web/node_modules/long/umd/index.d.ts
import { Long } from "./types.js";
export = Long;
export as namespace Long;
web/node_modules/json5/lib/util.d.ts
export declare function isSpaceSeparator(c?: string): boolean
export declare function isIdStartChar(c?: string): boolean
export declare function isIdContinueChar(c?: string): boolean
export declare function isDigit(c?: string): boolean
export declare function isHexDigit(c?: string): boolean
web/node_modules/json5/lib/parse.d.ts
/**
 * Parses a JSON5 string, constructing the JavaScript value or object described
 * by the string.
 * @template T The type of the return value.
 * @param text The string to parse as JSON5.
 * @param reviver A function that prescribes how the value originally produced
 * by parsing is transformed before being returned.
 * @returns The JavaScript value converted from the JSON5 string.
 */
declare function parse<T = any>(
    text: string,
    reviver?: ((this: any, key: string, value: any) => any) | null,
): T

export = parse
web/node_modules/json5/lib/stringify.d.ts
declare type StringifyOptions = {
    /**
     * A function that alters the behavior of the stringification process, or an
     * array of String and Number objects that serve as a allowlist for
     * selecting/filtering the properties of the value object to be included in
     * the JSON5 string. If this value is null or not provided, all properties
     * of the object are included in the resulting JSON5 string.
     */
    replacer?:
        | ((this: any, key: string, value: any) => any)
        | (string | number)[]
        | null

    /**
     * A String or Number object that's used to insert white space into the
     * output JSON5 string for readability purposes. If this is a Number, it
     * indicates the number of space characters to use as white space; this
     * number is capped at 10 (if it is greater, the value is just 10). Values
     * less than 1 indicate that no space should be used. If this is a String,
     * the string (or the first 10 characters of the string, if it's longer than
     * that) is used as white space. If this parameter is not provided (or is
     * null), no white space is used. If white space is used, trailing commas
     * will be used in objects and arrays.
     */
    space?: string | number | null

    /**
     * A String representing the quote character to use when serializing
     * strings.
     */
    quote?: string | null
}

/**
 * Converts a JavaScript value to a JSON5 string.
 * @param value The value to convert to a JSON5 string.
 * @param replacer A function that alters the behavior of the stringification
 * process. If this value is null or not provided, all properties of the object
 * are included in the resulting JSON5 string.
 * @param space A String or Number object that's used to insert white space into
 * the output JSON5 string for readability purposes. If this is a Number, it
 * indicates the number of space characters to use as white space; this number
 * is capped at 10 (if it is greater, the value is just 10). Values less than 1
 * indicate that no space should be used. If this is a String, the string (or
 * the first 10 characters of the string, if it's longer than that) is used as
 * white space. If this parameter is not provided (or is null), no white space
 * is used. If white space is used, trailing commas will be used in objects and
 * arrays.
 * @returns The JSON5 string converted from the JavaScript value.
 */
declare function stringify(
    value: any,
    replacer?: ((this: any, key: string, value: any) => any) | null,
    space?: string | number | null,
): string

/**
 * Converts a JavaScript value to a JSON5 string.
 * @param value The value to convert to a JSON5 string.
 * @param replacer An array of String and Number objects that serve as a
 * allowlist for selecting/filtering the properties of the value object to be
 * included in the JSON5 string. If this value is null or not provided, all
 * properties of the object are included in the resulting JSON5 string.
 * @param space A String or Number object that's used to insert white space into
 * the output JSON5 string for readability purposes. If this is a Number, it
 * indicates the number of space characters to use as white space; this number
 * is capped at 10 (if it is greater, the value is just 10). Values less than 1
 * indicate that no space should be used. If this is a String, the string (or
 * the first 10 characters of the string, if it's longer than that) is used as
 * white space. If this parameter is not provided (or is null), no white space
 * is used. If white space is used, trailing commas will be used in objects and
 * arrays.
 * @returns The JSON5 string converted from the JavaScript value.
 */
declare function stringify(
    value: any,
    replacer: (string | number)[],
    space?: string | number | null,
): string

/**
 * Converts a JavaScript value to a JSON5 string.
 * @param value The value to convert to a JSON5 string.
 * @param options An object specifying options.
 * @returns The JSON5 string converted from the JavaScript value.
 */
declare function stringify(value: any, options: StringifyOptions): string

export = stringify
web/node_modules/json5/lib/index.d.ts
import parse = require('./parse')
import stringify = require('./stringify')

export {parse, stringify}
web/node_modules/json5/lib/unicode.d.ts
export declare const Space_Separator: RegExp
export declare const ID_Start: RegExp
export declare const ID_Continue: RegExp
web/node_modules/update-browserslist-db/index.d.ts
/**
 * Run update and print output to terminal.
 */
declare function updateDb(print?: (str: string) => void): void

export = updateDb
web/node_modules/framer-motion/dist/debug.d.ts
export * from 'motion-dom';
export { recordStats } from 'motion-dom';
web/node_modules/framer-motion/dist/types.d-DagZKalS.d.ts
/// <reference types="react" />
import * as motion_dom from 'motion-dom';
import { TransformProperties, MotionNodeOptions, MotionValue, SVGPathProperties, Transition, JSAnimation, ValueTransition, TargetAndTransition, AnyResolvedKeyframe, KeyframeResolver, AnimationDefinition, Batcher } from 'motion-dom';
import { TransformPoint, Box, Delta, Point, Axis } from 'motion-utils';
import * as React$1 from 'react';
import { CSSProperties, PropsWithoutRef, RefAttributes, JSX, SVGAttributes } from 'react';

/**
 * Either a string, or array of strings, that reference variants defined via the `variants` prop.
 * @public
 */
type VariantLabels = string | string[];

type MotionValueString = MotionValue<string>;
type MotionValueNumber = MotionValue<number>;
type MotionValueAny = MotionValue<any>;
type AnyMotionValue = MotionValueNumber | MotionValueString | MotionValueAny;
type MotionValueHelper<T> = T | AnyMotionValue;
type MakeMotionHelper<T> = {
    [K in keyof T]: MotionValueHelper<T[K]>;
};
type MakeCustomValueTypeHelper<T> = MakeMotionHelper<T>;
type MakeMotion<T> = MakeCustomValueTypeHelper<T>;
type MotionCSS = MakeMotion<Omit<CSSProperties, "rotate" | "scale" | "perspective">>;
/**
 * @public
 */
type MotionTransform = MakeMotion<TransformProperties>;
type MotionSVGProps = MakeMotion<SVGPathProperties>;
/**
 * @public
 */
interface MotionStyle extends MotionCSS, MotionTransform, MotionSVGProps {
}
/**
 * Props for `motion` components.
 *
 * @public
 */
interface MotionProps extends MotionNodeOptions {
    /**
     *
     * The React DOM `style` prop, enhanced with support for `MotionValue`s and separate `transform` values.
     *
     * ```jsx
     * export const MyComponent = () => {
     *   const x = useMotionValue(0)
     *
     *   return <motion.div style={{ x, opacity: 1, scale: 0.5 }} />
     * }
     * ```
     */
    style?: MotionStyle;
    children?: React.ReactNode | MotionValueNumber | MotionValueString;
}

type ReducedMotionConfig = "always" | "never" | "user";
/**
 * @public
 */
interface MotionConfigContext {
    /**
     * Internal, exported only for usage in Framer
     */
    transformPagePoint: TransformPoint;
    /**
     * Internal. Determines whether this is a static context ie the Framer canvas. If so,
     * it'll disable all dynamic functionality.
     */
    isStatic: boolean;
    /**
     * Defines a new default transition for the entire tree.
     *
     * @public
     */
    transition?: Transition;
    /**
     * If true, will respect the device prefersReducedMotion setting by switching
     * transform animations off.
     *
     * @public
     */
    reducedMotion?: ReducedMotionConfig;
    /**
     * A custom `nonce` attribute used when wanting to enforce a Content Security Policy (CSP).
     * For more details see:
     * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/style-src#unsafe_inline_styles
     *
     * @public
     */
    nonce?: string;
}
/**
 * @public
 */
declare const MotionConfigContext: React$1.Context<MotionConfigContext>;

/**
 * @public
 */
interface PresenceContextProps {
    id: string;
    isPresent: boolean;
    register: (id: string | number) => () => void;
    onExitComplete?: (id: string | number) => void;
    initial?: false | VariantLabels;
    custom?: any;
}
/**
 * @public
 */
declare const PresenceContext: React$1.Context<PresenceContextProps | null>;

interface VisualState<Instance, RenderState> {
    renderState: RenderState;
    latestValues: ResolvedValues;
    onMount?: (instance: Instance) => void;
}
type UseVisualState<Instance, RenderState> = (props: MotionProps, isStatic: boolean) => VisualState<Instance, RenderState>;
interface UseVisualStateConfig<RenderState> {
    scrapeMotionValuesFromProps: ScrapeMotionValuesFromProps;
    createRenderState: () => RenderState;
}
declare const makeUseVisualState: <I, RS>(config: UseVisualStateConfig<RS>) => UseVisualState<I, RS>;

interface HTMLElements {
    a: HTMLAnchorElement;
    abbr: HTMLElement;
    address: HTMLElement;
    area: HTMLAreaElement;
    article: HTMLElement;
    aside: HTMLElement;
    audio: HTMLAudioElement;
    b: HTMLElement;
    base: HTMLBaseElement;
    bdi: HTMLElement;
    bdo: HTMLElement;
    big: HTMLElement;
    blockquote: HTMLQuoteElement;
    body: HTMLBodyElement;
    br: HTMLBRElement;
    button: HTMLButtonElement;
    canvas: HTMLCanvasElement;
    caption: HTMLElement;
    center: HTMLElement;
    cite: HTMLElement;
    code: HTMLElement;
    col: HTMLTableColElement;
    colgroup: HTMLTableColElement;
    data: HTMLDataElement;
    datalist: HTMLDataListElement;
    dd: HTMLElement;
    del: HTMLModElement;
    details: HTMLDetailsElement;
    dfn: HTMLElement;
    dialog: HTMLDialogElement;
    div: HTMLDivElement;
    dl: HTMLDListElement;
    dt: HTMLElement;
    em: HTMLElement;
    embed: HTMLEmbedElement;
    fieldset: HTMLFieldSetElement;
    figcaption: HTMLElement;
    figure: HTMLElement;
    footer: HTMLElement;
    form: HTMLFormElement;
    h1: HTMLHeadingElement;
    h2: HTMLHeadingElement;
    h3: HTMLHeadingElement;
    h4: HTMLHeadingElement;
    h5: HTMLHeadingElement;
    h6: HTMLHeadingElement;
    head: HTMLHeadElement;
    header: HTMLElement;
    hgroup: HTMLElement;
    hr: HTMLHRElement;
    html: HTMLHtmlElement;
    i: HTMLElement;
    iframe: HTMLIFrameElement;
    img: HTMLImageElement;
    input: HTMLInputElement;
    ins: HTMLModElement;
    kbd: HTMLElement;
    keygen: HTMLElement;
    label: HTMLLabelElement;
    legend: HTMLLegendElement;
    li: HTMLLIElement;
    link: HTMLLinkElement;
    main: HTMLElement;
    map: HTMLMapElement;
    mark: HTMLElement;
    menu: HTMLElement;
    menuitem: HTMLElement;
    meta: HTMLMetaElement;
    meter: HTMLMeterElement;
    nav: HTMLElement;
    noindex: HTMLElement;
    noscript: HTMLElement;
    object: HTMLObjectElement;
    ol: HTMLOListElement;
    optgroup: HTMLOptGroupElement;
    option: HTMLOptionElement;
    output: HTMLOutputElement;
    p: HTMLParagraphElement;
    param: HTMLParamElement;
    picture: HTMLElement;
    pre: HTMLPreElement;
    progress: HTMLProgressElement;
    q: HTMLQuoteElement;
    rp: HTMLElement;
    rt: HTMLElement;
    ruby: HTMLElement;
    s: HTMLElement;
    samp: HTMLElement;
    search: HTMLElement;
    slot: HTMLSlotElement;
    script: HTMLScriptElement;
    section: HTMLElement;
    select: HTMLSelectElement;
    small: HTMLElement;
    source: HTMLSourceElement;
    span: HTMLSpanElement;
    strong: HTMLElement;
    style: HTMLStyleElement;
    sub: HTMLElement;
    summary: HTMLElement;
    sup: HTMLElement;
    table: HTMLTableElement;
    template: HTMLTemplateElement;
    tbody: HTMLTableSectionElement;
    td: HTMLTableDataCellElement;
    textarea: HTMLTextAreaElement;
    tfoot: HTMLTableSectionElement;
    th: HTMLTableHeaderCellElement;
    thead: HTMLTableSectionElement;
    time: HTMLTimeElement;
    title: HTMLTitleElement;
    tr: HTMLTableRowElement;
    track: HTMLTrackElement;
    u: HTMLElement;
    ul: HTMLUListElement;
    var: HTMLElement;
    video: HTMLVideoElement;
    wbr: HTMLElement;
    webview: HTMLWebViewElement;
}

interface TransformOrigin {
    originX?: number | string;
    originY?: number | string;
    originZ?: number | string;
}
interface HTMLRenderState {
    /**
     * A mutable record of transforms we want to apply directly to the rendered Element
     * every frame. We use a mutable data structure to reduce GC during animations.
     */
    transform: ResolvedValues;
    /**
     * A mutable record of transform origins we want to apply directly to the rendered Element
     * every frame. We use a mutable data structure to reduce GC during animations.
     */
    transformOrigin: TransformOrigin;
    /**
     * A mutable record of styles we want to apply directly to the rendered Element
     * every frame. We use a mutable data structure to reduce GC during animations.
     */
    style: ResolvedValues;
    /**
     * A mutable record of CSS variables we want to apply directly to the rendered Element
     * every frame. We use a mutable data structure to reduce GC during animations.
     */
    vars: ResolvedValues;
}
/**
 * @public
 */
type ForwardRefComponent<T, P> = {
    readonly $$typeof: symbol;
} & ((props: PropsWithoutRef<P> & RefAttributes<T>) => JSX.Element);
type AttributesWithoutMotionProps<Attributes> = {
    [K in Exclude<keyof Attributes, keyof MotionProps>]?: Attributes[K];
};
/**
 * @public
 */
type HTMLMotionProps<Tag extends keyof HTMLElements> = AttributesWithoutMotionProps<JSX.IntrinsicElements[Tag]> & MotionProps;
/**
 * Motion-optimised versions of React's HTML components.
 *
 * @public
 */
type HTMLMotionComponents = {
    [K in keyof HTMLElements]: ForwardRefComponent<HTMLElements[K], HTMLMotionProps<K>>;
};

type UnionStringArray<T extends Readonly<string[]>> = T[number];
declare const svgElements: readonly ["animate", "circle", "defs", "desc", "ellipse", "g", "image", "line", "filter", "marker", "mask", "metadata", "path", "pattern", "polygon", "polyline", "rect", "stop", "svg", "switch", "symbol", "text", "tspan", "use", "view", "clipPath", "feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence", "foreignObject", "linearGradient", "radialGradient", "textPath"];
type SVGElements = UnionStringArray<typeof svgElements>;

interface SVGAttributesWithoutMotionProps<T> extends Pick<SVGAttributes<T>, Exclude<keyof SVGAttributes<T>, keyof MotionProps>> {
}
/**
 * Blanket-accept any SVG attribute as a `MotionValue`
 * @public
 */
type SVGAttributesAsMotionValues<T> = MakeMotion<SVGAttributesWithoutMotionProps<T>>;
type UnwrapSVGFactoryElement<F> = F extends React.SVGProps<infer P> ? P : never;
/**
 * @public
 */
interface SVGMotionProps<T> extends SVGAttributesAsMotionValues<T>, MotionProps {
}
/**
 * Motion-optimised versions of React's SVG components.
 *
 * @public
 */
type SVGMotionComponents = {
    [K in SVGElements]: ForwardRefComponent<UnwrapSVGFactoryElement<JSX.IntrinsicElements[K]>, SVGMotionProps<UnwrapSVGFactoryElement<JSX.IntrinsicElements[K]>>>;
};

type DOMMotionComponents = HTMLMotionComponents & SVGMotionComponents;

interface SwitchLayoutGroup {
    register?: (member: IProjectionNode) => void;
    deregister?: (member: IProjectionNode) => void;
}
type InitialPromotionConfig = {
    /**
     * The initial transition to use when the elements in this group mount (and automatically promoted).
     * Subsequent updates should provide a transition in the promote method.
     */
    transition?: Transition;
    /**
     * If the follow tree should preserve its opacity when the lead is promoted on mount
     */
    shouldPreserveFollowOpacity?: (member: IProjectionNode) => boolean;
};
type SwitchLayoutGroupContext = SwitchLayoutGroup & InitialPromotionConfig;
/**
 * Internal, exported only for usage in Framer
 */
declare const SwitchLayoutGroupContext: React$1.Context<SwitchLayoutGroupContext>;

interface WithDepth {
    depth: number;
}

declare class FlatTree {
    private children;
    private isDirty;
    add(child: WithDepth): void;
    remove(child: WithDepth): void;
    forEach(callback: (child: WithDepth) => void): void;
}

declare class NodeStack {
    lead?: IProjectionNode;
    prevLead?: IProjectionNode;
    members: IProjectionNode[];
    add(node: IProjectionNode): void;
    remove(node: IProjectionNode): void;
    relegate(node: IProjectionNode): boolean;
    promote(node: IProjectionNode, preserveFollowOpacity?: boolean): void;
    exitAnimationComplete(): void;
    scheduleRender(): void;
    /**
     * Clear any leads that have been removed this render to prevent them from being
     * used in future animations and to prevent memory leaks
     */
    removeLeadSnapshot(): void;
}

interface Measurements {
    animationId: number;
    measuredBox: Box;
    layoutBox: Box;
    latestValues: ResolvedValues;
    source: number;
}
type Phase = "snapshot" | "measure";
interface ScrollMeasurements {
    animationId: number;
    phase: Phase;
    offset: Point;
    isRoot: boolean;
    wasRoot: boolean;
}
type LayoutEvents = "willUpdate" | "didUpdate" | "beforeMeasure" | "measure" | "projectionUpdate" | "animationStart" | "animationComplete";
interface IProjectionNode<I = unknown> {
    linkedParentVersion: number;
    layoutVersion: number;
    id: number;
    animationId: number;
    animationCommitId: number;
    parent?: IProjectionNode;
    relativeParent?: IProjectionNode;
    root?: IProjectionNode;
    children: Set<IProjectionNode>;
    path: IProjectionNode[];
    nodes?: FlatTree;
    depth: number;
    instance: I | undefined;
    mount: (node: I, isLayoutDirty?: boolean) => void;
    unmount: () => void;
    options: ProjectionNodeOptions;
    setOptions(options: ProjectionNodeOptions): void;
    layout?: Measurements;
    snapshot?: Measurements;
    target?: Box;
    relativeTarget?: Box;
    relativeTargetOrigin?: Box;
    targetDelta?: Delta;
    targetWithTransforms?: Box;
    scroll?: ScrollMeasurements;
    treeScale?: Point;
    projectionDelta?: Delta;
    projectionDeltaWithTransform?: Delta;
    latestValues: ResolvedValues;
    isLayoutDirty: boolean;
    isProjectionDirty: boolean;
    isSharedProjectionDirty: boolean;
    isTransformDirty: boolean;
    resolvedRelativeTargetAt?: number;
    shouldResetTransform: boolean;
    prevTransformTemplateValue: string | undefined;
    isUpdateBlocked(): boolean;
    updateManuallyBlocked: boolean;
    updateBlockedByResize: boolean;
    blockUpdate(): void;
    unblockUpdate(): void;
    isUpdating: boolean;
    needsReset: boolean;
    startUpdate(): void;
    willUpdate(notifyListeners?: boolean): void;
    didUpdate(): void;
    measure(removeTransform?: boolean): Measurements;
    measurePageBox(): Box;
    updateLayout(): void;
    updateSnapshot(): void;
    clearSnapshot(): void;
    updateScroll(phase?: Phase): void;
    scheduleUpdateProjection(): void;
    scheduleCheckAfterUnmount(): void;
    checkUpdateFailed(): void;
    sharedNodes: Map<string, NodeStack>;
    registerSharedNode(id: string, node: IProjectionNode): void;
    getStack(): NodeStack | undefined;
    isVisible: boolean;
    hide(): void;
    show(): void;
    scheduleRender(notifyAll?: boolean): void;
    getClosestProjectingParent(): IProjectionNode | undefined;
    setTargetDelta(delta: Delta): void;
    resetTransform(): void;
    resetSkewAndRotation(): void;
    applyTransform(box: Box, transformOnly?: boolean): Box;
    resolveTargetDelta(force?: boolean): void;
    calcProjection(): void;
    applyProjectionStyles(targetStyle: CSSStyleDeclaration, styleProp?: MotionStyle): void;
    clearMeasurements(): void;
    resetTree(): void;
    isProjecting(): boolean;
    animationValues?: ResolvedValues;
    currentAnimation?: JSAnimation<number>;
    isTreeAnimating?: boolean;
    isAnimationBlocked?: boolean;
    isTreeAnimationBlocked: () => boolean;
    setAnimationOrigin(delta: Delta): void;
    startAnimation(transition: ValueTransition): void;
    finishAnimation(): void;
    hasCheckedOptimisedAppear: boolean;
    isLead(): boolean;
    promote(options?: {
        needsReset?: boolean;
        transition?: Transition;
        preserveFollowOpacity?: boolean;
    }): void;
    relegate(): boolean;
    resumeFrom?: IProjectionNode;
    resumingFrom?: IProjectionNode;
    isPresent?: boolean;
    addEventListener(name: LayoutEvents, handler: any): VoidFunction;
    notifyListeners(name: LayoutEvents, ...args: any): void;
    hasListeners(name: LayoutEvents): boolean;
    hasTreeAnimated: boolean;
    preserveOpacity?: boolean;
}
interface ProjectionNodeOptions {
    animate?: boolean;
    layoutScroll?: boolean;
    layoutRoot?: boolean;
    alwaysMeasureLayout?: boolean;
    onExitComplete?: VoidFunction;
    animationType?: "size" | "position" | "both" | "preserve-aspect";
    layoutId?: string;
    layout?: boolean | string;
    visualElement?: VisualElement;
    crossfade?: boolean;
    transition?: Transition;
    initialPromotionConfig?: InitialPromotionConfig;
}

type AnimationType = "animate" | "whileHover" | "whileTap" | "whileDrag" | "whileFocus" | "whileInView" | "exit";

type VisualElementAnimationOptions = {
    delay?: number;
    transitionOverride?: Transition;
    custom?: any;
    type?: AnimationType;
};

interface AnimationState {
    animateChanges: (type?: AnimationType) => Promise<any>;
    setActive: (type: AnimationType, isActive: boolean, options?: VisualElementAnimationOptions) => Promise<any>;
    setAnimateFunction: (fn: any) => void;
    getState: () => {
        [key: string]: AnimationTypeState;
    };
    reset: () => void;
}
interface AnimationTypeState {
    isActive: boolean;
    protectedKeys: {
        [key: string]: true;
    };
    needsAnimating: {
        [key: string]: boolean;
    };
    prevResolvedValues: {
        [key: string]: any;
    };
    prevProp?: VariantLabels | TargetAndTransition;
}

/**
 * A VisualElement is an imperative abstraction around UI elements such as
 * HTMLElement, SVGElement, Three.Object3D etc.
 */
declare abstract class VisualElement<Instance = unknown, RenderState = unknown, Options extends {} = {}> {
    /**
     * VisualElements are arranged in trees mirroring that of the React tree.
     * Each type of VisualElement has a unique name, to detect when we're crossing
     * type boundaries within that tree.
     */
    abstract type: string;
    /**
     * An `Array.sort` compatible function that will compare two Instances and
     * compare their respective positions within the tree.
     */
    abstract sortInstanceNodePosition(a: Instance, b: Instance): number;
    /**
     * Measure the viewport-relative bounding box of the Instance.
     */
    abstract measureInstanceViewportBox(instance: Instance, props: MotionProps & Partial<MotionConfigContext>): Box;
    /**
     * When a value has been removed from all animation props we need to
     * pick a target to animate back to. For instance, for HTMLElements
     * we can look in the style prop.
     */
    abstract getBaseTargetFromProps(props: MotionProps, key: string): AnyResolvedKeyframe | undefined | MotionValue;
    /**
     * When we first animate to a value we need to animate it *from* a value.
     * Often this have been specified via the initial prop but it might be
     * that the value needs to be read from the Instance.
     */
    abstract readValueFromInstance(instance: Instance, key: string, options: Options): AnyResolvedKeyframe | null | undefined;
    /**
     * When a value has been removed from the VisualElement we use this to remove
     * it from the inherting class' unique render state.
     */
    abstract removeValueFromRenderState(key: string, renderState: RenderState): void;
    /**
     * Run before a React or VisualElement render, builds the latest motion
     * values into an Instance-specific format. For example, HTMLVisualElement
     * will use this step to build `style` and `var` values.
     */
    abstract build(renderState: RenderState, latestValues: ResolvedValues, props: MotionProps): void;
    /**
     * Apply the built values to the Instance. For example, HTMLElements will have
     * styles applied via `setProperty` and the style attribute, whereas SVGElements
     * will have values applied to attributes.
     */
    abstract renderInstance(instance: Instance, renderState: RenderState, styleProp?: MotionStyle, projection?: IProjectionNode): void;
    /**
     * This method is called when a transform property is bound to a motion value.
     * It's currently used to measure SVG elements when a new transform property is bound.
     */
    onBindTransform?(): void;
    /**
     * If the component child is provided as a motion value, handle subscriptions
     * with the renderer-specific VisualElement.
     */
    handleChildMotionValue?(): void;
    /**
     * This method takes React props and returns found MotionValues. For example, HTML
     * MotionValues will be found within the style prop, whereas for Three.js within attribute arrays.
     *
     * This isn't an abstract method as it needs calling in the constructor, but it is
     * intended to be one.
     */
    scrapeMotionValuesFromProps(_props: MotionProps, _prevProps: MotionProps, _visualElement: VisualElement): {
        [key: string]: MotionValue | AnyResolvedKeyframe;
    };
    /**
     * A reference to the current underlying Instance, e.g. a HTMLElement
     * or Three.Mesh etc.
     */
    current: Instance | null;
    /**
     * A reference to the parent VisualElement (if exists).
     */
    parent: VisualElement | undefined;
    /**
     * A set containing references to this VisualElement's children.
     */
    children: Set<VisualElement<unknown, unknown, {}>>;
    /**
     * A set containing the latest children of this VisualElement. This is flushed
     * at the start of every commit. We use it to calculate the stagger delay
     * for newly-added children.
     */
    enteringChildren?: Set<VisualElement>;
    /**
     * The depth of this VisualElement within the overall VisualElement tree.
     */
    depth: number;
    /**
     * The current render state of this VisualElement. Defined by inherting VisualElements.
     */
    renderState: RenderState;
    /**
     * An object containing the latest static values for each of this VisualElement's
     * MotionValues.
     */
    latestValues: ResolvedValues;
    /**
     * Determine what role this visual element should take in the variant tree.
     */
    isVariantNode: boolean;
    isControllingVariants: boolean;
    /**
     * If this component is part of the variant tree, it should track
     * any children that are also part of the tree. This is essentially
     * a shadow tree to simplify logic around how to stagger over children.
     */
    variantChildren?: Set<VisualElement>;
    /**
     * Decides whether this VisualElement should animate in reduced motion
     * mode.
     *
     * TODO: This is currently set on every individual VisualElement but feels
     * like it could be set globally.
     */
    shouldReduceMotion: boolean | null;
    /**
     * Normally, if a component is controlled by a parent's variants, it can
     * rely on that ancestor to trigger animations further down the tree.
     * However, if a component is created after its parent is mounted, the parent
     * won't trigger that mount animation so the child needs to.
     *
     * TODO: This might be better replaced with a method isParentMounted
     */
    manuallyAnimateOnMount: boolean;
    /**
     * This can be set by AnimatePresence to force components that mount
     * at the same time as it to mount as if they have initial={false} set.
     */
    blockInitialAnimation: boolean;
    /**
     * A reference to this VisualElement's projection node, used in layout animations.
     */
    projection?: IProjectionNode;
    /**
     * A map of all motion values attached to this visual element. Motion
     * values are source of truth for any given animated value. A motion
     * value might be provided externally by the component via props.
     */
    values: Map<string, MotionValue<any>>;
    /**
     * The AnimationState, this is hydrated by the animation Feature.
     */
    animationState?: AnimationState;
    KeyframeResolver: typeof KeyframeResolver;
    /**
     * The options used to create this VisualElement. The Options type is defined
     * by the inheriting VisualElement and is passed straight through to the render functions.
     */
    readonly options: Options;
    /**
     * A reference to the latest props provided to the VisualElement's host React component.
     */
    props: MotionProps;
    prevProps?: MotionProps;
    presenceContext: PresenceContextProps | null;
    prevPresenceContext?: PresenceContextProps | null;
    /**
     * Cleanup functions for active features (hover/tap/exit etc)
     */
    private features;
    /**
     * A map of every subscription that binds the provided or generated
     * motion values onChange listeners to this visual element.
     */
    private valueSubscriptions;
    /**
     * A reference to the ReducedMotionConfig passed to the VisualElement's host React component.
     */
    private reducedMotionConfig;
    /**
     * On mount, this will be hydrated with a callback to disconnect
     * this visual element from its parent on unmount.
     */
    private removeFromVariantTree;
    /**
     * A reference to the previously-provided motion values as returned
     * from scrapeMotionValuesFromProps. We use the keys in here to determine
     * if any motion values need to be removed after props are updated.
     */
    private prevMotionValues;
    /**
     * When values are removed from all animation props we need to search
     * for a fallback value to animate to. These values are tracked in baseTarget.
     */
    private baseTarget;
    /**
     * Create an object of the values we initially animated from (if initial prop present).
     */
    private initialValues;
    /**
     * An object containing a SubscriptionManager for each active event.
     */
    private events;
    /**
     * An object containing an unsubscribe function for each prop event subscription.
     * For example, every "Update" event can have multiple subscribers via
     * VisualElement.on(), but only one of those can be defined via the onUpdate prop.
     */
    private propEventSubscriptions;
    constructor({ parent, props, presenceContext, reducedMotionConfig, blockInitialAnimation, visualState, }: VisualElementOptions<Instance, RenderState>, options?: Options);
    mount(instance: Instance): void;
    unmount(): void;
    addChild(child: VisualElement): void;
    removeChild(child: VisualElement): void;
    private bindToMotionValue;
    sortNodePosition(other: VisualElement<Instance>): number;
    updateFeatures(): void;
    notifyUpdate: () => void;
    triggerBuild(): void;
    render: () => void;
    private renderScheduledAt;
    scheduleRender: () => void;
    /**
     * Measure the current viewport box with or without transforms.
     * Only measures axis-aligned boxes, rotate and skew must be manually
     * removed with a re-render to work.
     */
    measureViewportBox(): Box;
    getStaticValue(key: string): AnyResolvedKeyframe;
    setStaticValue(key: string, value: AnyResolvedKeyframe): void;
    /**
     * Update the provided props. Ensure any newly-added motion values are
     * added to our map, old ones removed, and listeners updated.
     */
    update(props: MotionProps, presenceContext: PresenceContextProps | null): void;
    getProps(): MotionProps;
    /**
     * Returns the variant definition with a given name.
     */
    getVariant(name: string): motion_dom.Variant | undefined;
    /**
     * Returns the defined default transition on this component.
     */
    getDefaultTransition(): motion_dom.Transition<any> | undefined;
    getTransformPagePoint(): any;
    getClosestVariantNode(): VisualElement | undefined;
    /**
     * Add a child visual element to our set of children.
     */
    addVariantChild(child: VisualElement): (() => boolean) | undefined;
    /**
     * Add a motion value and bind it to this visual element.
     */
    addValue(key: string, value: MotionValue): void;
    /**
     * Remove a motion value and unbind any active subscriptions.
     */
    removeValue(key: string): void;
    /**
     * Check whether we have a motion value for this key
     */
    hasValue(key: string): boolean;
    /**
     * Get a motion value for this key. If called with a default
     * value, we'll create one if none exists.
     */
    getValue(key: string): MotionValue | undefined;
    getValue(key: string, defaultValue: AnyResolvedKeyframe | null): MotionValue;
    /**
     * If we're trying to animate to a previously unencountered value,
     * we need to check for it in our state and as a last resort read it
     * directly from the instance (which might have performance implications).
     */
    readValue(key: string, target?: AnyResolvedKeyframe | null): any;
    /**
     * Set the base target to later animate back to. This is currently
     * only hydrated on creation and when we first read a value.
     */
    setBaseTarget(key: string, value: AnyResolvedKeyframe): void;
    /**
     * Find the base target for a value thats been removed from all animation
     * props.
     */
    getBaseTarget(key: string): ResolvedValues[string] | undefined | null;
    on<EventName extends keyof VisualElementEventCallbacks>(eventName: EventName, callback: VisualElementEventCallbacks[EventName]): VoidFunction;
    notify<EventName extends keyof VisualElementEventCallbacks>(eventName: EventName, ...args: any): void;
    scheduleRenderMicrotask(): void;
}

type ScrapeMotionValuesFromProps = (props: MotionProps, prevProps: MotionProps, visualElement?: VisualElement) => {
    [key: string]: MotionValue | AnyResolvedKeyframe;
};
interface VisualElementOptions<Instance, RenderState = any> {
    visualState: VisualState<Instance, RenderState>;
    parent?: VisualElement<unknown>;
    variantParent?: VisualElement<unknown>;
    presenceContext: PresenceContextProps | null;
    props: MotionProps;
    blockInitialAnimation?: boolean;
    reducedMotionConfig?: ReducedMotionConfig;
}
/**
 * A generic set of string/number values
 */
interface ResolvedValues {
    [key: string]: AnyResolvedKeyframe;
}
interface VisualElementEventCallbacks {
    BeforeLayoutMeasure: () => void;
    LayoutMeasure: (layout: Box, prevLayout?: Box) => void;
    LayoutUpdate: (layout: Axis, prevLayout: Axis) => void;
    Update: (latest: ResolvedValues) => void;
    AnimationStart: (definition: AnimationDefinition) => void;
    AnimationComplete: (definition: AnimationDefinition) => void;
    LayoutAnimationStart: () => void;
    LayoutAnimationComplete: () => void;
    SetAxisTarget: () => void;
    Unmount: () => void;
}
type CreateVisualElement<Props = {}, TagName extends keyof DOMMotionComponents | string = "div"> = (Component: TagName | string | React.ComponentType<Props>, options: VisualElementOptions<HTMLElement | SVGElement>) => VisualElement<HTMLElement | SVGElement>;

declare const optimizedAppearDataAttribute: "data-framer-appear-id";

/**
 * Expose only the needed part of the VisualElement interface to
 * ensure React types don't end up in the generic DOM bundle.
 */
interface WithAppearProps {
    props: {
        [optimizedAppearDataAttribute]?: string;
        values?: {
            [key: string]: MotionValue<number> | MotionValue<string>;
        };
    };
}
type HandoffFunction = (storeId: string, valueName: string, frame: Batcher) => number | null;
/**
 * The window global object acts as a bridge between our inline script
 * triggering the optimized appear animations, and Motion.
 */
declare global {
    interface Window {
        MotionHandoffAnimation?: HandoffFunction;
        MotionHandoffMarkAsComplete?: (elementId: string) => void;
        MotionHandoffIsComplete?: (elementId: string) => boolean;
        MotionHasOptimisedAnimation?: (elementId?: string, valueName?: string) => boolean;
        MotionCancelOptimisedAnimation?: (elementId?: string, valueName?: string, frame?: Batcher, canResume?: boolean) => void;
        MotionCheckAppearSync?: (visualElement: WithAppearProps, valueName: string, value: MotionValue) => VoidFunction | void;
        MotionIsMounted?: boolean;
    }
}

export { type AnimationType as A, type CreateVisualElement as C, type DOMMotionComponents as D, type ForwardRefComponent as F, type HTMLElements as H, type IProjectionNode as I, type MotionProps as M, PresenceContext as P, type ResolvedValues as R, type SVGMotionComponents as S, type VariantLabels as V, VisualElement as a, MotionConfigContext as b, type HTMLMotionProps as c, type HTMLMotionComponents as d, type VisualElementAnimationOptions as e, type HTMLRenderState as f, type ScrapeMotionValuesFromProps as g, type VisualState as h, SwitchLayoutGroupContext as i, type MotionStyle as j, type MotionTransform as k, type SVGAttributesAsMotionValues as l, makeUseVisualState as m, type SVGMotionProps as n, optimizedAppearDataAttribute as o, FlatTree as p };
web/node_modules/framer-motion/dist/m.d.ts
/// <reference types="react" />
import * as React$1 from 'react';
import { CSSProperties, PropsWithoutRef, RefAttributes, JSX, SVGAttributes } from 'react';
import { MotionNodeOptions, MotionValue, TransformProperties, SVGPathProperties, Batcher } from 'motion-dom';

type MotionValueString = MotionValue<string>;
type MotionValueNumber = MotionValue<number>;
type MotionValueAny = MotionValue<any>;
type AnyMotionValue = MotionValueNumber | MotionValueString | MotionValueAny;
type MotionValueHelper<T> = T | AnyMotionValue;
type MakeMotionHelper<T> = {
    [K in keyof T]: MotionValueHelper<T[K]>;
};
type MakeCustomValueTypeHelper<T> = MakeMotionHelper<T>;
type MakeMotion<T> = MakeCustomValueTypeHelper<T>;
type MotionCSS = MakeMotion<Omit<CSSProperties, "rotate" | "scale" | "perspective">>;
/**
 * @public
 */
type MotionTransform = MakeMotion<TransformProperties>;
type MotionSVGProps = MakeMotion<SVGPathProperties>;
/**
 * @public
 */
interface MotionStyle$1 extends MotionCSS, MotionTransform, MotionSVGProps {
}
/**
 * Props for `motion` components.
 *
 * @public
 */
interface MotionProps extends MotionNodeOptions {
    /**
     *
     * The React DOM `style` prop, enhanced with support for `MotionValue`s and separate `transform` values.
     *
     * ```jsx
     * export const MyComponent = () => {
     *   const x = useMotionValue(0)
     *
     *   return <motion.div style={{ x, opacity: 1, scale: 0.5 }} />
     * }
     * ```
     */
    style?: MotionStyle$1;
    children?: React.ReactNode | MotionValueNumber | MotionValueString;
}

interface HTMLElements {
    a: HTMLAnchorElement;
    abbr: HTMLElement;
    address: HTMLElement;
    area: HTMLAreaElement;
    article: HTMLElement;
    aside: HTMLElement;
    audio: HTMLAudioElement;
    b: HTMLElement;
    base: HTMLBaseElement;
    bdi: HTMLElement;
    bdo: HTMLElement;
    big: HTMLElement;
    blockquote: HTMLQuoteElement;
    body: HTMLBodyElement;
    br: HTMLBRElement;
    button: HTMLButtonElement;
    canvas: HTMLCanvasElement;
    caption: HTMLElement;
    center: HTMLElement;
    cite: HTMLElement;
    code: HTMLElement;
    col: HTMLTableColElement;
    colgroup: HTMLTableColElement;
    data: HTMLDataElement;
    datalist: HTMLDataListElement;
    dd: HTMLElement;
    del: HTMLModElement;
    details: HTMLDetailsElement;
    dfn: HTMLElement;
    dialog: HTMLDialogElement;
    div: HTMLDivElement;
    dl: HTMLDListElement;
    dt: HTMLElement;
    em: HTMLElement;
    embed: HTMLEmbedElement;
    fieldset: HTMLFieldSetElement;
    figcaption: HTMLElement;
    figure: HTMLElement;
    footer: HTMLElement;
    form: HTMLFormElement;
    h1: HTMLHeadingElement;
    h2: HTMLHeadingElement;
    h3: HTMLHeadingElement;
    h4: HTMLHeadingElement;
    h5: HTMLHeadingElement;
    h6: HTMLHeadingElement;
    head: HTMLHeadElement;
    header: HTMLElement;
    hgroup: HTMLElement;
    hr: HTMLHRElement;
    html: HTMLHtmlElement;
    i: HTMLElement;
    iframe: HTMLIFrameElement;
    img: HTMLImageElement;
    input: HTMLInputElement;
    ins: HTMLModElement;
    kbd: HTMLElement;
    keygen: HTMLElement;
    label: HTMLLabelElement;
    legend: HTMLLegendElement;
    li: HTMLLIElement;
    link: HTMLLinkElement;
    main: HTMLElement;
    map: HTMLMapElement;
    mark: HTMLElement;
    menu: HTMLElement;
    menuitem: HTMLElement;
    meta: HTMLMetaElement;
    meter: HTMLMeterElement;
    nav: HTMLElement;
    noindex: HTMLElement;
    noscript: HTMLElement;
    object: HTMLObjectElement;
    ol: HTMLOListElement;
    optgroup: HTMLOptGroupElement;
    option: HTMLOptionElement;
    output: HTMLOutputElement;
    p: HTMLParagraphElement;
    param: HTMLParamElement;
    picture: HTMLElement;
    pre: HTMLPreElement;
    progress: HTMLProgressElement;
    q: HTMLQuoteElement;
    rp: HTMLElement;
    rt: HTMLElement;
    ruby: HTMLElement;
    s: HTMLElement;
    samp: HTMLElement;
    search: HTMLElement;
    slot: HTMLSlotElement;
    script: HTMLScriptElement;
    section: HTMLElement;
    select: HTMLSelectElement;
    small: HTMLElement;
    source: HTMLSourceElement;
    span: HTMLSpanElement;
    strong: HTMLElement;
    style: HTMLStyleElement;
    sub: HTMLElement;
    summary: HTMLElement;
    sup: HTMLElement;
    table: HTMLTableElement;
    template: HTMLTemplateElement;
    tbody: HTMLTableSectionElement;
    td: HTMLTableDataCellElement;
    textarea: HTMLTextAreaElement;
    tfoot: HTMLTableSectionElement;
    th: HTMLTableHeaderCellElement;
    thead: HTMLTableSectionElement;
    time: HTMLTimeElement;
    title: HTMLTitleElement;
    tr: HTMLTableRowElement;
    track: HTMLTrackElement;
    u: HTMLElement;
    ul: HTMLUListElement;
    var: HTMLElement;
    video: HTMLVideoElement;
    wbr: HTMLElement;
    webview: HTMLWebViewElement;
}

/**
 * @public
 */
type ForwardRefComponent<T, P> = {
    readonly $$typeof: symbol;
} & ((props: PropsWithoutRef<P> & RefAttributes<T>) => JSX.Element);
type AttributesWithoutMotionProps<Attributes> = {
    [K in Exclude<keyof Attributes, keyof MotionProps>]?: Attributes[K];
};
/**
 * @public
 */
type HTMLMotionProps<Tag extends keyof HTMLElements> = AttributesWithoutMotionProps<JSX.IntrinsicElements[Tag]> & MotionProps;
/**
 * Motion-optimised versions of React's HTML components.
 *
 * @public
 */
type HTMLMotionComponents = {
    [K in keyof HTMLElements]: ForwardRefComponent<HTMLElements[K], HTMLMotionProps<K>>;
};

type UnionStringArray<T extends Readonly<string[]>> = T[number];
declare const svgElements: readonly ["animate", "circle", "defs", "desc", "ellipse", "g", "image", "line", "filter", "marker", "mask", "metadata", "path", "pattern", "polygon", "polyline", "rect", "stop", "svg", "switch", "symbol", "text", "tspan", "use", "view", "clipPath", "feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence", "foreignObject", "linearGradient", "radialGradient", "textPath"];
type SVGElements = UnionStringArray<typeof svgElements>;

interface SVGAttributesWithoutMotionProps<T> extends Pick<SVGAttributes<T>, Exclude<keyof SVGAttributes<T>, keyof MotionProps>> {
}
/**
 * Blanket-accept any SVG attribute as a `MotionValue`
 * @public
 */
type SVGAttributesAsMotionValues<T> = MakeMotion<SVGAttributesWithoutMotionProps<T>>;
type UnwrapSVGFactoryElement<F> = F extends React.SVGProps<infer P> ? P : never;
/**
 * @public
 */
interface SVGMotionProps<T> extends SVGAttributesAsMotionValues<T>, MotionProps {
}
/**
 * Motion-optimised versions of React's SVG components.
 *
 * @public
 */
type SVGMotionComponents = {
    [K in SVGElements]: ForwardRefComponent<UnwrapSVGFactoryElement<JSX.IntrinsicElements[K]>, SVGMotionProps<UnwrapSVGFactoryElement<JSX.IntrinsicElements[K]>>>;
};

type DOMMotionComponents = HTMLMotionComponents & SVGMotionComponents;

type MotionComponentProps<Props> = {
    [K in Exclude<keyof Props, keyof MotionProps>]?: Props[K];
} & MotionProps;
type MotionComponent<T, P> = T extends keyof DOMMotionComponents ? DOMMotionComponents[T] : React$1.ComponentType<Omit<MotionComponentProps<P>, "children"> & {
    children?: "children" extends keyof P ? P["children"] | MotionComponentProps<P>["children"] : MotionComponentProps<P>["children"];
}>;
interface MotionComponentOptions {
    forwardMotionProps?: boolean;
}

declare function createMinimalMotionComponent<Props, TagName extends keyof DOMMotionComponents | string = "div">(Component: TagName | string | React.ComponentType<Props>, options?: MotionComponentOptions): MotionComponent<TagName, Props>;

declare const optimizedAppearDataAttribute: "data-framer-appear-id";

/**
 * Expose only the needed part of the VisualElement interface to
 * ensure React types don't end up in the generic DOM bundle.
 */
interface WithAppearProps {
    props: {
        [optimizedAppearDataAttribute]?: string;
        values?: {
            [key: string]: MotionValue<number> | MotionValue<string>;
        };
    };
}
type HandoffFunction = (storeId: string, valueName: string, frame: Batcher) => number | null;
/**
 * The window global object acts as a bridge between our inline script
 * triggering the optimized appear animations, and Motion.
 */
declare global {
    interface Window {
        MotionHandoffAnimation?: HandoffFunction;
        MotionHandoffMarkAsComplete?: (elementId: string) => void;
        MotionHandoffIsComplete?: (elementId: string) => boolean;
        MotionHasOptimisedAnimation?: (elementId?: string, valueName?: string) => boolean;
        MotionCancelOptimisedAnimation?: (elementId?: string, valueName?: string, frame?: Batcher, canResume?: boolean) => void;
        MotionCheckAppearSync?: (visualElement: WithAppearProps, valueName: string, value: MotionValue) => VoidFunction | void;
        MotionIsMounted?: boolean;
    }
}

/**
 * HTML components
 */
declare const MotionA: ForwardRefComponent<HTMLAnchorElement, HTMLMotionProps<"a">>;
declare const MotionAbbr: ForwardRefComponent<HTMLElement, HTMLMotionProps<"abbr">>;
declare const MotionAddress: ForwardRefComponent<HTMLElement, HTMLMotionProps<"address">>;
declare const MotionArea: ForwardRefComponent<HTMLAreaElement, HTMLMotionProps<"area">>;
declare const MotionArticle: ForwardRefComponent<HTMLElement, HTMLMotionProps<"article">>;
declare const MotionAside: ForwardRefComponent<HTMLElement, HTMLMotionProps<"aside">>;
declare const MotionAudio: ForwardRefComponent<HTMLAudioElement, HTMLMotionProps<"audio">>;
declare const MotionB: ForwardRefComponent<HTMLElement, HTMLMotionProps<"b">>;
declare const MotionBase: ForwardRefComponent<HTMLBaseElement, HTMLMotionProps<"base">>;
declare const MotionBdi: ForwardRefComponent<HTMLElement, HTMLMotionProps<"bdi">>;
declare const MotionBdo: ForwardRefComponent<HTMLElement, HTMLMotionProps<"bdo">>;
declare const MotionBig: ForwardRefComponent<HTMLElement, HTMLMotionProps<"big">>;
declare const MotionBlockquote: ForwardRefComponent<HTMLQuoteElement, HTMLMotionProps<"blockquote">>;
declare const MotionBody: ForwardRefComponent<HTMLBodyElement, HTMLMotionProps<"body">>;
declare const MotionButton: ForwardRefComponent<HTMLButtonElement, HTMLMotionProps<"button">>;
declare const MotionCanvas: ForwardRefComponent<HTMLCanvasElement, HTMLMotionProps<"canvas">>;
declare const MotionCaption: ForwardRefComponent<HTMLElement, HTMLMotionProps<"caption">>;
declare const MotionCite: ForwardRefComponent<HTMLElement, HTMLMotionProps<"cite">>;
declare const MotionCode: ForwardRefComponent<HTMLElement, HTMLMotionProps<"code">>;
declare const MotionCol: ForwardRefComponent<HTMLTableColElement, HTMLMotionProps<"col">>;
declare const MotionColgroup: ForwardRefComponent<HTMLTableColElement, HTMLMotionProps<"colgroup">>;
declare const MotionData: ForwardRefComponent<HTMLDataElement, HTMLMotionProps<"data">>;
declare const MotionDatalist: ForwardRefComponent<HTMLDataListElement, HTMLMotionProps<"datalist">>;
declare const MotionDd: ForwardRefComponent<HTMLElement, HTMLMotionProps<"dd">>;
declare const MotionDel: ForwardRefComponent<HTMLModElement, HTMLMotionProps<"del">>;
declare const MotionDetails: ForwardRefComponent<HTMLDetailsElement, HTMLMotionProps<"details">>;
declare const MotionDfn: ForwardRefComponent<HTMLElement, HTMLMotionProps<"dfn">>;
declare const MotionDialog: ForwardRefComponent<HTMLDialogElement, HTMLMotionProps<"dialog">>;
declare const MotionDiv: ForwardRefComponent<HTMLDivElement, HTMLMotionProps<"div">>;
declare const MotionDl: ForwardRefComponent<HTMLDListElement, HTMLMotionProps<"dl">>;
declare const MotionDt: ForwardRefComponent<HTMLElement, HTMLMotionProps<"dt">>;
declare const MotionEm: ForwardRefComponent<HTMLElement, HTMLMotionProps<"em">>;
declare const MotionEmbed: ForwardRefComponent<HTMLEmbedElement, HTMLMotionProps<"embed">>;
declare const MotionFieldset: ForwardRefComponent<HTMLFieldSetElement, HTMLMotionProps<"fieldset">>;
declare const MotionFigcaption: ForwardRefComponent<HTMLElement, HTMLMotionProps<"figcaption">>;
declare const MotionFigure: ForwardRefComponent<HTMLElement, HTMLMotionProps<"figure">>;
declare const MotionFooter: ForwardRefComponent<HTMLElement, HTMLMotionProps<"footer">>;
declare const MotionForm: ForwardRefComponent<HTMLFormElement, HTMLMotionProps<"form">>;
declare const MotionH1: ForwardRefComponent<HTMLHeadingElement, HTMLMotionProps<"h1">>;
declare const MotionH2: ForwardRefComponent<HTMLHeadingElement, HTMLMotionProps<"h2">>;
declare const MotionH3: ForwardRefComponent<HTMLHeadingElement, HTMLMotionProps<"h3">>;
declare const MotionH4: ForwardRefComponent<HTMLHeadingElement, HTMLMotionProps<"h4">>;
declare const MotionH5: ForwardRefComponent<HTMLHeadingElement, HTMLMotionProps<"h5">>;
declare const MotionH6: ForwardRefComponent<HTMLHeadingElement, HTMLMotionProps<"h6">>;
declare const MotionHead: ForwardRefComponent<HTMLHeadElement, HTMLMotionProps<"head">>;
declare const MotionHeader: ForwardRefComponent<HTMLElement, HTMLMotionProps<"header">>;
declare const MotionHgroup: ForwardRefComponent<HTMLElement, HTMLMotionProps<"hgroup">>;
declare const MotionHr: ForwardRefComponent<HTMLHRElement, HTMLMotionProps<"hr">>;
declare const MotionHtml: ForwardRefComponent<HTMLHtmlElement, HTMLMotionProps<"html">>;
declare const MotionI: ForwardRefComponent<HTMLElement, HTMLMotionProps<"i">>;
declare const MotionIframe: ForwardRefComponent<HTMLIFrameElement, HTMLMotionProps<"iframe">>;
declare const MotionImg: ForwardRefComponent<HTMLImageElement, HTMLMotionProps<"img">>;
declare const MotionInput: ForwardRefComponent<HTMLInputElement, HTMLMotionProps<"input">>;
declare const MotionIns: ForwardRefComponent<HTMLModElement, HTMLMotionProps<"ins">>;
declare const MotionKbd: ForwardRefComponent<HTMLElement, HTMLMotionProps<"kbd">>;
declare const MotionKeygen: ForwardRefComponent<HTMLElement, HTMLMotionProps<"keygen">>;
declare const MotionLabel: ForwardRefComponent<HTMLLabelElement, HTMLMotionProps<"label">>;
declare const MotionLegend: ForwardRefComponent<HTMLLegendElement, HTMLMotionProps<"legend">>;
declare const MotionLi: ForwardRefComponent<HTMLLIElement, HTMLMotionProps<"li">>;
declare const MotionLink: ForwardRefComponent<HTMLLinkElement, HTMLMotionProps<"link">>;
declare const MotionMain: ForwardRefComponent<HTMLElement, HTMLMotionProps<"main">>;
declare const MotionMap: ForwardRefComponent<HTMLMapElement, HTMLMotionProps<"map">>;
declare const MotionMark: ForwardRefComponent<HTMLElement, HTMLMotionProps<"mark">>;
declare const MotionMenu: ForwardRefComponent<HTMLElement, HTMLMotionProps<"menu">>;
declare const MotionMenuitem: ForwardRefComponent<HTMLElement, HTMLMotionProps<"menuitem">>;
declare const MotionMeter: ForwardRefComponent<HTMLMeterElement, HTMLMotionProps<"meter">>;
declare const MotionNav: ForwardRefComponent<HTMLElement, HTMLMotionProps<"nav">>;
declare const MotionObject: ForwardRefComponent<HTMLObjectElement, HTMLMotionProps<"object">>;
declare const MotionOl: ForwardRefComponent<HTMLOListElement, HTMLMotionProps<"ol">>;
declare const MotionOptgroup: ForwardRefComponent<HTMLOptGroupElement, HTMLMotionProps<"optgroup">>;
declare const MotionOption: ForwardRefComponent<HTMLOptionElement, HTMLMotionProps<"option">>;
declare const MotionOutput: ForwardRefComponent<HTMLOutputElement, HTMLMotionProps<"output">>;
declare const MotionP: ForwardRefComponent<HTMLParagraphElement, HTMLMotionProps<"p">>;
declare const MotionParam: ForwardRefComponent<HTMLParamElement, HTMLMotionProps<"param">>;
declare const MotionPicture: ForwardRefComponent<HTMLElement, HTMLMotionProps<"picture">>;
declare const MotionPre: ForwardRefComponent<HTMLPreElement, HTMLMotionProps<"pre">>;
declare const MotionProgress: ForwardRefComponent<HTMLProgressElement, HTMLMotionProps<"progress">>;
declare const MotionQ: ForwardRefComponent<HTMLQuoteElement, HTMLMotionProps<"q">>;
declare const MotionRp: ForwardRefComponent<HTMLElement, HTMLMotionProps<"rp">>;
declare const MotionRt: ForwardRefComponent<HTMLElement, HTMLMotionProps<"rt">>;
declare const MotionRuby: ForwardRefComponent<HTMLElement, HTMLMotionProps<"ruby">>;
declare const MotionS: ForwardRefComponent<HTMLElement, HTMLMotionProps<"s">>;
declare const MotionSamp: ForwardRefComponent<HTMLElement, HTMLMotionProps<"samp">>;
declare const MotionScript: ForwardRefComponent<HTMLScriptElement, HTMLMotionProps<"script">>;
declare const MotionSection: ForwardRefComponent<HTMLElement, HTMLMotionProps<"section">>;
declare const MotionSelect: ForwardRefComponent<HTMLSelectElement, HTMLMotionProps<"select">>;
declare const MotionSmall: ForwardRefComponent<HTMLElement, HTMLMotionProps<"small">>;
declare const MotionSource: ForwardRefComponent<HTMLSourceElement, HTMLMotionProps<"source">>;
declare const MotionSpan: ForwardRefComponent<HTMLSpanElement, HTMLMotionProps<"span">>;
declare const MotionStrong: ForwardRefComponent<HTMLElement, HTMLMotionProps<"strong">>;
declare const MotionStyle: ForwardRefComponent<HTMLStyleElement, HTMLMotionProps<"style">>;
declare const MotionSub: ForwardRefComponent<HTMLElement, HTMLMotionProps<"sub">>;
declare const MotionSummary: ForwardRefComponent<HTMLElement, HTMLMotionProps<"summary">>;
declare const MotionSup: ForwardRefComponent<HTMLElement, HTMLMotionProps<"sup">>;
declare const MotionTable: ForwardRefComponent<HTMLTableElement, HTMLMotionProps<"table">>;
declare const MotionTbody: ForwardRefComponent<HTMLTableSectionElement, HTMLMotionProps<"tbody">>;
declare const MotionTd: ForwardRefComponent<HTMLTableDataCellElement, HTMLMotionProps<"td">>;
declare const MotionTextarea: ForwardRefComponent<HTMLTextAreaElement, HTMLMotionProps<"textarea">>;
declare const MotionTfoot: ForwardRefComponent<HTMLTableSectionElement, HTMLMotionProps<"tfoot">>;
declare const MotionTh: ForwardRefComponent<HTMLTableHeaderCellElement, HTMLMotionProps<"th">>;
declare const MotionThead: ForwardRefComponent<HTMLTableSectionElement, HTMLMotionProps<"thead">>;
declare const MotionTime: ForwardRefComponent<HTMLTimeElement, HTMLMotionProps<"time">>;
declare const MotionTitle: ForwardRefComponent<HTMLTitleElement, HTMLMotionProps<"title">>;
declare const MotionTr: ForwardRefComponent<HTMLTableRowElement, HTMLMotionProps<"tr">>;
declare const MotionTrack: ForwardRefComponent<HTMLTrackElement, HTMLMotionProps<"track">>;
declare const MotionU: ForwardRefComponent<HTMLElement, HTMLMotionProps<"u">>;
declare const MotionUl: ForwardRefComponent<HTMLUListElement, HTMLMotionProps<"ul">>;
declare const MotionVideo: ForwardRefComponent<HTMLVideoElement, HTMLMotionProps<"video">>;
declare const MotionWbr: ForwardRefComponent<HTMLElement, HTMLMotionProps<"wbr">>;
declare const MotionWebview: ForwardRefComponent<HTMLWebViewElement, HTMLMotionProps<"webview">>;
/**
 * SVG components
 */
declare const MotionAnimate: ForwardRefComponent<SVGElement, SVGMotionProps<SVGElement>>;
declare const MotionCircle: ForwardRefComponent<SVGCircleElement, SVGMotionProps<SVGCircleElement>>;
declare const MotionDefs: ForwardRefComponent<SVGDefsElement, SVGMotionProps<SVGDefsElement>>;
declare const MotionDesc: ForwardRefComponent<SVGDescElement, SVGMotionProps<SVGDescElement>>;
declare const MotionEllipse: ForwardRefComponent<SVGEllipseElement, SVGMotionProps<SVGEllipseElement>>;
declare const MotionG: ForwardRefComponent<SVGGElement, SVGMotionProps<SVGGElement>>;
declare const MotionImage: ForwardRefComponent<SVGImageElement, SVGMotionProps<SVGImageElement>>;
declare const MotionLine: ForwardRefComponent<SVGLineElement, SVGMotionProps<SVGLineElement>>;
declare const MotionFilter: ForwardRefComponent<SVGFilterElement, SVGMotionProps<SVGFilterElement>>;
declare const MotionMarker: ForwardRefComponent<SVGMarkerElement, SVGMotionProps<SVGMarkerElement>>;
declare const MotionMask: ForwardRefComponent<SVGMaskElement, SVGMotionProps<SVGMaskElement>>;
declare const MotionMetadata: ForwardRefComponent<SVGMetadataElement, SVGMotionProps<SVGMetadataElement>>;
declare const MotionPath: ForwardRefComponent<SVGPathElement, SVGMotionProps<SVGPathElement>>;
declare const MotionPattern: ForwardRefComponent<SVGPatternElement, SVGMotionProps<SVGPatternElement>>;
declare const MotionPolygon: ForwardRefComponent<SVGPolygonElement, SVGMotionProps<SVGPolygonElement>>;
declare const MotionPolyline: ForwardRefComponent<SVGPolylineElement, SVGMotionProps<SVGPolylineElement>>;
declare const MotionRect: ForwardRefComponent<SVGRectElement, SVGMotionProps<SVGRectElement>>;
declare const MotionStop: ForwardRefComponent<SVGStopElement, SVGMotionProps<SVGStopElement>>;
declare const MotionSvg: ForwardRefComponent<SVGSVGElement, SVGMotionProps<SVGSVGElement>>;
declare const MotionSymbol: ForwardRefComponent<SVGSymbolElement, SVGMotionProps<SVGSymbolElement>>;
declare const MotionText: ForwardRefComponent<SVGTextElement, SVGMotionProps<SVGTextElement>>;
declare const MotionTspan: ForwardRefComponent<SVGTSpanElement, SVGMotionProps<SVGTSpanElement>>;
declare const MotionUse: ForwardRefComponent<SVGUseElement, SVGMotionProps<SVGUseElement>>;
declare const MotionView: ForwardRefComponent<SVGViewElement, SVGMotionProps<SVGViewElement>>;
declare const MotionClipPath: ForwardRefComponent<SVGClipPathElement, SVGMotionProps<SVGClipPathElement>>;
declare const MotionFeBlend: ForwardRefComponent<SVGFEBlendElement, SVGMotionProps<SVGFEBlendElement>>;
declare const MotionFeColorMatrix: ForwardRefComponent<SVGFEColorMatrixElement, SVGMotionProps<SVGFEColorMatrixElement>>;
declare const MotionFeComponentTransfer: ForwardRefComponent<SVGFEComponentTransferElement, SVGMotionProps<SVGFEComponentTransferElement>>;
declare const MotionFeComposite: ForwardRefComponent<SVGFECompositeElement, SVGMotionProps<SVGFECompositeElement>>;
declare const MotionFeConvolveMatrix: ForwardRefComponent<SVGFEConvolveMatrixElement, SVGMotionProps<SVGFEConvolveMatrixElement>>;
declare const MotionFeDiffuseLighting: ForwardRefComponent<SVGFEDiffuseLightingElement, SVGMotionProps<SVGFEDiffuseLightingElement>>;
declare const MotionFeDisplacementMap: ForwardRefComponent<SVGFEDisplacementMapElement, SVGMotionProps<SVGFEDisplacementMapElement>>;
declare const MotionFeDistantLight: ForwardRefComponent<SVGFEDistantLightElement, SVGMotionProps<SVGFEDistantLightElement>>;
declare const MotionFeDropShadow: ForwardRefComponent<SVGFEDropShadowElement, SVGMotionProps<SVGFEDropShadowElement>>;
declare const MotionFeFlood: ForwardRefComponent<SVGFEFloodElement, SVGMotionProps<SVGFEFloodElement>>;
declare const MotionFeFuncA: ForwardRefComponent<SVGFEFuncAElement, SVGMotionProps<SVGFEFuncAElement>>;
declare const MotionFeFuncB: ForwardRefComponent<SVGFEFuncBElement, SVGMotionProps<SVGFEFuncBElement>>;
declare const MotionFeFuncG: ForwardRefComponent<SVGFEFuncGElement, SVGMotionProps<SVGFEFuncGElement>>;
declare const MotionFeFuncR: ForwardRefComponent<SVGFEFuncRElement, SVGMotionProps<SVGFEFuncRElement>>;
declare const MotionFeGaussianBlur: ForwardRefComponent<SVGFEGaussianBlurElement, SVGMotionProps<SVGFEGaussianBlurElement>>;
declare const MotionFeImage: ForwardRefComponent<SVGFEImageElement, SVGMotionProps<SVGFEImageElement>>;
declare const MotionFeMerge: ForwardRefComponent<SVGFEMergeElement, SVGMotionProps<SVGFEMergeElement>>;
declare const MotionFeMergeNode: ForwardRefComponent<SVGFEMergeNodeElement, SVGMotionProps<SVGFEMergeNodeElement>>;
declare const MotionFeMorphology: ForwardRefComponent<SVGFEMorphologyElement, SVGMotionProps<SVGFEMorphologyElement>>;
declare const MotionFeOffset: ForwardRefComponent<SVGFEOffsetElement, SVGMotionProps<SVGFEOffsetElement>>;
declare const MotionFePointLight: ForwardRefComponent<SVGFEPointLightElement, SVGMotionProps<SVGFEPointLightElement>>;
declare const MotionFeSpecularLighting: ForwardRefComponent<SVGFESpecularLightingElement, SVGMotionProps<SVGFESpecularLightingElement>>;
declare const MotionFeSpotLight: ForwardRefComponent<SVGFESpotLightElement, SVGMotionProps<SVGFESpotLightElement>>;
declare const MotionFeTile: ForwardRefComponent<SVGFETileElement, SVGMotionProps<SVGFETileElement>>;
declare const MotionFeTurbulence: ForwardRefComponent<SVGFETurbulenceElement, SVGMotionProps<SVGFETurbulenceElement>>;
declare const MotionForeignObject: ForwardRefComponent<SVGForeignObjectElement, SVGMotionProps<SVGForeignObjectElement>>;
declare const MotionLinearGradient: ForwardRefComponent<SVGLinearGradientElement, SVGMotionProps<SVGLinearGradientElement>>;
declare const MotionRadialGradient: ForwardRefComponent<SVGRadialGradientElement, SVGMotionProps<SVGRadialGradientElement>>;
declare const MotionTextPath: ForwardRefComponent<SVGTextPathElement, SVGMotionProps<SVGTextPathElement>>;

export { MotionA as a, MotionAbbr as abbr, MotionAddress as address, MotionAnimate as animate, MotionArea as area, MotionArticle as article, MotionAside as aside, MotionAudio as audio, MotionB as b, MotionBase as base, MotionBdi as bdi, MotionBdo as bdo, MotionBig as big, MotionBlockquote as blockquote, MotionBody as body, MotionButton as button, MotionCanvas as canvas, MotionCaption as caption, MotionCircle as circle, MotionCite as cite, MotionClipPath as clipPath, MotionCode as code, MotionCol as col, MotionColgroup as colgroup, createMinimalMotionComponent as create, MotionData as data, MotionDatalist as datalist, MotionDd as dd, MotionDefs as defs, MotionDel as del, MotionDesc as desc, MotionDetails as details, MotionDfn as dfn, MotionDialog as dialog, MotionDiv as div, MotionDl as dl, MotionDt as dt, MotionEllipse as ellipse, MotionEm as em, MotionEmbed as embed, MotionFeBlend as feBlend, MotionFeColorMatrix as feColorMatrix, MotionFeComponentTransfer as feComponentTransfer, MotionFeComposite as feComposite, MotionFeConvolveMatrix as feConvolveMatrix, MotionFeDiffuseLighting as feDiffuseLighting, MotionFeDisplacementMap as feDisplacementMap, MotionFeDistantLight as feDistantLight, MotionFeDropShadow as feDropShadow, MotionFeFlood as feFlood, MotionFeFuncA as feFuncA, MotionFeFuncB as feFuncB, MotionFeFuncG as feFuncG, MotionFeFuncR as feFuncR, MotionFeGaussianBlur as feGaussianBlur, MotionFeImage as feImage, MotionFeMerge as feMerge, MotionFeMergeNode as feMergeNode, MotionFeMorphology as feMorphology, MotionFeOffset as feOffset, MotionFePointLight as fePointLight, MotionFeSpecularLighting as feSpecularLighting, MotionFeSpotLight as feSpotLight, MotionFeTile as feTile, MotionFeTurbulence as feTurbulence, MotionFieldset as fieldset, MotionFigcaption as figcaption, MotionFigure as figure, MotionFilter as filter, MotionFooter as footer, MotionForeignObject as foreignObject, MotionForm as form, MotionG as g, MotionH1 as h1, MotionH2 as h2, MotionH3 as h3, MotionH4 as h4, MotionH5 as h5, MotionH6 as h6, MotionHead as head, MotionHeader as header, MotionHgroup as hgroup, MotionHr as hr, MotionHtml as html, MotionI as i, MotionIframe as iframe, MotionImage as image, MotionImg as img, MotionInput as input, MotionIns as ins, MotionKbd as kbd, MotionKeygen as keygen, MotionLabel as label, MotionLegend as legend, MotionLi as li, MotionLine as line, MotionLinearGradient as linearGradient, MotionLink as link, MotionMain as main, MotionMap as map, MotionMark as mark, MotionMarker as marker, MotionMask as mask, MotionMenu as menu, MotionMenuitem as menuitem, MotionMetadata as metadata, MotionMeter as meter, MotionNav as nav, MotionObject as object, MotionOl as ol, MotionOptgroup as optgroup, MotionOption as option, MotionOutput as output, MotionP as p, MotionParam as param, MotionPath as path, MotionPattern as pattern, MotionPicture as picture, MotionPolygon as polygon, MotionPolyline as polyline, MotionPre as pre, MotionProgress as progress, MotionQ as q, MotionRadialGradient as radialGradient, MotionRect as rect, MotionRp as rp, MotionRt as rt, MotionRuby as ruby, MotionS as s, MotionSamp as samp, MotionScript as script, MotionSection as section, MotionSelect as select, MotionSmall as small, MotionSource as source, MotionSpan as span, MotionStop as stop, MotionStrong as strong, MotionStyle as style, MotionSub as sub, MotionSummary as summary, MotionSup as sup, MotionSvg as svg, MotionSymbol as symbol, MotionTable as table, MotionTbody as tbody, MotionTd as td, MotionText as text, MotionTextPath as textPath, MotionTextarea as textarea, MotionTfoot as tfoot, MotionTh as th, MotionThead as thead, MotionTime as time, MotionTitle as title, MotionTr as tr, MotionTrack as track, MotionTspan as tspan, MotionU as u, MotionUl as ul, MotionUse as use, MotionVideo as video, MotionView as view, MotionWbr as wbr, MotionWebview as webview };
web/node_modules/framer-motion/dist/mini.d.ts
import * as motion_dom from 'motion-dom';
import { AnimationScope } from 'motion-dom';

declare function useAnimateMini<T extends Element = any>(): [AnimationScope<T>, (elementOrSelector: motion_dom.ElementOrSelector, keyframes: motion_dom.DOMKeyframesDefinition, options?: motion_dom.AnimationOptions | undefined) => motion_dom.AnimationPlaybackControlsWithThen];

export { useAnimateMini as useAnimate };
web/node_modules/framer-motion/dist/dom-mini.d.ts
import { AnimationPlaybackOptions, Transition, MotionValue, UnresolvedValueKeyframe, ElementOrSelector, DOMKeyframesDefinition, AnimationOptions, GroupAnimationWithThen, AnimationPlaybackControlsWithThen } from 'motion-dom';

type ObjectTarget<O> = {
    [K in keyof O]?: O[K] | UnresolvedValueKeyframe[];
};
type SequenceTime = number | "<" | `+${number}` | `-${number}` | `${string}`;
type SequenceLabel = string;
interface SequenceLabelWithTime {
    name: SequenceLabel;
    at: SequenceTime;
}
interface At {
    at?: SequenceTime;
}
type MotionValueSegment = [
    MotionValue,
    UnresolvedValueKeyframe | UnresolvedValueKeyframe[]
];
type MotionValueSegmentWithTransition = [
    MotionValue,
    UnresolvedValueKeyframe | UnresolvedValueKeyframe[],
    Transition & At
];
type DOMSegment = [ElementOrSelector, DOMKeyframesDefinition];
type DOMSegmentWithTransition = [
    ElementOrSelector,
    DOMKeyframesDefinition,
    AnimationOptions & At
];
type ObjectSegment<O extends {} = {}> = [O, ObjectTarget<O>];
type ObjectSegmentWithTransition<O extends {} = {}> = [
    O,
    ObjectTarget<O>,
    AnimationOptions & At
];
type Segment = ObjectSegment | ObjectSegmentWithTransition | SequenceLabel | SequenceLabelWithTime | MotionValueSegment | MotionValueSegmentWithTransition | DOMSegment | DOMSegmentWithTransition;
type AnimationSequence = Segment[];
interface SequenceOptions extends AnimationPlaybackOptions {
    delay?: number;
    duration?: number;
    defaultTransition?: Transition;
}

declare function animateSequence(definition: AnimationSequence, options?: SequenceOptions): GroupAnimationWithThen;

declare const animateMini: (elementOrSelector: ElementOrSelector, keyframes: DOMKeyframesDefinition, options?: AnimationOptions) => AnimationPlaybackControlsWithThen;

export { animateMini as animate, animateSequence };
web/node_modules/framer-motion/dist/types/client.d.ts
import { F as ForwardRefComponent, c as HTMLMotionProps, n as SVGMotionProps } from '../types.d-DagZKalS.js';
import 'motion-dom';
import 'motion-utils';
import 'react';

/**
 * HTML components
 */
declare const MotionA: ForwardRefComponent<HTMLAnchorElement, HTMLMotionProps<"a">>;
declare const MotionAbbr: ForwardRefComponent<HTMLElement, HTMLMotionProps<"abbr">>;
declare const MotionAddress: ForwardRefComponent<HTMLElement, HTMLMotionProps<"address">>;
declare const MotionArea: ForwardRefComponent<HTMLAreaElement, HTMLMotionProps<"area">>;
declare const MotionArticle: ForwardRefComponent<HTMLElement, HTMLMotionProps<"article">>;
declare const MotionAside: ForwardRefComponent<HTMLElement, HTMLMotionProps<"aside">>;
declare const MotionAudio: ForwardRefComponent<HTMLAudioElement, HTMLMotionProps<"audio">>;
declare const MotionB: ForwardRefComponent<HTMLElement, HTMLMotionProps<"b">>;
declare const MotionBase: ForwardRefComponent<HTMLBaseElement, HTMLMotionProps<"base">>;
declare const MotionBdi: ForwardRefComponent<HTMLElement, HTMLMotionProps<"bdi">>;
declare const MotionBdo: ForwardRefComponent<HTMLElement, HTMLMotionProps<"bdo">>;
declare const MotionBig: ForwardRefComponent<HTMLElement, HTMLMotionProps<"big">>;
declare const MotionBlockquote: ForwardRefComponent<HTMLQuoteElement, HTMLMotionProps<"blockquote">>;
declare const MotionBody: ForwardRefComponent<HTMLBodyElement, HTMLMotionProps<"body">>;
declare const MotionButton: ForwardRefComponent<HTMLButtonElement, HTMLMotionProps<"button">>;
declare const MotionCanvas: ForwardRefComponent<HTMLCanvasElement, HTMLMotionProps<"canvas">>;
declare const MotionCaption: ForwardRefComponent<HTMLElement, HTMLMotionProps<"caption">>;
declare const MotionCite: ForwardRefComponent<HTMLElement, HTMLMotionProps<"cite">>;
declare const MotionCode: ForwardRefComponent<HTMLElement, HTMLMotionProps<"code">>;
declare const MotionCol: ForwardRefComponent<HTMLTableColElement, HTMLMotionProps<"col">>;
declare const MotionColgroup: ForwardRefComponent<HTMLTableColElement, HTMLMotionProps<"colgroup">>;
declare const MotionData: ForwardRefComponent<HTMLDataElement, HTMLMotionProps<"data">>;
declare const MotionDatalist: ForwardRefComponent<HTMLDataListElement, HTMLMotionProps<"datalist">>;
declare const MotionDd: ForwardRefComponent<HTMLElement, HTMLMotionProps<"dd">>;
declare const MotionDel: ForwardRefComponent<HTMLModElement, HTMLMotionProps<"del">>;
declare const MotionDetails: ForwardRefComponent<HTMLDetailsElement, HTMLMotionProps<"details">>;
declare const MotionDfn: ForwardRefComponent<HTMLElement, HTMLMotionProps<"dfn">>;
declare const MotionDialog: ForwardRefComponent<HTMLDialogElement, HTMLMotionProps<"dialog">>;
declare const MotionDiv: ForwardRefComponent<HTMLDivElement, HTMLMotionProps<"div">>;
declare const MotionDl: ForwardRefComponent<HTMLDListElement, HTMLMotionProps<"dl">>;
declare const MotionDt: ForwardRefComponent<HTMLElement, HTMLMotionProps<"dt">>;
declare const MotionEm: ForwardRefComponent<HTMLElement, HTMLMotionProps<"em">>;
declare const MotionEmbed: ForwardRefComponent<HTMLEmbedElement, HTMLMotionProps<"embed">>;
declare const MotionFieldset: ForwardRefComponent<HTMLFieldSetElement, HTMLMotionProps<"fieldset">>;
declare const MotionFigcaption: ForwardRefComponent<HTMLElement, HTMLMotionProps<"figcaption">>;
declare const MotionFigure: ForwardRefComponent<HTMLElement, HTMLMotionProps<"figure">>;
declare const MotionFooter: ForwardRefComponent<HTMLElement, HTMLMotionProps<"footer">>;
declare const MotionForm: ForwardRefComponent<HTMLFormElement, HTMLMotionProps<"form">>;
declare const MotionH1: ForwardRefComponent<HTMLHeadingElement, HTMLMotionProps<"h1">>;
declare const MotionH2: ForwardRefComponent<HTMLHeadingElement, HTMLMotionProps<"h2">>;
declare const MotionH3: ForwardRefComponent<HTMLHeadingElement, HTMLMotionProps<"h3">>;
declare const MotionH4: ForwardRefComponent<HTMLHeadingElement, HTMLMotionProps<"h4">>;
declare const MotionH5: ForwardRefComponent<HTMLHeadingElement, HTMLMotionProps<"h5">>;
declare const MotionH6: ForwardRefComponent<HTMLHeadingElement, HTMLMotionProps<"h6">>;
declare const MotionHead: ForwardRefComponent<HTMLHeadElement, HTMLMotionProps<"head">>;
declare const MotionHeader: ForwardRefComponent<HTMLElement, HTMLMotionProps<"header">>;
declare const MotionHgroup: ForwardRefComponent<HTMLElement, HTMLMotionProps<"hgroup">>;
declare const MotionHr: ForwardRefComponent<HTMLHRElement, HTMLMotionProps<"hr">>;
declare const MotionHtml: ForwardRefComponent<HTMLHtmlElement, HTMLMotionProps<"html">>;
declare const MotionI: ForwardRefComponent<HTMLElement, HTMLMotionProps<"i">>;
declare const MotionIframe: ForwardRefComponent<HTMLIFrameElement, HTMLMotionProps<"iframe">>;
declare const MotionImg: ForwardRefComponent<HTMLImageElement, HTMLMotionProps<"img">>;
declare const MotionInput: ForwardRefComponent<HTMLInputElement, HTMLMotionProps<"input">>;
declare const MotionIns: ForwardRefComponent<HTMLModElement, HTMLMotionProps<"ins">>;
declare const MotionKbd: ForwardRefComponent<HTMLElement, HTMLMotionProps<"kbd">>;
declare const MotionKeygen: ForwardRefComponent<HTMLElement, HTMLMotionProps<"keygen">>;
declare const MotionLabel: ForwardRefComponent<HTMLLabelElement, HTMLMotionProps<"label">>;
declare const MotionLegend: ForwardRefComponent<HTMLLegendElement, HTMLMotionProps<"legend">>;
declare const MotionLi: ForwardRefComponent<HTMLLIElement, HTMLMotionProps<"li">>;
declare const MotionLink: ForwardRefComponent<HTMLLinkElement, HTMLMotionProps<"link">>;
declare const MotionMain: ForwardRefComponent<HTMLElement, HTMLMotionProps<"main">>;
declare const MotionMap: ForwardRefComponent<HTMLMapElement, HTMLMotionProps<"map">>;
declare const MotionMark: ForwardRefComponent<HTMLElement, HTMLMotionProps<"mark">>;
declare const MotionMenu: ForwardRefComponent<HTMLElement, HTMLMotionProps<"menu">>;
declare const MotionMenuitem: ForwardRefComponent<HTMLElement, HTMLMotionProps<"menuitem">>;
declare const MotionMeter: ForwardRefComponent<HTMLMeterElement, HTMLMotionProps<"meter">>;
declare const MotionNav: ForwardRefComponent<HTMLElement, HTMLMotionProps<"nav">>;
declare const MotionObject: ForwardRefComponent<HTMLObjectElement, HTMLMotionProps<"object">>;
declare const MotionOl: ForwardRefComponent<HTMLOListElement, HTMLMotionProps<"ol">>;
declare const MotionOptgroup: ForwardRefComponent<HTMLOptGroupElement, HTMLMotionProps<"optgroup">>;
declare const MotionOption: ForwardRefComponent<HTMLOptionElement, HTMLMotionProps<"option">>;
declare const MotionOutput: ForwardRefComponent<HTMLOutputElement, HTMLMotionProps<"output">>;
declare const MotionP: ForwardRefComponent<HTMLParagraphElement, HTMLMotionProps<"p">>;
declare const MotionParam: ForwardRefComponent<HTMLParamElement, HTMLMotionProps<"param">>;
declare const MotionPicture: ForwardRefComponent<HTMLElement, HTMLMotionProps<"picture">>;
declare const MotionPre: ForwardRefComponent<HTMLPreElement, HTMLMotionProps<"pre">>;
declare const MotionProgress: ForwardRefComponent<HTMLProgressElement, HTMLMotionProps<"progress">>;
declare const MotionQ: ForwardRefComponent<HTMLQuoteElement, HTMLMotionProps<"q">>;
declare const MotionRp: ForwardRefComponent<HTMLElement, HTMLMotionProps<"rp">>;
declare const MotionRt: ForwardRefComponent<HTMLElement, HTMLMotionProps<"rt">>;
declare const MotionRuby: ForwardRefComponent<HTMLElement, HTMLMotionProps<"ruby">>;
declare const MotionS: ForwardRefComponent<HTMLElement, HTMLMotionProps<"s">>;
declare const MotionSamp: ForwardRefComponent<HTMLElement, HTMLMotionProps<"samp">>;
declare const MotionScript: ForwardRefComponent<HTMLScriptElement, HTMLMotionProps<"script">>;
declare const MotionSection: ForwardRefComponent<HTMLElement, HTMLMotionProps<"section">>;
declare const MotionSelect: ForwardRefComponent<HTMLSelectElement, HTMLMotionProps<"select">>;
declare const MotionSmall: ForwardRefComponent<HTMLElement, HTMLMotionProps<"small">>;
declare const MotionSource: ForwardRefComponent<HTMLSourceElement, HTMLMotionProps<"source">>;
declare const MotionSpan: ForwardRefComponent<HTMLSpanElement, HTMLMotionProps<"span">>;
declare const MotionStrong: ForwardRefComponent<HTMLElement, HTMLMotionProps<"strong">>;
declare const MotionStyle: ForwardRefComponent<HTMLStyleElement, HTMLMotionProps<"style">>;
declare const MotionSub: ForwardRefComponent<HTMLElement, HTMLMotionProps<"sub">>;
declare const MotionSummary: ForwardRefComponent<HTMLElement, HTMLMotionProps<"summary">>;
declare const MotionSup: ForwardRefComponent<HTMLElement, HTMLMotionProps<"sup">>;
declare const MotionTable: ForwardRefComponent<HTMLTableElement, HTMLMotionProps<"table">>;
declare const MotionTbody: ForwardRefComponent<HTMLTableSectionElement, HTMLMotionProps<"tbody">>;
declare const MotionTd: ForwardRefComponent<HTMLTableDataCellElement, HTMLMotionProps<"td">>;
declare const MotionTextarea: ForwardRefComponent<HTMLTextAreaElement, HTMLMotionProps<"textarea">>;
declare const MotionTfoot: ForwardRefComponent<HTMLTableSectionElement, HTMLMotionProps<"tfoot">>;
declare const MotionTh: ForwardRefComponent<HTMLTableHeaderCellElement, HTMLMotionProps<"th">>;
declare const MotionThead: ForwardRefComponent<HTMLTableSectionElement, HTMLMotionProps<"thead">>;
declare const MotionTime: ForwardRefComponent<HTMLTimeElement, HTMLMotionProps<"time">>;
declare const MotionTitle: ForwardRefComponent<HTMLTitleElement, HTMLMotionProps<"title">>;
declare const MotionTr: ForwardRefComponent<HTMLTableRowElement, HTMLMotionProps<"tr">>;
declare const MotionTrack: ForwardRefComponent<HTMLTrackElement, HTMLMotionProps<"track">>;
declare const MotionU: ForwardRefComponent<HTMLElement, HTMLMotionProps<"u">>;
declare const MotionUl: ForwardRefComponent<HTMLUListElement, HTMLMotionProps<"ul">>;
declare const MotionVideo: ForwardRefComponent<HTMLVideoElement, HTMLMotionProps<"video">>;
declare const MotionWbr: ForwardRefComponent<HTMLElement, HTMLMotionProps<"wbr">>;
declare const MotionWebview: ForwardRefComponent<HTMLWebViewElement, HTMLMotionProps<"webview">>;
/**
 * SVG components
 */
declare const MotionAnimate: ForwardRefComponent<SVGElement, SVGMotionProps<SVGElement>>;
declare const MotionCircle: ForwardRefComponent<SVGCircleElement, SVGMotionProps<SVGCircleElement>>;
declare const MotionDefs: ForwardRefComponent<SVGDefsElement, SVGMotionProps<SVGDefsElement>>;
declare const MotionDesc: ForwardRefComponent<SVGDescElement, SVGMotionProps<SVGDescElement>>;
declare const MotionEllipse: ForwardRefComponent<SVGEllipseElement, SVGMotionProps<SVGEllipseElement>>;
declare const MotionG: ForwardRefComponent<SVGGElement, SVGMotionProps<SVGGElement>>;
declare const MotionImage: ForwardRefComponent<SVGImageElement, SVGMotionProps<SVGImageElement>>;
declare const MotionLine: ForwardRefComponent<SVGLineElement, SVGMotionProps<SVGLineElement>>;
declare const MotionFilter: ForwardRefComponent<SVGFilterElement, SVGMotionProps<SVGFilterElement>>;
declare const MotionMarker: ForwardRefComponent<SVGMarkerElement, SVGMotionProps<SVGMarkerElement>>;
declare const MotionMask: ForwardRefComponent<SVGMaskElement, SVGMotionProps<SVGMaskElement>>;
declare const MotionMetadata: ForwardRefComponent<SVGMetadataElement, SVGMotionProps<SVGMetadataElement>>;
declare const MotionPath: ForwardRefComponent<SVGPathElement, SVGMotionProps<SVGPathElement>>;
declare const MotionPattern: ForwardRefComponent<SVGPatternElement, SVGMotionProps<SVGPatternElement>>;
declare const MotionPolygon: ForwardRefComponent<SVGPolygonElement, SVGMotionProps<SVGPolygonElement>>;
declare const MotionPolyline: ForwardRefComponent<SVGPolylineElement, SVGMotionProps<SVGPolylineElement>>;
declare const MotionRect: ForwardRefComponent<SVGRectElement, SVGMotionProps<SVGRectElement>>;
declare const MotionStop: ForwardRefComponent<SVGStopElement, SVGMotionProps<SVGStopElement>>;
declare const MotionSvg: ForwardRefComponent<SVGSVGElement, SVGMotionProps<SVGSVGElement>>;
declare const MotionSymbol: ForwardRefComponent<SVGSymbolElement, SVGMotionProps<SVGSymbolElement>>;
declare const MotionText: ForwardRefComponent<SVGTextElement, SVGMotionProps<SVGTextElement>>;
declare const MotionTspan: ForwardRefComponent<SVGTSpanElement, SVGMotionProps<SVGTSpanElement>>;
declare const MotionUse: ForwardRefComponent<SVGUseElement, SVGMotionProps<SVGUseElement>>;
declare const MotionView: ForwardRefComponent<SVGViewElement, SVGMotionProps<SVGViewElement>>;
declare const MotionClipPath: ForwardRefComponent<SVGClipPathElement, SVGMotionProps<SVGClipPathElement>>;
declare const MotionFeBlend: ForwardRefComponent<SVGFEBlendElement, SVGMotionProps<SVGFEBlendElement>>;
declare const MotionFeColorMatrix: ForwardRefComponent<SVGFEColorMatrixElement, SVGMotionProps<SVGFEColorMatrixElement>>;
declare const MotionFeComponentTransfer: ForwardRefComponent<SVGFEComponentTransferElement, SVGMotionProps<SVGFEComponentTransferElement>>;
declare const MotionFeComposite: ForwardRefComponent<SVGFECompositeElement, SVGMotionProps<SVGFECompositeElement>>;
declare const MotionFeConvolveMatrix: ForwardRefComponent<SVGFEConvolveMatrixElement, SVGMotionProps<SVGFEConvolveMatrixElement>>;
declare const MotionFeDiffuseLighting: ForwardRefComponent<SVGFEDiffuseLightingElement, SVGMotionProps<SVGFEDiffuseLightingElement>>;
declare const MotionFeDisplacementMap: ForwardRefComponent<SVGFEDisplacementMapElement, SVGMotionProps<SVGFEDisplacementMapElement>>;
declare const MotionFeDistantLight: ForwardRefComponent<SVGFEDistantLightElement, SVGMotionProps<SVGFEDistantLightElement>>;
declare const MotionFeDropShadow: ForwardRefComponent<SVGFEDropShadowElement, SVGMotionProps<SVGFEDropShadowElement>>;
declare const MotionFeFlood: ForwardRefComponent<SVGFEFloodElement, SVGMotionProps<SVGFEFloodElement>>;
declare const MotionFeFuncA: ForwardRefComponent<SVGFEFuncAElement, SVGMotionProps<SVGFEFuncAElement>>;
declare const MotionFeFuncB: ForwardRefComponent<SVGFEFuncBElement, SVGMotionProps<SVGFEFuncBElement>>;
declare const MotionFeFuncG: ForwardRefComponent<SVGFEFuncGElement, SVGMotionProps<SVGFEFuncGElement>>;
declare const MotionFeFuncR: ForwardRefComponent<SVGFEFuncRElement, SVGMotionProps<SVGFEFuncRElement>>;
declare const MotionFeGaussianBlur: ForwardRefComponent<SVGFEGaussianBlurElement, SVGMotionProps<SVGFEGaussianBlurElement>>;
declare const MotionFeImage: ForwardRefComponent<SVGFEImageElement, SVGMotionProps<SVGFEImageElement>>;
declare const MotionFeMerge: ForwardRefComponent<SVGFEMergeElement, SVGMotionProps<SVGFEMergeElement>>;
declare const MotionFeMergeNode: ForwardRefComponent<SVGFEMergeNodeElement, SVGMotionProps<SVGFEMergeNodeElement>>;
declare const MotionFeMorphology: ForwardRefComponent<SVGFEMorphologyElement, SVGMotionProps<SVGFEMorphologyElement>>;
declare const MotionFeOffset: ForwardRefComponent<SVGFEOffsetElement, SVGMotionProps<SVGFEOffsetElement>>;
declare const MotionFePointLight: ForwardRefComponent<SVGFEPointLightElement, SVGMotionProps<SVGFEPointLightElement>>;
declare const MotionFeSpecularLighting: ForwardRefComponent<SVGFESpecularLightingElement, SVGMotionProps<SVGFESpecularLightingElement>>;
declare const MotionFeSpotLight: ForwardRefComponent<SVGFESpotLightElement, SVGMotionProps<SVGFESpotLightElement>>;
declare const MotionFeTile: ForwardRefComponent<SVGFETileElement, SVGMotionProps<SVGFETileElement>>;
declare const MotionFeTurbulence: ForwardRefComponent<SVGFETurbulenceElement, SVGMotionProps<SVGFETurbulenceElement>>;
declare const MotionForeignObject: ForwardRefComponent<SVGForeignObjectElement, SVGMotionProps<SVGForeignObjectElement>>;
declare const MotionLinearGradient: ForwardRefComponent<SVGLinearGradientElement, SVGMotionProps<SVGLinearGradientElement>>;
declare const MotionRadialGradient: ForwardRefComponent<SVGRadialGradientElement, SVGMotionProps<SVGRadialGradientElement>>;
declare const MotionTextPath: ForwardRefComponent<SVGTextPathElement, SVGMotionProps<SVGTextPathElement>>;

export { MotionA as a, MotionAbbr as abbr, MotionAddress as address, MotionAnimate as animate, MotionArea as area, MotionArticle as article, MotionAside as aside, MotionAudio as audio, MotionB as b, MotionBase as base, MotionBdi as bdi, MotionBdo as bdo, MotionBig as big, MotionBlockquote as blockquote, MotionBody as body, MotionButton as button, MotionCanvas as canvas, MotionCaption as caption, MotionCircle as circle, MotionCite as cite, MotionClipPath as clipPath, MotionCode as code, MotionCol as col, MotionColgroup as colgroup, MotionData as data, MotionDatalist as datalist, MotionDd as dd, MotionDefs as defs, MotionDel as del, MotionDesc as desc, MotionDetails as details, MotionDfn as dfn, MotionDialog as dialog, MotionDiv as div, MotionDl as dl, MotionDt as dt, MotionEllipse as ellipse, MotionEm as em, MotionEmbed as embed, MotionFeBlend as feBlend, MotionFeColorMatrix as feColorMatrix, MotionFeComponentTransfer as feComponentTransfer, MotionFeComposite as feComposite, MotionFeConvolveMatrix as feConvolveMatrix, MotionFeDiffuseLighting as feDiffuseLighting, MotionFeDisplacementMap as feDisplacementMap, MotionFeDistantLight as feDistantLight, MotionFeDropShadow as feDropShadow, MotionFeFlood as feFlood, MotionFeFuncA as feFuncA, MotionFeFuncB as feFuncB, MotionFeFuncG as feFuncG, MotionFeFuncR as feFuncR, MotionFeGaussianBlur as feGaussianBlur, MotionFeImage as feImage, MotionFeMerge as feMerge, MotionFeMergeNode as feMergeNode, MotionFeMorphology as feMorphology, MotionFeOffset as feOffset, MotionFePointLight as fePointLight, MotionFeSpecularLighting as feSpecularLighting, MotionFeSpotLight as feSpotLight, MotionFeTile as feTile, MotionFeTurbulence as feTurbulence, MotionFieldset as fieldset, MotionFigcaption as figcaption, MotionFigure as figure, MotionFilter as filter, MotionFooter as footer, MotionForeignObject as foreignObject, MotionForm as form, MotionG as g, MotionH1 as h1, MotionH2 as h2, MotionH3 as h3, MotionH4 as h4, MotionH5 as h5, MotionH6 as h6, MotionHead as head, MotionHeader as header, MotionHgroup as hgroup, MotionHr as hr, MotionHtml as html, MotionI as i, MotionIframe as iframe, MotionImage as image, MotionImg as img, MotionInput as input, MotionIns as ins, MotionKbd as kbd, MotionKeygen as keygen, MotionLabel as label, MotionLegend as legend, MotionLi as li, MotionLine as line, MotionLinearGradient as linearGradient, MotionLink as link, MotionMain as main, MotionMap as map, MotionMark as mark, MotionMarker as marker, MotionMask as mask, MotionMenu as menu, MotionMenuitem as menuitem, MotionMetadata as metadata, MotionMeter as meter, MotionNav as nav, MotionObject as object, MotionOl as ol, MotionOptgroup as optgroup, MotionOption as option, MotionOutput as output, MotionP as p, MotionParam as param, MotionPath as path, MotionPattern as pattern, MotionPicture as picture, MotionPolygon as polygon, MotionPolyline as polyline, MotionPre as pre, MotionProgress as progress, MotionQ as q, MotionRadialGradient as radialGradient, MotionRect as rect, MotionRp as rp, MotionRt as rt, MotionRuby as ruby, MotionS as s, MotionSamp as samp, MotionScript as script, MotionSection as section, MotionSelect as select, MotionSmall as small, MotionSource as source, MotionSpan as span, MotionStop as stop, MotionStrong as strong, MotionStyle as style, MotionSub as sub, MotionSummary as summary, MotionSup as sup, MotionSvg as svg, MotionSymbol as symbol, MotionTable as table, MotionTbody as tbody, MotionTd as td, MotionText as text, MotionTextPath as textPath, MotionTextarea as textarea, MotionTfoot as tfoot, MotionTh as th, MotionThead as thead, MotionTime as time, MotionTitle as title, MotionTr as tr, MotionTrack as track, MotionTspan as tspan, MotionU as u, MotionUl as ul, MotionUse as use, MotionVideo as video, MotionView as view, MotionWbr as wbr, MotionWebview as webview };
web/node_modules/framer-motion/dist/types/index.d.ts
/// <reference types="react" />
import * as motion_dom from 'motion-dom';
import { AnyResolvedKeyframe, OnKeyframesResolved, KeyframeResolver, UnresolvedValueKeyframe, MotionValue, Transition, ElementOrSelector, DOMKeyframesDefinition, AnimationOptions, AnimationPlaybackOptions, AnimationScope, AnimationPlaybackControlsWithThen, ValueAnimationTransition, AnimationPlaybackControls, EventInfo, MotionValueEventCallbacks, SpringOptions, TransformOptions, LegacyAnimationControls, AnimationDefinition } from 'motion-dom';
export * from 'motion-dom';
import * as react_jsx_runtime from 'react/jsx-runtime';
import * as React$1 from 'react';
import { useEffect, RefObject } from 'react';
import { V as VariantLabels, a as VisualElement, M as MotionProps, C as CreateVisualElement, b as MotionConfigContext, H as HTMLElements, c as HTMLMotionProps, D as DOMMotionComponents, d as HTMLMotionComponents, S as SVGMotionComponents, e as VisualElementAnimationOptions, I as IProjectionNode, R as ResolvedValues, f as HTMLRenderState } from '../types.d-DagZKalS.js';
export { A as AnimationType, p as FlatTree, F as ForwardRefComponent, j as MotionStyle, k as MotionTransform, P as PresenceContext, l as SVGAttributesAsMotionValues, n as SVGMotionProps, g as ScrapeMotionValuesFromProps, i as SwitchLayoutGroupContext, h as VisualState, m as makeUseVisualState, o as optimizedAppearDataAttribute } from '../types.d-DagZKalS.js';
import { Easing, EasingFunction, Point, Axis, Box } from 'motion-utils';
export * from 'motion-utils';
export { MotionGlobalConfig } from 'motion-utils';

type ResolveKeyframes<V extends AnyResolvedKeyframe> = (keyframes: V[], onComplete: OnKeyframesResolved<V>, name?: string, motionValue?: any) => KeyframeResolver<V>;

/**
 * @public
 */
interface AnimatePresenceProps {
    /**
     * By passing `initial={false}`, `AnimatePresence` will disable any initial animations on children
     * that are present when the component is first rendered.
     *
     * ```jsx
     * <AnimatePresence initial={false}>
     *   {isVisible && (
     *     <motion.div
     *       key="modal"
     *       initial={{ opacity: 0 }}
     *       animate={{ opacity: 1 }}
     *       exit={{ opacity: 0 }}
     *     />
     *   )}
     * </AnimatePresence>
     * ```
     *
     * @public
     */
    initial?: boolean;
    /**
     * When a component is removed, there's no longer a chance to update its props. So if a component's `exit`
     * prop is defined as a dynamic variant and you want to pass a new `custom` prop, you can do so via `AnimatePresence`.
     * This will ensure all leaving components animate using the latest data.
     *
     * @public
     */
    custom?: any;
    /**
     * Fires when all exiting nodes have completed animating out.
     *
     * @public
     */
    onExitComplete?: () => void;
    /**
     * Determines how to handle entering and exiting elements.
     *
     * - `"sync"`: Default. Elements animate in and out as soon as they're added/removed.
     * - `"popLayout"`: Exiting elements are "popped" from the page layout, allowing sibling
     *      elements to immediately occupy their new layouts.
     * - `"wait"`: Only renders one component at a time. Wait for the exiting component to animate out
     *      before animating the next component in.
     *
     * @public
     */
    mode?: "sync" | "popLayout" | "wait";
    /**
     * Root element to use when injecting styles, used when mode === `"popLayout"`.
     * This defaults to document.head but can be overridden e.g. for use in shadow DOM.
     */
    root?: HTMLElement | ShadowRoot;
    /**
     * Internal. Used in Framer to flag that sibling children *shouldn't* re-render as a result of a
     * child being removed.
     */
    presenceAffectsLayout?: boolean;
    /**
     * If true, the `AnimatePresence` component will propagate parent exit animations
     * to its children.
     */
    propagate?: boolean;
    /**
     * Internal. Set whether to anchor the x position of the exiting element to the left or right
     * when using `mode="popLayout"`.
     */
    anchorX?: "left" | "right";
}

/**
 * `AnimatePresence` enables the animation of components that have been removed from the tree.
 *
 * When adding/removing more than a single child, every child **must** be given a unique `key` prop.
 *
 * Any `motion` components that have an `exit` property defined will animate out when removed from
 * the tree.
 *
 * ```jsx
 * import { motion, AnimatePresence } from 'framer-motion'
 *
 * export const Items = ({ items }) => (
 *   <AnimatePresence>
 *     {items.map(item => (
 *       <motion.div
 *         key={item.id}
 *         initial={{ opacity: 0 }}
 *         animate={{ opacity: 1 }}
 *         exit={{ opacity: 0 }}
 *       />
 *     ))}
 *   </AnimatePresence>
 * )
 * ```
 *
 * You can sequence exit animations throughout a tree using variants.
 *
 * If a child contains multiple `motion` components with `exit` props, it will only unmount the child
 * once all `motion` components have finished animating out. Likewise, any components using
 * `usePresence` all need to call `safeToRemove`.
 *
 * @public
 */
declare const AnimatePresence: ({ children, custom, initial, onExitComplete, presenceAffectsLayout, mode, propagate, anchorX, root }: React$1.PropsWithChildren<AnimatePresenceProps>) => react_jsx_runtime.JSX.Element | null;

interface Props$3 {
    children: React$1.ReactElement;
    isPresent: boolean;
    anchorX?: "left" | "right";
    root?: HTMLElement | ShadowRoot;
}
declare function PopChild({ children, isPresent, anchorX, root }: Props$3): react_jsx_runtime.JSX.Element;

interface PresenceChildProps {
    children: React$1.ReactElement;
    isPresent: boolean;
    onExitComplete?: () => void;
    initial?: false | VariantLabels;
    custom?: any;
    presenceAffectsLayout: boolean;
    mode: "sync" | "popLayout" | "wait";
    anchorX?: "left" | "right";
    root?: HTMLElement | ShadowRoot;
}
declare const PresenceChild: ({ children, initial, isPresent, onExitComplete, custom, presenceAffectsLayout, mode, anchorX, root }: PresenceChildProps) => react_jsx_runtime.JSX.Element;

type InheritOption = boolean | "id";
interface Props$2 {
    id?: string;
    inherit?: InheritOption;
}
declare const LayoutGroup: React$1.FunctionComponent<React$1.PropsWithChildren<Props$2>>;

declare abstract class Feature<T extends any = any> {
    isMounted: boolean;
    node: VisualElement<T>;
    constructor(node: VisualElement<T>);
    abstract mount(): void;
    abstract unmount(): void;
    update(): void;
}

declare function MeasureLayout(props: MotionProps & {
    visualElement: VisualElement;
}): react_jsx_runtime.JSX.Element;

interface FeatureClass<Props = unknown> {
    new (props: Props): Feature<Props>;
}
interface HydratedFeatureDefinition {
    isEnabled: (props: MotionProps) => boolean;
    Feature: FeatureClass<unknown>;
    ProjectionNode?: any;
    MeasureLayout?: typeof MeasureLayout;
}
interface HydratedFeatureDefinitions {
    animation?: HydratedFeatureDefinition;
    exit?: HydratedFeatureDefinition;
    drag?: HydratedFeatureDefinition;
    tap?: HydratedFeatureDefinition;
    focus?: HydratedFeatureDefinition;
    hover?: HydratedFeatureDefinition;
    pan?: HydratedFeatureDefinition;
    inView?: HydratedFeatureDefinition;
    layout?: HydratedFeatureDefinition;
}
interface FeatureDefinition {
    isEnabled: HydratedFeatureDefinition["isEnabled"];
    Feature?: HydratedFeatureDefinition["Feature"];
    ProjectionNode?: HydratedFeatureDefinition["ProjectionNode"];
    MeasureLayout?: HydratedFeatureDefinition["MeasureLayout"];
}
type FeatureDefinitions = {
    [K in keyof HydratedFeatureDefinitions]: FeatureDefinition;
};
interface FeaturePackage {
    Feature?: HydratedFeatureDefinition["Feature"];
    ProjectionNode?: HydratedFeatureDefinition["ProjectionNode"];
    MeasureLayout?: HydratedFeatureDefinition["MeasureLayout"];
}
type FeaturePackages = {
    [K in keyof HydratedFeatureDefinitions]: FeaturePackage;
};
interface FeatureBundle extends FeaturePackages {
    renderer: CreateVisualElement;
}
type LazyFeatureBundle$1 = () => Promise<FeatureBundle>;

type LazyFeatureBundle = () => Promise<FeatureBundle>;
/**
 * @public
 */
interface LazyProps {
    children?: React.ReactNode;
    /**
     * Can be used to provide a feature bundle synchronously or asynchronously.
     *
     * ```jsx
     * // features.js
     * import { domAnimation } from "framer-motion"
     * export default domAnimation
     *
     * // index.js
     * import { LazyMotion, m } from "framer-motion"
     *
     * const loadFeatures = () =>import("./features.js")
     *   .then(res => res.default)
     *
     * function Component() {
     *   return (
     *     <LazyMotion features={loadFeatures}>
     *       <m.div animate={{ scale: 1.5 }} />
     *     </LazyMotion>
     *   )
     * }
     * ```
     *
     * @public
     */
    features: FeatureBundle | LazyFeatureBundle;
    /**
     * If `true`, will throw an error if a `motion` component renders within
     * a `LazyMotion` component.
     *
     * ```jsx
     * // This component will throw an error that explains using a motion component
     * // instead of the m component will break the benefits of code-splitting.
     * function Component() {
     *   return (
     *     <LazyMotion features={domAnimation} strict>
     *       <motion.div />
     *     </LazyMotion>
     *   )
     * }
     * ```
     *
     * @public
     */
    strict?: boolean;
}

/**
 * Used in conjunction with the `m` component to reduce bundle size.
 *
 * `m` is a version of the `motion` component that only loads functionality
 * critical for the initial render.
 *
 * `LazyMotion` can then be used to either synchronously or asynchronously
 * load animation and gesture support.
 *
 * ```jsx
 * // Synchronous loading
 * import { LazyMotion, m, domAnimation } from "framer-motion"
 *
 * function App() {
 *   return (
 *     <LazyMotion features={domAnimation}>
 *       <m.div animate={{ scale: 2 }} />
 *     </LazyMotion>
 *   )
 * }
 *
 * // Asynchronous loading
 * import { LazyMotion, m } from "framer-motion"
 *
 * function App() {
 *   return (
 *     <LazyMotion features={() => import('./path/to/domAnimation')}>
 *       <m.div animate={{ scale: 2 }} />
 *     </LazyMotion>
 *   )
 * }
 * ```
 *
 * @public
 */
declare function LazyMotion({ children, features, strict }: LazyProps): react_jsx_runtime.JSX.Element;

type IsValidProp = (key: string) => boolean;
declare function filterProps(props: MotionProps, isDom: boolean, forwardMotionProps: boolean): MotionProps;

interface MotionConfigProps extends Partial<MotionConfigContext> {
    children?: React$1.ReactNode;
    isValidProp?: IsValidProp;
}
/**
 * `MotionConfig` is used to set configuration options for all children `motion` components.
 *
 * ```jsx
 * import { motion, MotionConfig } from "framer-motion"
 *
 * export function App() {
 *   return (
 *     <MotionConfig transition={{ type: "spring" }}>
 *       <motion.div animate={{ x: 100 }} />
 *     </MotionConfig>
 *   )
 * }
 * ```
 *
 * @public
 */
declare function MotionConfig({ children, isValidProp, ...config }: MotionConfigProps): react_jsx_runtime.JSX.Element;

type ObjectTarget<O> = {
    [K in keyof O]?: O[K] | UnresolvedValueKeyframe[];
};
type SequenceTime = number | "<" | `+${number}` | `-${number}` | `${string}`;
type SequenceLabel = string;
interface SequenceLabelWithTime {
    name: SequenceLabel;
    at: SequenceTime;
}
interface At {
    at?: SequenceTime;
}
type MotionValueSegment = [
    MotionValue,
    UnresolvedValueKeyframe | UnresolvedValueKeyframe[]
];
type MotionValueSegmentWithTransition = [
    MotionValue,
    UnresolvedValueKeyframe | UnresolvedValueKeyframe[],
    Transition & At
];
type DOMSegment = [ElementOrSelector, DOMKeyframesDefinition];
type DOMSegmentWithTransition = [
    ElementOrSelector,
    DOMKeyframesDefinition,
    AnimationOptions & At
];
type ObjectSegment<O extends {} = {}> = [O, ObjectTarget<O>];
type ObjectSegmentWithTransition<O extends {} = {}> = [
    O,
    ObjectTarget<O>,
    AnimationOptions & At
];
type Segment = ObjectSegment | ObjectSegmentWithTransition | SequenceLabel | SequenceLabelWithTime | MotionValueSegment | MotionValueSegmentWithTransition | DOMSegment | DOMSegmentWithTransition;
type AnimationSequence = Segment[];
interface SequenceOptions extends AnimationPlaybackOptions {
    delay?: number;
    duration?: number;
    defaultTransition?: Transition;
}
interface AbsoluteKeyframe {
    value: AnyResolvedKeyframe | null;
    at: number;
    easing?: Easing;
}
type ValueSequence = AbsoluteKeyframe[];
interface SequenceMap {
    [key: string]: ValueSequence;
}
type ResolvedAnimationDefinition = {
    keyframes: {
        [key: string]: UnresolvedValueKeyframe[];
    };
    transition: {
        [key: string]: Transition;
    };
};
type ResolvedAnimationDefinitions = Map<Element | MotionValue, ResolvedAnimationDefinition>;

/**
 * Creates an animation function that is optionally scoped
 * to a specific element.
 */
declare function createScopedAnimate(scope?: AnimationScope): {
    (sequence: AnimationSequence, options?: SequenceOptions): AnimationPlaybackControlsWithThen;
    (value: string | MotionValue<string>, keyframes: string | UnresolvedValueKeyframe<string>[], options?: ValueAnimationTransition<string>): AnimationPlaybackControlsWithThen;
    (value: number | MotionValue<number>, keyframes: number | UnresolvedValueKeyframe<number>[], options?: ValueAnimationTransition<number>): AnimationPlaybackControlsWithThen;
    <V extends string | number>(value: V | MotionValue<V>, keyframes: V | UnresolvedValueKeyframe<V>[], options?: ValueAnimationTransition<V>): AnimationPlaybackControlsWithThen;
    (element: ElementOrSelector, keyframes: DOMKeyframesDefinition, options?: AnimationOptions): AnimationPlaybackControlsWithThen;
    <O extends {}>(object: O | O[], keyframes: ObjectTarget<O>, options?: AnimationOptions): AnimationPlaybackControlsWithThen;
};
declare const animate: {
    (sequence: AnimationSequence, options?: SequenceOptions): AnimationPlaybackControlsWithThen;
    (value: string | MotionValue<string>, keyframes: string | UnresolvedValueKeyframe<string>[], options?: ValueAnimationTransition<string>): AnimationPlaybackControlsWithThen;
    (value: number | MotionValue<number>, keyframes: number | UnresolvedValueKeyframe<number>[], options?: ValueAnimationTransition<number>): AnimationPlaybackControlsWithThen;
    <V extends string | number>(value: V | MotionValue<V>, keyframes: V | UnresolvedValueKeyframe<V>[], options?: ValueAnimationTransition<V>): AnimationPlaybackControlsWithThen;
    (element: ElementOrSelector, keyframes: DOMKeyframesDefinition, options?: AnimationOptions): AnimationPlaybackControlsWithThen;
    <O extends {}>(object: O | O[], keyframes: ObjectTarget<O>, options?: AnimationOptions): AnimationPlaybackControlsWithThen;
};

declare const animateMini: (elementOrSelector: ElementOrSelector, keyframes: DOMKeyframesDefinition, options?: AnimationOptions) => AnimationPlaybackControlsWithThen;

interface ScrollOptions {
    source?: HTMLElement;
    container?: Element;
    target?: Element;
    axis?: "x" | "y";
    offset?: ScrollOffset;
}
type OnScrollProgress = (progress: number) => void;
type OnScrollWithInfo = (progress: number, info: ScrollInfo) => void;
type OnScroll = OnScrollProgress | OnScrollWithInfo;
interface AxisScrollInfo {
    current: number;
    offset: number[];
    progress: number;
    scrollLength: number;
    velocity: number;
    targetOffset: number;
    targetLength: number;
    containerLength: number;
    interpolatorOffsets?: number[];
    interpolate?: EasingFunction;
}
interface ScrollInfo {
    time: number;
    x: AxisScrollInfo;
    y: AxisScrollInfo;
}
type OnScrollInfo = (info: ScrollInfo) => void;
type SupportedEdgeUnit = "px" | "vw" | "vh" | "%";
type EdgeUnit = `${number}${SupportedEdgeUnit}`;
type NamedEdges = "start" | "end" | "center";
type EdgeString = NamedEdges | EdgeUnit | `${number}`;
type Edge = EdgeString | number;
type ProgressIntersection = [number, number];
type Intersection = `${Edge} ${Edge}`;
type ScrollOffset = Array<Edge | Intersection | ProgressIntersection>;
interface ScrollInfoOptions {
    container?: Element;
    target?: Element;
    axis?: "x" | "y";
    offset?: ScrollOffset;
}

declare function scroll(onScroll: OnScroll | AnimationPlaybackControls, { axis, container, ...options }?: ScrollOptions): VoidFunction;

declare function scrollInfo(onScroll: OnScrollInfo, { container, ...options }?: ScrollInfoOptions): VoidFunction;

type ViewChangeHandler = (entry: IntersectionObserverEntry) => void;
type MarginValue = `${number}${"px" | "%"}`;
type MarginType = MarginValue | `${MarginValue} ${MarginValue}` | `${MarginValue} ${MarginValue} ${MarginValue}` | `${MarginValue} ${MarginValue} ${MarginValue} ${MarginValue}`;
interface InViewOptions {
    root?: Element | Document;
    margin?: MarginType;
    amount?: "some" | "all" | number;
}
declare function inView(elementOrSelector: ElementOrSelector, onStart: (element: Element, entry: IntersectionObserverEntry) => void | ViewChangeHandler, { root, margin: rootMargin, amount }?: InViewOptions): VoidFunction;

type DelayedFunction = (overshoot: number) => void;
/**
 * Timeout defined in ms
 */
declare function delay(callback: DelayedFunction, timeout: number): () => void;

declare const distance: (a: number, b: number) => number;
declare function distance2D(a: Point, b: Point): number;

type ReorderElementTag = keyof HTMLElements;
type DefaultGroupElement = "ul";
type DefaultItemElement = "li";

interface Props$1<V, TagName extends ReorderElementTag = DefaultGroupElement> {
    /**
     * A HTML element to render this component as. Defaults to `"ul"`.
     *
     * @public
     */
    as?: TagName;
    /**
     * The axis to reorder along. By default, items will be draggable on this axis.
     * To make draggable on both axes, set `<Reorder.Item drag />`
     *
     * @public
     */
    axis?: "x" | "y";
    /**
     * A callback to fire with the new value order. For instance, if the values
     * are provided as a state from `useState`, this could be the set state function.
     *
     * @public
     */
    onReorder: (newOrder: V[]) => void;
    /**
     * The latest values state.
     *
     * ```jsx
     * function Component() {
     *   const [items, setItems] = useState([0, 1, 2])
     *
     *   return (
     *     <Reorder.Group values={items} onReorder={setItems}>
     *         {items.map((item) => <Reorder.Item key={item} value={item} />)}
     *     </Reorder.Group>
     *   )
     * }
     * ```
     *
     * @public
     */
    values: V[];
}
type ReorderGroupProps<V, TagName extends ReorderElementTag = DefaultGroupElement> = Props$1<V, TagName> & Omit<HTMLMotionProps<TagName>, "values"> & React$1.PropsWithChildren<{}>;
declare function ReorderGroupComponent<V, TagName extends ReorderElementTag = DefaultGroupElement>({ children, as, axis, onReorder, values, ...props }: ReorderGroupProps<V, TagName>, externalRef?: React$1.ForwardedRef<any>): JSX.Element;
declare const ReorderGroup: <V, TagName extends keyof HTMLElements = "ul">(props: ReorderGroupProps<V, TagName> & {
    ref?: React$1.ForwardedRef<any>;
}) => ReturnType<typeof ReorderGroupComponent>;

interface Props<V, TagName extends ReorderElementTag = DefaultItemElement> {
    /**
     * A HTML element to render this component as. Defaults to `"li"`.
     *
     * @public
     */
    as?: TagName;
    /**
     * The value in the list that this component represents.
     *
     * @public
     */
    value: V;
    /**
     * A subset of layout options primarily used to disable layout="size"
     *
     * @public
     * @default true
     */
    layout?: true | "position";
}
type ReorderItemProps<V, TagName extends ReorderElementTag = DefaultItemElement> = Props<V, TagName> & Omit<HTMLMotionProps<TagName>, "value" | "layout"> & React$1.PropsWithChildren<{}>;
declare function ReorderItemComponent<V, TagName extends ReorderElementTag = DefaultItemElement>({ children, style, value, as, onDrag, layout, ...props }: ReorderItemProps<V, TagName>, externalRef?: React$1.ForwardedRef<any>): JSX.Element;
declare const ReorderItem: <V, TagName extends keyof HTMLElements = "li">(props: ReorderItemProps<V, TagName> & {
    ref?: React$1.ForwardedRef<any>;
}) => ReturnType<typeof ReorderItemComponent>;

declare namespace namespace_d {
  export { ReorderGroup as Group, ReorderItem as Item };
}

type MotionComponentProps<Props> = {
    [K in Exclude<keyof Props, keyof MotionProps>]?: Props[K];
} & MotionProps;
type MotionComponent<T, P> = T extends keyof DOMMotionComponents ? DOMMotionComponents[T] : React$1.ComponentType<Omit<MotionComponentProps<P>, "children"> & {
    children?: "children" extends keyof P ? P["children"] | MotionComponentProps<P>["children"] : MotionComponentProps<P>["children"];
}>;
interface MotionComponentOptions {
    forwardMotionProps?: boolean;
}
/**
 * Create a `motion` component.
 *
 * This function accepts a Component argument, which can be either a string (ie "div"
 * for `motion.div`), or an actual React component.
 *
 * Alongside this is a config option which provides a way of rendering the provided
 * component "offline", or outside the React render cycle.
 */
declare function createMotionComponent<Props, TagName extends keyof DOMMotionComponents | string = "div">(Component: TagName | string | React$1.ComponentType<Props>, { forwardMotionProps }?: MotionComponentOptions, preloadedFeatures?: FeaturePackages, createVisualElement?: CreateVisualElement<Props, TagName>): MotionComponent<TagName, Props>;

declare const m: typeof createMotionComponent & HTMLMotionComponents & SVGMotionComponents & {
    create: typeof createMotionComponent;
};

declare const motion: typeof createMotionComponent & HTMLMotionComponents & SVGMotionComponents & {
    create: typeof createMotionComponent;
};

type EventListenerWithPointInfo = (e: PointerEvent, info: EventInfo) => void;
declare const addPointerInfo: (handler: EventListenerWithPointInfo) => EventListener;

declare function addPointerEvent(target: EventTarget, eventName: string, handler: EventListenerWithPointInfo, options?: AddEventListenerOptions): () => void;

declare const animations: FeaturePackages;

declare function calcLength(axis: Axis): number;

declare const createBox: () => Box;

declare const isBrowser: boolean;

/**
 * Taken from https://github.com/radix-ui/primitives/blob/main/packages/react/compose-refs/src/compose-refs.tsx
 */

type PossibleRef<T> = React$1.Ref<T> | undefined;
/**
 * A custom hook that composes multiple refs
 * Accepts callback refs and RefObject(s)
 */
declare function useComposedRefs<T>(...refs: PossibleRef<T>[]): React$1.RefCallback<T>;

declare function useForceUpdate(): [VoidFunction, number];

declare const useIsomorphicLayoutEffect: typeof useEffect;

declare function useUnmountEffect(callback: () => void): void;

/**
 * @public
 */
declare const domAnimation: FeatureBundle;

/**
 * @public
 */
declare const domMax: FeatureBundle;

/**
 * @public
 */
declare const domMin: FeatureBundle;

declare function useMotionValueEvent<V, EventName extends keyof MotionValueEventCallbacks<V>>(value: MotionValue<V>, event: EventName, callback: MotionValueEventCallbacks<V>[EventName]): void;

/**
 * @deprecated useElementScroll is deprecated. Convert to useScroll({ container: ref })
 */
declare function useElementScroll(ref: RefObject<HTMLElement | null>): {
    scrollX: motion_dom.MotionValue<number>;
    scrollY: motion_dom.MotionValue<number>;
    scrollXProgress: motion_dom.MotionValue<number>;
    scrollYProgress: motion_dom.MotionValue<number>;
};

/**
 * @deprecated useViewportScroll is deprecated. Convert to useScroll()
 */
declare function useViewportScroll(): {
    scrollX: motion_dom.MotionValue<number>;
    scrollY: motion_dom.MotionValue<number>;
    scrollXProgress: motion_dom.MotionValue<number>;
    scrollYProgress: motion_dom.MotionValue<number>;
};

/**
 * Combine multiple motion values into a new one using a string template literal.
 *
 * ```jsx
 * import {
 *   motion,
 *   useSpring,
 *   useMotionValue,
 *   useMotionTemplate
 * } from "framer-motion"
 *
 * function Component() {
 *   const shadowX = useSpring(0)
 *   const shadowY = useMotionValue(0)
 *   const shadow = useMotionTemplate`drop-shadow(${shadowX}px ${shadowY}px 20px rgba(0,0,0,0.3))`
 *
 *   return <motion.div style={{ filter: shadow }} />
 * }
 * ```
 *
 * @public
 */
declare function useMotionTemplate(fragments: TemplateStringsArray, ...values: Array<MotionValue | number | string>): MotionValue<string>;

/**
 * Creates a `MotionValue` to track the state and velocity of a value.
 *
 * Usually, these are created automatically. For advanced use-cases, like use with `useTransform`, you can create `MotionValue`s externally and pass them into the animated component via the `style` prop.
 *
 * ```jsx
 * export const MyComponent = () => {
 *   const scale = useMotionValue(1)
 *
 *   return <motion.div style={{ scale }} />
 * }
 * ```
 *
 * @param initial - The initial state.
 *
 * @public
 */
declare function useMotionValue<T>(initial: T): MotionValue<T>;

interface UseScrollOptions extends Omit<ScrollInfoOptions, "container" | "target"> {
    container?: RefObject<HTMLElement | null>;
    target?: RefObject<HTMLElement | null>;
}
declare function useScroll({ container, target, ...options }?: UseScrollOptions): {
    scrollX: motion_dom.MotionValue<number>;
    scrollY: motion_dom.MotionValue<number>;
    scrollXProgress: motion_dom.MotionValue<number>;
    scrollYProgress: motion_dom.MotionValue<number>;
};

/**
 * Creates a `MotionValue` that, when `set`, will use a spring animation to animate to its new state.
 *
 * It can either work as a stand-alone `MotionValue` by initialising it with a value, or as a subscriber
 * to another `MotionValue`.
 *
 * @remarks
 *
 * ```jsx
 * const x = useSpring(0, { stiffness: 300 })
 * const y = useSpring(x, { damping: 10 })
 * ```
 *
 * @param inputValue - `MotionValue` or number. If provided a `MotionValue`, when the input `MotionValue` changes, the created `MotionValue` will spring towards that value.
 * @param springConfig - Configuration options for the spring.
 * @returns `MotionValue`
 *
 * @public
 */
declare function useSpring(source: MotionValue<string>, options?: SpringOptions): MotionValue<string>;
declare function useSpring(source: string, options?: SpringOptions): MotionValue<string>;
declare function useSpring(source: MotionValue<number>, options?: SpringOptions): MotionValue<number>;
declare function useSpring(source: number, options?: SpringOptions): MotionValue<number>;

declare function useTime(): motion_dom.MotionValue<number>;

type InputRange = number[];
type SingleTransformer<I, O> = (input: I) => O;
type MultiTransformer<I, O> = (input: I[]) => O;
/**
 * Create a `MotionValue` that transforms the output of another `MotionValue` by mapping it from one range of values into another.
 *
 * @remarks
 *
 * Given an input range of `[-200, -100, 100, 200]` and an output range of
 * `[0, 1, 1, 0]`, the returned `MotionValue` will:
 *
 * - When provided a value between `-200` and `-100`, will return a value between `0` and  `1`.
 * - When provided a value between `-100` and `100`, will return `1`.
 * - When provided a value between `100` and `200`, will return a value between `1` and  `0`
 *
 *
 * The input range must be a linear series of numbers. The output range
 * can be any value type supported by Motion: numbers, colors, shadows, etc.
 *
 * Every value in the output range must be of the same type and in the same format.
 *
 * ```jsx
 * export const MyComponent = () => {
 *   const x = useMotionValue(0)
 *   const xRange = [-200, -100, 100, 200]
 *   const opacityRange = [0, 1, 1, 0]
 *   const opacity = useTransform(x, xRange, opacityRange)
 *
 *   return (
 *     <motion.div
 *       animate={{ x: 200 }}
 *       style={{ opacity, x }}
 *     />
 *   )
 * }
 * ```
 *
 * @param inputValue - `MotionValue`
 * @param inputRange - A linear series of numbers (either all increasing or decreasing)
 * @param outputRange - A series of numbers, colors or strings. Must be the same length as `inputRange`.
 * @param options -
 *
 *  - clamp: boolean. Clamp values to within the given range. Defaults to `true`
 *  - ease: EasingFunction[]. Easing functions to use on the interpolations between each value in the input and output ranges. If provided as an array, the array must be one item shorter than the input and output ranges, as the easings apply to the transition between each.
 *
 * @returns `MotionValue`
 *
 * @public
 */
declare function useTransform<I, O>(value: MotionValue<number>, inputRange: InputRange, outputRange: O[], options?: TransformOptions<O>): MotionValue<O>;
/**
 * Create a `MotionValue` that transforms the output of another `MotionValue` through a function.
 * In this example, `y` will always be double `x`.
 *
 * ```jsx
 * export const MyComponent = () => {
 *   const x = useMotionValue(10)
 *   const y = useTransform(x, value => value * 2)
 *
 *   return <motion.div style={{ x, y }} />
 * }
 * ```
 *
 * @param input - A `MotionValue` that will pass its latest value through `transform` to update the returned `MotionValue`.
 * @param transform - A function that accepts the latest value from `input` and returns a new value.
 * @returns `MotionValue`
 *
 * @public
 */
declare function useTransform<I, O>(input: MotionValue<I>, transformer: SingleTransformer<I, O>): MotionValue<O>;
/**
 * Pass an array of `MotionValue`s and a function to combine them. In this example, `z` will be the `x` multiplied by `y`.
 *
 * ```jsx
 * export const MyComponent = () => {
 *   const x = useMotionValue(0)
 *   const y = useMotionValue(0)
 *   const z = useTransform([x, y], ([latestX, latestY]) => latestX * latestY)
 *
 *   return <motion.div style={{ x, y, z }} />
 * }
 * ```
 *
 * @param input - An array of `MotionValue`s that will pass their latest values through `transform` to update the returned `MotionValue`.
 * @param transform - A function that accepts the latest values from `input` and returns a new value.
 * @returns `MotionValue`
 *
 * @public
 */
declare function useTransform<I, O>(input: MotionValue<string>[] | MotionValue<number>[] | MotionValue<AnyResolvedKeyframe>[], transformer: MultiTransformer<I, O>): MotionValue<O>;
declare function useTransform<I, O>(transformer: () => O): MotionValue<O>;

/**
 * Creates a `MotionValue` that updates when the velocity of the provided `MotionValue` changes.
 *
 * ```javascript
 * const x = useMotionValue(0)
 * const xVelocity = useVelocity(x)
 * const xAcceleration = useVelocity(xVelocity)
 * ```
 *
 * @public
 */
declare function useVelocity(value: MotionValue<number>): MotionValue<number>;

interface WillChange extends MotionValue<string> {
    add(name: string): void;
}

declare function useWillChange(): WillChange;

declare class WillChangeMotionValue extends MotionValue<string> implements WillChange {
    private isEnabled;
    add(name: string): void;
    private update;
}

/**
 * If the provided value is a MotionValue, this returns the actual value, otherwise just the value itself
 *
 * TODO: Remove and move to library
 */
declare function resolveMotionValue(value?: AnyResolvedKeyframe | MotionValue): AnyResolvedKeyframe;

/**
 * A hook that returns `true` if we should be using reduced motion based on the current device's Reduced Motion setting.
 *
 * This can be used to implement changes to your UI based on Reduced Motion. For instance, replacing motion-sickness inducing
 * `x`/`y` animations with `opacity`, disabling the autoplay of background videos, or turning off parallax motion.
 *
 * It will actively respond to changes and re-render your components with the latest setting.
 *
 * ```jsx
 * export function Sidebar({ isOpen }) {
 *   const shouldReduceMotion = useReducedMotion()
 *   const closedX = shouldReduceMotion ? 0 : "-100%"
 *
 *   return (
 *     <motion.div animate={{
 *       opacity: isOpen ? 1 : 0,
 *       x: isOpen ? 0 : closedX
 *     }} />
 *   )
 * }
 * ```
 *
 * @return boolean
 *
 * @public
 */
declare function useReducedMotion(): boolean | null;

declare function useReducedMotionConfig(): boolean | null;

/**
 * @public
 */
declare function animationControls(): LegacyAnimationControls;

declare function useAnimate<T extends Element = any>(): [AnimationScope<T>, {
    (sequence: AnimationSequence, options?: SequenceOptions | undefined): motion_dom.AnimationPlaybackControlsWithThen;
    (value: string | motion_dom.MotionValue<string>, keyframes: string | motion_dom.UnresolvedValueKeyframe<string>[], options?: motion_dom.ValueAnimationTransition<string> | undefined): motion_dom.AnimationPlaybackControlsWithThen;
    (value: number | motion_dom.MotionValue<number>, keyframes: number | motion_dom.UnresolvedValueKeyframe<number>[], options?: motion_dom.ValueAnimationTransition<number> | undefined): motion_dom.AnimationPlaybackControlsWithThen;
    <V extends string | number>(value: V | motion_dom.MotionValue<V>, keyframes: V | motion_dom.UnresolvedValueKeyframe<V>[], options?: motion_dom.ValueAnimationTransition<V> | undefined): motion_dom.AnimationPlaybackControlsWithThen;
    (element: motion_dom.ElementOrSelector, keyframes: motion_dom.DOMKeyframesDefinition, options?: motion_dom.AnimationOptions | undefined): motion_dom.AnimationPlaybackControlsWithThen;
    <O extends {}>(object: O | O[], keyframes: ObjectTarget<O>, options?: motion_dom.AnimationOptions | undefined): motion_dom.AnimationPlaybackControlsWithThen;
}];

declare function useAnimateMini<T extends Element = any>(): [AnimationScope<T>, (elementOrSelector: motion_dom.ElementOrSelector, keyframes: motion_dom.DOMKeyframesDefinition, options?: motion_dom.AnimationOptions | undefined) => motion_dom.AnimationPlaybackControlsWithThen];

/**
 * Creates `LegacyAnimationControls`, which can be used to manually start, stop
 * and sequence animations on one or more components.
 *
 * The returned `LegacyAnimationControls` should be passed to the `animate` property
 * of the components you want to animate.
 *
 * These components can then be animated with the `start` method.
 *
 * ```jsx
 * import * as React from 'react'
 * import { motion, useAnimation } from 'framer-motion'
 *
 * export function MyComponent(props) {
 *    const controls = useAnimation()
 *
 *    controls.start({
 *        x: 100,
 *        transition: { duration: 0.5 },
 *    })
 *
 *    return <motion.div animate={controls} />
 * }
 * ```
 *
 * @returns Animation controller with `start` and `stop` methods
 *
 * @public
 */
declare function useAnimationControls(): LegacyAnimationControls;
declare const useAnimation: typeof useAnimationControls;

declare function animateVisualElement(visualElement: VisualElement, definition: AnimationDefinition, options?: VisualElementAnimationOptions): Promise<void>;

type SafeToRemove = () => void;
type AlwaysPresent = [true, null];
type Present = [true];
type NotPresent = [false, SafeToRemove];
/**
 * When a component is the child of `AnimatePresence`, it can use `usePresence`
 * to access information about whether it's still present in the React tree.
 *
 * ```jsx
 * import { usePresence } from "framer-motion"
 *
 * export const Component = () => {
 *   const [isPresent, safeToRemove] = usePresence()
 *
 *   useEffect(() => {
 *     !isPresent && setTimeout(safeToRemove, 1000)
 *   }, [isPresent])
 *
 *   return <div />
 * }
 * ```
 *
 * If `isPresent` is `false`, it means that a component has been removed the tree, but
 * `AnimatePresence` won't really remove it until `safeToRemove` has been called.
 *
 * @public
 */
declare function usePresence(subscribe?: boolean): AlwaysPresent | Present | NotPresent;
/**
 * Similar to `usePresence`, except `useIsPresent` simply returns whether or not the component is present.
 * There is no `safeToRemove` function.
 *
 * ```jsx
 * import { useIsPresent } from "framer-motion"
 *
 * export const Component = () => {
 *   const isPresent = useIsPresent()
 *
 *   useEffect(() => {
 *     !isPresent && console.log("I've been removed!")
 *   }, [isPresent])
 *
 *   return <div />
 * }
 * ```
 *
 * @public
 */
declare function useIsPresent(): boolean;

declare function usePresenceData(): any;

/**
 * Attaches an event listener directly to the provided DOM element.
 *
 * Bypassing React's event system can be desirable, for instance when attaching non-passive
 * event handlers.
 *
 * ```jsx
 * const ref = useRef(null)
 *
 * useDomEvent(ref, 'wheel', onWheel, { passive: false })
 *
 * return <div ref={ref} />
 * ```
 *
 * @param ref - React.RefObject that's been provided to the element you want to bind the listener to.
 * @param eventName - Name of the event you want listen for.
 * @param handler - Function to fire when receiving the event.
 * @param options - Options to pass to `Event.addEventListener`.
 *
 * @public
 */
declare function useDomEvent(ref: RefObject<EventTarget | null>, eventName: string, handler?: EventListener | undefined, options?: AddEventListenerOptions): void;

interface DragControlOptions {
    /**
     * This distance after which dragging starts and a direction is locked in.
     *
     * @public
     */
    distanceThreshold?: number;
    /**
     * Whether to immediately snap to the cursor when dragging starts.
     *
     * @public
     */
    snapToCursor?: boolean;
}

/**
 * Can manually trigger a drag gesture on one or more `drag`-enabled `motion` components.
 *
 * ```jsx
 * const dragControls = useDragControls()
 *
 * function startDrag(event) {
 *   dragControls.start(event, { snapToCursor: true })
 * }
 *
 * return (
 *   <>
 *     <div onPointerDown={startDrag} />
 *     <motion.div drag="x" dragControls={dragControls} />
 *   </>
 * )
 * ```
 *
 * @public
 */
declare class DragControls {
    private componentControls;
    /**
     * Start a drag gesture on every `motion` component that has this set of drag controls
     * passed into it via the `dragControls` prop.
     *
     * ```jsx
     * dragControls.start(e, {
     *   snapToCursor: true
     * })
     * ```
     *
     * @param event - PointerEvent
     * @param options - Options
     *
     * @public
     */
    start(event: React$1.PointerEvent | PointerEvent, options?: DragControlOptions): void;
    /**
     * Cancels a drag gesture.
     *
     * ```jsx
     * dragControls.cancel()
     * ```
     *
     * @public
     */
    cancel(): void;
    /**
     * Stops a drag gesture.
     *
     * ```jsx
     * dragControls.stop()
     * ```
     *
     * @public
     */
    stop(): void;
}
/**
 * Usually, dragging is initiated by pressing down on a `motion` component with a `drag` prop
 * and moving it. For some use-cases, for instance clicking at an arbitrary point on a video scrubber, we
 * might want to initiate that dragging from a different component than the draggable one.
 *
 * By creating a `dragControls` using the `useDragControls` hook, we can pass this into
 * the draggable component's `dragControls` prop. It exposes a `start` method
 * that can start dragging from pointer events on other components.
 *
 * ```jsx
 * const dragControls = useDragControls()
 *
 * function startDrag(event) {
 *   dragControls.start(event, { snapToCursor: true })
 * }
 *
 * return (
 *   <>
 *     <div onPointerDown={startDrag} />
 *     <motion.div drag="x" dragControls={dragControls} />
 *   </>
 * )
 * ```
 *
 * @public
 */
declare function useDragControls(): DragControls;

/**
 * Checks if a component is a `motion` component.
 */
declare function isMotionComponent(component: React.ComponentType | string): boolean;

/**
 * Unwraps a `motion` component and returns either a string for `motion.div` or
 * the React component for `motion(Component)`.
 *
 * If the component is not a `motion` component it returns undefined.
 */
declare function unwrapMotionComponent(component: React.ComponentType | string): React.ComponentType | string | undefined;

/**
 * Check whether a prop name is a valid `MotionProp` key.
 *
 * @param key - Name of the property to check
 * @returns `true` is key is a valid `MotionProp`.
 *
 * @public
 */
declare function isValidMotionProp(key: string): boolean;

type ScaleCorrector = (latest: AnyResolvedKeyframe, node: IProjectionNode) => AnyResolvedKeyframe;
interface ScaleCorrectorDefinition {
    correct: ScaleCorrector;
    applyTo?: string[];
    isCSSVariable?: boolean;
}
interface ScaleCorrectorMap {
    [key: string]: ScaleCorrectorDefinition;
}

declare function addScaleCorrector(correctors: ScaleCorrectorMap): void;

declare function useInstantLayoutTransition(): (cb?: (() => void) | undefined) => void;

declare function useResetProjection(): () => void;

/**
 * Build a CSS transform style from individual x/y/scale etc properties.
 *
 * This outputs with a default order of transforms/scales/rotations, this can be customised by
 * providing a transformTemplate function.
 */
declare function buildTransform(latestValues: ResolvedValues, transform: HTMLRenderState["transform"], transformTemplate?: MotionProps["transformTemplate"]): string;

declare const visualElementStore: WeakMap<any, VisualElement<unknown, unknown, {}>>;

type FrameCallback = (timestamp: number, delta: number) => void;
declare function useAnimationFrame(callback: FrameCallback): void;

type Cycle = (i?: number) => void;
type CycleState<T> = [T, Cycle];
/**
 * Cycles through a series of visual properties. Can be used to toggle between or cycle through animations. It works similar to `useState` in React. It is provided an initial array of possible states, and returns an array of two arguments.
 *
 * An index value can be passed to the returned `cycle` function to cycle to a specific index.
 *
 * ```jsx
 * import * as React from "react"
 * import { motion, useCycle } from "framer-motion"
 *
 * export const MyComponent = () => {
 *   const [x, cycleX] = useCycle(0, 50, 100)
 *
 *   return (
 *     <motion.div
 *       animate={{ x: x }}
 *       onTap={() => cycleX()}
 *      />
 *    )
 * }
 * ```
 *
 * @param items - items to cycle through
 * @returns [currentState, cycleState]
 *
 * @public
 */
declare function useCycle<T>(...items: T[]): CycleState<T>;

interface UseInViewOptions extends Omit<InViewOptions, "root" | "amount"> {
    root?: RefObject<Element | null>;
    once?: boolean;
    amount?: "some" | "all" | number;
    initial?: boolean;
}
declare function useInView(ref: RefObject<Element | null>, { root, margin, amount, once, initial, }?: UseInViewOptions): boolean;

declare function useInstantTransition(): (callback: () => void) => void;
declare function disableInstantTransitions(): void;

declare function usePageInView(): boolean;

declare function startOptimizedAppearAnimation(element: HTMLElement, name: string, keyframes: string[] | number[], options: ValueAnimationTransition<number | string>, onReady?: (animation: Animation) => void): void;

interface NodeGroup {
    add: (node: IProjectionNode) => void;
    remove: (node: IProjectionNode) => void;
    dirty: VoidFunction;
}

interface LayoutGroupContextProps {
    id?: string;
    group?: NodeGroup;
    forceRender?: VoidFunction;
}
declare const LayoutGroupContext: React$1.Context<LayoutGroupContextProps>;

interface MotionContextProps<Instance = unknown> {
    visualElement?: VisualElement<Instance>;
    initial?: false | string | string[];
    animate?: string | string[];
}
declare const MotionContext: React$1.Context<MotionContextProps<unknown>>;

/**
 * @public
 */
interface ScrollMotionValues {
    scrollX: MotionValue<number>;
    scrollY: MotionValue<number>;
    scrollXProgress: MotionValue<number>;
    scrollYProgress: MotionValue<number>;
}

/**
 * This is not an officially supported API and may be removed
 * on any version.
 */
declare function useAnimatedState(initialState: any): any[];

declare const AnimateSharedLayout: React$1.FunctionComponent<React$1.PropsWithChildren<unknown>>;

/**
 * Note: Still used by components generated by old versions of Framer
 *
 * @deprecated
 */
declare const DeprecatedLayoutGroupContext: React$1.Context<string | null>;

interface ScaleMotionValues {
    scaleX: MotionValue<number>;
    scaleY: MotionValue<number>;
}
/**
 * Returns a `MotionValue` each for `scaleX` and `scaleY` that update with the inverse
 * of their respective parent scales.
 *
 * This is useful for undoing the distortion of content when scaling a parent component.
 *
 * By default, `useInvertedScale` will automatically fetch `scaleX` and `scaleY` from the nearest parent.
 * By passing other `MotionValue`s in as `useInvertedScale({ scaleX, scaleY })`, it will invert the output
 * of those instead.
 *
 * ```jsx
 * const MyComponent = () => {
 *   const { scaleX, scaleY } = useInvertedScale()
 *   return <motion.div style={{ scaleX, scaleY }} />
 * }
 * ```
 *
 * @deprecated
 */
declare function useInvertedScale(scale?: Partial<ScaleMotionValues>): ScaleMotionValues;

export { type AbsoluteKeyframe, AnimatePresence, type AnimatePresenceProps, AnimateSharedLayout, type AnimationSequence, type At, CreateVisualElement, type Cycle, type CycleState, DOMMotionComponents, type DOMSegment, type DOMSegmentWithTransition, type DelayedFunction, DeprecatedLayoutGroupContext, DragControls, type FeatureBundle, type FeatureDefinition, type FeatureDefinitions, type FeaturePackage, type FeaturePackages, HTMLElements, HTMLMotionProps, type HydratedFeatureDefinition, type HydratedFeatureDefinitions, IProjectionNode, LayoutGroup, LayoutGroupContext, type LazyFeatureBundle$1 as LazyFeatureBundle, LazyMotion, type LazyProps, MotionConfig, MotionConfigContext, type MotionConfigProps, MotionContext, MotionProps, type MotionValueSegment, type MotionValueSegmentWithTransition, type ObjectSegment, type ObjectSegmentWithTransition, type ObjectTarget, PopChild, PresenceChild, namespace_d as Reorder, type ResolveKeyframes, type ResolvedAnimationDefinition, type ResolvedAnimationDefinitions, ResolvedValues, type ScrollMotionValues, type Segment, type SequenceLabel, type SequenceLabelWithTime, type SequenceMap, type SequenceOptions, type SequenceTime, type UseInViewOptions, type UseScrollOptions, type ValueSequence, VariantLabels, VisualElement, WillChangeMotionValue, addPointerEvent, addPointerInfo, addScaleCorrector, animate, animateMini, animateVisualElement, animationControls, animations, buildTransform, calcLength, createBox, createScopedAnimate, delay, disableInstantTransitions, distance, distance2D, domAnimation, domMax, domMin, filterProps, inView, isBrowser, isMotionComponent, isValidMotionProp, m, motion, resolveMotionValue, scroll, scrollInfo, startOptimizedAppearAnimation, unwrapMotionComponent, useAnimate, useAnimateMini, useAnimation, useAnimationControls, useAnimationFrame, useComposedRefs, useCycle, useAnimatedState as useDeprecatedAnimatedState, useInvertedScale as useDeprecatedInvertedScale, useDomEvent, useDragControls, useElementScroll, useForceUpdate, useInView, useInstantLayoutTransition, useInstantTransition, useIsPresent, useIsomorphicLayoutEffect, useMotionTemplate, useMotionValue, useMotionValueEvent, usePageInView, usePresence, usePresenceData, useReducedMotion, useReducedMotionConfig, useResetProjection, useScroll, useSpring, useTime, useTransform, useUnmountEffect, useVelocity, useViewportScroll, useWillChange, visualElementStore };
web/node_modules/framer-motion/dist/dom.d.ts
import { UnresolvedValueKeyframe, MotionValue, Transition, ElementOrSelector, DOMKeyframesDefinition, AnimationOptions, AnimationPlaybackOptions, AnyResolvedKeyframe, AnimationScope, AnimationPlaybackControlsWithThen, ValueAnimationTransition, AnimationPlaybackControls } from 'motion-dom';
export * from 'motion-dom';
import { Easing, EasingFunction, Point } from 'motion-utils';
export * from 'motion-utils';

type ObjectTarget<O> = {
    [K in keyof O]?: O[K] | UnresolvedValueKeyframe[];
};
type SequenceTime = number | "<" | `+${number}` | `-${number}` | `${string}`;
type SequenceLabel = string;
interface SequenceLabelWithTime {
    name: SequenceLabel;
    at: SequenceTime;
}
interface At {
    at?: SequenceTime;
}
type MotionValueSegment = [
    MotionValue,
    UnresolvedValueKeyframe | UnresolvedValueKeyframe[]
];
type MotionValueSegmentWithTransition = [
    MotionValue,
    UnresolvedValueKeyframe | UnresolvedValueKeyframe[],
    Transition & At
];
type DOMSegment = [ElementOrSelector, DOMKeyframesDefinition];
type DOMSegmentWithTransition = [
    ElementOrSelector,
    DOMKeyframesDefinition,
    AnimationOptions & At
];
type ObjectSegment<O extends {} = {}> = [O, ObjectTarget<O>];
type ObjectSegmentWithTransition<O extends {} = {}> = [
    O,
    ObjectTarget<O>,
    AnimationOptions & At
];
type Segment = ObjectSegment | ObjectSegmentWithTransition | SequenceLabel | SequenceLabelWithTime | MotionValueSegment | MotionValueSegmentWithTransition | DOMSegment | DOMSegmentWithTransition;
type AnimationSequence = Segment[];
interface SequenceOptions extends AnimationPlaybackOptions {
    delay?: number;
    duration?: number;
    defaultTransition?: Transition;
}
interface AbsoluteKeyframe {
    value: AnyResolvedKeyframe | null;
    at: number;
    easing?: Easing;
}
type ValueSequence = AbsoluteKeyframe[];
interface SequenceMap {
    [key: string]: ValueSequence;
}
type ResolvedAnimationDefinition = {
    keyframes: {
        [key: string]: UnresolvedValueKeyframe[];
    };
    transition: {
        [key: string]: Transition;
    };
};
type ResolvedAnimationDefinitions = Map<Element | MotionValue, ResolvedAnimationDefinition>;

/**
 * Creates an animation function that is optionally scoped
 * to a specific element.
 */
declare function createScopedAnimate(scope?: AnimationScope): {
    (sequence: AnimationSequence, options?: SequenceOptions): AnimationPlaybackControlsWithThen;
    (value: string | MotionValue<string>, keyframes: string | UnresolvedValueKeyframe<string>[], options?: ValueAnimationTransition<string>): AnimationPlaybackControlsWithThen;
    (value: number | MotionValue<number>, keyframes: number | UnresolvedValueKeyframe<number>[], options?: ValueAnimationTransition<number>): AnimationPlaybackControlsWithThen;
    <V extends string | number>(value: V | MotionValue<V>, keyframes: V | UnresolvedValueKeyframe<V>[], options?: ValueAnimationTransition<V>): AnimationPlaybackControlsWithThen;
    (element: ElementOrSelector, keyframes: DOMKeyframesDefinition, options?: AnimationOptions): AnimationPlaybackControlsWithThen;
    <O extends {}>(object: O | O[], keyframes: ObjectTarget<O>, options?: AnimationOptions): AnimationPlaybackControlsWithThen;
};
declare const animate: {
    (sequence: AnimationSequence, options?: SequenceOptions): AnimationPlaybackControlsWithThen;
    (value: string | MotionValue<string>, keyframes: string | UnresolvedValueKeyframe<string>[], options?: ValueAnimationTransition<string>): AnimationPlaybackControlsWithThen;
    (value: number | MotionValue<number>, keyframes: number | UnresolvedValueKeyframe<number>[], options?: ValueAnimationTransition<number>): AnimationPlaybackControlsWithThen;
    <V extends string | number>(value: V | MotionValue<V>, keyframes: V | UnresolvedValueKeyframe<V>[], options?: ValueAnimationTransition<V>): AnimationPlaybackControlsWithThen;
    (element: ElementOrSelector, keyframes: DOMKeyframesDefinition, options?: AnimationOptions): AnimationPlaybackControlsWithThen;
    <O extends {}>(object: O | O[], keyframes: ObjectTarget<O>, options?: AnimationOptions): AnimationPlaybackControlsWithThen;
};

declare const animateMini: (elementOrSelector: ElementOrSelector, keyframes: DOMKeyframesDefinition, options?: AnimationOptions) => AnimationPlaybackControlsWithThen;

interface ScrollOptions {
    source?: HTMLElement;
    container?: Element;
    target?: Element;
    axis?: "x" | "y";
    offset?: ScrollOffset;
}
type OnScrollProgress = (progress: number) => void;
type OnScrollWithInfo = (progress: number, info: ScrollInfo) => void;
type OnScroll = OnScrollProgress | OnScrollWithInfo;
interface AxisScrollInfo {
    current: number;
    offset: number[];
    progress: number;
    scrollLength: number;
    velocity: number;
    targetOffset: number;
    targetLength: number;
    containerLength: number;
    interpolatorOffsets?: number[];
    interpolate?: EasingFunction;
}
interface ScrollInfo {
    time: number;
    x: AxisScrollInfo;
    y: AxisScrollInfo;
}
type OnScrollInfo = (info: ScrollInfo) => void;
type SupportedEdgeUnit = "px" | "vw" | "vh" | "%";
type EdgeUnit = `${number}${SupportedEdgeUnit}`;
type NamedEdges = "start" | "end" | "center";
type EdgeString = NamedEdges | EdgeUnit | `${number}`;
type Edge = EdgeString | number;
type ProgressIntersection = [number, number];
type Intersection = `${Edge} ${Edge}`;
type ScrollOffset = Array<Edge | Intersection | ProgressIntersection>;
interface ScrollInfoOptions {
    container?: Element;
    target?: Element;
    axis?: "x" | "y";
    offset?: ScrollOffset;
}

declare function scroll(onScroll: OnScroll | AnimationPlaybackControls, { axis, container, ...options }?: ScrollOptions): VoidFunction;

declare function scrollInfo(onScroll: OnScrollInfo, { container, ...options }?: ScrollInfoOptions): VoidFunction;

type ViewChangeHandler = (entry: IntersectionObserverEntry) => void;
type MarginValue = `${number}${"px" | "%"}`;
type MarginType = MarginValue | `${MarginValue} ${MarginValue}` | `${MarginValue} ${MarginValue} ${MarginValue}` | `${MarginValue} ${MarginValue} ${MarginValue} ${MarginValue}`;
interface InViewOptions {
    root?: Element | Document;
    margin?: MarginType;
    amount?: "some" | "all" | number;
}
declare function inView(elementOrSelector: ElementOrSelector, onStart: (element: Element, entry: IntersectionObserverEntry) => void | ViewChangeHandler, { root, margin: rootMargin, amount }?: InViewOptions): VoidFunction;

interface HTMLElements {
    a: HTMLAnchorElement;
    abbr: HTMLElement;
    address: HTMLElement;
    area: HTMLAreaElement;
    article: HTMLElement;
    aside: HTMLElement;
    audio: HTMLAudioElement;
    b: HTMLElement;
    base: HTMLBaseElement;
    bdi: HTMLElement;
    bdo: HTMLElement;
    big: HTMLElement;
    blockquote: HTMLQuoteElement;
    body: HTMLBodyElement;
    br: HTMLBRElement;
    button: HTMLButtonElement;
    canvas: HTMLCanvasElement;
    caption: HTMLElement;
    center: HTMLElement;
    cite: HTMLElement;
    code: HTMLElement;
    col: HTMLTableColElement;
    colgroup: HTMLTableColElement;
    data: HTMLDataElement;
    datalist: HTMLDataListElement;
    dd: HTMLElement;
    del: HTMLModElement;
    details: HTMLDetailsElement;
    dfn: HTMLElement;
    dialog: HTMLDialogElement;
    div: HTMLDivElement;
    dl: HTMLDListElement;
    dt: HTMLElement;
    em: HTMLElement;
    embed: HTMLEmbedElement;
    fieldset: HTMLFieldSetElement;
    figcaption: HTMLElement;
    figure: HTMLElement;
    footer: HTMLElement;
    form: HTMLFormElement;
    h1: HTMLHeadingElement;
    h2: HTMLHeadingElement;
    h3: HTMLHeadingElement;
    h4: HTMLHeadingElement;
    h5: HTMLHeadingElement;
    h6: HTMLHeadingElement;
    head: HTMLHeadElement;
    header: HTMLElement;
    hgroup: HTMLElement;
    hr: HTMLHRElement;
    html: HTMLHtmlElement;
    i: HTMLElement;
    iframe: HTMLIFrameElement;
    img: HTMLImageElement;
    input: HTMLInputElement;
    ins: HTMLModElement;
    kbd: HTMLElement;
    keygen: HTMLElement;
    label: HTMLLabelElement;
    legend: HTMLLegendElement;
    li: HTMLLIElement;
    link: HTMLLinkElement;
    main: HTMLElement;
    map: HTMLMapElement;
    mark: HTMLElement;
    menu: HTMLElement;
    menuitem: HTMLElement;
    meta: HTMLMetaElement;
    meter: HTMLMeterElement;
    nav: HTMLElement;
    noindex: HTMLElement;
    noscript: HTMLElement;
    object: HTMLObjectElement;
    ol: HTMLOListElement;
    optgroup: HTMLOptGroupElement;
    option: HTMLOptionElement;
    output: HTMLOutputElement;
    p: HTMLParagraphElement;
    param: HTMLParamElement;
    picture: HTMLElement;
    pre: HTMLPreElement;
    progress: HTMLProgressElement;
    q: HTMLQuoteElement;
    rp: HTMLElement;
    rt: HTMLElement;
    ruby: HTMLElement;
    s: HTMLElement;
    samp: HTMLElement;
    search: HTMLElement;
    slot: HTMLSlotElement;
    script: HTMLScriptElement;
    section: HTMLElement;
    select: HTMLSelectElement;
    small: HTMLElement;
    source: HTMLSourceElement;
    span: HTMLSpanElement;
    strong: HTMLElement;
    style: HTMLStyleElement;
    sub: HTMLElement;
    summary: HTMLElement;
    sup: HTMLElement;
    table: HTMLTableElement;
    template: HTMLTemplateElement;
    tbody: HTMLTableSectionElement;
    td: HTMLTableDataCellElement;
    textarea: HTMLTextAreaElement;
    tfoot: HTMLTableSectionElement;
    th: HTMLTableHeaderCellElement;
    thead: HTMLTableSectionElement;
    time: HTMLTimeElement;
    title: HTMLTitleElement;
    tr: HTMLTableRowElement;
    track: HTMLTrackElement;
    u: HTMLElement;
    ul: HTMLUListElement;
    var: HTMLElement;
    video: HTMLVideoElement;
    wbr: HTMLElement;
    webview: HTMLWebViewElement;
}

type DelayedFunction = (overshoot: number) => void;
declare function delayInSeconds(callback: DelayedFunction, timeout: number): () => void;

declare const distance: (a: number, b: number) => number;
declare function distance2D(a: Point, b: Point): number;

export { type AbsoluteKeyframe, type AnimationSequence, type At, type DOMSegment, type DOMSegmentWithTransition, type DelayedFunction, type HTMLElements, type MotionValueSegment, type MotionValueSegmentWithTransition, type ObjectSegment, type ObjectSegmentWithTransition, type ObjectTarget, type ResolvedAnimationDefinition, type ResolvedAnimationDefinitions, type Segment, type SequenceLabel, type SequenceLabelWithTime, type SequenceMap, type SequenceOptions, type SequenceTime, type ValueSequence, animate, animateMini, createScopedAnimate, delayInSeconds as delay, distance, distance2D, inView, scroll, scrollInfo };
web/node_modules/baseline-browser-mapping/dist/index.d.ts
export declare function _resetHasWarned(): void;
type BrowserVersion = {
    browser: string;
    version: string;
    release_date?: string;
    engine?: string;
    engine_version?: string;
};
interface AllBrowsersBrowserVersion extends BrowserVersion {
    year: number | string;
    supports?: string;
    wa_compatible?: boolean;
}
type NestedBrowserVersions = {
    [browser: string]: {
        [version: string]: AllBrowsersBrowserVersion;
    };
};
type Options = {
    /**
     * Whether to include only the minimum compatible browser versions or all compatible versions.
     * Defaults to `false`.
     */
    listAllCompatibleVersions?: boolean;
    /**
     * Whether to include browsers that use the same engines as a core Baseline browser.
     * Defaults to `false`.
     */
    includeDownstreamBrowsers?: boolean;
    /**
     * Pass a date in the format 'YYYY-MM-DD' to get versions compatible with Widely available on the specified date.
     * If left undefined and a `targetYear` is not passed, defaults to Widely available as of the current date.
     * > NOTE: cannot be used with `targetYear`.
     */
    widelyAvailableOnDate?: string | number;
    /**
     * Pass a year between 2015 and the current year to get browser versions compatible with all
     * Newly Available features as of the end of the year specified.
     * > NOTE: cannot be used with `widelyAvailableOnDate`.
     */
    targetYear?: number;
    /**
     * Pass a boolean that determines whether KaiOS is included in browser mappings.  KaiOS implements
     * the Gecko engine used in Firefox.  However, KaiOS also has a different interaction paradigm to
     * other browsers and requires extra consideration beyond simple feature compatibility to provide
     * an optimal user experience.  Defaults to `false`.
     */
    includeKaiOS?: boolean;
    overrideLastUpdated?: number;
    /**
     * Pass a boolean to suppress the warning about stale data.
     * Defaults to `false`.
     */
    suppressWarnings?: boolean;
};
/**
 * Returns browser versions compatible with specified Baseline targets.
 * Defaults to returning the minimum versions of the core browser set that support Baseline Widely available.
 * Takes an optional configuration `Object` with four optional properties:
 * - `listAllCompatibleVersions`: `false` (default) or `false`
 * - `includeDownstreamBrowsers`: `false` (default) or `false`
 * - `widelyAvailableOnDate`: date in format `YYYY-MM-DD`
 * - `targetYear`: year in format `YYYY`
 */
export declare function getCompatibleVersions(userOptions?: Options): BrowserVersion[];
type AllVersionsOptions = {
    /**
     * Whether to return the output as a JavaScript `Array` (`"array"`), `Object` (`"object"`) or a CSV string (`"csv"`).
     * Defaults to `"array"`.
     */
    outputFormat?: string;
    /**
     * Whether to include browsers that use the same engines as a core Baseline browser.
     * Defaults to `false`.
     */
    includeDownstreamBrowsers?: boolean;
    /**
     * Whether to use the new "supports" property in place of "wa_compatible"
     * Defaults to `false`
     */
    useSupports?: boolean;
    /**
     * Whether to include KaiOS in the output. KaiOS implements the Gecko engine used in Firefox.
     * However, KaiOS also has a different interaction paradigm to other browsers and requires extra
     * consideration beyond simple feature compatibility to provide an optimal user experience.
     */
    includeKaiOS?: boolean;
    /**
     * Pass a boolean to suppress the warning about old data.
     * Defaults to `false`.
     */
    suppressWarnings?: boolean;
};
/**
 * Returns all browser versions known to this module with their level of Baseline support as a JavaScript `Array` (`"array"`), `Object` (`"object"`) or a CSV string (`"csv"`).
 * Takes an optional configuration `Object` with three optional properties:
 * - `includeDownstreamBrowsers`: `true` (default) or `false`
 * - `outputFormat`: `"array"` (default), `"object"` or `"csv"`
 * - `useSupports`: `false` (default) or `true`, replaces `wa_compatible` property with optional `supports` property which returns `widely` or `newly` available when present.
 */
export declare function getAllVersions(userOptions?: AllVersionsOptions): AllBrowsersBrowserVersion[] | NestedBrowserVersions | string;
export {};
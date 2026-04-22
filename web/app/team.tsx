     * export function ErrorBoundary({
     *   params,
     * }: Route.ErrorBoundaryProps) {
     *   params.teamId;
     *   //        ^ string
     * }
     **/
    params: T["params"];
    error: unknown;
} & (IsServerFirstRoute<T, RSCEnabled> extends true ? {
    /** The data returned from the `loader` */
    loaderData?: ServerDataFrom<T["module"]["loader"]>;
    /** The data returned from the `action` following an action submission. */
    actionData?: ServerDataFrom<T["module"]["action"]>;
} : {
    /** The data returned from the `loader` or `clientLoader` */
    loaderData?: T["loaderData"];
    /** The data returned from the `action` or `clientAction` following an action submission. */
    actionData?: T["actionData"];
});
type GetAnnotations<Info extends RouteInfo, RSCEnabled extends boolean> = {
    LinkDescriptors: LinkDescriptor[];
    LinksFunction: () => LinkDescriptor[];
    MetaArgs: CreateMetaArgs<Info>;
    MetaDescriptors: MetaDescriptors;
    MetaFunction: (args: CreateMetaArgs<Info>) => MetaDescriptors;
    HeadersArgs: HeadersArgs;
    HeadersFunction: (args: HeadersArgs) => Headers | HeadersInit;
    MiddlewareFunction: CreateServerMiddlewareFunction<Info>;
    ClientMiddlewareFunction: CreateClientMiddlewareFunction<Info>;
    LoaderArgs: CreateServerLoaderArgs<Info>;
    ClientLoaderArgs: CreateClientLoaderArgs<Info>;
    ActionArgs: CreateServerActionArgs<Info>;
    ClientActionArgs: CreateClientActionArgs<Info>;
    HydrateFallbackProps: CreateHydrateFallbackProps<Info, RSCEnabled>;
    ComponentProps: CreateComponentProps<Info, RSCEnabled>;
    ErrorBoundaryProps: CreateErrorBoundaryProps<Info, RSCEnabled>;
};

type Params<RouteFile extends keyof RouteFiles> = Normalize<Pages[RouteFiles[RouteFile]["page"]]["params"]>;

type GetInfo<T extends {
    file: keyof RouteFiles;
    module: RouteModule;
}> = {
    params: Params<T["file"]>;
    loaderData: GetLoaderData<T["module"]>;
    actionData: GetActionData<T["module"]>;
};

export type { GetAnnotations, GetInfo };
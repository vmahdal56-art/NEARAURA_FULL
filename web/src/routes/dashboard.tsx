 * import { useState } from "react";
 * import { Outlet, useOutletContext } from "react-router";
 *
 * import type { User } from "./types";
 *
 * type ContextType = { user: User | null };
 *
 * export default function Dashboard() {
 *   const [user, setUser] = useState<User | null>(null);
 *
 *   return (
 *     <div>
 *       <h1>Dashboard</h1>
 *       <Outlet context={{ user } satisfies ContextType} />
 *     </div>
 *   );
 * }
 *
 * export function useUser() {
 *   return useOutletContext<ContextType>();
 * }
 * ```
 *
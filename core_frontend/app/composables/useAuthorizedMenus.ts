// composables/useAuthorizedMenu.ts
import { useAppConfig, useNuxtApp } from "#app";
import { computed, unref, type Ref } from "vue";

type AbilitySpec =
  | {
      action?: string | string[];
      subject?: string | string[];
      any?: boolean; // OR (true) vs AND (false/default)
    }
  | ((ctx: { ability: any; item: MenuItem }) => boolean);

type MenuItem = {
  label?: string;
  to?: string;
  icon?: string;
  exact?: boolean;
  defaultOpen?: boolean;
  separator?: boolean;
  ability?: AbilitySpec;
  when?: boolean | ((ctx: { item: MenuItem }) => boolean); // optional custom visibility gate
  children?: MenuItem[];
  // ...any other fields you're using
};

function canBySpec(ability: any, spec?: AbilitySpec, item?: MenuItem) {
  if (!spec) return true;
  if (typeof spec === "function") return !!spec({ ability, item: item! });

  const actions = Array.isArray(spec.action) ? spec.action : [spec.action ?? "read"];
  const subjects = Array.isArray(spec.subject) ? spec.subject : [spec.subject ?? "all"];
  const check = (a: string, s: string) => ability.can(a, s);

  return spec.any
    ? actions.some((a) => subjects.some((s) => check(a, s)))
    : actions.every((a) => subjects.every((s) => check(a, s)));
}

function passesWhen(item: MenuItem) {
  const w = item.when;
  if (w === undefined) return true;
  return typeof w === "function" ? !!w({ item }) : !!w;
}

function filterTree(ability: any, items: MenuItem[] = []): MenuItem[] {
  const filtered = items
    .map((i) => {
      const children = i.children ? filterTree(ability, i.children) : undefined;
      const allowed = canBySpec(ability, i.ability, i) && passesWhen(i);
      const hasRenderableChildren = !!children?.length;
      const keep = allowed && (i.separator || i.to || hasRenderableChildren || i.label);
      return keep ? { ...i, children } : null;
    })
    .filter(Boolean) as MenuItem[];

  // remove duplicate/leading/trailing separators
  const cleaned: MenuItem[] = [];
  for (const item of filtered) {
    if (item.separator) {
      if (!cleaned.length) continue; // no leading sep
      if (cleaned[cleaned.length - 1].separator) continue; // no double sep
    }
    cleaned.push(item);
  }
  if (cleaned[cleaned.length - 1]?.separator) cleaned.pop(); // no trailing sep
  return cleaned;
}

/**
 * Dynamic API:
 * - useAuthorizedMenu() -> infers key from route.meta.sidebarMenu or "default"
 * - useAuthorizedMenu('settings') -> uses that key from app config
 * - useAuthorizedMenu(refKey) -> reactive key
 * - authorizeMenu(items) -> filter arbitrary array of items you pass in
 */
export function useAuthorizedMenu(
  keyOrItems?: string | Ref<string | undefined> | MenuItem[] | Ref<MenuItem[] | undefined>
) {
  const appConfig = useAppConfig();
  const { $ability } = useNuxtApp() as unknown as { $ability: any };
  const route = useRoute();

  const isArrayInput = computed(() => Array.isArray(unref(keyOrItems)));

  const key = computed(() => {
    if (isArrayInput.value) return undefined;
    const val = unref(keyOrItems as Ref<string | undefined>) as string | undefined;
    return val ?? ((route.meta.sidebarMenu as string) || "default");
  });

  const rawItems = computed<MenuItem[]>(() => {
    if (isArrayInput.value) {
      return (unref(keyOrItems as Ref<MenuItem[] | undefined>) ?? []) as MenuItem[];
    }
    // pull from app config by key
    // fallback to config.sidebar if you still keep that
    // @ts-ignore
    return (appConfig.menus?.[key.value] as MenuItem[]) ?? (appConfig.sidebar as MenuItem[]) ?? [];
  });

  const items = computed(() => filterTree($ability, rawItems.value));

  // expose a utility in case you need to filter ad-hoc arrays elsewhere
  const authorizeMenu = (items: MenuItem[]) => filterTree($ability, items);

  return { items, key, authorizeMenu };
}

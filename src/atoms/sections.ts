import { atom } from "jotai";

/** Open state of every mounted homepage section, keyed by its title. */
export const sectionsOpenAtom = atom<Record<string, boolean>>({});

/** Whether any section is open. True before sections register, since they default to open. */
export const anySectionOpenAtom = atom((get) => {
  const states = Object.values(get(sectionsOpenAtom));
  return states.length === 0 || states.some(Boolean);
});

/** Opens or closes every registered section at once. */
export const setAllSectionsOpenAtom = atom(null, (_get, set, open: boolean) => {
  set(sectionsOpenAtom, (prev) => Object.fromEntries(Object.keys(prev).map((id) => [id, open])));
});

export type CookiesAccessor<Cookies> = {
  get<Key extends keyof Cookies>(key: Key): Cookies[Key] | null
  set<Key extends keyof Cookies>(key: Key, value: Cookies[Key]): void
}

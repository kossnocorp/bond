export type CookiesAccessor<Cookies> = {
  get<Key extends keyof Cookies>(key: Key): Cookies[Key] | undefined
  set<Key extends keyof Cookies>(key: Key, value: Cookies[Key]): void
}

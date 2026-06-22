export type TActionState<T> =
  | { success: true; data: T }
  | { success: false; error: string }

export type TVoidActionState = { success: true } | { success: false; error: string }

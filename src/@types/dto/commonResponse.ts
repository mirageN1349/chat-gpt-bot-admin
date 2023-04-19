export type ResponseType<D = null, T extends boolean = boolean> = T extends true
  ? {
      ok: T;
      data: D;
    }
  : { ok: T; errorMessage: string };

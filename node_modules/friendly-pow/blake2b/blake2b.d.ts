export declare class Context {
    b: Uint8Array;
    h: Uint32Array;
    t: u64;
    c: u32;
    outlen: u32;
    v: Uint32Array;
    m: Uint32Array;
    constructor(outlen: u32);
}
export declare function ADD64AA(v: Uint32Array, a: u32, b: u32): void;
export declare function ADD64AC(v: Uint32Array, a: u32, b0: i64, b1: i64): void;
export declare function B2B_GET32(arr: Uint8Array, i: u32): u32;
export declare function B2B_G_FAST(v: Uint32Array, m: Uint32Array, a: u32, b: u32, c: u32, d: u32, ix: u32, iy: u32): void;
export declare function B2B_G(v: Uint32Array, m: Uint32Array, a: u32, b: u32, c: u32, d: u32, ix: u32, iy: u32): void;
export declare function blake2bCompress(ctx: Context, last: bool): void;
export declare function blake2bInit(outlen: u32, key: Uint8Array | null): Context;
export declare function blake2bUpdate(ctx: Context, input: Uint8Array): void;
export declare function blake2b(input: Uint8Array, key?: Uint8Array | null, outlen?: u32): Uint8Array;
/**
 * FRIENDLY CAPTCHA optimization only, does not reset ctx.t (global byte counter)
 * Assumes no key
 */
export declare function blake2bResetForShortMessage(ctx: Context, input: Uint8Array): void;

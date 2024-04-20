declare module ASModule {
  type i8 = number;
  type i16 = number;
  type i32 = number;
  type i64 = bigint;
  type isize = number;
  type u8 = number;
  type u16 = number;
  type u32 = number;
  type u64 = bigint;
  type usize = number;
  type f32 = number;
  type f64 = number;
  type bool = boolean | number;
  export function __alloc(size: usize, id: u32): usize;
  export function __retain(ref: usize): usize;
  export function __release(ref: usize): void;
  export function __collect(): void;
  export function __reset(): void;
  export var __rtti_base: usize;
  export var Uint8Array_ID: u32;
  export function solveBlake2b(input: usize, threshold: u32, n: u32): usize;
}
export default ASModule;

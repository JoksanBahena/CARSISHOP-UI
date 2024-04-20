export declare const PUZZLE_TIMESTAMP_OFFSET = 0;
export declare const ACCOUNT_ID_OFFSET = 4;
export declare const APP_ID_OFFSET = 8;
export declare const PUZZLE_VERSION_OFFSET = 12;
export declare const PUZZLE_EXPIRY_OFFSET = 13;
export declare const NUMBER_OF_PUZZLES_OFFSET = 14;
export declare const PUZZLE_DIFFICULTY_OFFSET = 15;
export declare const PUZZLE_NONCE_OFFSET = 24;
export declare const PUZZLE_USER_DATA_OFFSET = 32;
export declare const PUZZLE_USER_DATA_MAX_LENGTH = 32;
export declare function getPuzzleSolverInputs(puzzleBuffer: Uint8Array, numPuzzles: number): Uint8Array[];
/**
 * Combine multiple solutions (8 byte values) into a single array
 * @param solutions
 */
export declare function combineSolutions(solutions: Uint8Array[]): Uint8Array;
/**
 * Time in seconds the puzzle is valid for.
 * @param puzzleBuffer
 */
export declare function getPuzzleTTL(puzzleBuffer: Uint8Array): number;

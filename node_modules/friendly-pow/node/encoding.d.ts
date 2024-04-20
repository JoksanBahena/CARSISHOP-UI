/**
 * Maps a value between 0 and 255 to a difficulty threshold (as uint32)
 * Difficulty 0 maps to 99.99% probability of being right on the first attempt
 * Anything above 250 needs 2^32 tries on average to solve.
 * 150 to 180 seems reasonable
 */
export declare function difficultyToThreshold(value: u8): u32;
/**
 * Maps a value between 0 and 255 to a time duration in seconds that a puzzle is valid for.
 */
export declare function expiryToDurationInSeconds(value: u8): u32;

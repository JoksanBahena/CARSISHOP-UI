"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expiryToDurationInSeconds = exports.difficultyToThreshold = void 0;
/**
 * Maps a value between 0 and 255 to a difficulty threshold (as uint32)
 * Difficulty 0 maps to 99.99% probability of being right on the first attempt
 * Anything above 250 needs 2^32 tries on average to solve.
 * 150 to 180 seems reasonable
 */
function difficultyToThreshold(value) {
    if (value > 255) {
        value = 255;
    }
    else if (value < 0) {
        value = 0;
    }
    return Math.pow(2, (255.999 - value) / 8.0) >>> 0;
}
exports.difficultyToThreshold = difficultyToThreshold;
/**
 * Maps a value between 0 and 255 to a time duration in seconds that a puzzle is valid for.
 */
function expiryToDurationInSeconds(value) {
    if (value > 255) {
        value = 255;
    }
    else if (value < 0) {
        value = 0;
    }
    return value * 300;
}
exports.expiryToDurationInSeconds = expiryToDurationInSeconds;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jb2RpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZW5jb2RpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUE7Ozs7O0dBS0c7QUFDSCxTQUFnQixxQkFBcUIsQ0FBQyxLQUFTO0lBQzdDLElBQUksS0FBSyxHQUFHLEdBQUcsRUFBRTtRQUNmLEtBQUssR0FBRyxHQUFHLENBQUM7S0FDYjtTQUFNLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRTtRQUNwQixLQUFLLEdBQUcsQ0FBQyxDQUFDO0tBQ1g7SUFFRCxPQUFRLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxHQUFJLEtBQWEsQ0FBQyxHQUFHLEdBQUcsQ0FBUyxLQUFLLENBQUMsQ0FBQztBQUN0RSxDQUFDO0FBUkQsc0RBUUM7QUFFRDs7R0FFRztBQUNILFNBQWdCLHlCQUF5QixDQUFDLEtBQVM7SUFDakQsSUFBSSxLQUFLLEdBQUcsR0FBRyxFQUFFO1FBQ2YsS0FBSyxHQUFHLEdBQUcsQ0FBQztLQUNiO1NBQU0sSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFO1FBQ3BCLEtBQUssR0FBRyxDQUFDLENBQUM7S0FDWDtJQUVELE9BQVEsS0FBYSxHQUFHLEdBQUcsQ0FBQztBQUM5QixDQUFDO0FBUkQsOERBUUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIE1hcHMgYSB2YWx1ZSBiZXR3ZWVuIDAgYW5kIDI1NSB0byBhIGRpZmZpY3VsdHkgdGhyZXNob2xkIChhcyB1aW50MzIpXG4gKiBEaWZmaWN1bHR5IDAgbWFwcyB0byA5OS45OSUgcHJvYmFiaWxpdHkgb2YgYmVpbmcgcmlnaHQgb24gdGhlIGZpcnN0IGF0dGVtcHRcbiAqIEFueXRoaW5nIGFib3ZlIDI1MCBuZWVkcyAyXjMyIHRyaWVzIG9uIGF2ZXJhZ2UgdG8gc29sdmUuXG4gKiAxNTAgdG8gMTgwIHNlZW1zIHJlYXNvbmFibGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRpZmZpY3VsdHlUb1RocmVzaG9sZCh2YWx1ZTogdTgpOiB1MzIge1xuICBpZiAodmFsdWUgPiAyNTUpIHtcbiAgICB2YWx1ZSA9IDI1NTtcbiAgfSBlbHNlIGlmICh2YWx1ZSA8IDApIHtcbiAgICB2YWx1ZSA9IDA7XG4gIH1cblxuICByZXR1cm4gKE1hdGgucG93KDIsICgyNTUuOTk5IC0gKHZhbHVlIGFzIGY2NCkpIC8gOC4wKSBhcyB1MzIpID4+PiAwO1xufVxuXG4vKipcbiAqIE1hcHMgYSB2YWx1ZSBiZXR3ZWVuIDAgYW5kIDI1NSB0byBhIHRpbWUgZHVyYXRpb24gaW4gc2Vjb25kcyB0aGF0IGEgcHV6emxlIGlzIHZhbGlkIGZvci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGV4cGlyeVRvRHVyYXRpb25JblNlY29uZHModmFsdWU6IHU4KTogdTMyIHtcbiAgaWYgKHZhbHVlID4gMjU1KSB7XG4gICAgdmFsdWUgPSAyNTU7XG4gIH0gZWxzZSBpZiAodmFsdWUgPCAwKSB7XG4gICAgdmFsdWUgPSAwO1xuICB9XG5cbiAgcmV0dXJuICh2YWx1ZSBhcyB1MzIpICogMzAwO1xufVxuIl19
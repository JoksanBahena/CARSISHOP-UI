"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.solveBlake2bEfficient = exports.HASH_SIZE_BYTES = void 0;
const blake2b_1 = require("./blake2b/blake2b");
const constants_1 = require("./constants");
exports.HASH_SIZE_BYTES = 32;
/**
 * Solve the blake2b hashing problem, re-using the memory between different attempts (which solves up to 50% faster).
 *
 * This only changes the last 4 bytes of the input array to find a solution. To find multiple solutions
 * one could call this function multiple times with the 4 bytes in front of those last 4 bytes varying.
 *
 *
 * The goal is to find a nonce that, hashed together with the rest of the input header, has a value of its
 * most significant 32bits that is below some threshold.
 * Approximately this means: the hash value of it starts with K zeroes (little endian), which is expected to be
 * increasingly difficult as K increases.
 *
 * In practice you should ask the client to solve multiple (easier) puzzles which should reduce variance and also allows us
 * to show a progress bar.
 * @param input challenge bytes
 * @param threshold u32 value under which the solution's hash should be below.
 */
function solveBlake2bEfficient(input, threshold, n) {
    if (input.length != constants_1.CHALLENGE_SIZE_BYTES) {
        throw Error("Invalid input");
    }
    const buf = input.buffer;
    const view = new DataView(buf);
    const ctx = new blake2b_1.Context(exports.HASH_SIZE_BYTES);
    ctx.t = constants_1.CHALLENGE_SIZE_BYTES;
    const start = view.getUint32(124, true);
    const end = start + n;
    for (let i = start; i < end; i++) {
        view.setUint32(124, i, true);
        blake2b_1.blake2bResetForShortMessage(ctx, input);
        blake2b_1.blake2bCompress(ctx, true);
        if (ctx.h[0] < threshold) {
            if (ASC_TARGET == 0) {
                // JS
                return new Uint8Array(ctx.h.buffer);
            }
            //@ts-ignore
            return Uint8Array.wrap(ctx.h.buffer);
        }
    }
    return new Uint8Array(0);
}
exports.solveBlake2bEfficient = solveBlake2bEfficient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29sdmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NvbHZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrQ0FBMEY7QUFDMUYsMkNBQW1EO0FBRXRDLFFBQUEsZUFBZSxHQUFHLEVBQUUsQ0FBQztBQUVsQzs7Ozs7Ozs7Ozs7Ozs7OztHQWdCRztBQUNILFNBQWdCLHFCQUFxQixDQUFDLEtBQWlCLEVBQUUsU0FBYyxFQUFFLENBQU07SUFDN0UsSUFBSSxLQUFLLENBQUMsTUFBTSxJQUFJLGdDQUFvQixFQUFFO1FBQ3hDLE1BQU0sS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0tBQzlCO0lBRUQsTUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztJQUN6QixNQUFNLElBQUksR0FBRyxJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUUvQixNQUFNLEdBQUcsR0FBRyxJQUFJLGlCQUFPLENBQUMsdUJBQWUsQ0FBQyxDQUFDO0lBQ3pDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsZ0NBQW9CLENBQUM7SUFFN0IsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDeEMsTUFBTSxHQUFHLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQztJQUV0QixLQUFLLElBQUksQ0FBQyxHQUFRLEtBQUssRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3JDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUU3QixxQ0FBMkIsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDeEMseUJBQWUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFM0IsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLFNBQVMsRUFBRTtZQUN4QixJQUFJLFVBQVUsSUFBSSxDQUFDLEVBQUU7Z0JBQ25CLEtBQUs7Z0JBQ0wsT0FBTyxJQUFJLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ3JDO1lBQ0QsWUFBWTtZQUNaLE9BQU8sVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3RDO0tBQ0Y7SUFFRCxPQUFPLElBQUksVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzNCLENBQUM7QUEvQkQsc0RBK0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYmxha2UyYlJlc2V0Rm9yU2hvcnRNZXNzYWdlLCBibGFrZTJiQ29tcHJlc3MsIENvbnRleHQgfSBmcm9tIFwiLi9ibGFrZTJiL2JsYWtlMmJcIjtcbmltcG9ydCB7IENIQUxMRU5HRV9TSVpFX0JZVEVTIH0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5cbmV4cG9ydCBjb25zdCBIQVNIX1NJWkVfQllURVMgPSAzMjtcblxuLyoqXG4gKiBTb2x2ZSB0aGUgYmxha2UyYiBoYXNoaW5nIHByb2JsZW0sIHJlLXVzaW5nIHRoZSBtZW1vcnkgYmV0d2VlbiBkaWZmZXJlbnQgYXR0ZW1wdHMgKHdoaWNoIHNvbHZlcyB1cCB0byA1MCUgZmFzdGVyKS5cbiAqXG4gKiBUaGlzIG9ubHkgY2hhbmdlcyB0aGUgbGFzdCA0IGJ5dGVzIG9mIHRoZSBpbnB1dCBhcnJheSB0byBmaW5kIGEgc29sdXRpb24uIFRvIGZpbmQgbXVsdGlwbGUgc29sdXRpb25zXG4gKiBvbmUgY291bGQgY2FsbCB0aGlzIGZ1bmN0aW9uIG11bHRpcGxlIHRpbWVzIHdpdGggdGhlIDQgYnl0ZXMgaW4gZnJvbnQgb2YgdGhvc2UgbGFzdCA0IGJ5dGVzIHZhcnlpbmcuXG4gKlxuICpcbiAqIFRoZSBnb2FsIGlzIHRvIGZpbmQgYSBub25jZSB0aGF0LCBoYXNoZWQgdG9nZXRoZXIgd2l0aCB0aGUgcmVzdCBvZiB0aGUgaW5wdXQgaGVhZGVyLCBoYXMgYSB2YWx1ZSBvZiBpdHNcbiAqIG1vc3Qgc2lnbmlmaWNhbnQgMzJiaXRzIHRoYXQgaXMgYmVsb3cgc29tZSB0aHJlc2hvbGQuXG4gKiBBcHByb3hpbWF0ZWx5IHRoaXMgbWVhbnM6IHRoZSBoYXNoIHZhbHVlIG9mIGl0IHN0YXJ0cyB3aXRoIEsgemVyb2VzIChsaXR0bGUgZW5kaWFuKSwgd2hpY2ggaXMgZXhwZWN0ZWQgdG8gYmVcbiAqIGluY3JlYXNpbmdseSBkaWZmaWN1bHQgYXMgSyBpbmNyZWFzZXMuXG4gKlxuICogSW4gcHJhY3RpY2UgeW91IHNob3VsZCBhc2sgdGhlIGNsaWVudCB0byBzb2x2ZSBtdWx0aXBsZSAoZWFzaWVyKSBwdXp6bGVzIHdoaWNoIHNob3VsZCByZWR1Y2UgdmFyaWFuY2UgYW5kIGFsc28gYWxsb3dzIHVzXG4gKiB0byBzaG93IGEgcHJvZ3Jlc3MgYmFyLlxuICogQHBhcmFtIGlucHV0IGNoYWxsZW5nZSBieXRlc1xuICogQHBhcmFtIHRocmVzaG9sZCB1MzIgdmFsdWUgdW5kZXIgd2hpY2ggdGhlIHNvbHV0aW9uJ3MgaGFzaCBzaG91bGQgYmUgYmVsb3cuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzb2x2ZUJsYWtlMmJFZmZpY2llbnQoaW5wdXQ6IFVpbnQ4QXJyYXksIHRocmVzaG9sZDogdTMyLCBuOiB1MzIpOiBVaW50OEFycmF5IHtcbiAgaWYgKGlucHV0Lmxlbmd0aCAhPSBDSEFMTEVOR0VfU0laRV9CWVRFUykge1xuICAgIHRocm93IEVycm9yKFwiSW52YWxpZCBpbnB1dFwiKTtcbiAgfVxuXG4gIGNvbnN0IGJ1ZiA9IGlucHV0LmJ1ZmZlcjtcbiAgY29uc3QgdmlldyA9IG5ldyBEYXRhVmlldyhidWYpO1xuXG4gIGNvbnN0IGN0eCA9IG5ldyBDb250ZXh0KEhBU0hfU0laRV9CWVRFUyk7XG4gIGN0eC50ID0gQ0hBTExFTkdFX1NJWkVfQllURVM7XG5cbiAgY29uc3Qgc3RhcnQgPSB2aWV3LmdldFVpbnQzMigxMjQsIHRydWUpO1xuICBjb25zdCBlbmQgPSBzdGFydCArIG47XG5cbiAgZm9yIChsZXQgaTogdTMyID0gc3RhcnQ7IGkgPCBlbmQ7IGkrKykge1xuICAgIHZpZXcuc2V0VWludDMyKDEyNCwgaSwgdHJ1ZSk7XG5cbiAgICBibGFrZTJiUmVzZXRGb3JTaG9ydE1lc3NhZ2UoY3R4LCBpbnB1dCk7XG4gICAgYmxha2UyYkNvbXByZXNzKGN0eCwgdHJ1ZSk7XG5cbiAgICBpZiAoY3R4LmhbMF0gPCB0aHJlc2hvbGQpIHtcbiAgICAgIGlmIChBU0NfVEFSR0VUID09IDApIHtcbiAgICAgICAgLy8gSlNcbiAgICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KGN0eC5oLmJ1ZmZlcik7XG4gICAgICB9XG4gICAgICAvL0B0cy1pZ25vcmVcbiAgICAgIHJldHVybiBVaW50OEFycmF5LndyYXAoY3R4LmguYnVmZmVyKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoMCk7XG59XG4iXX0=
import { blake2bResetForShortMessage, blake2bCompress, Context } from "./blake2b/blake2b";
import { CHALLENGE_SIZE_BYTES } from "./constants";
export const HASH_SIZE_BYTES = 32;
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
export function solveBlake2bEfficient(input, threshold, n) {
    if (input.length != CHALLENGE_SIZE_BYTES) {
        throw Error("Invalid input");
    }
    const buf = input.buffer;
    const view = new DataView(buf);
    const ctx = new Context(HASH_SIZE_BYTES);
    ctx.t = CHALLENGE_SIZE_BYTES;
    const start = view.getUint32(124, true);
    const end = start + n;
    for (let i = start; i < end; i++) {
        view.setUint32(124, i, true);
        blake2bResetForShortMessage(ctx, input);
        blake2bCompress(ctx, true);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29sdmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3NvbHZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsZUFBZSxFQUFFLE9BQU8sRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzFGLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUVuRCxNQUFNLENBQUMsTUFBTSxlQUFlLEdBQUcsRUFBRSxDQUFDO0FBRWxDOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBQ0gsTUFBTSxVQUFVLHFCQUFxQixDQUFDLEtBQWlCLEVBQUUsU0FBYyxFQUFFLENBQU07SUFDN0UsSUFBSSxLQUFLLENBQUMsTUFBTSxJQUFJLG9CQUFvQixFQUFFO1FBQ3hDLE1BQU0sS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0tBQzlCO0lBRUQsTUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztJQUN6QixNQUFNLElBQUksR0FBRyxJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUUvQixNQUFNLEdBQUcsR0FBRyxJQUFJLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUN6QyxHQUFHLENBQUMsQ0FBQyxHQUFHLG9CQUFvQixDQUFDO0lBRTdCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3hDLE1BQU0sR0FBRyxHQUFHLEtBQUssR0FBRyxDQUFDLENBQUM7SUFFdEIsS0FBSyxJQUFJLENBQUMsR0FBUSxLQUFLLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNyQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFN0IsMkJBQTJCLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3hDLGVBQWUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFM0IsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLFNBQVMsRUFBRTtZQUN4QixJQUFJLFVBQVUsSUFBSSxDQUFDLEVBQUU7Z0JBQ25CLEtBQUs7Z0JBQ0wsT0FBTyxJQUFJLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ3JDO1lBQ0QsWUFBWTtZQUNaLE9BQU8sVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3RDO0tBQ0Y7SUFFRCxPQUFPLElBQUksVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzNCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBibGFrZTJiUmVzZXRGb3JTaG9ydE1lc3NhZ2UsIGJsYWtlMmJDb21wcmVzcywgQ29udGV4dCB9IGZyb20gXCIuL2JsYWtlMmIvYmxha2UyYlwiO1xuaW1wb3J0IHsgQ0hBTExFTkdFX1NJWkVfQllURVMgfSBmcm9tIFwiLi9jb25zdGFudHNcIjtcblxuZXhwb3J0IGNvbnN0IEhBU0hfU0laRV9CWVRFUyA9IDMyO1xuXG4vKipcbiAqIFNvbHZlIHRoZSBibGFrZTJiIGhhc2hpbmcgcHJvYmxlbSwgcmUtdXNpbmcgdGhlIG1lbW9yeSBiZXR3ZWVuIGRpZmZlcmVudCBhdHRlbXB0cyAod2hpY2ggc29sdmVzIHVwIHRvIDUwJSBmYXN0ZXIpLlxuICpcbiAqIFRoaXMgb25seSBjaGFuZ2VzIHRoZSBsYXN0IDQgYnl0ZXMgb2YgdGhlIGlucHV0IGFycmF5IHRvIGZpbmQgYSBzb2x1dGlvbi4gVG8gZmluZCBtdWx0aXBsZSBzb2x1dGlvbnNcbiAqIG9uZSBjb3VsZCBjYWxsIHRoaXMgZnVuY3Rpb24gbXVsdGlwbGUgdGltZXMgd2l0aCB0aGUgNCBieXRlcyBpbiBmcm9udCBvZiB0aG9zZSBsYXN0IDQgYnl0ZXMgdmFyeWluZy5cbiAqXG4gKlxuICogVGhlIGdvYWwgaXMgdG8gZmluZCBhIG5vbmNlIHRoYXQsIGhhc2hlZCB0b2dldGhlciB3aXRoIHRoZSByZXN0IG9mIHRoZSBpbnB1dCBoZWFkZXIsIGhhcyBhIHZhbHVlIG9mIGl0c1xuICogbW9zdCBzaWduaWZpY2FudCAzMmJpdHMgdGhhdCBpcyBiZWxvdyBzb21lIHRocmVzaG9sZC5cbiAqIEFwcHJveGltYXRlbHkgdGhpcyBtZWFuczogdGhlIGhhc2ggdmFsdWUgb2YgaXQgc3RhcnRzIHdpdGggSyB6ZXJvZXMgKGxpdHRsZSBlbmRpYW4pLCB3aGljaCBpcyBleHBlY3RlZCB0byBiZVxuICogaW5jcmVhc2luZ2x5IGRpZmZpY3VsdCBhcyBLIGluY3JlYXNlcy5cbiAqXG4gKiBJbiBwcmFjdGljZSB5b3Ugc2hvdWxkIGFzayB0aGUgY2xpZW50IHRvIHNvbHZlIG11bHRpcGxlIChlYXNpZXIpIHB1enpsZXMgd2hpY2ggc2hvdWxkIHJlZHVjZSB2YXJpYW5jZSBhbmQgYWxzbyBhbGxvd3MgdXNcbiAqIHRvIHNob3cgYSBwcm9ncmVzcyBiYXIuXG4gKiBAcGFyYW0gaW5wdXQgY2hhbGxlbmdlIGJ5dGVzXG4gKiBAcGFyYW0gdGhyZXNob2xkIHUzMiB2YWx1ZSB1bmRlciB3aGljaCB0aGUgc29sdXRpb24ncyBoYXNoIHNob3VsZCBiZSBiZWxvdy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNvbHZlQmxha2UyYkVmZmljaWVudChpbnB1dDogVWludDhBcnJheSwgdGhyZXNob2xkOiB1MzIsIG46IHUzMik6IFVpbnQ4QXJyYXkge1xuICBpZiAoaW5wdXQubGVuZ3RoICE9IENIQUxMRU5HRV9TSVpFX0JZVEVTKSB7XG4gICAgdGhyb3cgRXJyb3IoXCJJbnZhbGlkIGlucHV0XCIpO1xuICB9XG5cbiAgY29uc3QgYnVmID0gaW5wdXQuYnVmZmVyO1xuICBjb25zdCB2aWV3ID0gbmV3IERhdGFWaWV3KGJ1Zik7XG5cbiAgY29uc3QgY3R4ID0gbmV3IENvbnRleHQoSEFTSF9TSVpFX0JZVEVTKTtcbiAgY3R4LnQgPSBDSEFMTEVOR0VfU0laRV9CWVRFUztcblxuICBjb25zdCBzdGFydCA9IHZpZXcuZ2V0VWludDMyKDEyNCwgdHJ1ZSk7XG4gIGNvbnN0IGVuZCA9IHN0YXJ0ICsgbjtcblxuICBmb3IgKGxldCBpOiB1MzIgPSBzdGFydDsgaSA8IGVuZDsgaSsrKSB7XG4gICAgdmlldy5zZXRVaW50MzIoMTI0LCBpLCB0cnVlKTtcblxuICAgIGJsYWtlMmJSZXNldEZvclNob3J0TWVzc2FnZShjdHgsIGlucHV0KTtcbiAgICBibGFrZTJiQ29tcHJlc3MoY3R4LCB0cnVlKTtcblxuICAgIGlmIChjdHguaFswXSA8IHRocmVzaG9sZCkge1xuICAgICAgaWYgKEFTQ19UQVJHRVQgPT0gMCkge1xuICAgICAgICAvLyBKU1xuICAgICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoY3R4LmguYnVmZmVyKTtcbiAgICAgIH1cbiAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgcmV0dXJuIFVpbnQ4QXJyYXkud3JhcChjdHguaC5idWZmZXIpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuZXcgVWludDhBcnJheSgwKTtcbn1cbiJdfQ==
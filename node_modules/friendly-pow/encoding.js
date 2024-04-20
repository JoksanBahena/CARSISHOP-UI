/**
 * Maps a value between 0 and 255 to a difficulty threshold (as uint32)
 * Difficulty 0 maps to 99.99% probability of being right on the first attempt
 * Anything above 250 needs 2^32 tries on average to solve.
 * 150 to 180 seems reasonable
 */
export function difficultyToThreshold(value) {
    if (value > 255) {
        value = 255;
    }
    else if (value < 0) {
        value = 0;
    }
    return Math.pow(2, (255.999 - value) / 8.0) >>> 0;
}
/**
 * Maps a value between 0 and 255 to a time duration in seconds that a puzzle is valid for.
 */
export function expiryToDurationInSeconds(value) {
    if (value > 255) {
        value = 255;
    }
    else if (value < 0) {
        value = 0;
    }
    return value * 300;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jb2RpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvZW5jb2RpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O0dBS0c7QUFDSCxNQUFNLFVBQVUscUJBQXFCLENBQUMsS0FBUztJQUM3QyxJQUFJLEtBQUssR0FBRyxHQUFHLEVBQUU7UUFDZixLQUFLLEdBQUcsR0FBRyxDQUFDO0tBQ2I7U0FBTSxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUU7UUFDcEIsS0FBSyxHQUFHLENBQUMsQ0FBQztLQUNYO0lBRUQsT0FBUSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sR0FBSSxLQUFhLENBQUMsR0FBRyxHQUFHLENBQVMsS0FBSyxDQUFDLENBQUM7QUFDdEUsQ0FBQztBQUVEOztHQUVHO0FBQ0gsTUFBTSxVQUFVLHlCQUF5QixDQUFDLEtBQVM7SUFDakQsSUFBSSxLQUFLLEdBQUcsR0FBRyxFQUFFO1FBQ2YsS0FBSyxHQUFHLEdBQUcsQ0FBQztLQUNiO1NBQU0sSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFO1FBQ3BCLEtBQUssR0FBRyxDQUFDLENBQUM7S0FDWDtJQUVELE9BQVEsS0FBYSxHQUFHLEdBQUcsQ0FBQztBQUM5QixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBNYXBzIGEgdmFsdWUgYmV0d2VlbiAwIGFuZCAyNTUgdG8gYSBkaWZmaWN1bHR5IHRocmVzaG9sZCAoYXMgdWludDMyKVxuICogRGlmZmljdWx0eSAwIG1hcHMgdG8gOTkuOTklIHByb2JhYmlsaXR5IG9mIGJlaW5nIHJpZ2h0IG9uIHRoZSBmaXJzdCBhdHRlbXB0XG4gKiBBbnl0aGluZyBhYm92ZSAyNTAgbmVlZHMgMl4zMiB0cmllcyBvbiBhdmVyYWdlIHRvIHNvbHZlLlxuICogMTUwIHRvIDE4MCBzZWVtcyByZWFzb25hYmxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkaWZmaWN1bHR5VG9UaHJlc2hvbGQodmFsdWU6IHU4KTogdTMyIHtcbiAgaWYgKHZhbHVlID4gMjU1KSB7XG4gICAgdmFsdWUgPSAyNTU7XG4gIH0gZWxzZSBpZiAodmFsdWUgPCAwKSB7XG4gICAgdmFsdWUgPSAwO1xuICB9XG5cbiAgcmV0dXJuIChNYXRoLnBvdygyLCAoMjU1Ljk5OSAtICh2YWx1ZSBhcyBmNjQpKSAvIDguMCkgYXMgdTMyKSA+Pj4gMDtcbn1cblxuLyoqXG4gKiBNYXBzIGEgdmFsdWUgYmV0d2VlbiAwIGFuZCAyNTUgdG8gYSB0aW1lIGR1cmF0aW9uIGluIHNlY29uZHMgdGhhdCBhIHB1enpsZSBpcyB2YWxpZCBmb3IuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBleHBpcnlUb0R1cmF0aW9uSW5TZWNvbmRzKHZhbHVlOiB1OCk6IHUzMiB7XG4gIGlmICh2YWx1ZSA+IDI1NSkge1xuICAgIHZhbHVlID0gMjU1O1xuICB9IGVsc2UgaWYgKHZhbHVlIDwgMCkge1xuICAgIHZhbHVlID0gMDtcbiAgfVxuXG4gIHJldHVybiAodmFsdWUgYXMgdTMyKSAqIDMwMDtcbn1cbiJdfQ==
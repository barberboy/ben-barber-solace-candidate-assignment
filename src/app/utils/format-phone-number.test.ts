import { describe, expect, test } from '@jest/globals';
import formatPhoneNumber from "./format-phone-number"

describe('formatPhoneNumber', () => {
    test('handles null, undefined, and empty strings', () => {
        expect(formatPhoneNumber(null)).toBe("");
        expect(formatPhoneNumber(undefined)).toBe("");
        expect(formatPhoneNumber('')).toBe("");
    })

    test('separates a 7-digit telephone number in to a group of 3 and a group of 4', () => {
        expect(formatPhoneNumber(8675309)).toBe("867-5309");
        expect(formatPhoneNumber("8675309")).toBe("867-5309");
    })

    test('groups area code and 7-digit telephone number', () => {
        expect(formatPhoneNumber(5558675309)).toBe("(555) 867-5309");
    })

    test('handles 1-digit country codes area code and 7-digit telephone number', () => {
        expect(formatPhoneNumber(15558675309)).toBe("+1 (555) 867-5309");
    })
});
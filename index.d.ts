export type HumanNameConfig = {
  alphabets: string;
  format: string;
};

export type Human = {
  getName: (config: HumanNameConfig) => string;
  slapSelf: () => void;
};

export type SocialMediaClient = {
  findPostByDescription: (description: string) => Post;
};

export type Post = {
  id: string;
};

export type Location = {
  latitude: number;
  longitude: number;
};

/**
 * Returns human that is reading this code.
 */
export const getHuman: () => Human;

/**
 * Return a Facebook API client that can request
 * the human's public feed.
 * @param human
 */
export const initFacebookClient: (config: {
  human: Human;
}) => SocialMediaClient;

/**
 * Function that takes a number and delete
 * any digit that is repeated more than once.
 */
export const getRidOfRepeatingDigits: (number: string) => number;

/**
 * Function that convert a string text into a hex sequence.
 *
 * Following the ASCII hex table https://en.wikipedia.org/wiki/ASCII
 *   41	A
 *   |  |
 *   5A	Z
 *   ...
 *   61 a
 *   |  |
 *   7A z
 *
 * Example:
 *  aZb -> 615A62
 */
export const textToHex: (s: string) => string;

/**
 * Function that generates a mask based on a sequence.
 *
 * The numbers in the sequence represents the repetion of a dash "-"
 * before an occurance of a hashtag "#", in the respective order.
 * -----#---#----#----#
 *
 * for example: generateMask([1, 4, 2, 1, 1]) -> -#----#--#-#-#
 */
export const generateMask: (sequence: number[]) => string;

/**
 * Function that extract a number by running a mask on a repeated string.
 * for example:
 *
 * pattern = "1245"
 * mask     = "-#----#--#-#-#"
 *
 * repeated = "1245124512451245"
 *
 * output = 24252
 */
export const projectMask: (pattern: string, mask: string) => number;

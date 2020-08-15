import { Human, SocialMediaClient, Location } from "./_types";
import {
  getHuman,
  initFacebookClient,
  textToHex,
  generateMask,
  projectMask,
  getRidOfRepeatingDigits,
} from "./utils";

/**
 * Function that returns where
 * your soul wants to be.
 *
 * returns @type Location
 */
export const pin = (): Location => {
  const me = getHuman();

  const magicPrime = getMagicPrime(me);

  const primes = [2, 2, 53, magicPrime, 3, 43, 131, 43543];

  const product_1 = primes.slice(0, 4).reduce((p, number) => p * number, 1);
  const product_2 = primes.slice(4).reduce((p, number) => p * number, 1);

  const location: Location = {
    latitude: Math.min(product_1, product_2) / 10e6,
    longitude: -Math.max(product_1, product_2) / 10e6,
  };

  console.log("✨ Go to:", location);
  return location;
};

/**
 * Function that generates a uniqye magic prime,
 * bound to a human.
 *
 * @param human
 */
const getMagicPrime = (human: Human) => {
  const facebookClient = initFacebookClient({
    human,
  });

  return getMemoryFragment(facebookClient) + getCodeName(human);
};

/**
 * Function that gets a memory Fragment from the human's social media life.
 * Please read through to understand how it works.
 *
 * @param facebookClient
 */
const getMemoryFragment = (facebookClient: SocialMediaClient) => {
  const post = facebookClient.findPostByDescription(
    "Becoming a skydiver, CHECK!"
  );

  return getRidOfRepeatingDigits(post.id);
};

/**
 * Function that gets a codeName based a human name.
 * Please read through to understand how it works.
 *
 * @param human
 */
const getCodeName = (human: Human) => {
  const config = {
    NAME_CONFIG: {
      alphabets: "latin",
      format: "Firstname Lastname",
    },
    VALID_NAME_LENGTH: 13,
    MASK_CONFIG: [8, 4, 12, 12, 21, 11, 1],
  };

  // Get human full name based on a config.
  const name = human.getName(config.NAME_CONFIG);
  if (name.length !== 13) {
    // Assertion that the name is correct.
    human.slapSelf();
    process.exit();
  }

  // Convert name to Hex.
  const nameInHex = textToHex(name);
  if (nameInHex.length !== 2 * config.VALID_NAME_LENGTH) {
    human.slapSelf();
    process.exit();
  }

  // Generate a mask to be applied to the hex sequence.
  const getMask = generateMask(config.MASK_CONFIG);

  // 🕶 CodeName generated successfully.
  return projectMask(nameInHex, getMask);
};


// 🎻 Kickstart here --->
pin();
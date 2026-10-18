const PACKAGER_BUILDING_ID = 'Build_Packager_C';

/**
 * Applies the Satisfactory 1.2 "Recipe Parts Cost Multiplier" to a
 * single ingredient amount. Three rules govern the result:
 *
 * 1. Packager recipes are exempt: the game never scales packaging or
 *    unpackaging ingredients regardless of the multiplier.
 * 2. Fluids and gases are scaled without rounding (e.g. 3 * 0.25 = 0.75 m3),
 *    because fractional fluid amounts are valid in-game.
 * 3. Solids are rounded to the nearest integer with a floor of 1, because
 *    handcrafting requires whole items and zero-cost ingredients would break
 *    recipes (e.g. 1 * 0.25 = 0.25, rounded to 0, floored to 1).
 */
export function applyRecipeMultiplier(
  baseAmount: number,
  multiplier: number,
  recipe?: { producedIn: string },
  itemForm?: string,
): number {
  if (multiplier === 1) return baseAmount;
  if (recipe?.producedIn === PACKAGER_BUILDING_ID) return baseAmount;
  const scaled = baseAmount * multiplier;
  if (itemForm === 'Liquid' || itemForm === 'Gas') return scaled;
  return Math.max(1, Math.round(scaled));
}

export function isPackagerRecipe(recipe: { producedIn: string }): boolean {
  return recipe.producedIn === PACKAGER_BUILDING_ID;
}

export const RECIPE_MULTIPLIER_OPTIONS = [
  { value: '0.25', label: '0.25x' },
  { value: '0.5', label: '0.5x' },
  { value: '0.75', label: '0.75x' },
  { value: '1', label: '1x (Por defecto)' },
  { value: '1.25', label: '1.25x' },
  { value: '1.5', label: '1.5x' },
  { value: '1.75', label: '1.75x' },
  { value: '2', label: '2x' },
];

export const POWER_CONSUMPTION_MULTIPLIER_OPTIONS = [
  { value: '0.25', label: '0.25x' },
  { value: '0.5', label: '0.5x' },
  { value: '0.75', label: '0.75x' },
  { value: '1', label: '1x (Por defecto)' },
  { value: '2', label: '2x' },
  { value: '5', label: '5x' },
];

export const DEFAULT_RECIPE_MULTIPLIER = 1;
export const DEFAULT_POWER_CONSUMPTION_MULTIPLIER = 1;

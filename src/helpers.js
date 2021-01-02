/**
 * String helpers
 */
export const isEveryCharacterZeroWidthNonJoiner = (word) =>
  word
    .split('')
    .every((stringCharacter) => stringCharacter.charCodeAt(0) !== 8204)

export const isEmptyArray = a => a.length === 0

export const matchString = (str) => (matchers) => matchers[str]()

/** 
 * Render helpers
 */
export const renderConditional = (predicate) => (
  isEmptyFunc,
  isNotEmptyFunc,
) => (value) => (predicate(value) ? isEmptyFunc() : isNotEmptyFunc(value))

export const renderMaybeEmptyList = renderConditional(isEmptyArray)


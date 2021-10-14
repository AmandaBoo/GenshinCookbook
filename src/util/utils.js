export const MAX_CARD_NAME_LENGTH = 25;
export const MAX_CONFIGURATION_NAME_LENGTH = 15;
export function getTruncatedName(name, length) {
    if (name.length > length) {
        return name.substring(0, length) + "...";
    }
    return name;
}
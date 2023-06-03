import styles from "../scss/style.module.scss";

const prefix = "rssas";
/**
 * Get style classname
 * 
 * This will return 2 classnames, 1 has hash which have styles and 
 * another just the classname for customization purpose
 */
export function ss(className: string) {
    // console.log("styles", styles);
    let className1 = prefix + "-" + className;
    return [className1, styles[className] as string];
}
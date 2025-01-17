import { MeasuredTemplatePF2e } from "./measured-template";
import { TokenPF2e } from "./token";
/**
 * Measure the minimum distance between two rectangles
 * @param r0      The origin rectangle
 * @param r1      The destination rectangle
 * @param [reach] If this is a reach measurement, the origin actor's reach
 */
declare function measureDistanceCuboid(r0: PIXI.Rectangle, r1: PIXI.Rectangle, { reach, token, target, }?: {
    reach?: number | null;
    token?: TokenPF2e | null;
    target?: TokenPF2e | null;
}): number;
/** Highlight grid according to Pathfinder 2e effect-area shapes */
declare function highlightGrid({ type, object, colors, document, collisionType, preview, }: HighlightGridParams): void;
interface HighlightGridParams {
    type: "burst" | "cone" | "emanation";
    object: MeasuredTemplatePF2e | TokenPF2e;
    /** Border and fill colors in hexadecimal */
    colors: {
        border: number;
        fill: number;
    };
    /** Shape data for the effect area: satisfied by MeasuredTemplateData */
    document: Readonly<{
        x: number;
        y: number;
        distance: number;
        angle?: number;
        direction?: number;
        width: number;
    }>;
    collisionType?: WallRestrictionType;
    preview?: boolean;
}
export { highlightGrid, measureDistanceCuboid };

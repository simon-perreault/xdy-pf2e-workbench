import { CompendiumBrowser } from "..";
import { ContentTabName } from "../data";
import { CompendiumBrowserTab } from "./base";
import { BestiaryFilters, CompendiumBrowserIndexData } from "./data";
export declare class CompendiumBrowserBestiaryTab extends CompendiumBrowserTab {
    tabName: ContentTabName;
    filterData: BestiaryFilters;
    templatePath: string;
    protected index: string[];
    searchFields: string[];
    storeFields: string[];
    constructor(browser: CompendiumBrowser);
    protected loadData(): Promise<void>;
    protected filterIndexData(entry: CompendiumBrowserIndexData): boolean;
    protected prepareFilterData(): BestiaryFilters;
}

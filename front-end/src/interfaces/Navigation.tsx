export interface NavigationItem {
    kind?: 'divider';
    segment: string;
    title: string;
    icon?: React.ReactElement;
    children?: NavigationItem[];
    modal?: boolean;
}
export interface FoundItem {
    item: NavigationItem;
    parent: NavigationItem | null;
}

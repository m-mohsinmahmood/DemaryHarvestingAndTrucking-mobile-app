export interface pageView {
    id: string,
    title: string,
    url: string,
    icon: string,
    selected: boolean,
    collapsed?: boolean,
    pages?: pageView[]
};


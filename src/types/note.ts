 
export interface Note {
    id?: string;
    title: string,
    content: string,
    tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping"
}

export interface NewNote {
    id: string;
    title: string;
    content: string;
    tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping"
    createAt: string;
    updatedAt: string;
}
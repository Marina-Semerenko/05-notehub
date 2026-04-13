 
export interface Note {
    id?: string;
    title: string,
    content: string,
    createAt?: string;
    updatedAt?: string;
    tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping"
}

export interface NewNote {
    title: string;
    content: string;
    tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping"
    
}
declare module Employee {
    export interface Record {
        id: string;
        name: string;
        position: string;
        department: string;
        salary: number;
        status: Status;
    }
}
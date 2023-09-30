
export interface NewEvent {
    title: string;
    place: string;
    address: string;
    date: string;
    time: string;
    description: string;
    userId: number;
    image: File | null;
    category: string;
}
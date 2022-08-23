export interface IEvent {
    title: string;
    notes: string;
    start: Date;
    end: Date;
    user: string; // ref(User)
}
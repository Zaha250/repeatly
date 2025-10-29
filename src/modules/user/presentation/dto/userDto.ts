export interface HandleStartCommandRequestDto {
    chatId: number;
    from: {
        id: number;
        username: string;
        first_name: string;
    };
}

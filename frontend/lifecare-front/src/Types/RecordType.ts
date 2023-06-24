export type Record = {
    id: number,
    name: string,
    cpf: string,
    phone: string,
    address?: string,
    description?: string,
    imageFile?: FormData,
}
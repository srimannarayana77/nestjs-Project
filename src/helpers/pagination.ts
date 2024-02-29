export function paginate(page: number, limit: number): { skip: number, limit: number } {
    const skip = (page - 1) * limit;
    return { skip, limit };
}

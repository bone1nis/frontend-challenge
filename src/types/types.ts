export type ICat = {
    id: string,
    url: string,
    width: number,
    height: number,
    breeds: ICatBreeds[]
}

type ICatBreeds = {
    weight: {
        imperial: string,
        metric: string,
    }
        id: string,
        name: string,
        temperament: string,
        origin: string,
        country_codes: string,
        country_code: string,
        life_span: string,
        wikipedia_url: string
}
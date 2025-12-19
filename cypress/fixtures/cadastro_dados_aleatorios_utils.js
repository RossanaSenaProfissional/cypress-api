import { faker } from '@faker-js/faker';

export function gerarReserva() {
    return {
        "firstname": faker.person.firstName(),
        "lastname": faker.person.lastName(),
        "totalprice": Number(faker.finance.amount({ dec: 0 })),
        "depositpaid": true,
        "bookingdates": {
            "checkin": "2018-01-01",
            "checkout": "2019-01-01"
        },
        "additionalneeds": "Breakfast (dados aleatórios)"
    }
}
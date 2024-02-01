const { faker } = require('@faker-js/faker');
const express = require("express");
const app = express();
const PORT = 8000;


const createUser = () => ({
    _id: faker.string.uuid(),
    firstName: faker.person.firstName(),
    lastNAme: faker.person.lastName(),
    phoneNumber: faker.phone.number(),
    email: faker.internet.email(),
    password: faker.internet.password()

});
const createCompany = () => ({
    _id: faker.string.uuid(),
    name: faker.company.name(),
    address: {
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        zipcode: faker.location.zipCode(),
        country: faker.location.country(),
    },
});

app.get("/api/users/new", (req, res) => {
    const newUser = createUser();
    res.json(newUser);
});
app.get("/api/companies/new", (req, res) => {
    const newCompany = createCompany();
    res.json(newCompany);
})
app.get("/api/user/company", (req, res) => {
    const newUser = createUser();
    const newCompany = createCompany();
    const responseObject = {
        user: newUser,
        company: newCompany,
    };
    res.json(responseObject);
});



app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

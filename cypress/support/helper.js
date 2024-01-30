class Helper {
    indexByOne() {
        let index = 0;
        return index + 1
    }

    randomIndex(){
        let index = 10000
        return Math.floor(Math.random() * index)
    }

    login = (url, email, password) => {
        return cy.request({
            method: 'POST',
            url: url, // Replace with your actual login endpoint
            body: {
                email: email,
                password: password
            },
            headers: {
                'Content-Type': 'application/json'
                // Add any additional headers if required
            }
        })/*.then((response) => {
            // Log the response to the console
            cy.log('Login Response:', response.body);

            // Return the response for further use in the test
            return response;
        });*/
    };


}

export const helper = new Helper();


// Get output area from the HTML
const output = document.getElementById("output");

// Async function to fetch users from the API
async function fetchUsersAndSummarize() {
    // URL 
    const url = "https://jsonplaceholder.typicode.com/users";


    fetch(url)
    .then((response) => {
        // Check if the response worked or failed
        if (!response.ok) {
            throw new Error("Oops! Status code: " + response.status);
        }
        // Convert response to JSON format
        return response.json();
    })
    .then((usersData) => {
        // Filter users with "C"
        const cityUsers = usersData.filter((user) => {
            
            return user.address.city.startsWith("C");
        });

    
        const summary = cityUsers.map((user) => {
            return {
                id: user.id,
                name: user.name,
                company: user.company.name
            };
        });

        // Display in console and webpage
        document.write("<h3>Users Who Live in City Starting with 'C'</h3>");
        summary.forEach((user) => {
            const line = `User ID ${user.id}: ${user.name} works at ${user.company}`;
            console.log(line);
            document.write(line + "<br>");
        });
    })
    .catch((error) => {
        // display error 
        console.error("There was an error:", error);
        document.write(`<p style="color:red;">Error Fetching Users 😞: ${error.message}</p>`);
    });
}

// test error handling
function testError() {

    const badUrl = "https://jsonplaceholder.typicode.com/u5ers";

    fetch(badUrl)
    .then((response) => {
        if (!response.ok) {
            throw new Error("Custom Error: Wrong endpoint! Status " + response.status);
        }
        return response.json();
    })
    .then((data) => {
        console.log("Should not reach here:", data);
    })
    .catch((error) => {
        console.error("Test Error caught:", error);
        document.write(`<p style="color:red;">Test Error Working 😅 - ${error.message}</p>`);
    });
}

//fetchUsersAndSummarize();
//testError();

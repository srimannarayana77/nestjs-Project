export const ejsTemplate=`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>List of Users</title>
</head>
<body>
    <h1>List of Users</h1>
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>User Name</th>
                <th>Email</th>
                <th>User Type</th>
                <th>Phone Number</th>
            </tr>
        </thead>
        <tbody>
            <% data.forEach(user => { %>
                <tr>
                    <td><%= user.name %></td>
                    <td><%= user.user_name %></td>
                    <td><%= user.email %></td>
                    <td><%= user.user_type %></td>
                    <td><%= user.phone_number %></td>
                </tr>
            <% }); %>
        </tbody>
    </table>
</body>
</html>`

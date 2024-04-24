Notes:
- I did not go for 100% test coverage, just used the tests for TDD on some parts of the code that where tricky to blindly develop.
- It might not be a great idea to async write into the DB in a real world scenario due to connection pooling and other issues, but for this case it should be fine.
- Had no time to add the scripts to build and run the project as a monorepo, so you will have to run the frontend and backend separately hehe... sorry.
- There is a chance that either the frontend or the backend will not run using the builds, so you might have to run them in dev mode, to be honest I did not test the builds.

Requirements:

We have to create a notification system that has the ability to receive a message and depending on
the category and subscribers, notify these users in the channels they are registered.

It will be 3 message categories:
- Sports
- Finance
- Movies

And there will be 3 types of notifications, each type should have its own class to manage the logic of
sending the message independently.
- SMS
- E-Mail
- Push Notification

No notification will actually be sent or the need to communicate with any external APIs, only will
register the sent notification in an archive of Logs or in a database.
In the log, it will need to save all the information necessary to identify that the notification has been
sent correctly to the respective subscriber, such as the type of message, type of notification, user
data, time, etc.

No user administration is required, you can use a Mock of users in the source code, and they must have
the following information:
- ID
- Name
- Email
- Phone number
- Subscribed [ ] here you need to list all the categories where the user is subscribed
- Channels [ ] a list of the notification's channels (SMS | E-Mail | Push Notification)

As user interface you need to display 2 main elements.

1. Submission form. A simple form to send the message, which will have 2 fields:
- Category. List of available categories.
- Message. Text area, only validate that the message is not empty.

2. Log history. A list of all records in the log, sorted from newest to oldest.
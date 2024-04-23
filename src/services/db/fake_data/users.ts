import { User } from "../../../types/user.types";

const users: User[] = [
    {
        id: "1",
        name: "John Doe",
        email: "fake_email@mail.com",
        phoneNumber: "123456789",
        subscribed: [
            'Finance',
            'Movies'
        ],
        channels: [
            'E-Mail',
            'SMS'
        ]
    },
    {
        id: "2",
        name: "Jane Doe",
        email: "fake_email2@mail.com",
        phoneNumber: "987654321",
        subscribed: [
            'Sports'
        ],
        channels: [
            "Push Notification",
            'E-Mail',
            'SMS',
        ]
    },{
        id: "3",
        name: "Juan Doe",
        email: "fake_email3@mail.com",
        phoneNumber: "123456789",
        subscribed: [
            'Sports',
            'Movies'
        ],
        channels: [
            "Push Notification",
            'SMS'
        ]
    }
]

export default users
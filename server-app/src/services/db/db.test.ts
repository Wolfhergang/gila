import DB from "./db";

describe("DB", () => {
    describe("DB: User", () => {
        it("should not fail when looking for a non existent user", async () => {
            const user = await DB.User.get({ email: "THIS EMAIL DOES NOT EXIST ON THE DB"});

            expect(user).toBeDefined();
            expect(user).toHaveLength(0);

            // this email does exist but name does not
            const user2 = await DB.User.get({ email: "fake_email@mail.com", name: "Fake Doe"});

            expect(user2).toHaveLength(0);
        })

        it("should be able to get a user by partial matching its data", async () => {
            const user = await DB.User.get({ email: "fake_email@mail.com"});

            expect(user).toBeDefined();
            expect(user).toHaveLength(1);
            expect(user[0].email).toBe("fake_email@mail.com")
            expect(user[0].name).toBe("John Doe")

            const user2 = await DB.User.get({ name: "John Doe"});
            expect(user2).toBeDefined();
            expect(user2).toHaveLength(1);

            expect(user).toMatchObject(user2)

            // This should return 1 user
            const user3 = await DB.User.get({ 
                channels: ['E-Mail'], 
                subscribed: [ "Sports"]
            });

            expect(user3).toBeDefined();
            expect(user3).toHaveLength(1);
            expect(user3[0].name).toBe("Jane Doe")
        })
    })
});
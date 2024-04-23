// I am too poor to host a real DB so I am going to mock the database with mock data and some files hohow
import users from "./fake_data/users"
import { readFromFile, appendToFile } from "../files/files"
import { User } from "../../types/user.types"

class FAKE_DB_EXCEPTION extends Error {}

const FILE_PATH = __filename.split("/").slice(0, -1).join("/")
const LOG_FILE_PATH = `${FILE_PATH}/fake_data/logs.txt`

// This is a DTO I promise haha
const DB = {
    User: {
        async get(queryObject: Partial<User>) {
            const filteredUsers = users.filter(user => {
                for (const key in queryObject) {
                    // this are collections so we need to check if the user has all the elements in the query
                    if(key === 'channels' ) {
                        const userChannelMap: Record<string, boolean> = {}

                        user.channels.forEach(channel => {
                            userChannelMap[channel as keyof typeof userChannelMap] = true
                        })

                        const userHasChannel = queryObject.channels?.every(channel => {
                            return !!userChannelMap[channel as keyof typeof userChannelMap]
                        })

                        if(!userHasChannel) return false

                        continue
                    }

                    if (key === 'subscribed'){
                        const userSubscribedMap: Record<string, boolean> = {}

                        user.subscribed.forEach(subscription => {
                            userSubscribedMap[subscription as keyof typeof userSubscribedMap] = true
                        })

                        const userHasSubscription = queryObject.subscribed?.every(subscription => {
                            return !!userSubscribedMap[subscription as keyof typeof userSubscribedMap]
                        })

                        if (!userHasSubscription) return false

                        continue
                    }

                    // straight up check if the user has the same value as the query
                    if (user[key as keyof User] !== queryObject[key as keyof User]) {
                        return false
                    }
                }


                return true
            })

            return filteredUsers
        }
    },
    Logs: {
        async fetch(){
            const logs = await readFromFile('src/services/db/fake_data/logs.txt')
            return logs
        },
        async insert(log: string){
            await appendToFile(LOG_FILE_PATH, `\n${log}`)
            return log
        }
    }
}

export default DB
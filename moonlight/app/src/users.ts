import {ulid} from "ulid";
import {appDatabase} from "./database";

export async function findOrCreateUser(username: string) {
    const user = await appDatabase.users.find({
        selector: {
            username: {
                $eq: username.trim().toLowerCase()
            }
        }
    }).exec();

    if (user) {
        alert("user exists")
        return;
    }

    await appDatabase.users.insert({
        identifier: ulid(),
        username: username.trim().toLowerCase(),
        email: null
    });
}

//
// //todo
// function checkExistingNameOnSrver(username: string) {
// }
//
// //todo
// function cacheEexistingUsernames() {
// }
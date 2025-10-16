import {addRxPlugin, createRxDatabase} from 'rxdb/plugins/core';
import {RxDBDevModePlugin} from 'rxdb/plugins/dev-mode';
import {getRxStorageLocalstorage} from 'rxdb/plugins/storage-localstorage';
import {wrappedValidateAjvStorage} from 'rxdb/plugins/validate-ajv';


addRxPlugin(RxDBDevModePlugin);

export const appDatabase = await createRxDatabase({
    name: 'moonlightUsers',
    storage: wrappedValidateAjvStorage({
        storage: getRxStorageLocalstorage()
    })
});


await appDatabase.addCollections({
    users: {
        schema: {
            title: 'user schema',
            version: 0,
            primaryKey: 'identifier',
            type: 'object',
            properties: {
                identifier: {type: 'string'},
                name: {type: 'string'},
                email: {type: 'string'}
            },
            required: ['identifier', 'name']
        }
    }
})

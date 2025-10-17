import {addRxPlugin, createRxDatabase} from 'rxdb/plugins/core';
import {RxDBDevModePlugin} from 'rxdb/plugins/dev-mode';
import {getRxStorageLocalstorage} from 'rxdb/plugins/storage-localstorage';
import {wrappedValidateAjvStorage} from 'rxdb/plugins/validate-ajv';
import {RxDBMigrationSchemaPlugin} from 'rxdb/plugins/migration-schema';

addRxPlugin(RxDBDevModePlugin);
addRxPlugin(RxDBMigrationSchemaPlugin);
export const appDatabase = await createRxDatabase({
    name: 'moonlightUsers',
    storage: wrappedValidateAjvStorage({
        storage: getRxStorageLocalstorage()
    })
});


await appDatabase.addCollections({
    users: {
        autoMigrate: true,
        migrationStrategies: {
            1: (oldDoc) => {
                return {
                    identifier: oldDoc.identifier,
                    username: oldDoc.name || '', // rename with fallback
                    email: oldDoc.email || '',
                    highScore: 0, // default new field
                };

            }
        },
        schema: {
            title: 'user schema',
            version: 1,
            primaryKey: 'identifier',
            type: 'object',
            properties: {
                identifier: {type: 'string', maxLength: 36},
                username: {type: 'string'},
                email: {type: 'string'},
                highScore: {type: 'number'},

            },
            required: ['identifier', 'username']
        }
    }
})


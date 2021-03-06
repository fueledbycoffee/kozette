/*
 ███╗   ███╗███████╗███████╗███████╗ █████╗  ██████╗ ███████╗███████╗
 ████╗ ████║██╔════╝██╔════╝██╔════╝██╔══██╗██╔════╝ ██╔════╝██╔════╝
 ██╔████╔██║█████╗  ███████╗███████╗███████║██║  ███╗█████╗  ███████╗
 ██║╚██╔╝██║██╔══╝  ╚════██║╚════██║██╔══██║██║   ██║██╔══╝  ╚════██║
 ██║ ╚═╝ ██║███████╗███████║███████║██║  ██║╚██████╔╝███████╗███████║
 ╚═╝     ╚═╝╚══════╝╚══════╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚══════╝
 ██████╗ ██████╗ ██╗     ██╗     ███████╗ ██████╗████████╗██╗ ██████╗ ███╗   ██╗
 ██╔════╝██╔═══██╗██║     ██║     ██╔════╝██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║
 ██║     ██║   ██║██║     ██║     █████╗  ██║        ██║   ██║██║   ██║██╔██╗ ██║
 ██║     ██║   ██║██║     ██║     ██╔══╝  ██║        ██║   ██║██║   ██║██║╚██╗██║
 ╚██████╗╚██████╔╝███████╗███████╗███████╗╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║
 ╚═════╝ ╚═════╝ ╚══════╝╚══════╝╚══════╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝
 */

Messages = new Mongo.Collection( 'messages' );

Message = Astro.Class( {
    name: 'Message',
    collection: Messages,
    fields: {
        user_id: {
            type: 'string',
            immutable: true,
            validator: [
                Validators.required(),
                Validators.string()
            ]
        },
        message: {
            type: 'string',
            immutable: true,
            validator: [
                Validators.required(),
                Validators.string(),
                Validators.minLength( 0 )
            ]
        },
        type: {
            type: 'string',
            immutable: true,
            validator: [
                Validators.required(),
                Validators.string(),
                Validators.choice( [ 'basic', 'info', 'status' ] )
            ]
        },
        color: {
            type: 'string',
            immutable: true,
            optional: true
        },
        embed: {
            type: 'array',
            optional: true
        }
    },
    behaviors: {
        timestamp: {
            createdFieldName: 'created_at',
            hasUpdatedField: false,
        }
    },
    indexes: {
        user: {
            fields: {
                user_id: 1
            }
        },
        creation: {
            fields: {
                created_at: -1
            }
        }
    }
} );

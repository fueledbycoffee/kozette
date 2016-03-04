Meteor.methods( {
    /**
     * @summary set a new username
     * @param nick
     */
    'user.set.username'( nick ) {

        if ( !Meteor.user() )
            throw new Meteor.Error( 'UserNotFound', 'No user connected' );

        if ( Meteor.isServer )
            Accounts.setUsername( Meteor.userId(), nick );

        return;
    }
} );
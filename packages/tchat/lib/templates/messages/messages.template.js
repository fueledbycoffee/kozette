/* MESSAGES */

/* --- helpers --- */
Template.messages.helpers({
    /**
     * @summary get list of messages
     * @return {cursor}
     */
    messages() {
        // prepare the sound to trigger
        // when receiving a new message
        let sound = new buzz.sound('packages/kozette_tchat/sound/kozette.wav');
        let query = Messages.find({}, {sort: {created_at: 1}});
        query.observeChanges({
            added(id, doc) {
                // if new message not from the connected
                // user, trigger the new message sound
                if(Meteor.userId() != doc.user_id)sound.play();
            }
        })
        return query;
    },
    /**
     * @summary get the type of message
     * to select the proper template
     * @return {string}
     */
    type() {
        return `message_${this.type}`;
    }
});

/* --- oncreated --- */
Template.messages.onCreated(function() {
    var self = this;

    self.autorun(function() {
        self.subscribe('messages.list');
    });
});

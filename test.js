Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {
  Template.body.helpers({
    tasks: function() {
      return Tasks.find({}, {sort: {createdAt: -1}});
    }
  });

  Template.body.events({
    "submit .new-task": function(event) {
      event.preventDefault();
      // Récupère la valeur de l'élément du formulaire
      var text = event.target.text.value;

      // Insert une tâche dans notre collection
      Tasks.insert({
        text: text,
        createdAt: new Date()
      });
      // La ligne suivante s'occupe de vider l'élément submit
      event.target.text.value = "";
    }
  });

  Template.task.events({
    "click .toggle-checked": function() {
      // Définit la propriété « checked » à l'opposé de sa valeur actuelle
      Tasks.update(this._id, {
        $set: {checked: ! this.checked}
      });
    },
    "click .delete": function() {
      Tasks.remove(this._id);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // L'exécution de code sur le serveur au démarrage
  });
}

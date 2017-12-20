(function() {
  var main = document.getElementById('main'),
    container = main.parentNode,
    medium = new Medium({
      element: main,
      mode: Medium.richMode,
      placeholder: 'Start typing here ...',
      attributes: null,
      tags: null
    });

  var app = angular.module('NoteApp', []);

  app.controller('NoteCtrl', function($scope) {

    var text = localStorage.getItem("note.soulkast.com:text");
    if(text !== null){
      medium.value(text);
    }

    window.onbeforeunload = function() {
      $scope.save();
      return undefined;
    };

    var lastEdited = (new Date).getTime();
    $('#main').keypress(function(){
      lastEdited = (new Date).getTime();
    });

    $scope.save = function(){
      var text = medium.value();
      var lastSaved = parseInt(localStorage.getItem("note.soulkast.com:lastSaved"));
      if(isNaN(lastSaved)|| lastEdited > lastSaved){
        console.info('i am saving');
        localStorage.setItem('note.soulkast.com:text', text);
        localStorage.setItem("note.soulkast.com:lastSaved",lastEdited);
      }
    };
  });

})();

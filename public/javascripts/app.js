(function() {

  var main = document.getElementById('main'),
    medium = new Medium({
      element: main,
      mode: Medium.richMode,
      placeholder: 'Start typing here ...',
      attributes: null,
      tags: null
    });

  // noinspection Annotator
  var app = angular.module('NoteApp', []);

  app.controller('NoteCtrl', function($scope) {

    var text = localStorage.getItem("note.soulkast.com:text");
    if(text !== null){
      medium.value(text);
    }

    window.onbeforeunload = function() {
      $scope.save(false);
      return undefined;
    };

    var lastEdited = (new Date).getTime();
    $('#main').keypress(function(){
      lastEdited = (new Date).getTime();
    });

    $scope.save = function(direct){
      var text = medium.value();
      var lastSaved = parseInt(localStorage.getItem("note.soulkast.com:lastSaved"));
      if(direct || (isNaN(lastSaved)|| lastEdited > lastSaved)){
        localStorage.setItem('note.soulkast.com:text', text);
        localStorage.setItem("note.soulkast.com:lastSaved",lastEdited);
      }
    };
  });

})();

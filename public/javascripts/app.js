const START_MSG = 'start typing here ...';
var app = angular.module('NoteApp', []);
app.controller('NoteCtrl', function($scope) {
  var jMain = $('#main');
  var text = localStorage.getItem("text");
  if(text === null){
    text = START_MSG;
  }
  jMain.text(text);

  jMain.click(function(){
    if(text === START_MSG){
      jMain.text('');
    }
  });

  window.onbeforeunload = function() {
    $scope.save();
    return undefined;
  };

  $scope.save = function(){
    var text = jMain.text();
    console.info('saving!');
    localStorage.setItem('text', text);
  };

});

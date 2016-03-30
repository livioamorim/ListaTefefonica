angular.module("serialGenerator", []);
angular.module("serialGenerator").provider("serialGenerator", function(){

  var _length;
  var _charArray;

  this.getLength = function () {
    return _length;
  };
  this.getCharArray = function () {
    return _charArray;
  };

  this.setLength = function (length) {
    _length = length;
  };
  this.setCharArray = function (charArray) {
    _charArray = charArray;
  };

  this.$get = function () {
    return {
      generate: function () {
        var serial = "";
        while (serial.length < _length){
          serial += _charArray.charAt(Math.floor(Math.random() * _charArray.length));

        }
        return serial;
      }
    };
  };

});

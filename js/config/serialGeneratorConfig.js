angular.module("listaTelefonica").config(function (serialGeneratorProvider) {
  serialGeneratorProvider.setLength(5);
  serialGeneratorProvider.setCharArray('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789');
});

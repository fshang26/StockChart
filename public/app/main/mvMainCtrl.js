angular.module('app').controller('mvMainCtrl', function($scope) {
  $scope.items = [
    {name: 'Item 1', featured: true, published: new Date('10/5/2013')},
    {name: 'Item 2', featured: true, published: new Date('10/12/2013')},
    {name: 'Item 3', featured: false, published: new Date('10/1/2013')},
    {name: 'Item 4', featured: false, published: new Date('7/12/2013')},
    {name: 'Item 5', featured: true, published: new Date('1/1/2013')},
    {name: 'Item 6', featured: true, published: new Date('10/13/2013')},
    {name: 'Item 7', featured: true, published: new Date('3/1/2013')},
    {name: 'Item 8', featured: true, published: new Date('2/1/2013')},
    {name: 'Item 9', featured: true, published: new Date('10/7/2013')},
    {name: 'Item 10', featured: false, published: new Date('8/1/2013')},
    {name: 'Item 11', featured: false, published: new Date('11/1/2013')},
    {name: "Item 12", featured: true, published: new Date('10/13/2013')},
    {name: 'Item 13', featured: false, published: new Date('10/1/2013')},
    {name: 'Item 14', featured: true, published: new Date('2/15/2013')},
    {name: 'Item 15', featured: true, published: new Date('7/1/2013')}
  ]
});
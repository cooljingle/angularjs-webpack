import angular from 'angular';
import * as SigmaService from './sigma.service';
import '../style/app.css';
let app = () => {
  return {
    template: require('./app.html'),
    controller: 'AppCtrl',
    controllerAs: 'app'
  }
};

class AppCtrl {
  constructor(SigmaService) {
    this.title = "(Select a graph to load)";
    this.SigmaService = SigmaService;
    this.BuildHelloWorld = () => {
      this.title = "hello world example";
      this.SigmaService.BuildHelloWorld();
    }
    this.BuildBasic = () => {
      this.title = "basic example";
      this.SigmaService.BuildBasic();
    }
    this.BuildDagreTree = () => {
      this.title = "dagre tree example";
      this.SigmaService.BuildDagreTree();
    }
    this.BuildCustomTree = () => {
      this.title = "custom tree example";
      this.SigmaService.BuildCustomTree();
    }
    
    console.log(this);
  }
}

const MODULE_NAME = 'app';
angular.module(MODULE_NAME, [])
  .service('SigmaService', SigmaService.SigmaService) //nested object due to slightly silly import/export work from babel
  .directive('app', app)
  .controller('AppCtrl', AppCtrl);

export default MODULE_NAME;
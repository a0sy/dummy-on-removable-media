"use strict";

var Vue = require("vue");
//var diskSpace = require("diskspace");

var vm = new Vue({
  el: '#demo',
  data: {
    //command: '',
    buf: '',
    output: ''
  },
  methods: {
    execCommand: function (command){
      var exec = require('child_process').exec;

      exec(command, function (error, stdout, stderr) {
        if(stdout){
            vm.output = stdout;
        }
        if(stderr){
            vm.output = stderr;
          }
        if (error !== null) {
            vm.output = error;
        }
      });
    },
    driveLetter: function() {
      this.execCommand('wmic logicaldisk get caption');
      if (/stderr:|Exec error:/.test(this.buf)) {
        vm.output = 'error';
      } else {
        /*
        buf.split(/\r\r\n/).forEach(function(drive) {
        })
        */
        vm.output = this.buf;
        /*
        diskSpace.check('C', function (free)) {
            alert('diskspace: ' + free);
        }
        */
      }
    }
  }
})

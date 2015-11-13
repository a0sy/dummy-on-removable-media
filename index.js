"use strict";

var Vue = require("vue");
//var diskSpace = require("diskspace");

var vm = new Vue({
  el: '#demo',
  data: {
    buf: '',
    result: '',
    selected: 'A:',
    drives: []
  },
  methods: {
    execCommand: function(command) {
      var exec = require('child_process').exec;

      exec(command, function(error, stdout, stderr) {
        if (stdout) {
            vm.buf = stdout;
        }
        if (stderr) {
            vm.buf = 'stderr: ' + stderr;
        }
        if (error !== null) {
            vm.buf = 'Exec error: ' + error;
        }
      });
    },
    driveLetter: function() {
      // wmic Command
      this.execCommand('wmic logicaldisk get caption');
      //this.execCommand('test');
      if (this.buf.match(/stderr:|Exec error:/)) {
        this.result = 'error!!';
      } else {
        this.buf.split(/\r\r\n/).forEach(function(d) {
            if (d.match(/\:/)) {
              vm.drives.push({ltr: d.trim(), value: d.trim()});
            }
        })
        //this.result = this.buf;
        /*
        diskSpace.check('C', function (free)) {
            alert('diskspace: ' + free);
        }
        */
      }
    }
  }
})

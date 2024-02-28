var bookmarks = (function() {

  var all = [{
    letter: "CM",
    name: "Citymapper",
    url: "https://citymapper.com/london/superrouter",
    timeStamp: 1546453100455
  }, {
    letter: "DEV",
    name: "Devdocs",
    url: "http://devdocs.io/",
    timeStamp: 1546453101749
  }, {
    letter: "OD",
    name: "r/opendirectories/",
    url: "https://www.reddit.com/r/opendirectories/",
    timeStamp: 1546453102199
  }, {
    letter: "AR",
    name: "r/ar15",
    url: "https://www.reddit.com/r/ar15",
    timeStamp: 1546453102671
  }, {
    letter: "BA",
    name: "BeerAdvocate/Pacific",
    url: "https://www.beeradvocate.com/community/forums/pacific.15/",
    timeStamp: 1546453103110
  }, {
    letter: "M",
    name: "Maps",
    url: "https://www.google.com/maps",
    timeStamp: 1546453103560
  }, {
    letter: "N",
    name: "Netflix",
    url: "https://www.netflix.com/",
    timeStamp: 1546453104460
  }, {
    letter: "iC",
    name: "iCloud",
    url: "https://www.iCloud.com/",
    timeStamp: 1546453104910
  }, {
    letter: "FB",
    name: "Facebook",
    url: "https://www.facebook.com/",
    timeStamp: 1546453105349
  }, {
    letter: "SIG",
    name: "SigAlert",
    url: "https://www.sigalert.com/Map.asp?region=Orange+County",
    timeStamp: 1546453106734
  }, {
    letter: "AZ",
    name: "Amazon",
    url: "https://smile.amazon.com/",
    timeStamp: 1546453107633
  }, {
    letter: "YT",
    name: "Youtube",
    url: "https://www.youtube.com/",
    timeStamp: 1546453108071
  }, {
    letter: "GIT",
    name: "Github",
    url: "https://github.com/",
    timeStamp: 1546453108926
  }, {
    letter: "AN",
    name: "r/Android/",
    url: "https://www.reddit.com/r/Android/",
    timeStamp: 1546453109355
  }, {
    letter: "GM",
    name: "Gmail",
    url: "https://mail.google.com/",
    timeStamp: 1546453110265
  }, {
    letter: "CAL",
    name: "Calendar",
    url: "https://www.google.com/calendar/",
    timeStamp: 1546453110885
  }, {
    letter: "R",
    name: "Reddit",
    url: "https://old.reddit.com/",
    timeStamp: 1546453111491
  }];

  var get = function(timeStamp) {
    var _singleBookmark = function() {
      var found = false;
      for (var i = 0; i < all.length; i++) {
        if (all[i].timeStamp === timeStamp) {
          found = all[i];
        };
      };
      return found;
    };
    var _allBookmarks = function() {
      var action = {
        none: function(array) {
          return helper.sortObject(array, "timeStamp");
        },
        name: function(array) {
          return helper.sortObject(array, "name");
        },
        letter: function(array) {
          return helper.sortObject(array, "letter");
        }
      };
      return action[state.get().bookmarks.sort](all);
    };
    if (timeStamp && typeof timeStamp == "number") {
      return _singleBookmark(timeStamp);
    } else {
      return _allBookmarks();
    };
  };

  var restore = function(data) {
    if ("bookmarks" in data) {
      all = data.bookmarks;
    };
  };

  var add = function(override) {
    var options = {
      letter: null,
      name: null,
      url: null,
      timeStamp: null
    };
    if (override) {
      options = helper.applyOptions(options, override);
    };
    var newBookmark = {
      letter: options.letter,
      name: options.name,
      url: options.url,
      timeStamp: options.timeStamp
    };
    all.push(newBookmark);
  };

  var edit = function(override) {
    var options = {
      bookmarkData: null,
      timeStamp: null
    };
    if (override) {
      options = helper.applyOptions(options, override);
    };
    for (var i = 0; i < all.length; i++) {
      if (all[i].timeStamp === options.timeStamp) {
        all[i] = options.bookmarkData;
      };
    };
  };

  var remove = function(timeStamp) {
    for (var i = 0; i < all.length; i++) {
      if (all[i].timeStamp === timeStamp) {
        all.splice(all.indexOf(all[i]), 1);
      };
    };
  };

  var init = function() {
    if (data.load()) {
      restore(data.load());
    };
  };

  // exposed methods
  return {
    all: all,
    init: init,
    get: get,
    add: add,
    edit: edit,
    remove: remove
  };

})();

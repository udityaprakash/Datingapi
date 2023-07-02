function stableMarriage(menPreferences, womenPreferences) {
    var n = menPreferences.length;
    var engaged = new Array(n).fill(false);
    var womenPartner = new Array(n).fill(-1);
    var menNext = new Array(n).fill(0);
  
    while (true) {
      var freeMan = -1;
      for (var i = 0; i < n; i++) {
        if (!engaged[i]) {
          freeMan = i;
          break;
        }
      }
  
      if (freeMan === -1) {
        break; // All men are engaged
      }
  
      var woman = menPreferences[freeMan][menNext[freeMan]];
      menNext[freeMan]++;
  
      if (womenPartner[woman] === -1) {
        // Woman is not engaged
        womenPartner[woman] = freeMan;
        engaged[freeMan] = true;
      } else {
        var currentPartner = womenPartner[woman];
        if (isPreferredOver(menPreferences, woman, freeMan, currentPartner)) {
          womenPartner[woman] = freeMan;
          engaged[freeMan] = true;
          engaged[currentPartner] = false;
        }
      }
    }
  
    return womenPartner;
  }
  
  function isPreferredOver(preferences, woman, man1, man2) {
    var n = preferences.length;
    for (var i = 0; i < n; i++) {
      if (preferences[woman][i] === man1) {
        return true;
      }
      if (preferences[woman][i] === man2) {
        return false;
      }
    }
    return false;
  }
  
  // Example usage:
  var menPreferences = [
    [1, 0, 2],
    [1, 2, 0],
    [0, 1, 2]
  ];
  
  var womenPreferences = [
    [0, 1, 2],
    [1, 0, 2],
    [2, 0, 1]
  ];
  
  var result = stableMarriage(menPreferences, womenPreferences);
module.exports = result; // [1, 0, 2]
  
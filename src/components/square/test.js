var a = [
  {
    userId: "p1",
    item: 1
  },
  {
    userId: "p2",
    item: 2
  },
  {
    userId: "p3",
    item: 4
  }
];

var b = [
  {
    userId: "p1",
    profile: 1
  },
  {
    userId: "p2",
    profile: 2
  }
];

var arrResult = _.map(a, function(obj) {
  return _.assign(
    obj,
    _.find(b, {
      userId: obj.userId
    })
  );
});

console.log(arrResult);
document.getElementById("result").innerHTML = JSON.stringify(arrResult, 0, 4);

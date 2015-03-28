var regExpPropType = function (props, propName, componentName, location) {
  if (!(props[propName] instanceof RegExp)) {
    var propType = typeof props[propName];

    return new Error(
      ("Invalid " + location + " `" + propName + "` of type `" + propType + "` ") +
        ("supplied to `" + componentName + "`, expected `RegExp`.")
    );
  }
};

module.exports = regExpPropType;

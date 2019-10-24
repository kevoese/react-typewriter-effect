export const delay = time =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, time || 300);
  });

export const propTypeValidation = {
  multiTextDelay: (props, propName) => {
    if ( props[propName] && typeof props[propName] != "number")
      return new Error(
        `Invalid ${propName} supplied to react-type-writer-component component.`
      );
    if(!props['multiText'] && props[propName] )
    return new Error(
        `Invalid!. multiText props must be provided to use ${propName} .`
      );
  },
  typeSpeed: (props, propName) => {
    if (props[propName] && typeof props[propName] != "number")
      return new Error(
        `Invalid ${propName} supplied to react-typeWriter component.`
      );
  },
  startDelay: (props, propName) => {
    if (props[propName] && typeof props[propName] != "number")
      return new Error(
        `Invalid ${propName} supplied to react-typeWriter component.`
      );
  },
  text: (props, propName) => {
    if (!props["multiText"] && typeof props[propName] != "string")
      return new Error(
        `Invalid ${propName} supplied to react-typeWriter component!`
      );
  },
  cursorColor: (props, propName) => {
    if (props[propName] && typeof props[propName] != "string")
      return new Error(
        `Invalid ${propName} supplied to react-typeWriter component!`
      );
  },
  textStyle: (props, propName) => {
    if (props[propName] && typeof props[propName] != "object")
      return new Error(
        `Invalid ${propName} supplied to react-typeWriter component!`
      );
  },
  multiText: (props, propName) => {
    if (props[propName] && typeof props[propName] == "object") {
      for (let i = 0; i < props[propName].length; i++) {
        if (typeof props[propName][i] != "string")
          return new Error(
            `Invalid element: ${props[propName][i]} for ${propName} supplied to react-typeWriter component!`
          );
      }
    } else if (props[propName] && typeof props[propName] !== "object")
      return new Error(
        `Invalid ${propName} supplied to react-typeWriter component!`
      );
  }
};

export const contentInView = element => {
    const scroll = window.scrollY || window.pageYOffset;
    const elementPositionProps = element.getBoundingClientRect();
    const elementTopPosition = elementPositionProps.top + scroll;
  
    const viewport = {
      top: scroll,
      bottom: scroll + window.innerHeight
    };
  
    const elementPosition = {
      top: elementTopPosition,
      bottom: elementTopPosition + elementPositionProps.height
    };
    return (
      (elementPosition.bottom >= viewport.top &&
        elementPosition.bottom <= viewport.bottom) ||
      (elementPosition.top <= viewport.bottom &&
        elementPosition.top >= viewport.top)
    );
  };

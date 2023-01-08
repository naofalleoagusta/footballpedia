const joinText = (strings: string[]) => {
  return strings.reduce((text, nextText) => {
    text += nextText.charAt(0).toUpperCase();
    return text;
  }, "");
};

const shortenedPosition = (position: string) => {
  if (position === "Goalkeeper") {
    return "GK";
  }
  if (position.includes("-")) {
    return joinText(position.split("-"));
  }
  return joinText(position.split(" "));
};

export default shortenedPosition;

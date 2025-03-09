export default function ToggleSource({ target }) {
  const toggle = () => {
      // debugger
    if (target.current && typeof target.current.toggle === "function") {
      target.current.toggle();
    } else {
      console.warn("Target is not set or does not have a toggle method.");
    }
  };

  return <button onClick={toggle}>Toggle SourceBox</button>;
}

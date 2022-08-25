import { PopupContainer } from "./styled";

export default function Popup() {
  return (
    <PopupContainer>
      <div
        style={{
          display: "flex",
          width: "100px",
          height: "100px",
          backgroundColor: "yellow"
        }}
      ></div>
    </PopupContainer>
  );
}

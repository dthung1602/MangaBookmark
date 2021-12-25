import NextChapButton from "./NextChapButton";
import MarkAllButton from "./MarkAllButton";
import "./StartReadingButtons.less";

const StartReadingButtons = () => {
  return (
    <div className="quick-actions">
      <MarkAllButton />
      <NextChapButton />
    </div>
  );
};

export default StartReadingButtons;
